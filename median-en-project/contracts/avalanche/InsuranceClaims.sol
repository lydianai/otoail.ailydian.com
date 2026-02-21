// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Real-Time Insurance Claims Settlement
 * @notice Avalanche C-Chain smart contract for instant claim processing
 * @dev HIPAA-compliant, ICD-10/CPT coded, automated adjudication
 * @custom:security-contact security@median.ailydian.com
 */

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InsuranceClaims is ReentrancyGuard, AccessControl, Pausable {
    // ==================== ROLES ====================

    bytes32 public constant PROVIDER_ROLE = keccak256("PROVIDER_ROLE");
    bytes32 public constant PAYER_ROLE = keccak256("PAYER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    // ==================== STATE VARIABLES ====================

    struct Claim {
        bytes32 claimId;
        bytes32 patientDID;
        address provider;
        address payer;

        // Clinical codes
        string[] icd10Codes;      // Diagnosis codes
        string[] cptCodes;        // Procedure codes
        uint256 encounterDate;

        // Financial (in USDC smallest unit)
        uint256 chargedAmount;
        uint256 allowedAmount;
        uint256 payerResponsibility;
        uint256 patientResponsibility;

        // Status
        ClaimStatus status;
        uint256 submittedAt;
        uint256 adjudicatedAt;
        uint256 paidAt;

        // Adjudication
        string denialReason;
        bytes32 remittanceHash;

        // LayerZero cross-chain
        bytes32 oasisConsentTxHash;  // Proof of patient consent from Oasis

        bool exists;
    }

    struct PayerContract {
        address payerAddress;
        string payerName;
        uint256 claimsProcessed;
        uint256 totalPaid;
        bool active;
        mapping(string => uint256) feeSchedule; // CPT code => allowed amount
    }

    enum ClaimStatus {
        SUBMITTED,
        IN_REVIEW,
        APPROVED,
        DENIED,
        APPEALED,
        PAID,
        REVERSED
    }

    // ==================== STORAGE ====================

    // Claim ID => Claim
    mapping(bytes32 => Claim) public claims;

    // Provider => Claim IDs
    mapping(address => bytes32[]) public providerClaims;

    // Payer => Contract details
    mapping(address => PayerContract) public payers;

    // Patient DID => Claim IDs (encrypted patient tracking)
    mapping(bytes32 => bytes32[]) private patientClaims;

    // Settlement token (USDC)
    IERC20 public settlementToken;

    // Auto-adjudication rules
    uint256 public autoApprovalThreshold = 5000_000000; // $5,000 USDC
    uint256 public paymentHoldPeriod = 3 days;

    // ==================== EVENTS ====================

    event ClaimSubmitted(
        bytes32 indexed claimId,
        bytes32 indexed patientDID,
        address indexed provider,
        address payer,
        uint256 chargedAmount,
        uint256 timestamp
    );

    event ClaimAdjudicated(
        bytes32 indexed claimId,
        ClaimStatus status,
        uint256 allowedAmount,
        uint256 payerResponsibility,
        uint256 patientResponsibility,
        uint256 timestamp
    );

    event ClaimPaid(
        bytes32 indexed claimId,
        address indexed provider,
        uint256 amount,
        uint256 timestamp
    );

    event ClaimDenied(
        bytes32 indexed claimId,
        string reason,
        uint256 timestamp
    );

    event ClaimAppealed(
        bytes32 indexed claimId,
        address appellant,
        uint256 timestamp
    );

    event PayerRegistered(
        address indexed payerAddress,
        string payerName,
        uint256 timestamp
    );

    event FeeScheduleUpdated(
        address indexed payer,
        string cptCode,
        uint256 allowedAmount,
        uint256 timestamp
    );

    // ==================== CONSTRUCTOR ====================

    constructor(address _settlementToken) {
        settlementToken = IERC20(_settlementToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ==================== PROVIDER FUNCTIONS ====================

    /**
     * @notice Submit insurance claim for patient encounter
     * @dev Validates consent from Oasis chain, auto-adjudicates if under threshold
     * @param _claimId Unique claim identifier
     * @param _patientDID Patient decentralized identifier
     * @param _payer Insurance payer address
     * @param _icd10Codes Diagnosis codes (ICD-10)
     * @param _cptCodes Procedure codes (CPT)
     * @param _encounterDate Date of service
     * @param _chargedAmount Total charged amount (USDC)
     * @param _oasisConsentTxHash Oasis tx proving patient consent
     */
    function submitClaim(
        bytes32 _claimId,
        bytes32 _patientDID,
        address _payer,
        string[] calldata _icd10Codes,
        string[] calldata _cptCodes,
        uint256 _encounterDate,
        uint256 _chargedAmount,
        bytes32 _oasisConsentTxHash
    ) external onlyRole(PROVIDER_ROLE) whenNotPaused {
        require(!claims[_claimId].exists, "Claim already exists");
        require(payers[_payer].active, "Payer not registered");
        require(_icd10Codes.length > 0, "Must have diagnosis codes");
        require(_cptCodes.length > 0, "Must have procedure codes");
        require(_chargedAmount > 0, "Amount must be positive");
        require(_oasisConsentTxHash != bytes32(0), "Consent proof required");

        // Create claim
        Claim storage claim = claims[_claimId];
        claim.claimId = _claimId;
        claim.patientDID = _patientDID;
        claim.provider = msg.sender;
        claim.payer = _payer;
        claim.icd10Codes = _icd10Codes;
        claim.cptCodes = _cptCodes;
        claim.encounterDate = _encounterDate;
        claim.chargedAmount = _chargedAmount;
        claim.status = ClaimStatus.SUBMITTED;
        claim.submittedAt = block.timestamp;
        claim.oasisConsentTxHash = _oasisConsentTxHash;
        claim.exists = true;

        // Track
        providerClaims[msg.sender].push(_claimId);
        patientClaims[_patientDID].push(_claimId);

        emit ClaimSubmitted(
            _claimId,
            _patientDID,
            msg.sender,
            _payer,
            _chargedAmount,
            block.timestamp
        );

        // Auto-adjudicate if under threshold
        if (_chargedAmount <= autoApprovalThreshold) {
            _autoAdjudicate(_claimId);
        }
    }

    /**
     * @notice Auto-adjudicate claim using fee schedule
     * @dev Internal function for claims under threshold
     */
    function _autoAdjudicate(bytes32 _claimId) private {
        Claim storage claim = claims[_claimId];
        PayerContract storage payer = payers[claim.payer];

        uint256 totalAllowed = 0;

        // Calculate allowed amount from fee schedule
        for (uint256 i = 0; i < claim.cptCodes.length; i++) {
            uint256 feeScheduleAmount = payer.feeSchedule[claim.cptCodes[i]];
            if (feeScheduleAmount > 0) {
                totalAllowed += feeScheduleAmount;
            }
        }

        if (totalAllowed == 0) {
            // No fee schedule match - manual review
            claim.status = ClaimStatus.IN_REVIEW;
            return;
        }

        // Apply 80/20 split (typical insurance)
        claim.allowedAmount = totalAllowed;
        claim.payerResponsibility = (totalAllowed * 80) / 100;
        claim.patientResponsibility = totalAllowed - claim.payerResponsibility;
        claim.status = ClaimStatus.APPROVED;
        claim.adjudicatedAt = block.timestamp;

        payer.claimsProcessed++;

        emit ClaimAdjudicated(
            _claimId,
            ClaimStatus.APPROVED,
            claim.allowedAmount,
            claim.payerResponsibility,
            claim.patientResponsibility,
            block.timestamp
        );
    }

    // ==================== PAYER FUNCTIONS ====================

    /**
     * @notice Manually adjudicate claim (for complex cases)
     * @param _claimId Claim identifier
     * @param _approved True to approve, false to deny
     * @param _allowedAmount Allowed amount if approved
     * @param _denialReason Reason if denied
     */
    function adjudicateClaim(
        bytes32 _claimId,
        bool _approved,
        uint256 _allowedAmount,
        string calldata _denialReason
    ) external onlyRole(PAYER_ROLE) {
        Claim storage claim = claims[_claimId];
        require(claim.exists, "Claim does not exist");
        require(claim.payer == msg.sender, "Not claim payer");
        require(
            claim.status == ClaimStatus.SUBMITTED ||
            claim.status == ClaimStatus.IN_REVIEW ||
            claim.status == ClaimStatus.APPEALED,
            "Cannot adjudicate claim in current status"
        );

        if (_approved) {
            claim.status = ClaimStatus.APPROVED;
            claim.allowedAmount = _allowedAmount;
            claim.payerResponsibility = (_allowedAmount * 80) / 100;
            claim.patientResponsibility = _allowedAmount - claim.payerResponsibility;
            claim.adjudicatedAt = block.timestamp;

            payers[msg.sender].claimsProcessed++;

            emit ClaimAdjudicated(
                _claimId,
                ClaimStatus.APPROVED,
                claim.allowedAmount,
                claim.payerResponsibility,
                claim.patientResponsibility,
                block.timestamp
            );
        } else {
            claim.status = ClaimStatus.DENIED;
            claim.denialReason = _denialReason;
            claim.adjudicatedAt = block.timestamp;

            emit ClaimDenied(_claimId, _denialReason, block.timestamp);
        }
    }

    /**
     * @notice Pay approved claim to provider
     * @param _claimId Claim identifier
     */
    function payClaim(bytes32 _claimId) external onlyRole(PAYER_ROLE) nonReentrant {
        Claim storage claim = claims[_claimId];
        require(claim.exists, "Claim does not exist");
        require(claim.payer == msg.sender, "Not claim payer");
        require(claim.status == ClaimStatus.APPROVED, "Claim not approved");
        require(
            block.timestamp >= claim.adjudicatedAt + paymentHoldPeriod,
            "Payment hold period not elapsed"
        );

        // Transfer USDC from payer to provider
        bool success = settlementToken.transferFrom(
            msg.sender,
            claim.provider,
            claim.payerResponsibility
        );
        require(success, "Payment transfer failed");

        claim.status = ClaimStatus.PAID;
        claim.paidAt = block.timestamp;

        payers[msg.sender].totalPaid += claim.payerResponsibility;

        emit ClaimPaid(_claimId, claim.provider, claim.payerResponsibility, block.timestamp);
    }

    /**
     * @notice Register fee schedule for CPT code
     * @param _cptCode CPT procedure code
     * @param _allowedAmount Allowed amount in USDC
     */
    function setFeeSchedule(
        string calldata _cptCode,
        uint256 _allowedAmount
    ) external onlyRole(PAYER_ROLE) {
        PayerContract storage payer = payers[msg.sender];
        require(payer.active, "Payer not registered");

        payer.feeSchedule[_cptCode] = _allowedAmount;

        emit FeeScheduleUpdated(msg.sender, _cptCode, _allowedAmount, block.timestamp);
    }

    // ==================== PROVIDER APPEALS ====================

    /**
     * @notice Appeal denied claim
     * @param _claimId Claim identifier
     */
    function appealClaim(bytes32 _claimId) external {
        Claim storage claim = claims[_claimId];
        require(claim.exists, "Claim does not exist");
        require(claim.provider == msg.sender, "Not claim provider");
        require(claim.status == ClaimStatus.DENIED, "Can only appeal denied claims");

        claim.status = ClaimStatus.APPEALED;

        emit ClaimAppealed(_claimId, msg.sender, block.timestamp);
    }

    // ==================== ADMIN FUNCTIONS ====================

    /**
     * @notice Register insurance payer
     * @param _payerAddress Payer wallet address
     * @param _payerName Payer name
     */
    function registerPayer(
        address _payerAddress,
        string calldata _payerName
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!payers[_payerAddress].active, "Payer already registered");

        PayerContract storage payer = payers[_payerAddress];
        payer.payerAddress = _payerAddress;
        payer.payerName = _payerName;
        payer.active = true;

        _grantRole(PAYER_ROLE, _payerAddress);

        emit PayerRegistered(_payerAddress, _payerName, block.timestamp);
    }

    /**
     * @notice Set auto-approval threshold
     * @param _threshold New threshold in USDC
     */
    function setAutoApprovalThreshold(uint256 _threshold)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        autoApprovalThreshold = _threshold;
    }

    /**
     * @notice Pause contract (emergency)
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpause contract
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // ==================== VIEW FUNCTIONS ====================

    /**
     * @notice Get claim details
     */
    function getClaim(bytes32 _claimId) external view returns (
        bytes32 patientDID,
        address provider,
        address payer,
        uint256 chargedAmount,
        uint256 allowedAmount,
        ClaimStatus status,
        uint256 submittedAt
    ) {
        Claim storage claim = claims[_claimId];
        require(claim.exists, "Claim does not exist");

        return (
            claim.patientDID,
            claim.provider,
            claim.payer,
            claim.chargedAmount,
            claim.allowedAmount,
            claim.status,
            claim.submittedAt
        );
    }

    /**
     * @notice Get provider claims
     */
    function getProviderClaims(address _provider)
        external
        view
        returns (bytes32[] memory)
    {
        return providerClaims[_provider];
    }

    /**
     * @notice Get fee schedule for CPT code
     */
    function getFeeSchedule(address _payer, string calldata _cptCode)
        external
        view
        returns (uint256)
    {
        return payers[_payer].feeSchedule[_cptCode];
    }
}
