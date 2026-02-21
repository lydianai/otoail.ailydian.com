import { ethers } from "hardhat";

/**
 * MedulaProvizyon Kontratını Avalanche C-Chain'e Dağıt
 *
 * Bu script gerçek zamanlı MEDULA provizyon mutabakatı kontratını
 * 2 saniyelik kesinlik için Avalanche'a dağıtır.
 *
 * Özellikler:
 * - Anında provizyon onayı (<5 saniye)
 * - 1,000 TRY altı otomatik onay
 * - SUT 2025 kod doğrulaması
 * - HEALTH-TR token ödemesi
 * - Oasis'ten çapraz zincir izin doğrulama
 */

async function main() {
  console.log("🏥 Medi TR MEDULA - Avalanche C-Chain'e Dağıtım...\n");

  // Dağıtıcı hesabı al
  const [deployer] = await ethers.getSigners();

  console.log("📝 Dağıtıcı adresi:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Dağıtıcı bakiyesi:", ethers.formatEther(balance), "AVAX\n");

  if (balance === 0n) {
    console.error("❌ Yetersiz bakiye. Testnet AVAX alın:");
    console.error("   https://faucet.avax.network/");
    process.exit(1);
  }

  // ==================== MEDULA PROVIZYON DAĞITIMI ====================

  console.log("💳 MedulaProvizyon dağıtılıyor...");

  // Avalanche Fuji Testnet'te HEALTH-TR token (test için USDC)
  const HEALTH_TR_FUJI = "0x5425890298aed601595a70AB815c96711a31Bc65";

  const MedulaProvizyon = await ethers.getContractFactory("MedulaProvizyon");
  const medulaProvizyon = await MedulaProvizyon.deploy(HEALTH_TR_FUJI);

  await medulaProvizyon.waitForDeployment();
  const medulaProvizyonAddress = await medulaProvizyon.getAddress();

  console.log("✅ MedulaProvizyon dağıtıldı:", medulaProvizyonAddress);
  console.log("   - Ödeme Token'ı: HEALTH-TR (Avalanche)");
  console.log("   - Otomatik Onay Limiti: 1,000 TRY");
  console.log("   - Ödeme Bekleme Süresi: 7 gün");
  console.log("   - Desteklenen: SUT 2025 kodları");
  console.log("   - e-Nabız Entegrasyonu: Aktif\n");

  // ==================== DAĞITIMI DOĞRULA ====================

  console.log("🔍 Kontrat işlevselliği doğrulanıyor...");

  // Test hastanesi kaydet
  const testHastaneAdresi = deployer.address;
  const testHastaneAdi = "İstanbul Devlet Hastanesi Test";
  const testHastaneKodu = "IST-001";

  try {
    const tx = await medulaProvizyon.hastaneKaydet(
      testHastaneAdresi,
      testHastaneAdi,
      testHastaneKodu
    );
    await tx.wait();
    console.log("✅ Test hastanesi başarıyla kaydedildi");

    // Örnek SUT fiyat listesi (SUT 100101 - Poliklinik Muayenesi)
    const sutKodu = "100101";
    const fiyat = 50_00; // 50 TRY (kuruş)
    const tx2 = await medulaProvizyon.sutFiyatBelirle(
      testHastaneAdresi,
      sutKodu,
      fiyat
    );
    await tx2.wait();
    console.log(`✅ SUT fiyat listesi ayarlandı: ${sutKodu} => 50 TRY`);
  } catch (error) {
    console.log("⚠️  Test hastanesi zaten kayıtlı veya kurulum atlandı");
  }

  // ==================== DAĞITIM BİLGİSİNİ KAYDET ====================

  const deploymentInfo = {
    network: "avalanche-fuji",
    chainId: (await deployer.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      MedulaProvizyon: {
        address: medulaProvizyonAddress,
        odemeToken: HEALTH_TR_FUJI,
        ozellikler: [
          "Gerçek zamanlı provizyon onayı (2-san kesinlik)",
          "1,000 TRY altı otomatik onay",
          "SUT 2025 kod doğrulaması",
          "HEALTH-TR token ödemesi",
          "Çapraz zincir izin doğrulama (Oasis)",
          "e-Nabız senkronizasyonu",
          "İtiraz sistemi",
        ],
        gasKullanimi: "TBD",
      },
    },
  };

  console.log("\n📄 Dağıtım Özeti:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🎉 Dağıtım Tamamlandı!");
  console.log("\n📋 Sonraki Adımlar:");
  console.log("1. .env dosyasını kontrat adresiyle güncelleyin:");
  console.log(`   NEXT_PUBLIC_MEDULA_PROVIZYON_ADDRESS=${medulaProvizyonAddress}`);
  console.log("\n2. Kontratı Snowtrace'de doğrulayın:");
  console.log(`   https://testnet.snowtrace.io/address/${medulaProvizyonAddress}`);
  console.log("\n3. SGK için HEALTH-TR token harcama onayı:");
  console.log("   SGK, ödeme için kontrata token harcama onayı vermeli");
  console.log("\n4. Hastaneleri ve SGK'yı kaydedin:");
  console.log("   grantRole(HASTANE_ROLE, address) ve hastaneKaydet() kullanın");
  console.log("\n5. Hazır olduğunda mainnet'e dağıtın:");
  console.log("   npx hardhat run scripts/deploy-avalanche.ts --network avalanche-mainnet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Dağıtım başarısız:");
    console.error(error);
    process.exit(1);
  });
