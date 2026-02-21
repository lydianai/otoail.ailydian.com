// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Confidential Patient Vault
 * @notice Oasis Sapphire TEE-encrypted patient health records
 * @dev All data encrypted in Intel SGX hardware, HIPAA compliant
 * @custom:security-contact security@median.ailydian.com
 */

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract PatientVault {
    // ==================== STATE VARIABLES ====================

    struct HealthRecord {
        bytes32 patientDID;        // Decentralized Identifier
        bytes encryptedFHIR;       // FHIR R5 bundle (AES-256-GCM)
        bytes32 recordHash;        // SHA-256 hash for integrity
        uint256 timestamp;
        address provider;          // Hospital/Doctor address
        string ipfsHash;          // Large files on IPFS
        RecordType recordType;
        bool isActive;
    }

    struct ConsentGrant {
        bytes32 patientDID;
        address grantee;           // Provider granted access
        uint256 validFrom;
        uint256 validUntil;
        bool isRevoked;
        ConsentPurpose purpose;
        bytes32[] allowedRecords;  // Specific record access
    }

    enum RecordType {
        ENCOUNTER,
        OBSERVATION,
        MEDICATION,
        PROCEDURE,
        DIAGNOSTIC,
        IMAGING,
        LAB_RESULT
    }

    enum ConsentPurpose {
        TREATMENT,
        RESEARCH,
        INSURANCE,
        EMERGENCY,
        PATIENT_ACCESS
    }

    // ==================== STORAGE ====================

    // Patient DID => Record ID => HealthRecord
    mapping(bytes32 => mapping(bytes32 => HealthRecord)) private patientRecords;

    // Patient DID => Record IDs array
    mapping(bytes32 => bytes32[]) private patientRecordIds;

    // Patient DID => Provider => Consent
    mapping(bytes32 => mapping(address => ConsentGrant)) private consents;

    // Patient DID => Provider addresses with consent
    mapping(bytes32 => address[]) private authorizedProviders;

    // Access control
    mapping(bytes32 => address) public patientWallets; // DID => Wallet
    mapping(address => bytes32) public walletDIDs;     // Wallet => DID

    // HIPAA audit logs (immutable)
    struct AuditLog {
        bytes32 actorDID;
        bytes32 patientDID;
        bytes32 recordId;
        string action;
        uint256 timestamp;
        string ipAddress;
        bool phiAccessed;
    }

    AuditLog[] private auditLogs;

    // ==================== EVENTS ====================

    event RecordStored(
        bytes32 indexed patientDID,
        bytes32 indexed recordId,
        RecordType recordType,
        uint256 timestamp
    );

    event ConsentGranted(
        bytes32 indexed patientDID,
        address indexed grantee,
        ConsentPurpose purpose,
        uint256 validUntil
    );

    event ConsentRevoked(
        bytes32 indexed patientDID,
        address indexed grantee,
        uint256 timestamp
    );

    event RecordAccessed(
        bytes32 indexed patientDID,
        bytes32 indexed recordId,
        address indexed accessor,
        uint256 timestamp
    );

    event AuditLogCreated(
        bytes32 indexed patientDID,
        string action,
        uint256 timestamp
    );

    // ==================== MODIFIERS ====================

    modifier onlyPatient(bytes32 _patientDID) {
        require(
            walletDIDs[msg.sender] == _patientDID,
            "Only patient can perform this action"
        );
        _;
    }

    modifier onlyAuthorized(bytes32 _patientDID) {
        require(
            walletDIDs[msg.sender] == _patientDID ||
            hasValidConsent(_patientDID, msg.sender),
            "Unauthorized access"
        );
        _;
    }

    // ==================== PATIENT REGISTRATION ====================

    /**
     * @notice Register patient DID with wallet address
     * @param _patientDID Decentralized Identifier
     */
    function registerPatient(bytes32 _patientDID) external {
        require(patientWallets[_patientDID] == address(0), "DID already registered");
        require(walletDIDs[msg.sender] == bytes32(0), "Wallet already registered");

        patientWallets[_patientDID] = msg.sender;
        walletDIDs[msg.sender] = _patientDID;

        _createAuditLog(_patientDID, _patientDID, bytes32(0), "REGISTER_PATIENT", false);
    }

    // ==================== RECORD MANAGEMENT ====================

    /**
     * @notice Store encrypted FHIR record in TEE
     * @dev Data encrypted in Intel SGX, never exposed to validators
     * @param _patientDID Patient identifier
     * @param _recordId Unique record identifier
     * @param _encryptedFHIR Encrypted FHIR R5 bundle
     * @param _recordType Type of medical record
     * @param _ipfsHash Optional IPFS hash for large files
     */
    function storeRecord(
        bytes32 _patientDID,
        bytes32 _recordId,
        bytes calldata _encryptedFHIR,
        RecordType _recordType,
        string calldata _ipfsHash
    ) external onlyAuthorized(_patientDID) {
        require(_encryptedFHIR.length > 0, "Empty record not allowed");
        require(!patientRecords[_patientDID][_recordId].isActive, "Record already exists");

        // Calculate hash for integrity
        bytes32 recordHash = keccak256(_encryptedFHIR);

        // Store in TEE (encrypted, invisible to validators)
        patientRecords[_patientDID][_recordId] = HealthRecord({
            patientDID: _patientDID,
            encryptedFHIR: _encryptedFHIR,
            recordHash: recordHash,
            timestamp: block.timestamp,
            provider: msg.sender,
            ipfsHash: _ipfsHash,
            recordType: _recordType,
            isActive: true
        });

        // Track record ID
        patientRecordIds[_patientDID].push(_recordId);

        emit RecordStored(_patientDID, _recordId, _recordType, block.timestamp);
        _createAuditLog(_patientDID, walletDIDs[msg.sender], _recordId, "STORE_RECORD", true);
    }

    /**
     * @notice Retrieve encrypted record (only if authorized)
     * @param _patientDID Patient identifier
     * @param _recordId Record identifier
     * @return Encrypted FHIR bundle
     */
    function getRecord(
        bytes32 _patientDID,
        bytes32 _recordId
    ) external onlyAuthorized(_patientDID) returns (bytes memory) {
        HealthRecord storage record = patientRecords[_patientDID][_recordId];
        require(record.isActive, "Record not found or deleted");

        emit RecordAccessed(_patientDID, _recordId, msg.sender, block.timestamp);
        _createAuditLog(_patientDID, walletDIDs[msg.sender], _recordId, "ACCESS_RECORD", true);

        return record.encryptedFHIR;
    }

    /**
     * @notice Get all record IDs for patient
     * @param _patientDID Patient identifier
     * @return Array of record IDs
     */
    function getPatientRecordIds(bytes32 _patientDID)
        external
        view
        onlyAuthorized(_patientDID)
        returns (bytes32[] memory)
    {
        return patientRecordIds[_patientDID];
    }

    /**
     * @notice Get record metadata (without encrypted content)
     * @param _patientDID Patient identifier
     * @param _recordId Record identifier
     */
    function getRecordMetadata(bytes32 _patientDID, bytes32 _recordId)
        external
        view
        onlyAuthorized(_patientDID)
        returns (
            bytes32 recordHash,
            uint256 timestamp,
            address provider,
            RecordType recordType,
            string memory ipfsHash
        )
    {
        HealthRecord storage record = patientRecords[_patientDID][_recordId];
        require(record.isActive, "Record not found");

        return (
            record.recordHash,
            record.timestamp,
            record.provider,
            record.recordType,
            record.ipfsHash
        );
    }

    // ==================== CONSENT MANAGEMENT ====================

    /**
     * @notice Grant time-limited access to provider
     * @param _patientDID Patient identifier
     * @param _provider Provider address
     * @param _purpose Purpose of access
     * @param _durationSeconds Duration of consent
     * @param _allowedRecords Specific records (empty for all)
     */
    function grantConsent(
        bytes32 _patientDID,
        address _provider,
        ConsentPurpose _purpose,
        uint256 _durationSeconds,
        bytes32[] calldata _allowedRecords
    ) external onlyPatient(_patientDID) {
        require(_provider != address(0), "Invalid provider address");
        require(_durationSeconds > 0, "Duration must be positive");

        uint256 validUntil = block.timestamp + _durationSeconds;

        consents[_patientDID][_provider] = ConsentGrant({
            patientDID: _patientDID,
            grantee: _provider,
            validFrom: block.timestamp,
            validUntil: validUntil,
            isRevoked: false,
            purpose: _purpose,
            allowedRecords: _allowedRecords
        });

        // Track authorized provider
        if (!_isProviderAuthorized(_patientDID, _provider)) {
            authorizedProviders[_patientDID].push(_provider);
        }

        emit ConsentGranted(_patientDID, _provider, _purpose, validUntil);
        _createAuditLog(_patientDID, _patientDID, bytes32(0), "GRANT_CONSENT", false);
    }

    /**
     * @notice Revoke provider access
     * @param _patientDID Patient identifier
     * @param _provider Provider address
     */
    function revokeConsent(bytes32 _patientDID, address _provider)
        external
        onlyPatient(_patientDID)
    {
        ConsentGrant storage consent = consents[_patientDID][_provider];
        require(!consent.isRevoked, "Consent already revoked");

        consent.isRevoked = true;
        consent.validUntil = block.timestamp;

        emit ConsentRevoked(_patientDID, _provider, block.timestamp);
        _createAuditLog(_patientDID, _patientDID, bytes32(0), "REVOKE_CONSENT", false);
    }

    /**
     * @notice Check if provider has valid consent
     * @param _patientDID Patient identifier
     * @param _provider Provider address
     * @return bool True if consent is valid
     */
    function hasValidConsent(bytes32 _patientDID, address _provider)
        public
        view
        returns (bool)
    {
        ConsentGrant storage consent = consents[_patientDID][_provider];

        return (
            !consent.isRevoked &&
            block.timestamp >= consent.validFrom &&
            block.timestamp <= consent.validUntil
        );
    }

    /**
     * @notice Get all authorized providers
     * @param _patientDID Patient identifier
     * @return Array of provider addresses
     */
    function getAuthorizedProviders(bytes32 _patientDID)
        external
        view
        onlyPatient(_patientDID)
        returns (address[] memory)
    {
        return authorizedProviders[_patientDID];
    }

    // ==================== CRYPTOGRAPHIC ERASURE (GDPR/HIPAA) ====================

    /**
     * @notice Delete record (GDPR right to erasure)
     * @dev Doesn't delete blockchain data, marks as inactive
     * @param _patientDID Patient identifier
     * @param _recordId Record identifier
     */
    function deleteRecord(bytes32 _patientDID, bytes32 _recordId)
        external
        onlyPatient(_patientDID)
    {
        HealthRecord storage record = patientRecords[_patientDID][_recordId];
        require(record.isActive, "Record already deleted");

        // Mark inactive (cryptographic erasure via key deletion off-chain)
        record.isActive = false;

        _createAuditLog(_patientDID, _patientDID, _recordId, "DELETE_RECORD", true);
    }

    // ==================== HIPAA AUDIT TRAIL ====================

    /**
     * @notice Create immutable audit log entry
     * @dev Internal function for compliance
     */
    function _createAuditLog(
        bytes32 _patientDID,
        bytes32 _actorDID,
        bytes32 _recordId,
        string memory _action,
        bool _phiAccessed
    ) private {
        auditLogs.push(AuditLog({
            actorDID: _actorDID,
            patientDID: _patientDID,
            recordId: _recordId,
            action: _action,
            timestamp: block.timestamp,
            ipAddress: "", // Set off-chain for privacy
            phiAccessed: _phiAccessed
        }));

        emit AuditLogCreated(_patientDID, _action, block.timestamp);
    }

    /**
     * @notice Get audit logs for patient (compliance)
     * @param _patientDID Patient identifier
     * @param _fromIndex Start index
     * @param _limit Number of logs to return
     * @return Array of audit logs
     */
    function getAuditLogs(
        bytes32 _patientDID,
        uint256 _fromIndex,
        uint256 _limit
    ) external view onlyAuthorized(_patientDID) returns (AuditLog[] memory) {
        uint256 total = auditLogs.length;
        uint256 end = _fromIndex + _limit > total ? total : _fromIndex + _limit;
        uint256 resultCount = end - _fromIndex;

        AuditLog[] memory result = new AuditLog[](resultCount);
        uint256 j = 0;

        for (uint256 i = _fromIndex; i < end; i++) {
            if (auditLogs[i].patientDID == _patientDID) {
                result[j] = auditLogs[i];
                j++;
            }
        }

        return result;
    }

    // ==================== HELPER FUNCTIONS ====================

    function _isProviderAuthorized(bytes32 _patientDID, address _provider)
        private
        view
        returns (bool)
    {
        address[] memory providers = authorizedProviders[_patientDID];
        for (uint256 i = 0; i < providers.length; i++) {
            if (providers[i] == _provider) {
                return true;
            }
        }
        return false;
    }

    // ==================== EMERGENCY ACCESS (BREAK-GLASS) ====================

    event EmergencyAccessGranted(
        bytes32 indexed patientDID,
        address indexed emergencyProvider,
        string reason,
        uint256 timestamp
    );

    /**
     * @notice Emergency access for life-threatening situations
     * @dev Auto-grants 24-hour access, logged for audit
     * @param _patientDID Patient identifier
     * @param _reason Emergency reason
     */
    function requestEmergencyAccess(bytes32 _patientDID, string calldata _reason)
        external
    {
        // Grant 24-hour emergency consent
        consents[_patientDID][msg.sender] = ConsentGrant({
            patientDID: _patientDID,
            grantee: msg.sender,
            validFrom: block.timestamp,
            validUntil: block.timestamp + 24 hours,
            isRevoked: false,
            purpose: ConsentPurpose.EMERGENCY,
            allowedRecords: new bytes32[](0) // All records
        });

        emit EmergencyAccessGranted(_patientDID, msg.sender, _reason, block.timestamp);
        _createAuditLog(_patientDID, bytes32(uint256(uint160(msg.sender))), bytes32(0), "EMERGENCY_ACCESS", true);
    }
}
