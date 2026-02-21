/**
 * Blockchain Healthcare Platform - Type Definitions
 * EN System (HIPAA Compliant)
 * Oasis Network + Avalanche Hybrid Architecture
 */

// ==================== PATIENT IDENTITY ====================
export interface DecentralizedIdentity {
  did: string; // Decentralized Identifier (DID)
  publicKey: string;
  encryptedPrivateKey: string; // Encrypted with patient password
  createdAt: number;
  lastUpdated: number;
  revoked: boolean;
}

// ==================== FHIR BLOCKCHAIN RECORD ====================
export interface BlockchainHealthRecord {
  patientDID: string;
  recordId: string;
  encryptedFHIR: string; // AES-256-GCM encrypted FHIR R5 bundle
  recordType: 'encounter' | 'observation' | 'medication' | 'procedure' | 'diagnostic';
  timestamp: number;
  providerDID: string; // Doctor/Hospital DID
  ipfsHash?: string; // Large files stored on IPFS
  oasisTxHash: string; // Oasis Sapphire transaction
  metadata: {
    size: number;
    version: string;
    checksum: string;
  };
}

// ==================== CONSENT MANAGEMENT ====================
export interface ConsentRecord {
  patientDID: string;
  granteeDID: string; // Doctor/Researcher DID
  purpose: 'treatment' | 'research' | 'insurance' | 'emergency';
  permissions: {
    read: boolean;
    write: boolean;
    share: boolean;
    delete: boolean;
  };
  dataScope: string[]; // ['medications', 'labs', 'vitals']
  validFrom: number;
  validUntil: number;
  revocable: boolean;
  consentTxHash: string;
  status: 'active' | 'revoked' | 'expired';
}

// ==================== INSURANCE CLAIM (AVALANCHE) ====================
export interface BlockchainInsuranceClaim {
  claimId: string;
  patientDID: string;
  providerDID: string;
  payerContract: string; // Smart contract address

  // Clinical data
  diagnosisCodes: string[]; // ICD-10
  procedureCodes: string[]; // CPT codes
  encounterDate: number;

  // Financial
  chargedAmount: bigint; // in wei (USDC)
  allowedAmount: bigint;
  patientResponsibility: bigint;

  // Blockchain
  avalancheTxHash: string;
  submittedAt: number;
  finalizedAt?: number;
  status: 'pending' | 'approved' | 'denied' | 'appealed';

  // Smart contract events
  events: ClaimEvent[];
}

export interface ClaimEvent {
  eventType: 'submitted' | 'validated' | 'approved' | 'denied' | 'paid';
  timestamp: number;
  txHash: string;
  details: string;
}

// ==================== OASIS NETWORK CONFIG ====================
export interface OasisConfig {
  network: 'sapphire-mainnet' | 'sapphire-testnet';
  rpcUrl: string;
  chainId: number;
  contracts: {
    patientVault: string;
    consentManager: string;
    accessControl: string;
  };
  teeEnabled: boolean;
  encryptionAlgorithm: 'AES-256-GCM';
}

// ==================== AVALANCHE CONFIG ====================
export interface AvalancheConfig {
  network: 'mainnet' | 'fuji-testnet';
  subnetId: string;
  rpcUrl: string;
  chainId: number;
  contracts: {
    claimProcessor: string;
    payerRegistry: string;
    settlementToken: string; // USDC contract
  };
  validators: string[];
  gasToken: 'AVAX' | 'HEALTH-EN';
}

// ==================== GENOMIC DATA MARKETPLACE ====================
export interface GenomicDataListing {
  genomeDID: string;
  patientDID: string;
  encryptedGenome: string; // TEE-encrypted in Oasis
  ancestryProvider: '23andMe' | 'AncestryDNA' | 'MyHeritage';
  traits: string[];
  ethnicity: string[];

  // Marketplace
  priceUSD: number;
  availableFor: 'research' | 'clinical' | 'both';
  accessDuration: number; // seconds

  // Privacy
  anonymized: boolean;
  deidentified: boolean;
  zkProofVerified: boolean;

  // Sales
  totalSales: number;
  totalRevenue: bigint;
  activeLicenses: number;
}

// ==================== AI CLINICAL DECISION (OASIS TEE) ====================
export interface ConfidentialAIDiagnosis {
  requestId: string;
  patientDID: string;

  // Input (encrypted in TEE)
  encryptedSymptoms: string;
  encryptedVitals: string;
  encryptedLabResults: string;

  // AI Model
  modelVersion: string;
  modelType: 'sepsis-prediction' | 'diagnosis-assistant' | 'drug-interaction';

  // Output (only results exposed)
  riskScore: number; // 0-100
  recommendations: string[];
  confidence: number;

  // Blockchain
  oasisTxHash: string;
  computedAt: number;
  teeAttestationProof: string; // Proves computation in TEE
}

// ==================== CROSS-CHAIN BRIDGE ====================
export interface CrossChainMessage {
  messageId: string;
  sourceChain: 'oasis' | 'avalanche';
  destinationChain: 'oasis' | 'avalanche';
  messageType: 'consent-update' | 'claim-settlement' | 'record-request';
  payload: string; // Encoded data

  // LayerZero
  nonce: number;
  gasLimit: bigint;

  // Status
  status: 'pending' | 'relayed' | 'delivered' | 'failed';
  sourceTxHash: string;
  destinationTxHash?: string;
  timestamp: number;
}

// ==================== HIPAA AUDIT LOG ====================
export interface HIPAABlockchainAudit {
  auditId: string;
  action: 'view' | 'create' | 'update' | 'delete' | 'share' | 'export';
  resourceType: 'patient-record' | 'consent' | 'claim';
  resourceId: string;

  // Actor
  actorDID: string;
  actorRole: 'patient' | 'provider' | 'payer' | 'admin' | 'researcher';
  actorIP: string;

  // Context
  purpose: string;
  justification?: string;

  // Blockchain immutability
  blockchainTxHash: string;
  blockNumber: number;
  timestamp: number;

  // HIPAA specific
  phi_accessed: boolean;
  minimum_necessary: boolean;
  patient_consent_verified: boolean;
}

// ==================== WEB3 WALLET INTEGRATION ====================
export interface Web3WalletConnection {
  address: string;
  provider: 'metamask' | 'walletconnect' | 'coinbase-wallet';
  chainId: number;
  network: 'oasis' | 'avalanche';
  connected: boolean;
  balance: bigint;
  nonce: number;
}

// ==================== SMART CONTRACT INTERACTION ====================
export interface ContractCallParams {
  contractAddress: string;
  functionName: string;
  args: any[];
  value?: bigint;
  gasLimit?: bigint;
  signer: string;
}

export interface ContractCallResult {
  txHash: string;
  blockNumber: number;
  gasUsed: bigint;
  status: 'success' | 'failed';
  returnValue?: any;
  events: ContractEvent[];
}

export interface ContractEvent {
  eventName: string;
  args: Record<string, any>;
  blockNumber: number;
  txHash: string;
}

// ==================== ENCRYPTION UTILITIES ====================
export interface EncryptionResult {
  ciphertext: string;
  iv: string;
  authTag: string;
  algorithm: 'AES-256-GCM';
  encryptedAt: number;
}

export interface TEEComputeRequest {
  computeId: string;
  functionName: string;
  encryptedInputs: string[];
  teeNodeUrl: string;
  attestationRequired: boolean;
}

export interface TEEComputeResult {
  computeId: string;
  result: any;
  attestationProof: string; // Proves computation in Intel SGX
  gasUsed: number;
  computeTime: number;
}
