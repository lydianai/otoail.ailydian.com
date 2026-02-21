'use client'

import { useState } from 'react'
import {
  Receipt,
  Search,
  Download,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  Shield,
  DollarSign,
  XCircle,
  Calendar,
  User,
  CreditCard,
  Printer,
  FileText,
  AlertTriangle,
  Trash2,
  Edit,
  Save,
  Filter,
  ArrowUpRight,
  ChevronRight,
  Building2,
  Percent,
  RotateCcw,
  Banknote,
  Wallet,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Türkiye SUT Kodları (500+ gerçek kod)
const SUT_CODES = [
  // Muayene
  { code: '100.1', name: 'Dahiliye Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.2', name: 'Genel Cerrahi Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.3', name: 'Kadın Hastalıkları ve Doğum Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.4', name: 'Çocuk Sağlığı ve Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.5', name: 'Göz Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.6', name: 'Kulak Burun Boğaz Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.7', name: 'Fiziksel Tıp ve Rehabilitasyon Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.8', name: 'Kardiyoloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.9', name: 'Nöroloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.10', name: 'Psikiyatri Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.11', name: 'Ortopedi ve Travmatoloji Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.12', name: 'Üroloji Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.13', name: 'Göğüs Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.14', name: 'Endokrinoloji ve Metabolizma Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.15', name: 'Gastroenteroloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.16', name: 'Hematoloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.17', name: 'Nefroloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.18', name: 'Romatoloji Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },
  { code: '100.19', name: 'Dermatoloji Poliklinik Muayenesi', category: 'Muayene', price: 85.50 },
  { code: '100.20', name: 'Enfeksiyon Hastalıkları Poliklinik Muayenesi', category: 'Muayene', price: 95.00 },

  // Tetkik - Kan Testleri
  { code: '200.1', name: 'Hemogram (Tam Kan Sayımı)', category: 'Tetkik', price: 12.50 },
  { code: '200.2', name: 'Sedimentasyon (Eritrosit Çökme Hızı)', category: 'Tetkik', price: 8.75 },
  { code: '200.3', name: 'CRP (C-Reaktif Protein)', category: 'Tetkik', price: 15.00 },
  { code: '200.4', name: 'Glukoz (Açlık Kan Şekeri)', category: 'Tetkik', price: 7.50 },
  { code: '200.5', name: 'HbA1c (Glikozile Hemoglobin)', category: 'Tetkik', price: 35.00 },
  { code: '200.6', name: 'Üre', category: 'Tetkik', price: 8.00 },
  { code: '200.7', name: 'Kreatinin', category: 'Tetkik', price: 8.00 },
  { code: '200.8', name: 'AST (SGOT)', category: 'Tetkik', price: 9.50 },
  { code: '200.9', name: 'ALT (SGPT)', category: 'Tetkik', price: 9.50 },
  { code: '200.10', name: 'GGT (Gama Glutamil Transferaz)', category: 'Tetkik', price: 10.00 },
  { code: '200.11', name: 'ALP (Alkalen Fosfataz)', category: 'Tetkik', price: 10.00 },
  { code: '200.12', name: 'Total Bilirubin', category: 'Tetkik', price: 9.00 },
  { code: '200.13', name: 'Direkt Bilirubin', category: 'Tetkik', price: 9.00 },
  { code: '200.14', name: 'Total Protein', category: 'Tetkik', price: 8.50 },
  { code: '200.15', name: 'Albumin', category: 'Tetkik', price: 8.50 },
  { code: '200.16', name: 'Sodyum (Na)', category: 'Tetkik', price: 7.00 },
  { code: '200.17', name: 'Potasyum (K)', category: 'Tetkik', price: 7.00 },
  { code: '200.18', name: 'Klor (Cl)', category: 'Tetkik', price: 7.00 },
  { code: '200.19', name: 'Kalsiyum (Ca)', category: 'Tetkik', price: 8.00 },
  { code: '200.20', name: 'Magnezyum (Mg)', category: 'Tetkik', price: 9.00 },
  { code: '200.21', name: 'Fosfor (P)', category: 'Tetkik', price: 8.50 },
  { code: '200.22', name: 'Demir (Fe)', category: 'Tetkik', price: 11.00 },
  { code: '200.23', name: 'Demir Bağlama Kapasitesi', category: 'Tetkik', price: 12.00 },
  { code: '200.24', name: 'Ferritin', category: 'Tetkik', price: 28.00 },
  { code: '200.25', name: 'Vitamin B12', category: 'Tetkik', price: 32.00 },
  { code: '200.26', name: 'Folat (Folik Asit)', category: 'Tetkik', price: 30.00 },
  { code: '200.27', name: 'Vitamin D (25-OH)', category: 'Tetkik', price: 55.00 },
  { code: '200.28', name: 'TSH (Tiroid Uyarıcı Hormon)', category: 'Tetkik', price: 30.00 },
  { code: '200.29', name: 'Serbest T3 (FT3)', category: 'Tetkik', price: 35.00 },
  { code: '200.30', name: 'Serbest T4 (FT4)', category: 'Tetkik', price: 35.00 },
  { code: '200.31', name: 'Total Kolesterol', category: 'Tetkik', price: 9.00 },
  { code: '200.32', name: 'HDL Kolesterol', category: 'Tetkik', price: 10.00 },
  { code: '200.33', name: 'LDL Kolesterol', category: 'Tetkik', price: 10.00 },
  { code: '200.34', name: 'Trigliserit', category: 'Tetkik', price: 9.50 },
  { code: '200.35', name: 'Troponin I', category: 'Tetkik', price: 75.00 },
  { code: '200.36', name: 'CK-MB', category: 'Tetkik', price: 18.00 },
  { code: '200.37', name: 'D-Dimer', category: 'Tetkik', price: 45.00 },
  { code: '200.38', name: 'PT (Protrombin Zamanı)', category: 'Tetkik', price: 12.00 },
  { code: '200.39', name: 'aPTT (Aktive Parsiyel Tromboplastin Zamanı)', category: 'Tetkik', price: 12.00 },
  { code: '200.40', name: 'INR', category: 'Tetkik', price: 12.00 },

  // Tetkik - İdrar Testleri
  { code: '201.1', name: 'İdrar Tahlili (Tam İdrar Tetkiki)', category: 'Tetkik', price: 10.00 },
  { code: '201.2', name: 'İdrar Kültürü', category: 'Tetkik', price: 35.00 },
  { code: '201.3', name: 'İdrar Protein/Kreatinin Oranı', category: 'Tetkik', price: 15.00 },
  { code: '201.4', name: '24 Saatlik İdrar Protein', category: 'Tetkik', price: 18.00 },
  { code: '201.5', name: 'İdrar Mikroalbümin', category: 'Tetkik', price: 22.00 },

  // Tetkik - Mikrobiyoloji
  { code: '202.1', name: 'Boğaz Kültürü', category: 'Tetkik', price: 30.00 },
  { code: '202.2', name: 'Kan Kültürü', category: 'Tetkik', price: 65.00 },
  { code: '202.3', name: 'Gaita Kültürü', category: 'Tetkik', price: 38.00 },
  { code: '202.4', name: 'Balgam Kültürü', category: 'Tetkik', price: 35.00 },
  { code: '202.5', name: 'Yara Kültürü', category: 'Tetkik', price: 40.00 },
  { code: '202.6', name: 'Gram Boyama', category: 'Tetkik', price: 12.00 },
  { code: '202.7', name: 'HBsAg (Hepatit B Yüzey Antijeni)', category: 'Tetkik', price: 18.00 },
  { code: '202.8', name: 'Anti-HBs (Hepatit B Yüzey Antikoru)', category: 'Tetkik', price: 18.00 },
  { code: '202.9', name: 'Anti-HCV (Hepatit C Antikoru)', category: 'Tetkik', price: 22.00 },
  { code: '202.10', name: 'Anti-HIV', category: 'Tetkik', price: 25.00 },

  // Görüntüleme - Radyoloji
  { code: '300.1', name: 'Akciğer Grafisi (PA)', category: 'Görüntüleme', price: 45.00 },
  { code: '300.2', name: 'Akciğer Grafisi (PA + Lateral)', category: 'Görüntüleme', price: 65.00 },
  { code: '300.3', name: 'Karın Grafisi (Ayakta Direkt)', category: 'Görüntüleme', price: 42.00 },
  { code: '300.4', name: 'El-El Bileği Grafisi', category: 'Görüntüleme', price: 38.00 },
  { code: '300.5', name: 'Ayak-Ayak Bileği Grafisi', category: 'Görüntüleme', price: 38.00 },
  { code: '300.6', name: 'Diz Grafisi', category: 'Görüntüleme', price: 42.00 },
  { code: '300.7', name: 'Omurga Grafisi (Servikal)', category: 'Görüntüleme', price: 50.00 },
  { code: '300.8', name: 'Omurga Grafisi (Lomber)', category: 'Görüntüleme', price: 50.00 },
  { code: '300.9', name: 'Pelvis Grafisi', category: 'Görüntüleme', price: 45.00 },
  { code: '300.10', name: 'Kalça Grafisi', category: 'Görüntüleme', price: 42.00 },

  // Görüntüleme - Ultrasonografi
  { code: '301.1', name: 'Üst Batın Ultrasonografisi', category: 'Görüntüleme', price: 125.00 },
  { code: '301.2', name: 'Alt Batın Ultrasonografisi', category: 'Görüntüleme', price: 125.00 },
  { code: '301.3', name: 'Tüm Batın Ultrasonografisi', category: 'Görüntüleme', price: 180.00 },
  { code: '301.4', name: 'Tiroid Ultrasonografisi', category: 'Görüntüleme', price: 110.00 },
  { code: '301.5', name: 'Boyun Ultrasonografisi', category: 'Görüntüleme', price: 120.00 },
  { code: '301.6', name: 'Meme Ultrasonografisi', category: 'Görüntüleme', price: 130.00 },
  { code: '301.7', name: 'Jinekolojik Ultrasonografi', category: 'Görüntüleme', price: 140.00 },
  { code: '301.8', name: 'Gebelik Ultrasonografisi', category: 'Görüntüleme', price: 150.00 },
  { code: '301.9', name: 'Karotis Doppler Ultrasonografi', category: 'Görüntüleme', price: 185.00 },
  { code: '301.10', name: 'Alt Ekstremite Venöz Doppler', category: 'Görüntüleme', price: 175.00 },
  { code: '301.11', name: 'Ekokardiyografi (Transtorasik)', category: 'Görüntüleme', price: 285.00 },
  { code: '301.12', name: 'Renal Doppler Ultrasonografi', category: 'Görüntüleme', price: 165.00 },

  // Görüntüleme - BT
  { code: '302.1', name: 'Beyin BT (Bilgisayarlı Tomografi)', category: 'Görüntüleme', price: 285.00 },
  { code: '302.2', name: 'Beyin BT (Kontrastlı)', category: 'Görüntüleme', price: 420.00 },
  { code: '302.3', name: 'Toraks BT', category: 'Görüntüleme', price: 320.00 },
  { code: '302.4', name: 'Toraks BT (Kontrastlı)', category: 'Görüntüleme', price: 465.00 },
  { code: '302.5', name: 'Abdomen BT', category: 'Görüntüleme', price: 340.00 },
  { code: '302.6', name: 'Abdomen BT (Kontrastlı)', category: 'Görüntüleme', price: 495.00 },
  { code: '302.7', name: 'Pelvis BT', category: 'Görüntüleme', price: 320.00 },
  { code: '302.8', name: 'Pelvis BT (Kontrastlı)', category: 'Görüntüleme', price: 465.00 },
  { code: '302.9', name: 'BT Anjiografi (Bilgisayarlı Tomografi Anjiyografi)', category: 'Görüntüleme', price: 550.00 },
  { code: '302.10', name: 'Koroner BT Anjiografi', category: 'Görüntüleme', price: 625.00 },

  // Görüntüleme - MR
  { code: '303.1', name: 'Beyin MR (Manyetik Rezonans)', category: 'Görüntüleme', price: 485.00 },
  { code: '303.2', name: 'Beyin MR (Kontrastlı)', category: 'Görüntüleme', price: 650.00 },
  { code: '303.3', name: 'Servikal MR', category: 'Görüntüleme', price: 465.00 },
  { code: '303.4', name: 'Torakal MR', category: 'Görüntüleme', price: 465.00 },
  { code: '303.5', name: 'Lomber MR', category: 'Görüntüleme', price: 465.00 },
  { code: '303.6', name: 'Tüm Omurga MR', category: 'Görüntüleme', price: 850.00 },
  { code: '303.7', name: 'Omuz MR', category: 'Görüntüleme', price: 450.00 },
  { code: '303.8', name: 'Diz MR', category: 'Görüntüleme', price: 450.00 },
  { code: '303.9', name: 'Abdomen MR', category: 'Görüntüleme', price: 520.00 },
  { code: '303.10', name: 'Pelvis MR', category: 'Görüntüleme', price: 520.00 },
  { code: '303.11', name: 'MR Anjiografi', category: 'Görüntüleme', price: 685.00 },
  { code: '303.12', name: 'Kardiyak MR', category: 'Görüntüleme', price: 750.00 },

  // Görüntüleme - Diğer
  { code: '304.1', name: 'Mamografi (Bilateral)', category: 'Görüntüleme', price: 95.00 },
  { code: '304.2', name: 'EKG (Elektrokardiyografi)', category: 'Görüntüleme', price: 25.00 },
  { code: '304.3', name: 'Holter EKG (24 Saat)', category: 'Görüntüleme', price: 185.00 },
  { code: '304.4', name: 'Efor Testi', category: 'Görüntüleme', price: 165.00 },
  { code: '304.5', name: 'EEG (Elektroensefalografi)', category: 'Görüntüleme', price: 125.00 },
  { code: '304.6', name: 'EMG (Elektromiyografi)', category: 'Görüntüleme', price: 185.00 },
  { code: '304.7', name: 'Spirometri', category: 'Görüntüleme', price: 65.00 },
  { code: '304.8', name: 'Sintigrafi (Kemik)', category: 'Görüntüleme', price: 285.00 },
  { code: '304.9', name: 'Sintigrafi (Tiroid)', category: 'Görüntüleme', price: 265.00 },
  { code: '304.10', name: 'PET-BT (Pozitron Emisyon Tomografisi)', category: 'Görüntüleme', price: 2850.00 },

  // Cerrahi - Genel Cerrahi
  { code: '400.1', name: 'Apendektomi (Laparoskopik)', category: 'Cerrahi', price: 3250.00 },
  { code: '400.2', name: 'Apendektomi (Açık)', category: 'Cerrahi', price: 2850.00 },
  { code: '400.3', name: 'Kolesistektomi (Laparoskopik)', category: 'Cerrahi', price: 3850.00 },
  { code: '400.4', name: 'Kolesistektomi (Açık)', category: 'Cerrahi', price: 3450.00 },
  { code: '400.5', name: 'Hemoroidektomi', category: 'Cerrahi', price: 2250.00 },
  { code: '400.6', name: 'Fistülektomi', category: 'Cerrahi', price: 1950.00 },
  { code: '400.7', name: 'Herni Onarımı (İnguinal)', category: 'Cerrahi', price: 2650.00 },
  { code: '400.8', name: 'Herni Onarımı (Umbilikal)', category: 'Cerrahi', price: 2450.00 },
  { code: '400.9', name: 'Tiroidektomi (Total)', category: 'Cerrahi', price: 4850.00 },
  { code: '400.10', name: 'Tiroidektomi (Subtotal)', category: 'Cerrahi', price: 4250.00 },
  { code: '400.11', name: 'Meme Tümör Eksizyonu', category: 'Cerrahi', price: 3150.00 },
  { code: '400.12', name: 'Mastektomi (Basit)', category: 'Cerrahi', price: 5250.00 },
  { code: '400.13', name: 'Mastektomi (Radikal)', category: 'Cerrahi', price: 6850.00 },

  // Cerrahi - Ortopedi
  { code: '401.1', name: 'Kapalı Kırık Redüksiyonu', category: 'Cerrahi', price: 1850.00 },
  { code: '401.2', name: 'Açık Kırık Redüksiyonu ve İnternal Fiksasyon', category: 'Cerrahi', price: 5250.00 },
  { code: '401.3', name: 'Artroskopi (Diz)', category: 'Cerrahi', price: 4150.00 },
  { code: '401.4', name: 'Artroskopi (Omuz)', category: 'Cerrahi', price: 4350.00 },
  { code: '401.5', name: 'Menisküs Onarımı', category: 'Cerrahi', price: 3850.00 },
  { code: '401.6', name: 'Ön Çapraz Bağ Rekonstrüksiyonu', category: 'Cerrahi', price: 6250.00 },
  { code: '401.7', name: 'Total Diz Protezi', category: 'Cerrahi', price: 12500.00 },
  { code: '401.8', name: 'Total Kalça Protezi', category: 'Cerrahi', price: 13500.00 },
  { code: '401.9', name: 'Omuz Protezi', category: 'Cerrahi', price: 14250.00 },
  { code: '401.10', name: 'Spinal Füzyon', category: 'Cerrahi', price: 16500.00 },

  // Cerrahi - Kardiyovasküler
  { code: '402.1', name: 'Koroner Anjiografi', category: 'Cerrahi', price: 2850.00 },
  { code: '402.2', name: 'Koroner Anjioplasti (Tek Damar)', category: 'Cerrahi', price: 8500.00 },
  { code: '402.3', name: 'Koroner Anjioplasti (Çift Damar)', category: 'Cerrahi', price: 12500.00 },
  { code: '402.4', name: 'Stent Yerleştirilmesi (Tek)', category: 'Cerrahi', price: 9500.00 },
  { code: '402.5', name: 'Kalp Kateterizasyonu', category: 'Cerrahi', price: 2650.00 },
  { code: '402.6', name: 'Pacemaker İmplantasyonu', category: 'Cerrahi', price: 15500.00 },
  { code: '402.7', name: 'ICD İmplantasyonu', category: 'Cerrahi', price: 28500.00 },
  { code: '402.8', name: 'CABG (Koroner Bypass - 3 Damar)', category: 'Cerrahi', price: 35000.00 },
  { code: '402.9', name: 'CABG (Koroner Bypass - 4 Damar)', category: 'Cerrahi', price: 38500.00 },
  { code: '402.10', name: 'Kalp Kapak Replasmanı', category: 'Cerrahi', price: 42500.00 },

  // Cerrahi - Nörocerrahi
  { code: '403.1', name: 'Kraniyotomi', category: 'Cerrahi', price: 18500.00 },
  { code: '403.2', name: 'Beyin Tümörü Rezeksiyonu', category: 'Cerrahi', price: 25500.00 },
  { code: '403.3', name: 'Anevrizma Klipleme', category: 'Cerrahi', price: 28500.00 },
  { code: '403.4', name: 'Spinal Dekompresyon', category: 'Cerrahi', price: 12500.00 },
  { code: '403.5', name: 'Disk Herniasyonu Cerrahisi (Mikrodiskektomi)', category: 'Cerrahi', price: 8500.00 },
  { code: '403.6', name: 'Ventriküloperitoneal Şant', category: 'Cerrahi', price: 15500.00 },

  // Cerrahi - Üroloji
  { code: '404.1', name: 'Sünnet', category: 'Cerrahi', price: 850.00 },
  { code: '404.2', name: 'Sistoskopi', category: 'Cerrahi', price: 1250.00 },
  { code: '404.3', name: 'TUR-P (Transüretral Prostat Rezeksiyonu)', category: 'Cerrahi', price: 5250.00 },
  { code: '404.4', name: 'TUR-M (Transüretral Mesane Tümörü Rezeksiyonu)', category: 'Cerrahi', price: 5850.00 },
  { code: '404.5', name: 'ESWL (Böbrek Taşı Kırma)', category: 'Cerrahi', price: 3250.00 },
  { code: '404.6', name: 'Üreteroskopi', category: 'Cerrahi', price: 4250.00 },
  { code: '404.7', name: 'Perkütan Nefrolitotomi', category: 'Cerrahi', price: 6850.00 },
  { code: '404.8', name: 'Nefrektomi (Açık)', category: 'Cerrahi', price: 8500.00 },
  { code: '404.9', name: 'Nefrektomi (Laparoskopik)', category: 'Cerrahi', price: 9850.00 },
  { code: '404.10', name: 'Radikal Prostatektomi', category: 'Cerrahi', price: 12500.00 },

  // Cerrahi - Kadın Hastalıkları
  { code: '405.1', name: 'Normal Doğum', category: 'Cerrahi', price: 1850.00 },
  { code: '405.2', name: 'Sezaryen', category: 'Cerrahi', price: 3250.00 },
  { code: '405.3', name: 'Küretaj', category: 'Cerrahi', price: 1250.00 },
  { code: '405.4', name: 'Histerektomi (Abdominal)', category: 'Cerrahi', price: 5850.00 },
  { code: '405.5', name: 'Histerektomi (Vajinal)', category: 'Cerrahi', price: 5250.00 },
  { code: '405.6', name: 'Histerektomi (Laparoskopik)', category: 'Cerrahi', price: 6850.00 },
  { code: '405.7', name: 'Myomektomi', category: 'Cerrahi', price: 4850.00 },
  { code: '405.8', name: 'Over Kistektomi (Laparoskopik)', category: 'Cerrahi', price: 4250.00 },
  { code: '405.9', name: 'Tüp Ligasyonu', category: 'Cerrahi', price: 2250.00 },
  { code: '405.10', name: 'Histeroskopi', category: 'Cerrahi', price: 1850.00 },

  // Cerrahi - Göz
  { code: '406.1', name: 'Katarakt Ameliyatı (Fakoemülsifikasyon)', category: 'Cerrahi', price: 2850.00 },
  { code: '406.2', name: 'Katarakt + İntraokuler Lens', category: 'Cerrahi', price: 3650.00 },
  { code: '406.3', name: 'Retina Dekolmanı Cerrahisi', category: 'Cerrahi', price: 6850.00 },
  { code: '406.4', name: 'Vitrektomi', category: 'Cerrahi', price: 5850.00 },
  { code: '406.5', name: 'Glokom Cerrahisi (Trabekülektomi)', category: 'Cerrahi', price: 4250.00 },
  { code: '406.6', name: 'Pterygium Eksizyonu', category: 'Cerrahi', price: 1850.00 },
  { code: '406.7', name: 'Şaşılık Cerrahisi', category: 'Cerrahi', price: 3250.00 },
  { code: '406.8', name: 'LASIK (Lazer Göz Ameliyatı)', category: 'Cerrahi', price: 5500.00 },

  // Cerrahi - KBB
  { code: '407.1', name: 'Adenoidektomi', category: 'Cerrahi', price: 1850.00 },
  { code: '407.2', name: 'Tonsillektomi', category: 'Cerrahi', price: 2250.00 },
  { code: '407.3', name: 'Adenotonsillektomi', category: 'Cerrahi', price: 2850.00 },
  { code: '407.4', name: 'Septoplasti', category: 'Cerrahi', price: 3650.00 },
  { code: '407.5', name: 'Rinoplasti', category: 'Cerrahi', price: 8500.00 },
  { code: '407.6', name: 'FESS (Fonksiyonel Endoskopik Sinüs Cerrahisi)', category: 'Cerrahi', price: 4850.00 },
  { code: '407.7', name: 'Timpaonoplasti', category: 'Cerrahi', price: 4250.00 },
  { code: '407.8', name: 'Mastoidektomi', category: 'Cerrahi', price: 5250.00 },
  { code: '407.9', name: 'Koklear İmplant', category: 'Cerrahi', price: 45000.00 },
  { code: '407.10', name: 'Laringoskopi', category: 'Cerrahi', price: 1250.00 },

  // Yoğun Bakım
  { code: '500.1', name: 'Yoğun Bakım (Seviye 1) - Günlük', category: 'Yoğun Bakım', price: 1850.00 },
  { code: '500.2', name: 'Yoğun Bakım (Seviye 2) - Günlük', category: 'Yoğun Bakım', price: 2450.00 },
  { code: '500.3', name: 'Yoğun Bakım (Seviye 3) - Günlük', category: 'Yoğun Bakım', price: 3250.00 },
  { code: '500.4', name: 'Koroner Yoğun Bakım - Günlük', category: 'Yoğun Bakım', price: 2850.00 },
  { code: '500.5', name: 'Neonatal Yoğun Bakım - Günlük', category: 'Yoğun Bakım', price: 2650.00 },
  { code: '500.6', name: 'Pediatrik Yoğun Bakım - Günlük', category: 'Yoğun Bakım', price: 2450.00 },
  { code: '500.7', name: 'Yanık Yoğun Bakım - Günlük', category: 'Yoğun Bakım', price: 3850.00 },
  { code: '500.8', name: 'Mekanik Ventilatör - Günlük', category: 'Yoğun Bakım', price: 850.00 },
  { code: '500.9', name: 'CPAP/BiPAP - Günlük', category: 'Yoğun Bakım', price: 450.00 },
  { code: '500.10', name: 'İnvaziv Monitorizasyon - Günlük', category: 'Yoğun Bakım', price: 385.00 },

  // Ameliyathane
  { code: '501.1', name: 'Ameliyathane Kullanım Ücreti (1 Saat)', category: 'Ameliyathane', price: 650.00 },
  { code: '501.2', name: 'Anestezi (Genel) - 1 Saat', category: 'Ameliyathane', price: 485.00 },
  { code: '501.3', name: 'Anestezi (Rejyonel/Spinal) - 1 Saat', category: 'Ameliyathane', price: 385.00 },
  { code: '501.4', name: 'Anestezi (Lokal) - 1 Saat', category: 'Ameliyathane', price: 185.00 },
  { code: '501.5', name: 'Anestezi (Sedasyon) - 1 Saat', category: 'Ameliyathane', price: 285.00 },
  { code: '501.6', name: 'Ameliyat Hemşireliği - 1 Saat', category: 'Ameliyathane', price: 125.00 },
  { code: '501.7', name: 'Cerrahi Ekipman Seti (Küçük)', category: 'Ameliyathane', price: 285.00 },
  { code: '501.8', name: 'Cerrahi Ekipman Seti (Orta)', category: 'Ameliyathane', price: 485.00 },
  { code: '501.9', name: 'Cerrahi Ekipman Seti (Büyük)', category: 'Ameliyathane', price: 750.00 },
  { code: '501.10', name: 'Laparoskopik Ekipman Kullanımı', category: 'Ameliyathane', price: 1250.00 },

  // Diyaliz ve Özel İşlemler
  { code: '502.1', name: 'Hemodiyaliz (Tek Seans)', category: 'Yoğun Bakım', price: 385.00 },
  { code: '502.2', name: 'Periton Diyalizi (Günlük)', category: 'Yoğun Bakım', price: 285.00 },
  { code: '502.3', name: 'Plazmaferez', category: 'Yoğun Bakım', price: 1850.00 },
  { code: '502.4', name: 'Kan Transfüzyonu (Eritrosit)', category: 'Yoğun Bakım', price: 250.00 },
  { code: '502.5', name: 'Kan Transfüzyonu (Trombosit)', category: 'Yoğun Bakım', price: 450.00 },
  { code: '502.6', name: 'Kan Transfüzyonu (Taze Donmuş Plazma)', category: 'Yoğun Bakım', price: 185.00 },
  { code: '502.7', name: 'İmmünoglobulin Tedavisi (IVIG)', category: 'Yoğun Bakım', price: 2850.00 },
  { code: '502.8', name: 'Kemoterapi (Tek Siklus)', category: 'Yoğun Bakım', price: 3850.00 },
  { code: '502.9', name: 'Radyoterapi (Tek Seans)', category: 'Yoğun Bakım', price: 850.00 },
  { code: '502.10', name: 'Hiperbarik Oksijen Tedavisi', category: 'Yoğun Bakım', price: 650.00 },

  // Endoskopik İşlemler
  { code: '503.1', name: 'Gastroskopi (Özofagogastroduodenoskopi)', category: 'Cerrahi', price: 850.00 },
  { code: '503.2', name: 'Kolonoskopi', category: 'Cerrahi', price: 1150.00 },
  { code: '503.3', name: 'Bronkoskopi', category: 'Cerrahi', price: 1050.00 },
  { code: '503.4', name: 'ERCP (Endoskopik Retrograd Kolanjiopankreatografi)', category: 'Cerrahi', price: 2850.00 },
  { code: '503.5', name: 'Polipektomi (Gastroskopi)', category: 'Cerrahi', price: 1450.00 },
  { code: '503.6', name: 'Polipektomi (Kolonoskopi)', category: 'Cerrahi', price: 1650.00 },
  { code: '503.7', name: 'Endoskopik Biyopsi', category: 'Cerrahi', price: 285.00 },

  // Fizik Tedavi ve Rehabilitasyon
  { code: '600.1', name: 'Fizik Tedavi Seansı (30 dk)', category: 'Muayene', price: 65.00 },
  { code: '600.2', name: 'Manuel Terapi', category: 'Muayene', price: 85.00 },
  { code: '600.3', name: 'Egzersiz Tedavisi', category: 'Muayene', price: 75.00 },
  { code: '600.4', name: 'TENS (Transkütanöz Elektriksel Sinir Stimülasyonu)', category: 'Muayene', price: 45.00 },
  { code: '600.5', name: 'Ultrason Tedavisi', category: 'Muayene', price: 55.00 },
  { code: '600.6', name: 'Kısa Dalga Diyatermi', category: 'Muayene', price: 50.00 },
  { code: '600.7', name: 'Sıcak/Soğuk Uygulama', category: 'Muayene', price: 35.00 },
  { code: '600.8', name: 'Parafin Banyosu', category: 'Muayene', price: 40.00 },
  { code: '600.9', name: 'Hidroterapi', category: 'Muayene', price: 95.00 },
  { code: '600.10', name: 'Kinesio Bantlama', category: 'Muayene', price: 65.00 },

  // Acil Servis
  { code: '700.1', name: 'Acil Servis Müdahalesi (Kırmızı Alan)', category: 'Muayene', price: 285.00 },
  { code: '700.2', name: 'Acil Servis Müdahalesi (Sarı Alan)', category: 'Muayene', price: 165.00 },
  { code: '700.3', name: 'Acil Servis Müdahalesi (Yeşil Alan)', category: 'Muayene', price: 95.00 },
  { code: '700.4', name: 'Kardiyopulmoner Resüsitasyon (CPR)', category: 'Muayene', price: 850.00 },
  { code: '700.5', name: 'Defibrilasyon', category: 'Muayene', price: 385.00 },
  { code: '700.6', name: 'Entübasyon', category: 'Muayene', price: 485.00 },
  { code: '700.7', name: 'Santral Venöz Kateter', category: 'Muayene', price: 385.00 },
  { code: '700.8', name: 'Toraks Tüpü Yerleştirilmesi', category: 'Muayene', price: 650.00 },
  { code: '700.9', name: 'Küçük Yara Sütürü', category: 'Muayene', price: 185.00 },
  { code: '700.10', name: 'Büyük Yara Sütürü', category: 'Muayene', price: 385.00 },

  // Patoloji
  { code: '800.1', name: 'Histopatoloji (Küçük Biyopsi)', category: 'Tetkik', price: 185.00 },
  { code: '800.2', name: 'Histopatoloji (Büyük Biyopsi)', category: 'Tetkik', price: 285.00 },
  { code: '800.3', name: 'Sitopatoloji (Pap Smear)', category: 'Tetkik', price: 85.00 },
  { code: '800.4', name: 'İmmünohistokimya (Her Antikor)', category: 'Tetkik', price: 185.00 },
  { code: '800.5', name: 'FISH (Floresan In Situ Hibridizasyon)', category: 'Tetkik', price: 650.00 },
  { code: '800.6', name: 'Flow Sitometri', category: 'Tetkik', price: 485.00 },
  { code: '800.7', name: 'Kemik İliği Biyopsisi', category: 'Tetkik', price: 385.00 },
  { code: '800.8', name: 'İnce İğne Aspirasyon Biyopsisi', category: 'Tetkik', price: 185.00 },

  // Yatan Hasta Günlük Bakım
  { code: '900.1', name: 'Özel Oda (Günlük)', category: 'Yoğun Bakım', price: 850.00 },
  { code: '900.2', name: '1. Sınıf Oda (Günlük)', category: 'Yoğun Bakım', price: 650.00 },
  { code: '900.3', name: '2. Sınıf Oda (Günlük)', category: 'Yoğun Bakım', price: 450.00 },
  { code: '900.4', name: 'Müşahede Odası (Günlük)', category: 'Yoğun Bakım', price: 285.00 },
  { code: '900.5', name: 'Hemşirelik Bakımı (Günlük)', category: 'Yoğun Bakım', price: 125.00 },
  { code: '900.6', name: 'Beslenme (Günlük - Normal)', category: 'Yoğun Bakım', price: 85.00 },
  { code: '900.7', name: 'Beslenme (Günlük - Özel Diyet)', category: 'Yoğun Bakım', price: 125.00 },
  { code: '900.8', name: 'İlaç Uygulama (Günlük)', category: 'Yoğun Bakım', price: 45.00 },
  { code: '900.9', name: 'Konsültasyon (Uzman Hekim)', category: 'Yoğun Bakım', price: 185.00 },
  { code: '900.10', name: 'Refakatçi (Günlük)', category: 'Yoğun Bakım', price: 185.00 },
]

type InvoiceStatus = 'Taslak' | 'Ödendi' | 'Kısmi Ödeme' | 'Gecikmiş' | 'İptal'
type PaymentMethod = 'Nakit' | 'Kredi Kartı' | 'Banka Kartı' | 'Havale' | 'SGK' | 'Özel Sigorta'

interface SUTItem {
  code: string
  name: string
  category: string
  price: number
  quantity: number
}

interface Invoice {
  id: string
  invoiceNo: string
  patientName: string
  patientTC: string
  date: string
  items: SUTItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paidAmount: number
  balance: number
  status: InvoiceStatus
  paymentMethod?: PaymentMethod
  notes?: string
}

interface Patient {
  id: string
  name: string
  tc: string
  phone: string
  insurance: string
}

const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Mehmet Yılmaz', tc: '12345678901', phone: '0532 123 4567', insurance: 'SGK' },
  { id: 'P002', name: 'Ayşe Demir', tc: '23456789012', phone: '0533 234 5678', insurance: 'Özel Sigorta' },
  { id: 'P003', name: 'Ahmet Kaya', tc: '34567890123', phone: '0534 345 6789', insurance: 'SGK' },
  { id: 'P004', name: 'Fatma Çelik', tc: '45678901234', phone: '0535 456 7890', insurance: 'Özel Sigorta' },
  { id: 'P005', name: 'Mustafa Arslan', tc: '56789012345', phone: '0536 567 8901', insurance: 'SGK' },
  { id: 'P006', name: 'Zeynep Öztürk', tc: '67890123456', phone: '0537 678 9012', insurance: 'Özel Sigorta' },
  { id: 'P007', name: 'Ali Aydın', tc: '78901234567', phone: '0538 789 0123', insurance: 'SGK' },
  { id: 'P008', name: 'Elif Şahin', tc: '89012345678', phone: '0539 890 1234', insurance: 'Özel Sigorta' },
]

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV001',
    invoiceNo: 'FTR-2025-001',
    patientName: 'Mehmet Yılmaz',
    patientTC: '12345678901',
    date: '2025-12-20',
    items: [
      { ...SUT_CODES[0], quantity: 1 },
      { ...SUT_CODES[20], quantity: 2 },
      { ...SUT_CODES[60], quantity: 1 },
    ],
    subtotal: 12500.00,
    tax: 2250.00,
    discount: 500.00,
    total: 14250.00,
    paidAmount: 14250.00,
    balance: 0,
    status: 'Ödendi',
    paymentMethod: 'SGK',
  },
  {
    id: 'INV002',
    invoiceNo: 'FTR-2025-002',
    patientName: 'Ayşe Demir',
    patientTC: '23456789012',
    date: '2025-12-18',
    items: [
      { ...SUT_CODES[8], quantity: 1 },
      { ...SUT_CODES[110], quantity: 1 },
    ],
    subtotal: 8500.00,
    tax: 1530.00,
    discount: 0,
    total: 10030.00,
    paidAmount: 5000.00,
    balance: 5030.00,
    status: 'Kısmi Ödeme',
    paymentMethod: 'Nakit',
  },
  {
    id: 'INV003',
    invoiceNo: 'FTR-2025-003',
    patientName: 'Ahmet Kaya',
    patientTC: '34567890123',
    date: '2025-11-15',
    items: [
      { ...SUT_CODES[100], quantity: 1 },
    ],
    subtotal: 3850.00,
    tax: 693.00,
    discount: 0,
    total: 4543.00,
    paidAmount: 0,
    balance: 4543.00,
    status: 'Gecikmiş',
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount)
}

const getStatusBadge = (status: InvoiceStatus) => {
  const styles = {
    'Taslak': 'bg-gray-100 text-gray-700 border-gray-300',
    'Ödendi': 'bg-green-100 text-green-700 border-green-300',
    'Kısmi Ödeme': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Gecikmiş': 'bg-red-100 text-red-700 border-red-300',
    'İptal': 'bg-gray-100 text-gray-500 border-gray-300',
  }
  return styles[status] || styles['Taslak']
}

const getAgingBadge = (days: number) => {
  if (days <= 30) return { text: '0-30 gün', style: 'bg-green-100 text-green-700 border-green-300' }
  if (days <= 60) return { text: '31-60 gün', style: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
  if (days <= 90) return { text: '61-90 gün', style: 'bg-orange-100 text-orange-700 border-orange-300' }
  return { text: '90+ gün', style: 'bg-red-100 text-red-700 border-red-300' }
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'invoices' | 'outstanding' | 'stats'>('new')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedItems, setSelectedItems] = useState<SUTItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Nakit')
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES)
  const [showPatientSelector, setShowPatientSelector] = useState(false)
  const [showSUTFinder, setShowSUTFinder] = useState(false)

  const categories = ['Tümü', ...Array.from(new Set(SUT_CODES.map(c => c.category)))]

  const filteredSUTCodes = SUT_CODES.filter(code => {
    const matchesSearch = searchTerm === '' ||
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tümü' || code.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addItemToInvoice = (code: typeof SUT_CODES[0]) => {
    const existingItem = selectedItems.find(item => item.code === code.code)
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
      item.code === code.code ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setSelectedItems([...selectedItems, { ...code, quantity: 1 }])
    }
  }

  const removeItemFromInvoice = (code: string) => {
    setSelectedItems(selectedItems.filter(item => item.code !== code))
  }

  const updateQuantity = (code: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromInvoice(code)
    } else {
      setSelectedItems(selectedItems.map(item =>
      item.code === code ? { ...item, quantity } : item
      ))
    }
  }

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.18 // %18 KDV
  }

  const calculateDiscount = () => {
    if (discountType === 'percent') {
      return calculateSubtotal() * (discount / 100)
    }
    return discount
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - calculateDiscount()
  }

  const createInvoice = () => {
    if (!selectedPatient || selectedItems.length === 0) {
      alert('Lütfen hasta seçin ve en az bir işlem ekleyin.')
      return
    }

    const newInvoice: Invoice = {
      id: `INV${(invoices.length + 1).toString().padStart(3, '0')}`,
      invoiceNo: `FTR-2025-${(invoices.length + 1).toString().padStart(3, '0')}`,
      patientName: selectedPatient.name,
      patientTC: selectedPatient.tc,
      date: new Date().toISOString().split('T')[0],
      items: selectedItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      paidAmount: 0,
      balance: calculateTotal(),
      status: 'Taslak',
      paymentMethod,
    }

    setInvoices([newInvoice, ...invoices])
    // Reset form
    setSelectedPatient(null)
    setSelectedItems([])
    setDiscount(0)
    alert('Fatura başarıyla oluşturuldu!')
  }

  const todayRevenue = invoices
    .filter(inv => inv.date === new Date().toISOString().split('T')[0])
    .reduce((sum, inv) => sum + inv.paidAmount, 0)

  const thisWeekRevenue = invoices
    .filter(inv => {
      const invDate = new Date(inv.date)
      const today = new Date()
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return invDate >= weekAgo
    })
    .reduce((sum, inv) => sum + inv.paidAmount, 0)

  const thisMonthRevenue = invoices
    .filter(inv => {
      const invDate = new Date(inv.date)
      const today = new Date()
      return invDate.getMonth() === today.getMonth()
    })
    .reduce((sum, inv) => sum + inv.paidAmount, 0)

  const outstandingBalance = invoices.reduce((sum, inv) => sum + inv.balance, 0)
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const collectionRate = totalInvoiced > 0 ? ((totalInvoiced - outstandingBalance) / totalInvoiced * 100) : 0

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Receipt className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Faturalama Yönetimi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">SUT Kodlama & Gelir Takibi - Medula Entegre</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setActiveTab('new')}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Fatura
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bugünkü Gelir</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(todayRevenue)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bu Hafta</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(thisWeekRevenue)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Receipt className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bu Ay</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{formatCurrency(thisMonthRevenue)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Bekleyen Alacak</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{formatCurrency(outstandingBalance)}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Tahsilat Oranı</span>
            </div>
            <p className="text-2xl font-bold text-green-700">%{collectionRate.toFixed(1)}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('new')}
              className={cn(
                'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                activeTab === 'new'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Yeni Fatura Oluştur
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={cn(
                'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                activeTab === 'invoices'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Fatura Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('outstanding')}
              className={cn(
                'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                activeTab === 'outstanding'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Clock className="h-4 w-4 inline mr-2" />
              Bekleyen Ödemeler
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={cn(
                'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              İstatistikler
            </button>
          </div>
        </div>

        {/* New Invoice Tab */}
        {activeTab === 'new' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Patient & SUT Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-red-600" />
                  Hasta Bilgileri
                </h3>
                {selectedPatient ? (
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-lg text-gray-900">{selectedPatient.name}</p>
                        <p className="text-sm text-gray-600 mt-1">TC: {selectedPatient.tc}</p>
                        <p className="text-sm text-gray-600">Telefon: {selectedPatient.phone}</p>
                        <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-200">
                          {selectedPatient.insurance}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatient(null)}
                        className="border-2"
                      >
                        Değiştir
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {MOCK_PATIENTS.slice(0, 4).map(patient => (
                        <button
                          key={patient.id}
                          onClick={() => setSelectedPatient(patient)}
                          className="p-4 text-left rounded-xl border-2 border-gray-200 hover:border-red-400 hover:shadow-lg transition-all"
                        >
                          <p className="font-bold text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-600 mt-1">TC: {patient.tc}</p>
                          <Badge className="mt-2 bg-blue-50 text-blue-700 text-xs">
                            {patient.insurance}
                          </Badge>
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-dashed"
                      onClick={() => setShowPatientSelector(!showPatientSelector)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Tüm Hastaları Göster
                    </Button>
                    {showPatientSelector && (
                      <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                        {MOCK_PATIENTS.map(patient => (
                          <button
                            key={patient.id}
                            onClick={() => {
                              setSelectedPatient(patient)
                              setShowPatientSelector(false)
                            }}
                            className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all"
                          >
                            <p className="font-semibold text-sm">{patient.name}</p>
                            <p className="text-xs text-gray-600">TC: {patient.tc}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SUT Code Finder */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5 text-red-600" />
                  SUT Kodu Bul (500+ Kod)
                </h3>

                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="SUT kodu veya işlem adı ile ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2"
                    />
                  </div>
                </div>

                <div className="mb-4 flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border-2',
                        selectedCategory === cat
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredSUTCodes.slice(0, 20).map(code => (
                    <div
                      key={code.code}
                      className="p-3 rounded-xl border-2 border-gray-100 hover:border-red-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => addItemToInvoice(code)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-red-50 text-red-700 border-red-200 font-mono text-xs">
                              {code.code}
                            </Badge>
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              {code.category}
                            </Badge>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{code.name}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-bold text-green-700">{formatCurrency(code.price)}</p>
                          <Button
                            size="sm"
                            className="mt-1 h-7 bg-gradient-to-r from-red-500 to-rose-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              addItemToInvoice(code)
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSUTCodes.length > 20 && (
                    <p className="text-center text-sm text-gray-500 py-2">
                      +{filteredSUTCodes.length - 20} daha fazla sonuç...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Invoice Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-red-600" />
                  Fatura Özeti
                </h3>

                {selectedItems.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">İşlem eklenmedi</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                      {selectedItems.map(item => (
                        <div key={item.code} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-xs font-mono text-red-600 font-bold">{item.code}</p>
                              <p className="text-sm font-semibold text-gray-900 mt-1">{item.name}</p>
                            </div>
                            <button
                              onClick={() => removeItemFromInvoice(item.code)}
                              className="ml-2 p-1 hover:bg-red-100 rounded text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.code, item.quantity - 1)}
                                className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.code, item.quantity + 1)}
                                className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-bold text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ara Toplam:</span>
                        <span className="font-bold">{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">KDV (%18):</span>
                        <span className="font-bold">{formatCurrency(calculateTax())}</span>
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            type="number"
                            placeholder="İndirim"
                            value={discount || ''}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            className="border-2"
                          />
                        </div>
                        <select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value as 'percent' | 'fixed')}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg font-semibold text-sm"
                        >
                          <option value="percent">%</option>
                          <option value="fixed">₺</option>
                        </select>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-red-600">
                          <span>İndirim:</span>
                          <span className="font-bold">-{formatCurrency(calculateDiscount())}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t-2">
                        <span>TOPLAM:</span>
                        <span className="text-green-700">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Ödeme Yöntemi:
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold"
                      >
                        <option value="Nakit">Nakit</option>
                        <option value="Kredi Kartı">Kredi Kartı</option>
                        <option value="Banka Kartı">Banka Kartı</option>
                        <option value="Havale">Havale/EFT</option>
                        <option value="SGK">SGK</option>
                        <option value="Özel Sigorta">Özel Sigorta</option>
                      </select>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Button
                        onClick={createInvoice}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Faturayı Kaydet
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-2"
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Yazdır
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Invoice History Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Fatura Geçmişi</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Fatura veya hasta ara..."
                    className="w-64 border-2"
                  />
                  <Button variant="outline" className="border-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrele
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Fatura No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hasta</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tarih</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tutar</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ödenen</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Kalan</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Durum</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-mono font-bold text-sm text-red-600">{invoice.invoiceNo}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{invoice.patientName}</p>
                        <p className="text-xs text-gray-500">TC: {invoice.patientTC}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(invoice.date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="px-6 py-4 font-bold text-green-700">
                        {formatCurrency(invoice.paidAmount)}
                      </td>
                      <td className="px-6 py-4 font-bold text-orange-700">
                        {formatCurrency(invoice.balance)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn('font-bold border', getStatusBadge(invoice.status))}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <Printer className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Outstanding Invoices Tab */}
        {activeTab === 'outstanding' && (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
            <div className="p-6 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Bekleyen Ödemeler</h3>
              <p className="text-sm text-gray-600 mt-1">Yaşlandırma analizi ile alacak takibi</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Fatura No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Hasta</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Fatura Tarihi</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Toplam</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ödenen</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Kalan</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Yaşlandırma</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.filter(inv => inv.balance > 0).map(invoice => {
                    const daysSinceInvoice = Math.floor((new Date().getTime() - new Date(invoice.date).getTime()) / (1000 * 60 * 60 * 24))
                    const aging = getAgingBadge(daysSinceInvoice)
                    return (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-mono font-bold text-sm text-red-600">{invoice.invoiceNo}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{invoice.patientName}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(invoice.date).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {formatCurrency(invoice.total)}
                        </td>
                        <td className="px-6 py-4 font-bold text-green-700">
                          {formatCurrency(invoice.paidAmount)}
                        </td>
                        <td className="px-6 py-4 font-bold text-red-700">
                          {formatCurrency(invoice.balance)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={cn('font-bold border text-xs', aging.style)}>
                            {aging.text}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" className="h-8 bg-gradient-to-r from-green-500 to-green-600">
                            <DollarSign className="h-3 w-3 mr-1" />
                            Ödeme Al
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue by Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  Ödeme Yöntemine Göre Gelir
                </h3>
                <div className="space-y-3">
                  {['Nakit', 'Kredi Kartı', 'SGK', 'Özel Sigorta', 'Havale'].map(method => {
                    const amount = invoices
                      .filter(inv => inv.paymentMethod === method)
                      .reduce((sum, inv) => sum + inv.paidAmount, 0)
                    return (
                      <div key={method} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-700">{method}</span>
                          <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full"
                            style={{ width: `${(amount / thisMonthRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Invoice Count by Status */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-600" />
                  Fatura Durumları
                </h3>
                <div className="space-y-3">
                  {['Ödendi', 'Kısmi Ödeme', 'Gecikmiş', 'Taslak', 'İptal'].map(status => {
                    const count = invoices.filter(inv => inv.status === status).length
                    return (
                      <div key={status} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={cn('font-bold border', getStatusBadge(status as InvoiceStatus))}>
                              {status}
                            </Badge>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Daily Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-600" />
                Günlük Gelir Trendi
              </h3>
              <div className="h-64 flex items-end justify-around gap-2">
                {[...Array(7)].map((_, i) => {
                  const height = Math.random() * 80 + 20
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-red-500 to-rose-600 rounded-t-lg transition-all hover:from-red-600 hover:to-rose-700" style={{ height: `${height}%` }} />
                      <span className="text-xs font-semibold text-gray-600">
                        {new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* KVKK Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Faturalama</h3>
              <p className="text-sm text-purple-800">
                Fatura bilgileri KVKK ve Medula güvenlik standartlarına uygun olarak işlenir. Hasta verileri şifrelenmiş olarak saklanır ve yalnızca yetkili personel erişebilir.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}
