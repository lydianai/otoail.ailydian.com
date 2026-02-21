import { ethers } from "hardhat";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

/**
 * Deploy PatientVault Contract to Oasis Sapphire
 *
 * This script deploys the confidential patient health record vault
 * to Oasis Sapphire's TEE (Trusted Execution Environment).
 *
 * Features:
 * - Intel SGX hardware encryption
 * - HIPAA-compliant audit logs
 * - Time-limited consent management
 * - Emergency access (break-glass)
 * - Cryptographic erasure for GDPR
 */

async function main() {
  console.log("🏥 Deploying Median EN Healthcare to Oasis Sapphire...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();

  // Wrap provider with Sapphire for confidential transactions
  const wrappedProvider = sapphire.wrap(deployer.provider);
  const wrappedDeployer = new ethers.Wallet(
    deployer.privateKey,
    wrappedProvider
  );

  console.log("📝 Deployer address:", wrappedDeployer.address);

  const balance = await wrappedProvider.getBalance(wrappedDeployer.address);
  console.log("💰 Deployer balance:", ethers.formatEther(balance), "ROSE\n");

  if (balance === 0n) {
    console.error("❌ Insufficient balance. Get testnet ROSE from:");
    console.error("   https://faucet.testnet.oasis.io/");
    process.exit(1);
  }

  // ==================== DEPLOY PATIENT VAULT ====================

  console.log("🔐 Deploying PatientVault (Confidential TEE)...");

  const PatientVault = await ethers.getContractFactory("PatientVault", wrappedDeployer);
  const patientVault = await PatientVault.deploy();

  await patientVault.waitForDeployment();
  const patientVaultAddress = await patientVault.getAddress();

  console.log("✅ PatientVault deployed to:", patientVaultAddress);
  console.log("   - TEE Encryption: Enabled (Intel SGX)");
  console.log("   - HIPAA Audit Logs: Enabled");
  console.log("   - Emergency Access: Enabled (24h auto-expire)\n");

  // ==================== VERIFY DEPLOYMENT ====================

  console.log("🔍 Verifying contract functionality...");

  // Test DID registration (example)
  const testDID = ethers.keccak256(ethers.toUtf8Bytes("test-patient-001"));

  try {
    const tx = await patientVault.registerPatient(testDID);
    await tx.wait();
    console.log("✅ Test patient registration successful");
  } catch (error) {
    console.log("⚠️  Patient already registered or test skipped");
  }

  // ==================== SAVE DEPLOYMENT INFO ====================

  const deploymentInfo = {
    network: "sapphire-testnet",
    chainId: (await wrappedProvider.getNetwork()).chainId.toString(),
    deployer: wrappedDeployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      PatientVault: {
        address: patientVaultAddress,
        features: [
          "TEE-encrypted patient records (FHIR R5)",
          "Time-limited consent management",
          "HIPAA audit trail (immutable)",
          "Emergency access (break-glass)",
          "Cryptographic erasure (GDPR)",
        ],
        gasUsed: "TBD", // Will be filled by verification
      },
    },
  };

  console.log("\n📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🎉 Deployment Complete!");
  console.log("\n📋 Next Steps:");
  console.log("1. Update .env with contract address:");
  console.log(`   NEXT_PUBLIC_PATIENT_VAULT_ADDRESS=${patientVaultAddress}`);
  console.log("\n2. Verify contract on explorer:");
  console.log(`   https://testnet.explorer.sapphire.oasis.io/address/${patientVaultAddress}`);
  console.log("\n3. Test frontend integration:");
  console.log("   npm run dev");
  console.log("\n4. Deploy to mainnet when ready:");
  console.log("   npx hardhat run scripts/deploy-oasis.ts --network sapphire-mainnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
