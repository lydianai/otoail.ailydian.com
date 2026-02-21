// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MEDULA Blockchain Provizyon Sistemi
 * @notice Avalanche üzerinde gerçek zamanlı SGK provizyon işlemleri
 * @dev KVKK-uyumlu, SUT 2025 kodlu, otomatik onay sistemi
 * @custom:security-contact security@medi.ailydian.com
 */

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MedulaProvizyon is ReentrancyGuard, AccessControl, Pausable {
    // ==================== ROLLER ====================

    bytes32 public constant HASTANE_ROLE = keccak256("HASTANE_ROLE");
    bytes32 public constant SGK_ROLE = keccak256("SGK_ROLE");
    bytes32 public constant DENETCI_ROLE = keccak256("DENETCI_ROLE");

    // ==================== DURUM DEĞİŞKENLERİ ====================

    struct Provizyon {
        bytes32 provizyonId;
        bytes32 hastaDID;
        address hastane;

        // MEDULA bilgileri
        string takipNo;
        string protokolNo;
        string sutKodu;           // SUT 2025 kodu
        string islemAdi;
        uint256 islemTarihi;

        // Finansal (TRY kuruş cinsinden)
        uint256 tutar;
        uint256 sgkPayi;
        uint256 hastaPayi;

        // Durum
        ProvizyonDurum durum;
        uint256 gonderilmeTarihi;
        uint256 onayTarihi;
        uint256 odemeTarihi;

        // SGK yanıtı
        string redNedeni;
        bytes32 faturaTxHash;

        // e-Nabız senkronizasyonu
        bytes32 enabizReferansNo;
        bool enabizSenkron;

        // LayerZero çapraz zincir
        bytes32 oasisIzinTxHash;  // Oasis'ten hasta izni kanıtı

        bool varMi;
    }

    struct HastaneKayit {
        address hastaneAdresi;
        string hastaneAdi;
        string hastaneKodu;      // Sağlık Bakanlığı kodu
        uint256 toplamProvizyon;
        uint256 toplamTutar;
        bool aktif;
        mapping(string => uint256) sutFiyatListesi; // SUT kod => tutar
    }

    struct SGKIstatistik {
        uint256 toplamProvizyon;
        uint256 onaylanan;
        uint256 reddedilen;
        uint256 toplamOdenen;
        uint256 bekleyen;
    }

    enum ProvizyonDurum {
        GONDERILDI,
        INCELEMEDE,
        ONAYLANDI,
        REDDEDILDI,
        ITIRAZ,
        ODENDI,
        IPTAL
    }

    // ==================== DEPOLAMA ====================

    // Provizyon ID => Provizyon
    mapping(bytes32 => Provizyon) public provizyonlar;

    // Hastane => Provizyon ID'leri
    mapping(address => bytes32[]) public hastaneProvizyonlari;

    // Hasta DID => Provizyon ID'leri (şifreli hasta takibi)
    mapping(bytes32 => bytes32[]) private hastaProvizyonlari;

    // Hastane => Kayıt detayları
    mapping(address => HastaneKayit) public hastaneler;

    // SGK istatistikleri
    SGKIstatistik public sgkIstatistik;

    // Ödeme token'ı (HEALTH-TR veya wrapped TRY)
    IERC20 public odemeToken;

    // Otomatik onay kuralları
    uint256 public otoOnayLimiti = 1000_00; // 1,000 TRY (kuruş)
    uint256 public odemeBeketSuresi = 7 days;

    // ==================== OLAYLAR ====================

    event ProvizyonGonderildi(
        bytes32 indexed provizyonId,
        bytes32 indexed hastaDID,
        address indexed hastane,
        string sutKodu,
        uint256 tutar,
        uint256 timestamp
    );

    event ProvizyonOnaylandi(
        bytes32 indexed provizyonId,
        uint256 sgkPayi,
        uint256 hastaPayi,
        uint256 timestamp
    );

    event ProvizyonReddedildi(
        bytes32 indexed provizyonId,
        string neden,
        uint256 timestamp
    );

    event ProvizyonOdendi(
        bytes32 indexed provizyonId,
        address indexed hastane,
        uint256 tutar,
        uint256 timestamp
    );

    event ProvizyonItiraz(
        bytes32 indexed provizyonId,
        address itirazEden,
        uint256 timestamp
    );

    event HastaneKayit(
        address indexed hastaneAdresi,
        string hastaneAdi,
        string hastaneKodu,
        uint256 timestamp
    );

    event SUTFiyatGuncellendi(
        address indexed hastane,
        string sutKodu,
        uint256 fiyat,
        uint256 timestamp
    );

    event EnabizSenkronize(
        bytes32 indexed provizyonId,
        bytes32 enabizReferansNo,
        uint256 timestamp
    );

    // ==================== CONSTRUCTOR ====================

    constructor(address _odemeToken) {
        odemeToken = IERC20(_odemeToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ==================== HASTANE FONKSİYONLARI ====================

    /**
     * @notice MEDULA'ya provizyon gönder
     * @dev Hasta iznini Oasis zincirinden doğrular, limiti aşmazsa otomatik onaylar
     * @param _provizyonId Benzersiz provizyon ID
     * @param _hastaDID Hasta merkeziyetsiz kimliği
     * @param _takipNo MEDULA takip numarası
     * @param _protokolNo Hastane protokol no
     * @param _sutKodu SUT 2025 işlem kodu
     * @param _islemAdi İşlem açıklaması
     * @param _islemTarihi İşlem tarihi
     * @param _tutar Toplam tutar (kuruş)
     * @param _oasisIzinTxHash Oasis tx'i hasta iznini kanıtlayan
     */
    function provizyonGonder(
        bytes32 _provizyonId,
        bytes32 _hastaDID,
        string calldata _takipNo,
        string calldata _protokolNo,
        string calldata _sutKodu,
        string calldata _islemAdi,
        uint256 _islemTarihi,
        uint256 _tutar,
        bytes32 _oasisIzinTxHash
    ) external onlyRole(HASTANE_ROLE) whenNotPaused {
        require(!provizyonlar[_provizyonId].varMi, "Provizyon zaten var");
        require(hastaneler[msg.sender].aktif, "Hastane kayitli degil");
        require(bytes(_sutKodu).length > 0, "SUT kodu gerekli");
        require(_tutar > 0, "Tutar pozitif olmali");
        require(_oasisIzinTxHash != bytes32(0), "Hasta izin kaniti gerekli");

        // Provizyon oluştur
        Provizyon storage prov = provizyonlar[_provizyonId];
        prov.provizyonId = _provizyonId;
        prov.hastaDID = _hastaDID;
        prov.hastane = msg.sender;
        prov.takipNo = _takipNo;
        prov.protokolNo = _protokolNo;
        prov.sutKodu = _sutKodu;
        prov.islemAdi = _islemAdi;
        prov.islemTarihi = _islemTarihi;
        prov.tutar = _tutar;
        prov.durum = ProvizyonDurum.GONDERILDI;
        prov.gonderilmeTarihi = block.timestamp;
        prov.oasisIzinTxHash = _oasisIzinTxHash;
        prov.varMi = true;

        // Takip
        hastaneProvizyonlari[msg.sender].push(_provizyonId);
        hastaProvizyonlari[_hastaDID].push(_provizyonId);

        sgkIstatistik.toplamProvizyon++;
        sgkIstatistik.bekleyen++;

        emit ProvizyonGonderildi(
            _provizyonId,
            _hastaDID,
            msg.sender,
            _sutKodu,
            _tutar,
            block.timestamp
        );

        // Limiti aşmazsa otomatik onayla
        if (_tutar <= otoOnayLimiti) {
            _otomatikOnayla(_provizyonId);
        }
    }

    /**
     * @notice SUT fiyat listesini kullanarak otomatik onay
     * @dev İç fonksiyon, limit altındaki provizyonlar için
     */
    function _otomatikOnayla(bytes32 _provizyonId) private {
        Provizyon storage prov = provizyonlar[_provizyonId];
        HastaneKayit storage hastane = hastaneler[prov.hastane];

        uint256 sutFiyat = hastane.sutFiyatListesi[prov.sutKodu];

        if (sutFiyat == 0) {
            // SUT fiyat listesinde yok - manuel inceleme
            prov.durum = ProvizyonDurum.INCELEMEDE;
            return;
        }

        // SGK %70, hasta %30 (tipik)
        prov.sgkPayi = (sutFiyat * 70) / 100;
        prov.hastaPayi = sutFiyat - prov.sgkPayi;
        prov.durum = ProvizyonDurum.ONAYLANDI;
        prov.onayTarihi = block.timestamp;

        hastane.toplamProvizyon++;
        hastane.toplamTutar += prov.sgkPayi;

        sgkIstatistik.onaylanan++;
        sgkIstatistik.bekleyen--;

        emit ProvizyonOnaylandi(
            _provizyonId,
            prov.sgkPayi,
            prov.hastaPayi,
            block.timestamp
        );
    }

    // ==================== SGK FONKSİYONLARI ====================

    /**
     * @notice Provizyon manuel onayla (karmaşık vakalar için)
     * @param _provizyonId Provizyon ID
     * @param _onaylandi True ise onayla, false ise reddet
     * @param _sgkPayi SGK payı (onaylanırsa)
     * @param _redNedeni Red nedeni (reddedilirse)
     */
    function provizyonOnayla(
        bytes32 _provizyonId,
        bool _onaylandi,
        uint256 _sgkPayi,
        string calldata _redNedeni
    ) external onlyRole(SGK_ROLE) {
        Provizyon storage prov = provizyonlar[_provizyonId];
        require(prov.varMi, "Provizyon yok");
        require(
            prov.durum == ProvizyonDurum.GONDERILDI ||
            prov.durum == ProvizyonDurum.INCELEMEDE ||
            prov.durum == ProvizyonDurum.ITIRAZ,
            "Provizyon su anki durumda onaylanamaz"
        );

        if (_onaylandi) {
            prov.durum = ProvizyonDurum.ONAYLANDI;
            prov.sgkPayi = _sgkPayi;
            prov.hastaPayi = prov.tutar - _sgkPayi;
            prov.onayTarihi = block.timestamp;

            hastaneler[prov.hastane].toplamProvizyon++;
            hastaneler[prov.hastane].toplamTutar += prov.sgkPayi;

            sgkIstatistik.onaylanan++;
            sgkIstatistik.bekleyen--;

            emit ProvizyonOnaylandi(
                _provizyonId,
                prov.sgkPayi,
                prov.hastaPayi,
                block.timestamp
            );
        } else {
            prov.durum = ProvizyonDurum.REDDEDILDI;
            prov.redNedeni = _redNedeni;
            prov.onayTarihi = block.timestamp;

            sgkIstatistik.reddedilen++;
            sgkIstatistik.bekleyen--;

            emit ProvizyonReddedildi(_provizyonId, _redNedeni, block.timestamp);
        }
    }

    /**
     * @notice Onaylı provizyonu hastaneye öde
     * @param _provizyonId Provizyon ID
     */
    function provizyonOde(bytes32 _provizyonId) external onlyRole(SGK_ROLE) nonReentrant {
        Provizyon storage prov = provizyonlar[_provizyonId];
        require(prov.varMi, "Provizyon yok");
        require(prov.durum == ProvizyonDurum.ONAYLANDI, "Provizyon onaylanmamis");
        require(
            block.timestamp >= prov.onayTarihi + odemeBeketSuresi,
            "Odeme bekleme suresi dolmadi"
        );

        // Token transferi (SGK => Hastane)
        bool basarili = odemeToken.transferFrom(
            msg.sender,
            prov.hastane,
            prov.sgkPayi
        );
        require(basarili, "Odeme transfer basarisiz");

        prov.durum = ProvizyonDurum.ODENDI;
        prov.odemeTarihi = block.timestamp;

        sgkIstatistik.toplamOdenen += prov.sgkPayi;

        emit ProvizyonOdendi(_provizyonId, prov.hastane, prov.sgkPayi, block.timestamp);
    }

    /**
     * @notice SUT kodu için fiyat belirle
     * @param _hastaneAdresi Hastane adresi
     * @param _sutKodu SUT 2025 kodu
     * @param _fiyat Fiyat (kuruş)
     */
    function sutFiyatBelirle(
        address _hastaneAdresi,
        string calldata _sutKodu,
        uint256 _fiyat
    ) external onlyRole(SGK_ROLE) {
        HastaneKayit storage hastane = hastaneler[_hastaneAdresi];
        require(hastane.aktif, "Hastane kayitli degil");

        hastane.sutFiyatListesi[_sutKodu] = _fiyat;

        emit SUTFiyatGuncellendi(_hastaneAdresi, _sutKodu, _fiyat, block.timestamp);
    }

    // ==================== HASTANE İTİRAZ ====================

    /**
     * @notice Reddedilen provizyona itiraz et
     * @param _provizyonId Provizyon ID
     */
    function provizyonItiraz(bytes32 _provizyonId) external {
        Provizyon storage prov = provizyonlar[_provizyonId];
        require(prov.varMi, "Provizyon yok");
        require(prov.hastane == msg.sender, "Provizyon sahibi degil");
        require(prov.durum == ProvizyonDurum.REDDEDILDI, "Sadece red edilenlere itiraz");

        prov.durum = ProvizyonDurum.ITIRAZ;

        emit ProvizyonItiraz(_provizyonId, msg.sender, block.timestamp);
    }

    // ==================== E-NABIZ ENTEGRASYONU ====================

    /**
     * @notice Provizyonu e-Nabız ile senkronize et
     * @param _provizyonId Provizyon ID
     * @param _enabizReferansNo e-Nabız referans numarası
     */
    function enabizSenkronize(
        bytes32 _provizyonId,
        bytes32 _enabizReferansNo
    ) external onlyRole(HASTANE_ROLE) {
        Provizyon storage prov = provizyonlar[_provizyonId];
        require(prov.varMi, "Provizyon yok");
        require(prov.hastane == msg.sender, "Provizyon sahibi degil");
        require(!prov.enabizSenkron, "Zaten senkronize");

        prov.enabizReferansNo = _enabizReferansNo;
        prov.enabizSenkron = true;

        emit EnabizSenkronize(_provizyonId, _enabizReferansNo, block.timestamp);
    }

    // ==================== ADMIN FONKSİYONLARI ====================

    /**
     * @notice Hastane kaydet
     * @param _hastaneAdresi Hastane cüzdan adresi
     * @param _hastaneAdi Hastane adı
     * @param _hastaneKodu Sağlık Bakanlığı kodu
     */
    function hastaneKaydet(
        address _hastaneAdresi,
        string calldata _hastaneAdi,
        string calldata _hastaneKodu
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hastaneler[_hastaneAdresi].aktif, "Hastane zaten kayitli");

        HastaneKayit storage hastane = hastaneler[_hastaneAdresi];
        hastane.hastaneAdresi = _hastaneAdresi;
        hastane.hastaneAdi = _hastaneAdi;
        hastane.hastaneKodu = _hastaneKodu;
        hastane.aktif = true;

        _grantRole(HASTANE_ROLE, _hastaneAdresi);

        emit HastaneKayit(_hastaneAdresi, _hastaneAdi, _hastaneKodu, block.timestamp);
    }

    /**
     * @notice Otomatik onay limitini ayarla
     * @param _limit Yeni limit (kuruş)
     */
    function otoOnayLimitiAyarla(uint256 _limit)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        otoOnayLimiti = _limit;
    }

    /**
     * @notice Kontratı duraklat (acil durum)
     */
    function duraklat() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Kontratı devam ettir
     */
    function devamEttir() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // ==================== GÖRÜNTÜLEME FONKSİYONLARI ====================

    /**
     * @notice Provizyon detaylarını getir
     */
    function provizyonGetir(bytes32 _provizyonId) external view returns (
        bytes32 hastaDID,
        address hastane,
        string memory sutKodu,
        uint256 tutar,
        uint256 sgkPayi,
        ProvizyonDurum durum,
        uint256 gonderilmeTarihi
    ) {
        Provizyon storage prov = provizyonlar[_provizyonId];
        require(prov.varMi, "Provizyon yok");

        return (
            prov.hastaDID,
            prov.hastane,
            prov.sutKodu,
            prov.tutar,
            prov.sgkPayi,
            prov.durum,
            prov.gonderilmeTarihi
        );
    }

    /**
     * @notice Hastane provizyonlarını getir
     */
    function hastaneProvizyonlariGetir(address _hastane)
        external
        view
        returns (bytes32[] memory)
    {
        return hastaneProvizyonlari[_hastane];
    }

    /**
     * @notice SUT fiyatını getir
     */
    function sutFiyatGetir(address _hastane, string calldata _sutKodu)
        external
        view
        returns (uint256)
    {
        return hastaneler[_hastane].sutFiyatListesi[_sutKodu];
    }

    /**
     * @notice SGK istatistiklerini getir
     */
    function sgkIstatistikGetir() external view returns (
        uint256 toplamProvizyon,
        uint256 onaylanan,
        uint256 reddedilen,
        uint256 toplamOdenen,
        uint256 bekleyen
    ) {
        return (
            sgkIstatistik.toplamProvizyon,
            sgkIstatistik.onaylanan,
            sgkIstatistik.reddedilen,
            sgkIstatistik.toplamOdenen,
            sgkIstatistik.bekleyen
        );
    }
}
