import { ethers } from "hardhat";

/**
 * Deploy InsuranceClaims Contract to Avalanche C-Chain
 *
 * This script deploys the real-time insurance claims settlement contract
 * to Avalanche for 2-second finality payments.
 *
 * Features:
 * - Instant claim adjudication (<5 seconds)
 * - Auto-approval for claims under $5,000
 * - ICD-10 & CPT code validation
 * - USDC settlement (stablecoin)
 * - Cross-chain consent verification from Oasis
 */

async function main() {
  console.log("🏥 Deploying Median EN Insurance to Avalanche C-Chain...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();

  console.log("📝 Deployer address:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Deployer balance:", ethers.formatEther(balance), "AVAX\n");

  if (balance === 0n) {
    console.error("❌ Insufficient balance. Get testnet AVAX from:");
    console.error("   https://faucet.avax.network/");
    process.exit(1);
  }

  // ==================== DEPLOY INSURANCE CLAIMS ====================

  console.log("💳 Deploying InsuranceClaims...");

  // USDC on Avalanche Fuji Testnet
  const USDC_FUJI = "0x5425890298aed601595a70AB815c96711a31Bc65";

  const InsuranceClaims = await ethers.getContractFactory("InsuranceClaims");
  const insuranceClaims = await InsuranceClaims.deploy(USDC_FUJI);

  await insuranceClaims.waitForDeployment();
  const insuranceClaimsAddress = await insuranceClaims.getAddress();

  console.log("✅ InsuranceClaims deployed to:", insuranceClaimsAddress);
  console.log("   - Settlement Token: USDC (Avalanche)");
  console.log("   - Auto-Approval Threshold: $5,000");
  console.log("   - Payment Hold Period: 3 days");
  console.log("   - Supported Codes: ICD-10, CPT\n");

  // ==================== VERIFY DEPLOYMENT ====================

  console.log("🔍 Verifying contract functionality...");

  // Register test payer
  const testPayerAddress = deployer.address;
  const testPayerName = "Blue Cross Blue Shield Test";

  try {
    const tx = await insuranceClaims.registerPayer(
      testPayerAddress,
      testPayerName
    );
    await tx.wait();
    console.log("✅ Test payer registered successfully");

    // Set sample fee schedule (CPT 99213 - Office Visit)
    const cptCode = "99213";
    const allowedAmount = ethers.parseUnits("150", 6); // $150 USDC
    const tx2 = await insuranceClaims.setFeeSchedule(cptCode, allowedAmount);
    await tx2.wait();
    console.log(`✅ Fee schedule set: ${cptCode} => $150`);
  } catch (error) {
    console.log("⚠️  Test payer already registered or setup skipped");
  }

  // ==================== SAVE DEPLOYMENT INFO ====================

  const deploymentInfo = {
    network: "avalanche-fuji",
    chainId: (await deployer.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      InsuranceClaims: {
        address: insuranceClaimsAddress,
        settlementToken: USDC_FUJI,
        features: [
          "Real-time claim adjudication (2-sec finality)",
          "Auto-approval for claims under $5,000",
          "ICD-10 & CPT code validation",
          "USDC stablecoin settlement",
          "Cross-chain consent verification (Oasis)",
          "Appeal system for denied claims",
        ],
        gasUsed: "TBD",
      },
    },
  };

  console.log("\n📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🎉 Deployment Complete!");
  console.log("\n📋 Next Steps:");
  console.log("1. Update .env with contract address:");
  console.log(`   NEXT_PUBLIC_INSURANCE_CLAIMS_ADDRESS=${insuranceClaimsAddress}`);
  console.log("\n2. Verify contract on Snowtrace:");
  console.log(`   https://testnet.snowtrace.io/address/${insuranceClaimsAddress}`);
  console.log("\n3. Approve USDC spending for payers:");
  console.log("   Payers must approve contract to spend USDC for settlements");
  console.log("\n4. Register providers and payers:");
  console.log("   Use grantRole(PROVIDER_ROLE, address) and registerPayer()");
  console.log("\n5. Deploy to mainnet when ready:");
  console.log("   npx hardhat run scripts/deploy-avalanche.ts --network avalanche-mainnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
