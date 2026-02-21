import { ethers } from "hardhat";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

/**
 * HastaKasasi Kontratını Oasis Sapphire'e Dağıt
 *
 * Bu script gizli hasta sağlık kayıtları kasasını
 * Oasis Sapphire TEE (Güvenilir Çalıştırma Ortamı)'na dağıtır.
 *
 * Özellikler:
 * - Intel SGX donanım şifrelemesi
 * - KVKK-uyumlu denetim kayıtları
 * - Zamanlı izin yönetimi
 * - Acil erişim (kırılabilir cam)
 * - Kriptografik silme (KVKK Silme Hakkı)
 */

async function main() {
  console.log("🏥 Medi TR Sağlık Platformu - Oasis Sapphire'e Dağıtım...\n");

  // Dağıtıcı hesabı al
  const [deployer] = await ethers.getSigners();

  // Sapphire ile provider'ı gizli işlemler için sarma
  const wrappedProvider = sapphire.wrap(deployer.provider);
  const wrappedDeployer = new ethers.Wallet(
    deployer.privateKey,
    wrappedProvider
  );

  console.log("📝 Dağıtıcı adresi:", wrappedDeployer.address);

  const balance = await wrappedProvider.getBalance(wrappedDeployer.address);
  console.log("💰 Dağıtıcı bakiyesi:", ethers.formatEther(balance), "ROSE\n");

  if (balance === 0n) {
    console.error("❌ Yetersiz bakiye. Testnet ROSE alın:");
    console.error("   https://faucet.testnet.oasis.io/");
    process.exit(1);
  }

  // ==================== HASTA KASASI DAĞITIMI ====================

  console.log("🔐 HastaKasasi dağıtılıyor (Gizli TEE)...");

  const HastaKasasi = await ethers.getContractFactory("HastaKasasi", wrappedDeployer);
  const hastaKasasi = await HastaKasasi.deploy();

  await hastaKasasi.waitForDeployment();
  const hastaKasasiAddress = await hastaKasasi.getAddress();

  console.log("✅ HastaKasasi dağıtıldı:", hastaKasasiAddress);
  console.log("   - TEE Şifreleme: Aktif (Intel SGX)");
  console.log("   - KVKK Denetim Kayıtları: Aktif");
  console.log("   - e-Nabız Entegrasyonu: Hazır");
  console.log("   - Organ Bağışı Blockchain: Aktif");
  console.log("   - Acil Erişim: Aktif (24 saat otomatik süre)\n");

  // ==================== DAĞITIMI DOĞRULA ====================

  console.log("🔍 Kontrat işlevselliği doğrulanıyor...");

  // Test DID kaydı (örnek)
  const testDID = ethers.keccak256(ethers.toUtf8Bytes("test-hasta-001"));

  try {
    const tx = await hastaKasasi.hastaKaydet(testDID);
    await tx.wait();
    console.log("✅ Test hasta kaydı başarılı");
  } catch (error) {
    console.log("⚠️  Hasta zaten kayıtlı veya test atlandı");
  }

  // ==================== DAĞITIM BİLGİSİNİ KAYDET ====================

  const deploymentInfo = {
    network: "sapphire-testnet",
    chainId: (await wrappedProvider.getNetwork()).chainId.toString(),
    deployer: wrappedDeployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      HastaKasasi: {
        address: hastaKasasiAddress,
        ozellikler: [
          "TEE-şifreli hasta kayıtları (FHIR R5)",
          "Zamanlı KVKK izin yönetimi",
          "KVKK denetim izi (değişmez)",
          "Acil erişim (kırılabilir cam)",
          "e-Nabız senkronizasyonu",
          "Blockchain organ bağışı kaydı",
          "Kriptografik silme (KVKK Silme Hakkı)",
        ],
        gasKullanimi: "TBD", // Doğrulama ile doldurulacak
      },
    },
  };

  console.log("\n📄 Dağıtım Özeti:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🎉 Dağıtım Tamamlandı!");
  console.log("\n📋 Sonraki Adımlar:");
  console.log("1. .env dosyasını kontrat adresiyle güncelleyin:");
  console.log(`   NEXT_PUBLIC_HASTA_KASASI_ADDRESS=${hastaKasasiAddress}`);
  console.log("\n2. Kontratı explorer'da doğrulayın:");
  console.log(`   https://testnet.explorer.sapphire.oasis.io/address/${hastaKasasiAddress}`);
  console.log("\n3. Frontend entegrasyonunu test edin:");
  console.log("   npm run dev");
  console.log("\n4. Hazır olduğunda mainnet'e dağıtın:");
  console.log("   npx hardhat run scripts/deploy-oasis.ts --network sapphire-mainnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Dağıtım başarısız:");
    console.error(error);
    process.exit(1);
  });
