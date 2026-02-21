/**
 * InsuranceClaims Contract Client
 * Production-ready TypeScript wrapper for Avalanche InsuranceClaims
 *
 * Features:
 * - Real-time claim submission and adjudication
 * - Auto-approval for claims under threshold
 * - USDC settlement integration
 * - ICD-10/CPT code validation
 * - Fee schedule management
 */

import { ethers, Contract, Wallet, JsonRpcProvider } from "ethers";
import InsuranceClaimsABI from "../abis/InsuranceClaims.json";

// ==================== TYPES ====================

export interface InsuranceClaimsConfig {
  contractAddress: string;
  rpcUrl: string;
  chainId: number;
  privateKey?: string;
  usdcAddress: string;
}

export interface ClaimSubmission {
  claimId: string;
  patientDID: string;
  payer: string;
  icd10Codes: string[];
  cptCodes: string[];
  encounterDate: Date;
  chargedAmount: bigint;
  oasisConsentTxHash: string;
}

export interface ClaimDetails {
  patientDID: string;
  provider: string;
  payer: string;
  chargedAmount: bigint;
  allowedAmount: bigint;
  status: ClaimStatus;
  submittedAt: Date;
}

export enum ClaimStatus {
  SUBMITTED = 0,
  IN_REVIEW = 1,
  APPROVED = 2,
  DENIED = 3,
  APPEALED = 4,
  PAID = 5,
  REVERSED = 6,
}

// ==================== INSURANCE CLAIMS CLIENT ====================

export class InsuranceClaimsClient {
  private contract: Contract;
  private provider: JsonRpcProvider;
  private signer?: Wallet;
  private config: InsuranceClaimsConfig;

  constructor(config: InsuranceClaimsConfig) {
    this.config = config;

    // Create provider
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // Create signer if private key provided
    if (config.privateKey) {
      this.signer = new ethers.Wallet(config.privateKey, this.provider);
    }

    // Initialize contract
    this.contract = new ethers.Contract(
      config.contractAddress,
      InsuranceClaimsABI,
      this.signer || this.provider
    );
  }

  // ==================== PROVIDER FUNCTIONS ====================

  /**
   * Submit insurance claim
   * @param claim Claim submission details
   */
  async submitClaim(claim: ClaimSubmission): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`💳 Submitting claim ${claim.claimId}`);
      console.log(`   Amount: $${this.formatUSDC(claim.chargedAmount)}`);
      console.log(`   ICD-10: ${claim.icd10Codes.join(", ")}`);
      console.log(`   CPT: ${claim.cptCodes.join(", ")}`);

      const tx = await this.contract.submitClaim(
        ethers.id(claim.claimId), // Convert to bytes32
        ethers.id(claim.patientDID),
        claim.payer,
        claim.icd10Codes,
        claim.cptCodes,
        Math.floor(claim.encounterDate.getTime() / 1000),
        claim.chargedAmount,
        claim.oasisConsentTxHash,
        {
          gasLimit: 500000,
        }
      );

      console.log(`⏳ Transaction sent: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✅ Claim submitted in block ${receipt.blockNumber}`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Submit claim failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Appeal denied claim
   * @param claimId Claim identifier
   */
  async appealClaim(claimId: string): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`📋 Appealing claim ${claimId}`);

      const tx = await this.contract.appealClaim(ethers.id(claimId));
      const receipt = await tx.wait();

      console.log(`✅ Claim appealed in block ${receipt.blockNumber}`);
      return receipt;
    } catch (error: any) {
      console.error("❌ Appeal claim failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Get provider claims
   * @param providerAddress Provider wallet address
   */
  async getProviderClaims(providerAddress: string): Promise<string[]> {
    try {
      const claimIds = await this.contract.getProviderClaims(providerAddress);
      console.log(`✅ Found ${claimIds.length} claims for provider`);
      return claimIds;
    } catch (error: any) {
      console.error("❌ Get provider claims failed:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== PAYER FUNCTIONS ====================

  /**
   * Manually adjudicate claim
   * @param claimId Claim identifier
   * @param approved True to approve, false to deny
   * @param allowedAmount Allowed amount if approved (in USDC smallest unit)
   * @param denialReason Reason if denied
   */
  async adjudicateClaim(
    claimId: string,
    approved: boolean,
    allowedAmount: bigint = 0n,
    denialReason: string = ""
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`⚖️ Adjudicating claim ${claimId}`);
      console.log(`   Decision: ${approved ? "APPROVED" : "DENIED"}`);

      if (approved) {
        console.log(`   Allowed: $${this.formatUSDC(allowedAmount)}`);
      } else {
        console.log(`   Reason: ${denialReason}`);
      }

      const tx = await this.contract.adjudicateClaim(
        ethers.id(claimId),
        approved,
        allowedAmount,
        denialReason
      );

      const receipt = await tx.wait();
      console.log(`✅ Claim adjudicated in block ${receipt.blockNumber}`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Adjudicate claim failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Pay approved claim
   * Requires prior USDC approval for contract
   * @param claimId Claim identifier
   */
  async payClaim(claimId: string): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`💰 Paying claim ${claimId}`);

      const tx = await this.contract.payClaim(ethers.id(claimId), {
        gasLimit: 300000,
      });

      const receipt = await tx.wait();
      console.log(`✅ Claim paid in block ${receipt.blockNumber}`);

      return receipt;
    } catch (error: any) {
      console.error("❌ Pay claim failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Set fee schedule for CPT code
   * @param cptCode CPT procedure code
   * @param allowedAmount Allowed amount in USDC smallest unit
   */
  async setFeeSchedule(
    cptCode: string,
    allowedAmount: bigint
  ): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`📊 Setting fee schedule: ${cptCode} = $${this.formatUSDC(allowedAmount)}`);

      const tx = await this.contract.setFeeSchedule(cptCode, allowedAmount);
      const receipt = await tx.wait();

      console.log(`✅ Fee schedule updated in block ${receipt.blockNumber}`);
      return receipt;
    } catch (error: any) {
      console.error("❌ Set fee schedule failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Get fee schedule for CPT code
   * @param payer Payer address
   * @param cptCode CPT code
   */
  async getFeeSchedule(payer: string, cptCode: string): Promise<bigint> {
    try {
      const amount = await this.contract.getFeeSchedule(payer, cptCode);
      console.log(`💵 Fee schedule for ${cptCode}: $${this.formatUSDC(amount)}`);
      return amount;
    } catch (error: any) {
      console.error("❌ Get fee schedule failed:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== VIEW FUNCTIONS ====================

  /**
   * Get claim details
   * @param claimId Claim identifier
   */
  async getClaim(claimId: string): Promise<ClaimDetails> {
    try {
      const claim = await this.contract.getClaim(ethers.id(claimId));

      return {
        patientDID: claim.patientDID,
        provider: claim.provider,
        payer: claim.payer,
        chargedAmount: claim.chargedAmount,
        allowedAmount: claim.allowedAmount,
        status: claim.status,
        submittedAt: new Date(Number(claim.submittedAt) * 1000),
      };
    } catch (error: any) {
      console.error("❌ Get claim failed:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== USDC INTEGRATION ====================

  /**
   * Approve USDC spending for contract
   * Required before paying claims
   * @param amount Amount to approve (in USDC smallest unit)
   */
  async approveUSDC(amount: bigint): Promise<ethers.TransactionReceipt> {
    if (!this.signer) {
      throw new Error("Signer required for write operations");
    }

    try {
      console.log(`💵 Approving $${this.formatUSDC(amount)} USDC for contract`);

      // USDC contract
      const usdcContract = new ethers.Contract(
        this.config.usdcAddress,
        [
          "function approve(address spender, uint256 amount) returns (bool)",
        ],
        this.signer
      );

      const tx = await usdcContract.approve(
        this.config.contractAddress,
        amount
      );

      const receipt = await tx.wait();
      console.log(`✅ USDC approved in block ${receipt.blockNumber}`);

      return receipt;
    } catch (error: any) {
      console.error("❌ USDC approval failed:", error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Get USDC balance
   * @param address Wallet address
   */
  async getUSDCBalance(address: string): Promise<bigint> {
    try {
      const usdcContract = new ethers.Contract(
        this.config.usdcAddress,
        ["function balanceOf(address account) view returns (uint256)"],
        this.provider
      );

      const balance = await usdcContract.balanceOf(address);
      console.log(`💰 USDC Balance: $${this.formatUSDC(balance)}`);

      return balance;
    } catch (error: any) {
      console.error("❌ Get USDC balance failed:", error.message);
      throw this.handleError(error);
    }
  }

  // ==================== EVENT LISTENING ====================

  /**
   * Listen for ClaimSubmitted events
   */
  onClaimSubmitted(
    callback: (
      claimId: string,
      patientDID: string,
      provider: string,
      payer: string,
      amount: bigint
    ) => void
  ): void {
    this.contract.on(
      "ClaimSubmitted",
      (claimId, patientDID, provider, payer, amount) => {
        console.log(`📢 ClaimSubmitted: ${claimId} - $${this.formatUSDC(amount)}`);
        callback(claimId, patientDID, provider, payer, amount);
      }
    );
  }

  /**
   * Listen for ClaimAdjudicated events
   */
  onClaimAdjudicated(
    callback: (
      claimId: string,
      status: ClaimStatus,
      allowedAmount: bigint
    ) => void
  ): void {
    this.contract.on("ClaimAdjudicated", (claimId, status, allowedAmount) => {
      console.log(
        `📢 ClaimAdjudicated: ${claimId} - ${ClaimStatus[status]} - $${this.formatUSDC(allowedAmount)}`
      );
      callback(claimId, status, allowedAmount);
    });
  }

  /**
   * Listen for ClaimPaid events
   */
  onClaimPaid(
    callback: (claimId: string, provider: string, amount: bigint) => void
  ): void {
    this.contract.on("ClaimPaid", (claimId, provider, amount) => {
      console.log(`💰 ClaimPaid: ${claimId} - $${this.formatUSDC(amount)}`);
      callback(claimId, provider, amount);
    });
  }

  // ==================== UTILITIES ====================

  /**
   * Format USDC amount (6 decimals) to human-readable
   */
  private formatUSDC(amount: bigint): string {
    return ethers.formatUnits(amount, 6);
  }

  /**
   * Parse USD amount to USDC smallest unit
   */
  parseUSDC(amount: string): bigint {
    return ethers.parseUnits(amount, 6);
  }

  /**
   * Handle contract errors
   */
  private handleError(error: any): Error {
    if (error.reason) {
      return new Error(`Contract Error: ${error.reason}`);
    }
    if (error.data) {
      return new Error(`Contract Error: ${error.data}`);
    }
    return new Error(`Transaction failed: ${error.message}`);
  }

  /**
   * Disconnect and cleanup
   */
  disconnect(): void {
    this.contract.removeAllListeners();
    console.log("✅ InsuranceClaims client disconnected");
  }
}

// ==================== FACTORY ====================

export function createInsuranceClaimsClient(
  config: InsuranceClaimsConfig
): InsuranceClaimsClient {
  return new InsuranceClaimsClient(config);
}

/**
 * Example Usage:
 *
 * const client = createInsuranceClaimsClient({
 *   contractAddress: process.env.NEXT_PUBLIC_INSURANCE_CLAIMS_ADDRESS!,
 *   rpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL!,
 *   chainId: 43113,
 *   privateKey: process.env.PRIVATE_KEY,
 *   usdcAddress: process.env.NEXT_PUBLIC_USDC_ADDRESS!,
 * });
 *
 * // Submit claim
 * await client.submitClaim({
 *   claimId: "claim-001",
 *   patientDID: "0x123abc...",
 *   payer: "0xpayer...",
 *   icd10Codes: ["J44.0", "I10"],
 *   cptCodes: ["99213", "94060"],
 *   encounterDate: new Date(),
 *   chargedAmount: client.parseUSDC("250.00"),
 *   oasisConsentTxHash: "0xabcd...",
 * });
 *
 * // Approve USDC before paying
 * await client.approveUSDC(client.parseUSDC("10000.00"));
 *
 * // Pay claim
 * await client.payClaim("claim-001");
 */
