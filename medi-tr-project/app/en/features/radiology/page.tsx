import Link from 'next/link'
import { ScanLine, Brain, Cloud, Shield, Zap, CheckCircle2, BarChart3, Clock, Lock, Database, FileImage, Monitor, Activity, AlertCircle, HardDrive, Share2 } from 'lucide-react'

export default function RadiologyFeaturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <ScanLine className="h-5 w-5" />
              <span className="text-sm font-semibold">Radyoloji Modülü</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              AI Destekli Radyoloji<br />& Bulut PACS Sistemi
            </h1>
            <p className="text-xl text-red-50 mb-8 leading-relaxed">
              Yapay zeka ile rapor yardımı, DICOM görüntüleme, RIS entegrasyonu ve e-Nabız görüntü gönderimi.
              Sisoft, Medisoft, Gemsoft'tan farklı olarak bulut PACS, AI raporlama ve sıfır yerel sunucu maliyeti.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Ücretsiz Demo
              </Link>
              <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
                PACS Viewer İzleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Stats */}
      <section className="py-16 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-12 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-white text-center">
              <div>
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">22 dk</div>
                <div className="text-red-100">Ort. Rapor Süresi</div>
              </div>
              <div>
                <Brain className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">%94</div>
                <div className="text-red-100">AI Tanı Doğruluğu</div>
              </div>
              <div>
                <HardDrive className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">50 PB</div>
                <div className="text-red-100">Bulut Görüntü Kapasitesi</div>
              </div>
              <div>
                <Database className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">900+</div>
                <div className="text-red-100">Radyoloji Merkezi Kullanıyor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Radyoloji Yönetimine Özel Özellikler
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Yardımlı Raporlama</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Derin öğrenme algoritmaları ile akciğer nodül, kırık, kanama, pnömoni tespiti.
                <strong> Rakiplerimizde yok!</strong> Radyolog verimliliği %45 artar, rapor süresi 22 dakikaya düşer.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Akciğer nodül tespiti (CT chest)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Kırık analizi (X-ray bone)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Beyin kanaması segmentasyonu (CT head)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik ölçüm (nodül boyutu, RECIST)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bulut PACS (Cloud Storage)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                DICOM görüntüler AWS S3'te şifrelenmiş saklanır. Yerel sunucu, disk maliyeti yok.
                <strong> Her yerden erişim, sıfır bakım maliyeti.</strong> 50 PB kapasiteye kadar ölçeklenebilir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>AWS S3 şifreli depolama (AES-256)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik backup & disaster recovery</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Sınırsız ölçeklendirme (50+ PB)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Multi-site paylaşım (şube arası)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">e-Nabız Görüntü Gönderimi</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Radyoloji raporları ve DICOM görüntüleri otomatik e-Nabız'a gönderilir.
                <strong> SBÜ Görüntüleme Veri Seti tam uyumlu.</strong> Hasta her yerden görüntülerine erişir.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Otomatik e-Nabız DICOM upload</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>HL7 ORU^R01 rapor mesajı</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>SBÜ Görüntüleme Veri Seti (LOINC kodlu)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Gönderim başarı/hata tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DICOM & RIS Integration */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            DICOM & RIS Tam Entegrasyonu
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            CT, MR, X-Ray, Ultrason, Mamografi, PET-CT tüm modaliteler desteklenir. HL7 ORM/ORU ile HIS entegrasyonu.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <FileImage className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DICOM Viewer (Web-Based)</h3>
              <p className="text-gray-700 mb-4">
                Tarayıcı tabanlı DICOM viewer, indirme/kurulum yok. MPR (Multi-Planar Reconstruction),
                MIP, 3D rendering, ölçüm araçları (mesafe, alan, açı, SUV). PACS standardına tam uyumlu.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Web-based viewer (sıfır kurulum)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>MPR, MIP, 3D rendering</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ölçüm araçları (ROI, SUV, HU)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Fusion (PET-CT overlay)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
              <Monitor className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">RIS (Radiology Information System)</h3>
              <p className="text-gray-700 mb-4">
                Randevu yönetimi, çekim planlaması, worklist, rapor editörü, şablon sistemi.
                HL7 ORM^O01 (istem), ORU^R01 (sonuç) ile HIS entegrasyonu. Modalite work list (MWL).
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>HL7 ORM/ORU, DICOM MWL/MPPS</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Rapor şablonları (structured reporting)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Ses ile rapor (voice recognition)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  <span>Peer review & konsültasyon</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="h-8 w-8 text-red-600" />
              Desteklenen Modaliteler & Cihazlar
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">CT (Bilgisayarlı Tomografi)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Siemens SOMATOM</li>
                  <li>• GE Revolution CT</li>
                  <li>• Philips Brilliance iCT</li>
                  <li>• Toshiba Aquilion</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">MR (Manyetik Rezonans)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Siemens MAGNETOM</li>
                  <li>• GE SIGNA</li>
                  <li>• Philips Ingenia</li>
                  <li>• 1.5T, 3T, 7T desteği</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">X-Ray & Mamografi</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• CR (Computed Radiography)</li>
                  <li>• DR (Digital Radiography)</li>
                  <li>• Mamografi (digital)</li>
                  <li>• C-arm floroskopi</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Nükleer & Ultrason</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• PET-CT (onkoloji)</li>
                  <li>• SPECT (gama kamera)</li>
                  <li>• Doppler ultrason</li>
                  <li>• Echocardiography</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rakiplerden Farkımız */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            Median vs. Sisoft/Medisoft/Gemsoft
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Rakiplerimizden farklı olarak AI raporlama, bulut PACS ve gerçek zamanlı e-Nabız gönderimi sunuyoruz.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Median ile</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>AI Raporlama:</strong> Nodül/kırık/kanama tespiti, rapor süresi %45 azalma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Cloud className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Bulut PACS:</strong> AWS S3 depolama, yerel sunucu/disk maliyeti yok, 50 PB kapasite</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Otomatik e-Nabız:</strong> DICOM görüntü + rapor real-time gönderim, manuel işlem yok</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Web-Based Viewer:</strong> MPR, 3D rendering, sıfır kurulum, her yerden erişim</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>HL7 & DICOM:</strong> Tüm modaliteler, MWL/MPPS, ORM/ORU entegrasyonu</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Rakiplerde</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">AI yok, rapor manuel yazılır, ölçüm manuel, radyolog iş yükü yüksek</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Yerel PACS sunucu gerekli, disk maliyeti yüksek, kapasite sınırlı (10-20 TB)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">e-Nabız manuel/batch gönderim, görüntü yükleme yavaş, hata sık</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">Desktop viewer kurulumu gerekli, 3D rendering zayıf, eski teknoloji</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span className="text-gray-700">HL7 kısıtlı, bazı modaliteler desteklenmez, ek modül ücreti</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Radiology Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            AI Radyoloji Özellikleri
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Derin öğrenme (CNN, U-Net, ResNet) ile patoloji tespiti, segmentasyon, ölçüm. FDA/CE onaylı algoritmalar.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Brain className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Akciğer Nodül Tespiti</h3>
              <p className="text-gray-700 text-sm mb-4">
                CT Chest görüntülerinde akciğer nodüllerini otomatik tespit eder, boyut ölçer (mm),
                Lung-RADS kategorisine göre risk skorlar. %94 sensitivite.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Nodül boyut ölçümü (3D volume)</li>
                <li>• Lung-RADS kategorilendirme</li>
                <li>• Takip önerisi (3/6/12 ay)</li>
                <li>• Malignite risk skoru (%)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <Activity className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kırık Analizi (X-Ray)</h3>
              <p className="text-gray-700 text-sm mb-4">
                Ekstremite, vertebra, kosta kırıklarını tespit eder. Kırık hattı segmentasyonu,
                açı ölçümü, deplasyon hesaplama. Acil önceliklendirme.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Kırık hattı otomatik işaretleme</li>
                <li>• Açı ölçümü (alignment)</li>
                <li>• Deplasyon mesafesi (mm)</li>
                <li>• Acil vaka önceliklendirme</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-200">
              <AlertCircle className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beyin Kanaması (CT Head)</h3>
              <p className="text-gray-700 text-sm mb-4">
                İntrakraniyal kanama (ICH) otomatik segmentasyon. Midline shift, kanama hacmi (ml),
                aciliyet skorlaması. Radyolog/nöroşirurji bildirim.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• ICH segmentasyon & hacim (ml)</li>
                <li>• Midline shift ölçümü (mm)</li>
                <li>• Aciliyet skoru (critical/urgent)</li>
                <li>• Otomatik konsültasyon bildirimi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Komple Radyoloji Çözümü
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<ScanLine />} title="RIS" desc="Randevu, worklist, rapor editörü" />
            <FeatureCard icon={<FileImage />} title="DICOM Viewer" desc="Web-based, MPR, 3D rendering" />
            <FeatureCard icon={<Brain />} title="AI Raporlama" desc="Nodül, kırık, kanama tespiti" />
            <FeatureCard icon={<Cloud />} title="Bulut PACS" desc="AWS S3, 50 PB kapasite" />
            <FeatureCard icon={<Shield />} title="e-Nabız Gönderim" desc="DICOM + rapor otomatik upload" />
            <FeatureCard icon={<Monitor />} title="Modalite MWL" desc="DICOM work list, MPPS" />
            <FeatureCard icon={<BarChart3 />} title="Performans Raporu" desc="TAT, modality kullanım analizi" />
            <FeatureCard icon={<Clock />} title="Randevu Sistemi" desc="Online randevu, SMS hatırlatıcı" />
            <FeatureCard icon={<Share2 />} title="Tele-Radyoloji" desc="Uzaktan konsültasyon, ikinci görüş" />
            <FeatureCard icon={<FileImage />} title="Structured Reporting" desc="RadLex, IHE profil desteği" />
            <FeatureCard icon={<Database />} title="VNA (Vendor Neutral)" desc="Multi-vendor DICOM desteği" />
            <FeatureCard icon={<Lock />} title="KVKK Uyumlu" desc="DICOM şifreleme, erişim logu" />
          </div>
        </div>
      </section>

      {/* KVKK Compliance */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-red-200">
            <div className="flex items-start gap-4 mb-6">
              <Lock className="h-10 w-10 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">KVKK & DICOM Güvenliği</h2>
                <p className="text-gray-700 leading-relaxed">
                  Median radyoloji modülü <strong>KVKK, DICOM Security (TLS), IHE (Integrating the Healthcare Enterprise)</strong> ve
                  <strong> ISO 27001</strong> standardına tam uyumludur. DICOM görüntüler AES-256 ile şifrelenmiş saklanır,
                  tüm erişimler audit log'lanır. PACS arşivi yıllarca güvenle saklanır, HIPAA uyumlu.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">DICOM TLS</h4>
                <p className="text-sm text-gray-600">Şifreli DICOM iletimi (AES-256)</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">IHE Profilleri</h4>
                <p className="text-sm text-gray-600">XDS-I, PIX, PDQ entegrasyon</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-red-600 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">ACR-NEMA</h4>
                <p className="text-sm text-gray-600">DICOM 3.0 tam uyumluluk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">Rapor Sürenizi 22 Dakikaya İndirin</h2>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Median radyoloji modülü ile AI destekli raporlama, bulut PACS depolama
            ve otomatik e-Nabız görüntü gönderimini deneyimleyin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tr/demo" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all inline-block shadow-xl">
              Canlı Demo İsteyin
            </Link>
            <Link href="/tr/contact" className="bg-red-700/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700/40 transition-all border-2 border-white/30">
              PACS Viewer İzleyin
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-red-200 transition-all">
      <div className="text-red-600 mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}
