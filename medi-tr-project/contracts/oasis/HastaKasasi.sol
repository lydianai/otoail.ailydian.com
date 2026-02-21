// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Gizli Hasta Kasası (Confidential Patient Vault)
 * @notice Oasis Sapphire TEE-şifreli hasta sağlık kayıtları
 * @dev Tüm veri Intel SGX donanımında şifreli, KVKK uyumlu
 * @custom:security-contact guvenlik@median.ailydian.com
 */

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract HastaKasasi {
    // ==================== DURUM DEĞİŞKENLERİ ====================

    struct SaglikKaydi {
        bytes32 hastaDID;          // Merkeziyetsiz Kimlik
        bytes sifreliVeri;         // AES-256-GCM şifreli
        bytes32 kayitHash;         // SHA-256 hash (bütünlük)
        uint256 timestamp;
        address saglikKurumu;      // Hastane/Doktor adresi
        string ipfsHash;           // Büyük dosyalar için IPFS
        KayitTipi kayitTipi;
        bool aktif;
    }

    struct KVKKOnay {
        bytes32 hastaDID;
        address onaylanan;         // Erişim verilen kurum
        uint256 baslangicTarihi;
        uint256 bitisTarihi;
        bool iptalEdildi;
        OnayAmaci amac;
        bytes32[] izinVerilenKayitlar;
    }

    enum KayitTipi {
        MUAYENE,
        TAHLIL,
        ILAC,
        AMELIYAT,
        TANI,
        GORUNTULEME,
        LABORATUVAR
    }

    enum OnayAmaci {
        TEDAVI,
        ARASTIRMA,
        SIGORTA,
        ACIL,
        HASTA_ERISIMI,
        ENABIZ_PAYLASIMI
    }

    // ==================== DEPOLAMA ====================

    // Hasta DID => Kayıt ID => SağlıkKaydı
    mapping(bytes32 => mapping(bytes32 => SaglikKaydi)) private hastaKayitlari;

    // Hasta DID => Kayıt ID dizisi
    mapping(bytes32 => bytes32[]) private hastaKayitIdleri;

    // Hasta DID => Kurum => KVKK Onayı
    mapping(bytes32 => mapping(address => KVKKOnay)) private kvkkOnaylari;

    // Hasta DID => Yetkili kurum adresleri
    mapping(bytes32 => address[]) private yetkiliKurumlar;

    // Erişim kontrolü
    mapping(bytes32 => address) public hastaCuzdanlari; // DID => Cüzdan
    mapping(address => bytes32) public cuzdanDIDleri;   // Cüzdan => DID

    // KVKK denetim kayıtları (değişmez)
    struct DenetimKaydi {
        bytes32 aktorDID;
        bytes32 hastaDID;
        bytes32 kayitId;
        string islem;
        uint256 timestamp;
        string ipAdresi;
        bool kisiselVeriErisildi;
    }

    DenetimKaydi[] private denetimKayitlari;

    // e-Nabız entegrasyonu
    mapping(bytes32 => string) private enabizReferanslar; // Kayıt ID => e-Nabız ref

    // Organ bağışı kayıtları
    struct OrganBagisi {
        bytes32 bagisciDID;
        bytes32 sifreliTCKimlik; // Şifreli TC Kimlik
        string[] organlar;
        bool bagisOnayı;
        bool aileOnayı;
        uint256 kayitTarihi;
        uint256 guncellemeTarihi;
        bool aktif;
    }

    mapping(bytes32 => OrganBagisi) private organBagislari;

    // ==================== OLAYLAR ====================

    event KayitSaklandi(
        bytes32 indexed hastaDID,
        bytes32 indexed kayitId,
        KayitTipi kayitTipi,
        uint256 timestamp
    );

    event KVKKOnayiVerildi(
        bytes32 indexed hastaDID,
        address indexed onaylanan,
        OnayAmaci amac,
        uint256 bitisTarihi
    );

    event KVKKOnayiIptalEdildi(
        bytes32 indexed hastaDID,
        address indexed onaylanan,
        uint256 timestamp
    );

    event KayitErisildi(
        bytes32 indexed hastaDID,
        bytes32 indexed kayitId,
        address indexed erisimSaglayan,
        uint256 timestamp
    );

    event DenetimKaydiOlusturuldu(
        bytes32 indexed hastaDID,
        string islem,
        uint256 timestamp
    );

    event EnabizSenkronize(
        bytes32 indexed kayitId,
        string enabizReferansNo,
        uint256 timestamp
    );

    event OrganBagisiKayitEdildi(
        bytes32 indexed bagisciDID,
        uint256 organSayisi,
        uint256 timestamp
    );

    // ==================== DEĞİŞTİRİCİLER ====================

    modifier sadecehasta(bytes32 _hastaDID) {
        require(
            cuzdanDIDleri[msg.sender] == _hastaDID,
            "Sadece hasta bu islemi yapabilir"
        );
        _;
    }

    modifier sadeceyetkili(bytes32 _hastaDID) {
        require(
            cuzdanDIDleri[msg.sender] == _hastaDID ||
            gecerliOnayVarMi(_hastaDID, msg.sender),
            "Yetkisiz erisim"
        );
        _;
    }

    // ==================== HASTA KAYDOLMA ====================

    /**
     * @notice Hasta DID'ini cüzdan adresiyle kaydet
     * @param _hastaDID Merkeziyetsiz Kimlik
     */
    function hastaKaydol(bytes32 _hastaDID) external {
        require(hastaCuzdanlari[_hastaDID] == address(0), "DID zaten kayitli");
        require(cuzdanDIDleri[msg.sender] == bytes32(0), "Cuzdan zaten kayitli");

        hastaCuzdanlari[_hastaDID] = msg.sender;
        cuzdanDIDleri[msg.sender] = _hastaDID;

        _denetimKaydiOlustur(_hastaDID, _hastaDID, bytes32(0), "HASTA_KAYDOL", false);
    }

    // ==================== KAYIT YÖNETİMİ ====================

    /**
     * @notice TEE'de şifreli kayıt sakla
     * @dev Veri Intel SGX'te şifreli, hiçbir validator göremez
     * @param _hastaDID Hasta kimliği
     * @param _kayitId Benzersiz kayıt kimliği
     * @param _sifreliVeri Şifreli veri
     * @param _kayitTipi Tıbbi kayıt tipi
     * @param _ipfsHash İsteğe bağlı IPFS hash
     */
    function kayitSakla(
        bytes32 _hastaDID,
        bytes32 _kayitId,
        bytes calldata _sifreliVeri,
        KayitTipi _kayitTipi,
        string calldata _ipfsHash
    ) external sadeceyetkili(_hastaDID) {
        require(_sifreliVeri.length > 0, "Bos kayit kabul edilmez");
        require(!hastaKayitlari[_hastaDID][_kayitId].aktif, "Kayit zaten mevcut");

        // Bütünlük için hash hesapla
        bytes32 kayitHash = keccak256(_sifreliVeri);

        // TEE'de sakla (şifreli, validator'lar göremez)
        hastaKayitlari[_hastaDID][_kayitId] = SaglikKaydi({
            hastaDID: _hastaDID,
            sifreliVeri: _sifreliVeri,
            kayitHash: kayitHash,
            timestamp: block.timestamp,
            saglikKurumu: msg.sender,
            ipfsHash: _ipfsHash,
            kayitTipi: _kayitTipi,
            aktif: true
        });

        // Kayıt ID'sini takip et
        hastaKayitIdleri[_hastaDID].push(_kayitId);

        emit KayitSaklandi(_hastaDID, _kayitId, _kayitTipi, block.timestamp);
        _denetimKaydiOlustur(_hastaDID, cuzdanDIDleri[msg.sender], _kayitId, "KAYIT_SAKLA", true);
    }

    /**
     * @notice Şifreli kaydı getir (sadece yetkili ise)
     * @param _hastaDID Hasta kimliği
     * @param _kayitId Kayıt kimliği
     * @return Şifreli veri
     */
    function kayitGetir(
        bytes32 _hastaDID,
        bytes32 _kayitId
    ) external sadeceyetkili(_hastaDID) returns (bytes memory) {
        SaglikKaydi storage kayit = hastaKayitlari[_hastaDID][_kayitId];
        require(kayit.aktif, "Kayit bulunamadi veya silindi");

        emit KayitErisildi(_hastaDID, _kayitId, msg.sender, block.timestamp);
        _denetimKaydiOlustur(_hastaDID, cuzdanDIDleri[msg.sender], _kayitId, "KAYIT_ERISIM", true);

        return kayit.sifreliVeri;
    }

    /**
     * @notice Hasta için tüm kayıt ID'lerini getir
     * @param _hastaDID Hasta kimliği
     * @return Kayıt ID dizisi
     */
    function hastaKayitIdleriniGetir(bytes32 _hastaDID)
        external
        view
        sadeceyetkili(_hastaDID)
        returns (bytes32[] memory)
    {
        return hastaKayitIdleri[_hastaDID];
    }

    // ==================== KVKK ONAY YÖNETİMİ ====================

    /**
     * @notice Süreli erişim izni ver (KVKK açık rıza)
     * @param _hastaDID Hasta kimliği
     * @param _kurum Kurum adresi
     * @param _amac Erişim amacı
     * @param _sureSaniye İzin süresi (saniye)
     * @param _izinVerilenKayitlar Belirli kayıtlar (boş ise hepsi)
     */
    function kvkkOnayVer(
        bytes32 _hastaDID,
        address _kurum,
        OnayAmaci _amac,
        uint256 _sureSaniye,
        bytes32[] calldata _izinVerilenKayitlar
    ) external sadecehasta(_hastaDID) {
        require(_kurum != address(0), "Gecersiz kurum adresi");
        require(_sureSaniye > 0, "Sure pozitif olmali");

        uint256 bitisTarihi = block.timestamp + _sureSaniye;

        kvkkOnaylari[_hastaDID][_kurum] = KVKKOnay({
            hastaDID: _hastaDID,
            onaylanan: _kurum,
            baslangicTarihi: block.timestamp,
            bitisTarihi: bitisTarihi,
            iptalEdildi: false,
            amac: _amac,
            izinVerilenKayitlar: _izinVerilenKayitlar
        });

        // Yetkili kurum olarak ekle
        if (!_kurumYetkiliMi(_hastaDID, _kurum)) {
            yetkiliKurumlar[_hastaDID].push(_kurum);
        }

        emit KVKKOnayiVerildi(_hastaDID, _kurum, _amac, bitisTarihi);
        _denetimKaydiOlustur(_hastaDID, _hastaDID, bytes32(0), "KVKK_ONAY_VER", false);
    }

    /**
     * @notice Kurum erişimini iptal et (KVKK silme hakkı)
     * @param _hastaDID Hasta kimliği
     * @param _kurum Kurum adresi
     */
    function kvkkOnayIptalEt(bytes32 _hastaDID, address _kurum)
        external
        sadecehasta(_hastaDID)
    {
        KVKKOnay storage onay = kvkkOnaylari[_hastaDID][_kurum];
        require(!onay.iptalEdildi, "Onay zaten iptal edilmis");

        onay.iptalEdildi = true;
        onay.bitisTarihi = block.timestamp;

        emit KVKKOnayiIptalEdildi(_hastaDID, _kurum, block.timestamp);
        _denetimKaydiOlustur(_hastaDID, _hastaDID, bytes32(0), "KVKK_ONAY_IPTAL", false);
    }

    /**
     * @notice Kurumun geçerli onayı var mı kontrol et
     * @param _hastaDID Hasta kimliği
     * @param _kurum Kurum adresi
     * @return bool Onay geçerliyse true
     */
    function gecerliOnayVarMi(bytes32 _hastaDID, address _kurum)
        public
        view
        returns (bool)
    {
        KVKKOnay storage onay = kvkkOnaylari[_hastaDID][_kurum];

        return (
            !onay.iptalEdildi &&
            block.timestamp >= onay.baslangicTarihi &&
            block.timestamp <= onay.bitisTarihi
        );
    }

    // ==================== E-NABIZ ENTEGRASYONU ====================

    /**
     * @notice e-Nabız ile kayıt senkronize et
     * @param _kayitId Kayıt kimliği
     * @param _enabizReferansNo e-Nabız referans numarası
     */
    function enabizSenkronize(bytes32 _kayitId, string calldata _enabizReferansNo)
        external
    {
        require(bytes(_enabizReferansNo).length > 0, "Gecersiz referans no");

        enabizReferanslar[_kayitId] = _enabizReferansNo;

        emit EnabizSenkronize(_kayitId, _enabizReferansNo, block.timestamp);
    }

    /**
     * @notice Kayıt için e-Nabız referansını getir
     * @param _kayitId Kayıt kimliği
     * @return e-Nabız referans numarası
     */
    function enabizReferansGetir(bytes32 _kayitId)
        external
        view
        returns (string memory)
    {
        return enabizReferanslar[_kayitId];
    }

    // ==================== ORGAN BAĞIŞI BLOCKCHAIN ====================

    /**
     * @notice Organ bağışı kaydı oluştur
     * @param _bagisciDID Bağışçı DID
     * @param _sifreliTCKimlik Şifreli TC Kimlik No
     * @param _organlar Bağışlanan organlar dizisi
     * @param _aileOnayı Aile onayı var mı
     */
    function organBagisiKaydet(
        bytes32 _bagisciDID,
        bytes32 _sifreliTCKimlik,
        string[] calldata _organlar,
        bool _aileOnayı
    ) external sadecehasta(_bagisciDID) {
        require(_organlar.length > 0, "En az bir organ secilmeli");

        organBagislari[_bagisciDID] = OrganBagisi({
            bagisciDID: _bagisciDID,
            sifreliTCKimlik: _sifreliTCKimlik,
            organlar: _organlar,
            bagisOnayı: true,
            aileOnayı: _aileOnayı,
            kayitTarihi: block.timestamp,
            guncellemeTarihi: block.timestamp,
            aktif: true
        });

        emit OrganBagisiKayitEdildi(_bagisciDID, _organlar.length, block.timestamp);
        _denetimKaydiOlustur(_bagisciDID, _bagisciDID, bytes32(0), "ORGAN_BAGISI_KAYIT", false);
    }

    /**
     * @notice Organ bağışını iptal et
     * @param _bagisciDID Bağışçı DID
     */
    function organBagisiIptalEt(bytes32 _bagisciDID)
        external
        sadecehasta(_bagisciDID)
    {
        OrganBagisi storage bagis = organBagislari[_bagisciDID];
        require(bagis.aktif, "Bagis zaten iptal edilmis");

        bagis.aktif = false;
        bagis.guncellemeTarihi = block.timestamp;

        _denetimKaydiOlustur(_bagisciDID, _bagisciDID, bytes32(0), "ORGAN_BAGISI_IPTAL", false);
    }

    /**
     * @notice Organ bağışı durumunu getir
     * @param _bagisciDID Bağışçı DID
     */
    function organBagisiGetir(bytes32 _bagisciDID)
        external
        view
        returns (
            string[] memory organlar,
            bool bagisOnayı,
            bool aileOnayı,
            uint256 kayitTarihi,
            bool aktif
        )
    {
        OrganBagisi storage bagis = organBagislari[_bagisciDID];
        return (
            bagis.organlar,
            bagis.bagisOnayı,
            bagis.aileOnayı,
            bagis.kayitTarihi,
            bagis.aktif
        );
    }

    // ==================== KRİPTOGRAFİK SİLME (KVKK UNUTULMA HAKKI) ====================

    /**
     * @notice Kaydı sil (KVKK unutulma hakkı)
     * @dev Blockchain verisini silmez, pasif işaretler
     * @param _hastaDID Hasta kimliği
     * @param _kayitId Kayıt kimliği
     */
    function kayitSil(bytes32 _hastaDID, bytes32 _kayitId)
        external
        sadecehasta(_hastaDID)
    {
        SaglikKaydi storage kayit = hastaKayitlari[_hastaDID][_kayitId];
        require(kayit.aktif, "Kayit zaten silinmis");

        // Pasif işaretle (anahtar silme ile kriptografik silme)
        kayit.aktif = false;

        _denetimKaydiOlustur(_hastaDID, _hastaDID, _kayitId, "KAYIT_SIL", true);
    }

    // ==================== KVKK DENETİM İZİ ====================

    /**
     * @notice Değişmez denetim kaydı oluştur
     * @dev Uyumluluk için dahili fonksiyon
     */
    function _denetimKaydiOlustur(
        bytes32 _hastaDID,
        bytes32 _aktorDID,
        bytes32 _kayitId,
        string memory _islem,
        bool _kisiselVeriErisildi
    ) private {
        denetimKayitlari.push(DenetimKaydi({
            aktorDID: _aktorDID,
            hastaDID: _hastaDID,
            kayitId: _kayitId,
            islem: _islem,
            timestamp: block.timestamp,
            ipAdresi: "", // Gizlilik için off-chain set edilecek
            kisiselVeriErisildi: _kisiselVeriErisildi
        }));

        emit DenetimKaydiOlusturuldu(_hastaDID, _islem, block.timestamp);
    }

    /**
     * @notice Hasta için denetim kayıtlarını getir
     * @param _hastaDID Hasta kimliği
     * @param _baslangicIndeks Başlangıç indeksi
     * @param _limit Döndürülecek kayıt sayısı
     * @return Denetim kayıtları dizisi
     */
    function denetimKayitlariGetir(
        bytes32 _hastaDID,
        uint256 _baslangicIndeks,
        uint256 _limit
    ) external view sadeceyetkili(_hastaDID) returns (DenetimKaydi[] memory) {
        uint256 toplam = denetimKayitlari.length;
        uint256 bitis = _baslangicIndeks + _limit > toplam ? toplam : _baslangicIndeks + _limit;
        uint256 sonucSayisi = bitis - _baslangicIndeks;

        DenetimKaydi[] memory sonuc = new DenetimKaydi[](sonucSayisi);
        uint256 j = 0;

        for (uint256 i = _baslangicIndeks; i < bitis; i++) {
            if (denetimKayitlari[i].hastaDID == _hastaDID) {
                sonuc[j] = denetimKayitlari[i];
                j++;
            }
        }

        return sonuc;
    }

    // ==================== YARDIMCI FONKSİYONLAR ====================

    function _kurumYetkiliMi(bytes32 _hastaDID, address _kurum)
        private
        view
        returns (bool)
    {
        address[] memory kurumlar = yetkiliKurumlar[_hastaDID];
        for (uint256 i = 0; i < kurumlar.length; i++) {
            if (kurumlar[i] == _kurum) {
                return true;
            }
        }
        return false;
    }

    // ==================== ACİL DURUM ERİŞİMİ ====================

    event AcilDurumErisimi(
        bytes32 indexed hastaDID,
        address indexed acilKurum,
        string neden,
        uint256 timestamp
    );

    /**
     * @notice Hayati tehlike için acil erişim
     * @dev Otomatik 24-saat erişim verir, denetlenir
     * @param _hastaDID Hasta kimliği
     * @param _neden Acil durum nedeni
     */
    function acilDurumErisimIste(bytes32 _hastaDID, string calldata _neden)
        external
    {
        // 24-saatlik acil onay ver
        kvkkOnaylari[_hastaDID][msg.sender] = KVKKOnay({
            hastaDID: _hastaDID,
            onaylanan: msg.sender,
            baslangicTarihi: block.timestamp,
            bitisTarihi: block.timestamp + 24 hours,
            iptalEdildi: false,
            amac: OnayAmaci.ACIL,
            izinVerilenKayitlar: new bytes32[](0) // Tüm kayıtlar
        });

        emit AcilDurumErisimi(_hastaDID, msg.sender, _neden, block.timestamp);
        _denetimKaydiOlustur(_hastaDID, bytes32(uint256(uint160(msg.sender))), bytes32(0), "ACIL_DURUM_ERISIM", true);
    }
}
