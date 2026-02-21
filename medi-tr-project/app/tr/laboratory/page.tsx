'use client'

import { useState } from 'react'
import {
  FlaskConical,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Barcode,
  Activity,
  TrendingUp,
  AlertCircle,
  Shield,
  Printer,
  Mail,
  ArrowUp,
  ArrowDown,
  Send,
  CheckCheck,
  XCircle,
  Timer,
  TestTube,
  Users,
  Building2,
  ExternalLink,
  FileSpreadsheet,
  History,
  Beaker,
  Stethoscope,
  Zap,
  Bell,
  Eye,
  Edit,
} from 'lucide-react'
import { FileText as FilePdf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

// LOINC Test Database with 100+ tests
const loincTestDatabase = {
  'Tam Kan Sayımı (CBC)': [
    { loinc: '58410-2', testAdi: 'Tam Kan Sayımı Paneli', birim: '', referans: '-', kritikDusuk: null, kritikYuksek: null },
    { loinc: '718-7', testAdi: 'Hemoglobin', birim: 'g/dL', referans: '13.5-17.5 (E), 12.0-15.5 (K)', kritikDusuk: 7, kritikYuksek: 20 },
    { loinc: '789-8', testAdi: 'Eritrosit Sayısı (RBC)', birim: '10⁶/µL', referans: '4.5-5.9 (E), 4.1-5.1 (K)', kritikDusuk: 2.0, kritikYuksek: 7.0 },
    { loinc: '4544-3', testAdi: 'Hematokrit', birim: '%', referans: '41-53 (E), 36-46 (K)', kritikDusuk: 20, kritikYuksek: 60 },
    { loinc: '787-2', testAdi: 'MCV (Ortalama Eritrosit Hacmi)', birim: 'fL', referans: '80-100', kritikDusuk: null, kritikYuksek: null },
    { loinc: '785-6', testAdi: 'MCH (Ortalama Eritrosit Hb)', birim: 'pg', referans: '27-31', kritikDusuk: null, kritikYuksek: null },
    { loinc: '786-4', testAdi: 'MCHC', birim: 'g/dL', referans: '32-36', kritikDusuk: null, kritikYuksek: null },
    { loinc: '788-0', testAdi: 'RDW (Eritrosit Dağılım Genişliği)', birim: '%', referans: '11.5-14.5', kritikDusuk: null, kritikYuksek: null },
    { loinc: '6690-2', testAdi: 'Lökosit Sayısı (WBC)', birim: '10³/µL', referans: '4.5-11.0', kritikDusuk: 2.0, kritikYuksek: 30.0 },
    { loinc: '770-8', testAdi: 'Nötrofil %', birim: '%', referans: '40-70', kritikDusuk: null, kritikYuksek: null },
    { loinc: '751-8', testAdi: 'Nötrofil Sayısı', birim: '10³/µL', referans: '2.0-7.0', kritikDusuk: 0.5, kritikYuksek: null },
    { loinc: '736-9', testAdi: 'Lenfosit %', birim: '%', referans: '20-40', kritikDusuk: null, kritikYuksek: null },
    { loinc: '731-0', testAdi: 'Lenfosit Sayısı', birim: '10³/µL', referans: '1.0-4.0', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5905-5', testAdi: 'Monosit %', birim: '%', referans: '2-8', kritikDusuk: null, kritikYuksek: null },
    { loinc: '742-7', testAdi: 'Monosit Sayısı', birim: '10³/µL', referans: '0.2-0.8', kritikDusuk: null, kritikYuksek: null },
    { loinc: '713-8', testAdi: 'Eozinofil %', birim: '%', referans: '1-4', kritikDusuk: null, kritikYuksek: null },
    { loinc: '711-2', testAdi: 'Eozinofil Sayısı', birim: '10³/µL', referans: '0.0-0.4', kritikDusuk: null, kritikYuksek: null },
    { loinc: '706-2', testAdi: 'Bazofil %', birim: '%', referans: '0-1', kritikDusuk: null, kritikYuksek: null },
    { loinc: '704-7', testAdi: 'Bazofil Sayısı', birim: '10³/µL', referans: '0.0-0.1', kritikDusuk: null, kritikYuksek: null },
    { loinc: '777-3', testAdi: 'Trombosit Sayısı', birim: '10³/µL', referans: '150-400', kritikDusuk: 50, kritikYuksek: 1000 },
    { loinc: '32207-3', testAdi: 'MPV (Ortalama Trombosit Hacmi)', birim: 'fL', referans: '7.4-10.4', kritikDusuk: null, kritikYuksek: null },
    { loinc: '30395-0', testAdi: 'PCT (Plateletcrit)', birim: '%', referans: '0.2-0.5', kritikDusuk: null, kritikYuksek: null },
  ],
  'Biyokimya (Chemistry)': [
    { loinc: '2345-7', testAdi: 'Glukoz (Açlık)', birim: 'mg/dL', referans: '70-100', kritikDusuk: 50, kritikYuksek: 450 },
    { loinc: '2339-0', testAdi: 'Glukoz (Tokluk)', birim: 'mg/dL', referans: '<140', kritikDusuk: 50, kritikYuksek: 450 },
    { loinc: '4548-4', testAdi: 'HbA1c', birim: '%', referans: '4.0-6.0', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2160-0', testAdi: 'Kreatinin', birim: 'mg/dL', referans: '0.7-1.3 (E), 0.6-1.1 (K)', kritikDusuk: null, kritikYuksek: 10 },
    { loinc: '3094-0', testAdi: 'BUN (Üre)', birim: 'mg/dL', referans: '7-20', kritikDusuk: null, kritikYuksek: 100 },
    { loinc: '33914-3', testAdi: 'GFR (eGFR)', birim: 'mL/dk/1.73m²', referans: '>60', kritikDusuk: 15, kritikYuksek: null },
    { loinc: '3097-3', testAdi: 'BUN/Kreatinin Oranı', birim: '', referans: '10-20', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2951-2', testAdi: 'Sodyum (Na)', birim: 'mmol/L', referans: '136-145', kritikDusuk: 120, kritikYuksek: 160 },
    { loinc: '2823-3', testAdi: 'Potasyum (K)', birim: 'mmol/L', referans: '3.5-5.1', kritikDusuk: 2.5, kritikYuksek: 6.5 },
    { loinc: '2075-0', testAdi: 'Klorür (Cl)', birim: 'mmol/L', referans: '98-107', kritikDusuk: 80, kritikYuksek: 120 },
    { loinc: '2028-9', testAdi: 'Kalsiyum (Ca)', birim: 'mg/dL', referans: '8.5-10.5', kritikDusuk: 6.5, kritikYuksek: 13 },
    { loinc: '2601-3', testAdi: 'Magnezyum (Mg)', birim: 'mg/dL', referans: '1.7-2.4', kritikDusuk: 1.0, kritikYuksek: 5.0 },
    { loinc: '2777-1', testAdi: 'Fosfor (P)', birim: 'mg/dL', referans: '2.5-4.5', kritikDusuk: 1.0, kritikYuksek: 8.0 },
    { loinc: '1751-7', testAdi: 'Albumin', birim: 'g/dL', referans: '3.5-5.5', kritikDusuk: 2.0, kritikYuksek: null },
    { loinc: '2885-2', testAdi: 'Total Protein', birim: 'g/dL', referans: '6.4-8.3', kritikDusuk: null, kritikYuksek: null },
    { loinc: '1975-2', testAdi: 'Bilirubin Total', birim: 'mg/dL', referans: '0.3-1.2', kritikDusuk: null, kritikYuksek: 15 },
    { loinc: '1968-7', testAdi: 'Bilirubin Direkt', birim: 'mg/dL', referans: '0.0-0.3', kritikDusuk: null, kritikYuksek: null },
    { loinc: '1742-6', testAdi: 'ALT (SGPT)', birim: 'U/L', referans: '0-55 (E), 0-45 (K)', kritikDusuk: null, kritikYuksek: 1000 },
    { loinc: '1920-8', testAdi: 'AST (SGOT)', birim: 'U/L', referans: '5-40', kritikDusuk: null, kritikYuksek: 1000 },
    { loinc: '6768-6', testAdi: 'Alkalen Fosfataz (ALP)', birim: 'U/L', referans: '40-150', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2324-2', testAdi: 'GGT (Gama GT)', birim: 'U/L', referans: '0-55 (E), 0-38 (K)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2532-0', testAdi: 'LDH', birim: 'U/L', referans: '140-280', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2157-6', testAdi: 'CK (Kreatin Kinaz)', birim: 'U/L', referans: '26-192 (E), 26-140 (K)', kritikDusuk: null, kritikYuksek: 5000 },
    { loinc: '13969-1', testAdi: 'CK-MB', birim: 'U/L', referans: '<24', kritikDusuk: null, kritikYuksek: null },
    { loinc: '6598-7', testAdi: 'Troponin I', birim: 'ng/mL', referans: '<0.04', kritikDusuk: null, kritikYuksek: 0.5 },
    { loinc: '33762-6', testAdi: 'Troponin T (hs)', birim: 'ng/L', referans: '<14', kritikDusuk: null, kritikYuksek: 100 },
    { loinc: '30934-4', testAdi: 'BNP', birim: 'pg/mL', referans: '<100', kritikDusuk: null, kritikYuksek: null },
    { loinc: '33763-4', testAdi: 'NT-proBNP', birim: 'pg/mL', referans: '<125', kritikDusuk: null, kritikYuksek: null },
  ],
  'Hormon Testleri': [
    { loinc: '3016-3', testAdi: 'TSH', birim: 'µIU/mL', referans: '0.27-4.2', kritikDusuk: null, kritikYuksek: null },
    { loinc: '3026-2', testAdi: 'Free T3', birim: 'pg/mL', referans: '2.0-4.4', kritikDusuk: null, kritikYuksek: null },
    { loinc: '3024-7', testAdi: 'Free T4', birim: 'ng/dL', referans: '0.93-1.7', kritikDusuk: null, kritikYuksek: null },
    { loinc: '3053-6', testAdi: 'Total T3', birim: 'ng/dL', referans: '80-200', kritikDusuk: null, kritikYuksek: null },
    { loinc: '3051-0', testAdi: 'Total T4', birim: 'µg/dL', referans: '5.1-14.1', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5385-0', testAdi: 'Anti-TPO', birim: 'IU/mL', referans: '<34', kritikDusuk: null, kritikYuksek: null },
    { loinc: '8098-6', testAdi: 'Anti-Tg', birim: 'IU/mL', referans: '<115', kritikDusuk: null, kritikYuksek: null },
    { loinc: '1986-9', testAdi: 'Kortizol', birim: 'µg/dL', referans: '6.2-19.4', kritikDusuk: 3, kritikYuksek: 50 },
    { loinc: '2141-0', testAdi: 'ACTH', birim: 'pg/mL', referans: '7.2-63.3', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2986-8', testAdi: 'Testosteron', birim: 'ng/dL', referans: '280-1100 (E)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2243-4', testAdi: 'Östradiol (E2)', birim: 'pg/mL', referans: 'Siklusa göre değişir', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2039-6', testAdi: 'Progesteron', birim: 'ng/mL', referans: 'Siklusa göre değişir', kritikDusuk: null, kritikYuksek: null },
    { loinc: '10501-5', testAdi: 'FSH', birim: 'mIU/mL', referans: '1.5-12.4 (E)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '10508-0', testAdi: 'LH', birim: 'mIU/mL', referans: '1.7-8.6 (E)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2842-3', testAdi: 'Prolaktin', birim: 'ng/mL', referans: '4.0-15.2 (E), 4.0-18.4 (K)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '1558-6', testAdi: 'Parathormon (PTH)', birim: 'pg/mL', referans: '15-65', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2965-2', testAdi: 'Vitamin D (25-OH)', birim: 'ng/mL', referans: '30-100', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2464-6', testAdi: 'Vitamin B12', birim: 'pg/mL', referans: '200-900', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2284-8', testAdi: 'Folat', birim: 'ng/mL', referans: '3-17', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2498-4', testAdi: 'Ferritin', birim: 'ng/mL', referans: '30-400 (E), 15-150 (K)', kritikDusuk: null, kritikYuksek: null },
  ],
  'Lipid Profili': [
    { loinc: '2093-3', testAdi: 'Total Kolesterol', birim: 'mg/dL', referans: '<200', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2085-9', testAdi: 'HDL Kolesterol', birim: 'mg/dL', referans: '>40 (E), >50 (K)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '13457-7', testAdi: 'LDL Kolesterol (Hesaplanan)', birim: 'mg/dL', referans: '<130', kritikDusuk: null, kritikYuksek: null },
    { loinc: '18262-6', testAdi: 'LDL Kolesterol (Direkt)', birim: 'mg/dL', referans: '<130', kritikDusuk: null, kritikYuksek: null },
    { loinc: '2571-8', testAdi: 'Trigliserit', birim: 'mg/dL', referans: '<150', kritikDusuk: null, kritikYuksek: 1000 },
    { loinc: '13458-5', testAdi: 'VLDL Kolesterol', birim: 'mg/dL', referans: '5-40', kritikDusuk: null, kritikYuksek: null },
    { loinc: '9830-1', testAdi: 'Kolesterol/HDL Oranı', birim: '', referans: '<5', kritikDusuk: null, kritikYuksek: null },
  ],
  'Koagülasyon': [
    { loinc: '5902-2', testAdi: 'PT (Protrombin Zamanı)', birim: 'saniye', referans: '11-13.5', kritikDusuk: null, kritikYuksek: 30 },
    { loinc: '6301-6', testAdi: 'INR', birim: '', referans: '0.8-1.2', kritikDusuk: null, kritikYuksek: 5 },
    { loinc: '3173-2', testAdi: 'aPTT', birim: 'saniye', referans: '25-35', kritikDusuk: null, kritikYuksek: 100 },
    { loinc: '3255-7', testAdi: 'Fibrinojen', birim: 'mg/dL', referans: '200-400', kritikDusuk: 100, kritikYuksek: 700 },
    { loinc: '48065-7', testAdi: 'D-Dimer', birim: 'µg/mL', referans: '<0.5', kritikDusuk: null, kritikYuksek: null },
    { loinc: '27811-9', testAdi: 'Anti-Xa Aktivitesi', birim: 'IU/mL', referans: 'İlaca göre değişir', kritikDusuk: null, kritikYuksek: null },
  ],
  'İdrar Tahlili': [
    { loinc: '24357-6', testAdi: 'Tam İdrar Tahlili', birim: '', referans: '-', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5767-9', testAdi: 'İdrar Renk', birim: '', referans: 'Sarı', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5778-6', testAdi: 'İdrar Berraklık', birim: '', referans: 'Berrak', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5803-2', testAdi: 'İdrar pH', birim: '', referans: '4.5-8.0', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5811-5', testAdi: 'İdrar Dansite', birim: '', referans: '1.003-1.030', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5804-0', testAdi: 'İdrar Protein', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5792-7', testAdi: 'İdrar Glukoz', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5797-6', testAdi: 'İdrar Keton', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5794-3', testAdi: 'İdrar Hemoglobin', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5799-2', testAdi: 'İdrar Lökosit Esteraz', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5802-4', testAdi: 'İdrar Nitrit', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '13945-1', testAdi: 'İdrar Mikroskopi - Eritrosit', birim: '/HPF', referans: '0-3', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5821-4', testAdi: 'İdrar Mikroskopi - Lökosit', birim: '/HPF', referans: '0-5', kritikDusuk: null, kritikYuksek: null },
  ],
  'Seroloji': [
    { loinc: '22314-9', testAdi: 'HBsAg', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '16933-4', testAdi: 'Anti-HBs', birim: 'mIU/mL', referans: '>10 (koruyucu)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '13952-7', testAdi: 'Anti-HCV', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '7918-6', testAdi: 'Anti-HIV 1+2', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '22462-6', testAdi: 'RPR (VDRL)', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '5010-4', testAdi: 'TPHA', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '22327-1', testAdi: 'Rubella IgG', birim: 'IU/mL', referans: '>10 (bağışık)', kritikDusuk: null, kritikYuksek: null },
    { loinc: '40667-8', testAdi: 'Rubella IgM', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '22239-8', testAdi: 'Toxoplasma IgG', birim: 'IU/mL', referans: '<4', kritikDusuk: null, kritikYuksek: null },
    { loinc: '22244-8', testAdi: 'Toxoplasma IgM', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '22602-7', testAdi: 'CMV IgG', birim: 'IU/mL', referans: '<6', kritikDusuk: null, kritikYuksek: null },
    { loinc: '30325-7', testAdi: 'CMV IgM', birim: '', referans: 'Negatif', kritikDusuk: null, kritikYuksek: null },
    { loinc: '20575-7', testAdi: 'CRP (C-Reaktif Protein)', birim: 'mg/L', referans: '<5', kritikDusuk: null, kritikYuksek: null },
    { loinc: '1988-5', testAdi: 'CRP (hs)', birim: 'mg/L', referans: '<3', kritikDusuk: null, kritikYuksek: null },
    { loinc: '4537-7', testAdi: 'Sedimentasyon (ESR)', birim: 'mm/saat', referans: '<20', kritikDusuk: null, kritikYuksek: null },
    { loinc: '26881-3', testAdi: 'Prokalsitonin', birim: 'ng/mL', referans: '<0.5', kritikDusuk: null, kritikYuksek: 10 },
  ],
  'Mikrobiyoloji': [
    { loinc: '600-7', testAdi: 'Kan Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
    { loinc: '630-4', testAdi: 'İdrar Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
    { loinc: '624-7', testAdi: 'Boğaz Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
    { loinc: '625-4', testAdi: 'Balgam Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
    { loinc: '626-2', testAdi: 'Dışkı Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
    { loinc: '17928-3', testAdi: 'Yara Kültürü', birim: '', referans: 'Üreme yok', kritikDusuk: null, kritikYuksek: null },
  ],
}

// Test Panels
const testPanels = [
  {
    id: 'routine-checkup',
    adi: 'Rutin Check-Up Paneli',
    tests: ['58410-2', '2345-7', '2093-3', '2085-9', '13457-7', '2571-8', '2160-0', '3094-0', '1742-6', '1920-8', '3016-3'],
    description: 'Yıllık rutin kontrol için önerilen temel testler',
  },
  {
    id: 'diabetes-panel',
    adi: 'Diyabet Paneli',
    tests: ['2345-7', '2339-0', '4548-4', '2160-0', '3094-0', '2093-3', '2571-8', '2464-6'],
    description: 'Diyabet takibi ve komplikasyon taraması',
  },
  {
    id: 'thyroid-panel',
    adi: 'Tiroid Paneli',
    tests: ['3016-3', '3026-2', '3024-7', '5385-0', '8098-6'],
    description: 'Kapsamlı tiroid fonksiyon değerlendirmesi',
  },
  {
    id: 'lipid-panel',
    adi: 'Lipid Paneli',
    tests: ['2093-3', '2085-9', '13457-7', '2571-8', '9830-1'],
    description: 'Kardiyovasküler risk değerlendirmesi',
  },
  {
    id: 'liver-panel',
    adi: 'Karaciğer Fonksiyon Testleri',
    tests: ['1742-6', '1920-8', '6768-6', '2324-2', '1975-2', '1968-7', '1751-7'],
    description: 'Karaciğer fonksiyonlarının değerlendirilmesi',
  },
  {
    id: 'kidney-panel',
    adi: 'Böbrek Fonksiyon Testleri',
    tests: ['2160-0', '3094-0', '33914-3', '24357-6', '2951-2', '2823-3'],
    description: 'Böbrek fonksiyonlarının değerlendirilmesi',
  },
]

// Turkish Patient Data
const turkishPatients = [
  { id: 'P001', ad: 'Mehmet', soyad: 'Yılmaz', tcKimlik: '12345678901', dogumTarihi: '1975-05-15', cinsiyet: 'E' },
  { id: 'P002', ad: 'Ayşe', soyad: 'Demir', tcKimlik: '23456789012', dogumTarihi: '1982-08-22', cinsiyet: 'K' },
  { id: 'P003', ad: 'Ahmet', soyad: 'Şahin', tcKimlik: '34567890123', dogumTarihi: '1968-03-10', cinsiyet: 'E' },
  { id: 'P004', ad: 'Fatma', soyad: 'Kaya', tcKimlik: '45678901234', dogumTarihi: '1990-11-30', cinsiyet: 'K' },
  { id: 'P005', ad: 'Mustafa', soyad: 'Çelik', tcKimlik: '56789012345', dogumTarihi: '1955-07-18', cinsiyet: 'E' },
  { id: 'P006', ad: 'Zeynep', soyad: 'Arslan', tcKimlik: '67890123456', dogumTarihi: '1995-02-25', cinsiyet: 'K' },
  { id: 'P007', ad: 'Ali', soyad: 'Öztürk', tcKimlik: '78901234567', dogumTarihi: '1960-09-12', cinsiyet: 'E' },
  { id: 'P008', ad: 'Elif', soyad: 'Aydın', tcKimlik: '89012345678', dogumTarihi: '1988-04-05', cinsiyet: 'K' },
]

interface LabTest {
  id: string
  barkodNo: string
  protokolNo: string
  hasta: {
    id: string
    ad: string
    soyad: string
    tcKimlik: string
  }
  istemTarihi: string
  istemSaati: string
  numuneTipi: 'kan' | 'idrar' | 'serum' | 'plazma' | 'tam-kan' | 'doku'
  numuneAlinmaTarihi?: string
  numuneAlinmaSaati?: string
  toplayiciAd?: string
  tests: {
    loinc: string
    testAdi: string
    birim: string
    referans: string
    deger?: string
    durum: 'beklemede' | 'numune-alindi' | 'analiz-ediliyor' | 'tamamlandi' | 'onaylandi'
    kritik?: boolean
    flag?: 'high' | 'low' | 'normal'
  }[]
  durum: 'beklemede' | 'numune-alindi' | 'analiz-ediliyor' | 'tamamlandi' | 'onaylandi' | 'kritik-deger'
  oncelik: 'normal' | 'acil'
  istemYapan: string
  disLaboratuvar?: string
  onaylayanDoktor?: string
  onayTarihi?: string
  sonucGirisTarihi?: string
  gecenSure?: number
}

// Sample lab tests data
const generateSampleTests = (): LabTest[] => {
  const tests: LabTest[] = []

  // Test 1: Completed CBC with critical value
  tests.push({
    id: 'LAB001',
    barkodNo: 'LAB-2025-001234',
    protokolNo: 'PRO-2025-10001',
    hasta: turkishPatients[0],
    istemTarihi: '23.12.2025',
    istemSaati: '09:30',
    numuneTipi: 'tam-kan',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '09:45',
    toplayiciAd: 'Hemşire Ayşe Kara',
    tests: [
      { loinc: '718-7', testAdi: 'Hemoglobin', birim: 'g/dL', referans: '13.5-17.5', deger: '14.2', durum: 'onaylandi', flag: 'normal' },
      { loinc: '6690-2', testAdi: 'Lökosit Sayısı', birim: '10³/µL', referans: '4.5-11.0', deger: '7.8', durum: 'onaylandi', flag: 'normal' },
      { loinc: '777-3', testAdi: 'Trombosit Sayısı', birim: '10³/µL', referans: '150-400', deger: '245', durum: 'onaylandi', flag: 'normal' },
    ],
    durum: 'onaylandi',
    oncelik: 'normal',
    istemYapan: 'Dr. Ayşe Demir',
    onaylayanDoktor: 'Uzm. Dr. Ali Kaya',
    onayTarihi: '23.12.2025 11:30',
    sonucGirisTarihi: '23.12.2025 11:15',
    gecenSure: 105,
  })

  // Test 2: Critical glucose value
  tests.push({
    id: 'LAB002',
    barkodNo: 'LAB-2025-001235',
    protokolNo: 'PRO-2025-10002',
    hasta: turkishPatients[1],
    istemTarihi: '23.12.2025',
    istemSaati: '10:15',
    numuneTipi: 'serum',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '10:30',
    toplayiciAd: 'Hemşire Mehmet Yıldız',
    tests: [
      { loinc: '2345-7', testAdi: 'Glukoz (Açlık)', birim: 'mg/dL', referans: '70-100', deger: '485', durum: 'onaylandi', kritik: true, flag: 'high' },
      { loinc: '4548-4', testAdi: 'HbA1c', birim: '%', referans: '4.0-6.0', deger: '11.2', durum: 'onaylandi', flag: 'high' },
      { loinc: '2160-0', testAdi: 'Kreatinin', birim: 'mg/dL', referans: '0.7-1.3', deger: '1.1', durum: 'onaylandi', flag: 'normal' },
    ],
    durum: 'kritik-deger',
    oncelik: 'acil',
    istemYapan: 'Dr. Ahmet Şahin',
    onaylayanDoktor: 'Uzm. Dr. Zeynep Arslan',
    onayTarihi: '23.12.2025 12:45',
    sonucGirisTarihi: '23.12.2025 12:30',
    gecenSure: 135,
  })

  // Test 3: Pending urinalysis
  tests.push({
    id: 'LAB003',
    barkodNo: 'LAB-2025-001236',
    protokolNo: 'PRO-2025-10003',
    hasta: turkishPatients[2],
    istemTarihi: '23.12.2025',
    istemSaati: '11:00',
    numuneTipi: 'idrar',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '11:20',
    toplayiciAd: 'Hemşire Fatma Demir',
    tests: [
      { loinc: '5803-2', testAdi: 'İdrar pH', birim: '', referans: '4.5-8.0', durum: 'analiz-ediliyor' },
      { loinc: '5804-0', testAdi: 'İdrar Protein', birim: '', referans: 'Negatif', durum: 'analiz-ediliyor' },
      { loinc: '5792-7', testAdi: 'İdrar Glukoz', birim: '', referans: 'Negatif', durum: 'analiz-ediliyor' },
    ],
    durum: 'analiz-ediliyor',
    oncelik: 'normal',
    istemYapan: 'Dr. Mustafa Aydın',
    gecenSure: 45,
  })

  // Test 4: Sample collected, awaiting analysis
  tests.push({
    id: 'LAB004',
    barkodNo: 'LAB-2025-001237',
    protokolNo: 'PRO-2025-10004',
    hasta: turkishPatients[3],
    istemTarihi: '23.12.2025',
    istemSaati: '11:30',
    numuneTipi: 'serum',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '11:50',
    toplayiciAd: 'Hemşire Ali Kara',
    tests: [
      { loinc: '2093-3', testAdi: 'Total Kolesterol', birim: 'mg/dL', referans: '<200', durum: 'numune-alindi' },
      { loinc: '2085-9', testAdi: 'HDL Kolesterol', birim: 'mg/dL', referans: '>50', durum: 'numune-alindi' },
      { loinc: '13457-7', testAdi: 'LDL Kolesterol', birim: 'mg/dL', referans: '<130', durum: 'numune-alindi' },
      { loinc: '2571-8', testAdi: 'Trigliserit', birim: 'mg/dL', referans: '<150', durum: 'numune-alindi' },
    ],
    durum: 'numune-alindi',
    oncelik: 'normal',
    istemYapan: 'Dr. Zeynep Arslan',
    gecenSure: 20,
  })

  // Test 5: STAT order - critical potassium
  tests.push({
    id: 'LAB005',
    barkodNo: 'LAB-2025-001238',
    protokolNo: 'PRO-2025-10005',
    hasta: turkishPatients[4],
    istemTarihi: '23.12.2025',
    istemSaati: '12:00',
    numuneTipi: 'serum',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '12:10',
    toplayiciAd: 'Hemşire Elif Yılmaz',
    tests: [
      { loinc: '2823-3', testAdi: 'Potasyum (K)', birim: 'mmol/L', referans: '3.5-5.1', deger: '6.8', durum: 'onaylandi', kritik: true, flag: 'high' },
      { loinc: '2951-2', testAdi: 'Sodyum (Na)', birim: 'mmol/L', referans: '136-145', deger: '138', durum: 'onaylandi', flag: 'normal' },
      { loinc: '2160-0', testAdi: 'Kreatinin', birim: 'mg/dL', referans: '0.7-1.3', deger: '3.2', durum: 'onaylandi', flag: 'high' },
    ],
    durum: 'kritik-deger',
    oncelik: 'acil',
    istemYapan: 'Dr. Ali Öztürk',
    onaylayanDoktor: 'Uzm. Dr. Mehmet Kaya',
    onayTarihi: '23.12.2025 12:35',
    sonucGirisTarihi: '23.12.2025 12:30',
    gecenSure: 25,
  })

  // Test 6: External lab - send out
  tests.push({
    id: 'LAB006',
    barkodNo: 'LAB-2025-001239',
    protokolNo: 'PRO-2025-10006',
    hasta: turkishPatients[5],
    istemTarihi: '23.12.2025',
    istemSaati: '13:00',
    numuneTipi: 'serum',
    numuneAlinmaTarihi: '23.12.2025',
    numuneAlinmaSaati: '13:15',
    toplayiciAd: 'Hemşire Zeynep Aydın',
    tests: [
      { loinc: '33763-4', testAdi: 'NT-proBNP', birim: 'pg/mL', referans: '<125', durum: 'numune-alindi' },
      { loinc: '33762-6', testAdi: 'Troponin T (hs)', birim: 'ng/L', referans: '<14', durum: 'numune-alindi' },
    ],
    durum: 'numune-alindi',
    oncelik: 'acil',
    istemYapan: 'Dr. Fatma Demir',
    disLaboratuvar: 'Referans Laboratuvarı A.Ş.',
    gecenSure: 60,
  })

  // Test 7: Awaiting sample collection
  tests.push({
    id: 'LAB007',
    barkodNo: 'LAB-2025-001240',
    protokolNo: 'PRO-2025-10007',
    hasta: turkishPatients[6],
    istemTarihi: '23.12.2025',
    istemSaati: '14:00',
    numuneTipi: 'tam-kan',
    tests: [
      { loinc: '3016-3', testAdi: 'TSH', birim: 'µIU/mL', referans: '0.27-4.2', durum: 'beklemede' },
      { loinc: '3024-7', testAdi: 'Free T4', birim: 'ng/dL', referans: '0.93-1.7', durum: 'beklemede' },
      { loinc: '3026-2', testAdi: 'Free T3', birim: 'pg/mL', referans: '2.0-4.4', durum: 'beklemede' },
    ],
    durum: 'beklemede',
    oncelik: 'normal',
    istemYapan: 'Dr. Mehmet Yılmaz',
    gecenSure: 0,
  })

  return tests
}

// Trend data for graphs
const hemoglobinTrend = [
  { tarih: '15.11.25', deger: 13.8, referansMin: 13.5, referansMax: 17.5 },
  { tarih: '22.11.25', deger: 14.1, referansMin: 13.5, referansMax: 17.5 },
  { tarih: '29.11.25', deger: 14.0, referansMin: 13.5, referansMax: 17.5 },
  { tarih: '06.12.25', deger: 13.9, referansMin: 13.5, referansMax: 17.5 },
  { tarih: '13.12.25', deger: 14.3, referansMin: 13.5, referansMax: 17.5 },
  { tarih: '20.12.25', deger: 14.2, referansMin: 13.5, referansMax: 17.5 },
]

const glucoseTrend = [
  { tarih: '15.11.25', deger: 320, referansMin: 70, referansMax: 100 },
  { tarih: '22.11.25', deger: 295, referansMin: 70, referansMax: 100 },
  { tarih: '29.11.25', deger: 410, referansMin: 70, referansMax: 100 },
  { tarih: '06.12.25', deger: 365, referansMin: 70, referansMax: 100 },
  { tarih: '13.12.25', deger: 425, referansMin: 70, referansMax: 100 },
  { tarih: '20.12.25', deger: 485, referansMin: 70, referansMax: 100 },
]

const creatinineTrend = [
  { tarih: '15.10.25', deger: 0.9, referansMin: 0.7, referansMax: 1.3 },
  { tarih: '15.11.25', deger: 1.0, referansMin: 0.7, referansMax: 1.3 },
  { tarih: '29.11.25', deger: 1.2, referansMin: 0.7, referansMax: 1.3 },
  { tarih: '06.12.25', deger: 1.8, referansMin: 0.7, referansMax: 1.3 },
  { tarih: '13.12.25', deger: 2.5, referansMin: 0.7, referansMax: 1.3 },
  { tarih: '20.12.25', deger: 3.2, referansMin: 0.7, referansMax: 1.3 },
]

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'order' | 'collection' | 'results' | 'pending' | 'external' | 'patient-history' | 'stats'>('overview')
  const [labTests, setLabTests] = useState<LabTest[]>(generateSampleTests())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<typeof turkishPatients[0] | null>(null)
  const [selectedPanel, setSelectedPanel] = useState<string>('')
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [specimenType, setSpecimenType] = useState<string>('serum')
  const [isUrgent, setIsUrgent] = useState(false)
  const [showCollectionModal, setShowCollectionModal] = useState(false)
  const [collectionTest, setCollectionTest] = useState<LabTest | null>(null)
  const [showResultEntryModal, setShowResultEntryModal] = useState(false)
  const [resultEntryTest, setResultEntryTest] = useState<LabTest | null>(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [approvalTest, setApprovalTest] = useState<LabTest | null>(null)

  // Statistics
  const stats = {
    totalToday: labTests.length,
    pending: labTests.filter(t => t.durum === 'beklemede').length,
    collected: labTests.filter(t => t.durum === 'numune-alindi').length,
    analyzing: labTests.filter(t => t.durum === 'analiz-ediliyor').length,
    completed: labTests.filter(t => t.durum === 'onaylandi').length,
    critical: labTests.filter(t => t.durum === 'kritik-deger').length,
    avgTurnaroundTime: Math.round(labTests.filter(t => t.gecenSure).reduce((acc, t) => acc + (t.gecenSure || 0), 0) / labTests.filter(t => t.gecenSure).length) || 0,
    statOrders: labTests.filter(t => t.oncelik === 'acil').length,
  }

  const filteredTests = labTests.filter(test => {
    const matchesSearch =
      test.hasta.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.hasta.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.barkodNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.protokolNo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || test.durum === statusFilter
    const matchesPriority = priorityFilter === 'all' || test.oncelik === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const statusColors = {
    'beklemede': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'numune-alindi': 'bg-blue-100 text-blue-700 border-blue-300',
    'analiz-ediliyor': 'bg-purple-100 text-purple-700 border-purple-300',
    'tamamlandi': 'bg-green-100 text-green-700 border-green-300',
    'onaylandi': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'kritik-deger': 'bg-red-100 text-red-700 border-red-300',
  }

  const statusLabels = {
    'beklemede': 'Numune Bekleniyor',
    'numune-alindi': 'Numune Alındı',
    'analiz-ediliyor': 'Analiz Ediliyor',
    'tamamlandi': 'Tamamlandı',
    'onaylandi': 'Onaylandı',
    'kritik-deger': 'Kritik Değer!',
  }

  const generateBarcode = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `LAB-2025-${timestamp.toString().slice(-6)}${random}`
  }

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <FlaskConical className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Laboratuvar Yönetim Sistemi
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">Tam Entegre Laboratuvar Bilgi Sistemi - LOINC Standardı</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowNewOrderModal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Test İstemi
              </Button>
              <Button variant="outline" className="border-2">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel Export
              </Button>
              <Button variant="outline" className="border-2">
                <FilePdf className="h-4 w-4 mr-2" />
                PDF Rapor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="h-5 w-5 text-red-600" />
              <span className="text-xs font-semibold text-gray-600">Bugün Toplam</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalToday}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-yellow-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-xs font-semibold text-gray-600">Beklemede</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <TestTube className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-600">Numune Alındı</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.collected}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-purple-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-semibold text-gray-600">Analiz Ediliyor</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.analyzing}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-green-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-xs font-semibold text-gray-600">Onaylandı</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-red-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600">Kritik Değer</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.critical}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="text-xs font-semibold text-gray-600">STAT</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{stats.statOrders}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-indigo-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-semibold text-gray-600">Ort. Süre</span>
            </div>
            <p className="text-3xl font-bold text-indigo-700">{stats.avgTurnaroundTime}<span className="text-sm">dk</span></p>
          </div>
        </div>

        {/* Critical Values Alert */}
        {stats.critical > 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-red-500 rounded-xl p-3 animate-pulse">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">Kritik Değer Uyarısı - Acil Bildirim Gerekli!</h3>
                <p className="text-sm text-red-700 mb-3">
                  {stats.critical} test sonucu kritik değer içermektedir. İsteyen doktorlar derhal bilgilendirilmelidir!
                </p>
                <div className="flex gap-3">
                  <Button size="sm" variant="destructive">
                    <Bell className="h-4 w-4 mr-2" />
                    Doktorları Bilgilendir
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300">
                    <Eye className="h-4 w-4 mr-2" />
                    Kritik Değerleri Göster
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border-2 border-gray-100 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Tüm Testler', icon: FlaskConical },
              { id: 'order', label: 'Test İstemi', icon: Plus },
              { id: 'collection', label: 'Numune Toplama', icon: TestTube },
              { id: 'results', label: 'Sonuç Girişi', icon: Edit },
              { id: 'pending', label: 'Bekleyen Testler', icon: Clock },
              { id: 'external', label: 'Dış Laboratuvar', icon: ExternalLink },
              { id: 'patient-history', label: 'Hasta Sonuçları', icon: History },
              { id: 'stats', label: 'Trend Grafikleri', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Arama</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Hasta adı, barkod no, protokol no..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Durum</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">Tümü</option>
                    <option value="beklemede">Beklemede</option>
                    <option value="numune-alindi">Numune Alındı</option>
                    <option value="analiz-ediliyor">Analiz Ediliyor</option>
                    <option value="tamamlandi">Tamamlandı</option>
                    <option value="onaylandi">Onaylandı</option>
                    <option value="kritik-deger">Kritik Değer</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Öncelik</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">Tümü</option>
                    <option value="normal">Normal</option>
                    <option value="acil">Acil (STAT)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test List */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Laboratuvar Test Listesi</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      {filteredTests.length} test gösteriliyor
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                    <Activity className="h-3 w-3 mr-1" />
                    LOINC Standardı
                  </Badge>
                </div>
              </div>

              <div className="divide-y-2 divide-gray-100">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className={cn(
                      "p-6 hover:bg-red-50/30 transition-all",
                      test.durum === 'kritik-deger' && 'bg-red-50/20 border-l-4 border-l-red-500'
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl">
                          <FlaskConical className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">
                              {test.hasta.ad} {test.hasta.soyad}
                            </h4>
                            {test.oncelik === 'acil' && (
                              <Badge className="bg-red-600 text-white border-red-700 animate-pulse">
                                <Zap className="h-3 w-3 mr-1" />
                                STAT
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-mono">
                            Barkod: {test.barkodNo} • Protokol: {test.protokolNo}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={cn('font-semibold border-2', statusColors[test.durum])}>
                              {test.durum === 'kritik-deger' && <AlertTriangle className="h-3 w-3 mr-1 animate-pulse" />}
                              {statusLabels[test.durum]}
                            </Badge>
                            <Badge variant="outline" className="font-semibold">
                              {test.numuneTipi.charAt(0).toUpperCase() + test.numuneTipi.slice(1)}
                            </Badge>
                            {test.gecenSure !== undefined && test.gecenSure > 0 && (
                              <Badge variant="outline" className="font-mono text-xs">
                                <Timer className="h-3 w-3 mr-1" />
                                {test.gecenSure} dk
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-bold text-gray-900">İstem: {test.istemTarihi} {test.istemSaati}</span>
                        </div>
                        {test.onayTarihi && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="font-bold text-green-700">Onay: {test.onayTarihi}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Test Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-semibold text-gray-600">İstenen Testler ({test.tests.length})</span>
                        </div>
                        <div className="space-y-1">
                          {test.tests.slice(0, 3).map((t, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-semibold text-gray-900">{t.testAdi}</span>
                              <span className="text-gray-500 text-xs ml-2">(LOINC: {t.loinc})</span>
                            </div>
                          ))}
                          {test.tests.length > 3 && (
                            <p className="text-xs text-gray-500 font-semibold">+{test.tests.length - 3} test daha...</p>
                          )}
                        </div>
                      </div>

                      {test.tests.some(t => t.deger) && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="h-4 w-4 text-red-600" />
                            <span className="text-xs font-semibold text-gray-600">Sonuçlar</span>
                          </div>
                          <div className="space-y-2">
                            {test.tests.filter(t => t.deger).map((t, idx) => (
                              <div key={idx} className={cn(
                                "text-xs p-2 rounded-lg flex items-center justify-between",
                                t.kritik ? 'bg-red-100 border border-red-300' : 'bg-white border border-gray-200'
                              )}>
                                <div>
                                  <span className="font-semibold">{t.testAdi}:</span>{' '}
                                  <span className={cn("font-bold", t.kritik && 'text-red-700')}>
                                    {t.deger} {t.birim}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {t.flag === 'high' && <ArrowUp className="h-4 w-4 text-red-600" />}
                                  {t.flag === 'low' && <ArrowDown className="h-4 w-4 text-blue-600" />}
                                  {t.kritik && <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sample Collection Info */}
                    {test.numuneAlinmaTarihi && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center gap-2 text-sm">
                          <TestTube className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">
                            Numune Toplama: {test.numuneAlinmaTarihi} {test.numuneAlinmaSaati}
                          </span>
                          <span className="text-blue-700">• Toplayan: {test.toplayiciAd}</span>
                        </div>
                      </div>
                    )}

                    {/* External Lab Info */}
                    {test.disLaboratuvar && (
                      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
                        <div className="flex items-center gap-2 text-sm">
                          <ExternalLink className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-900">
                            Dış Laboratuvar: {test.disLaboratuvar}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Critical Value Alert */}
                    {test.durum === 'kritik-deger' && (
                      <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 animate-pulse" />
                          <div>
                            <span className="text-xs font-semibold text-red-700">Kritik Değer Uyarısı:</span>
                            <p className="text-sm text-red-900 mt-1">
                              Bu test kritik sonuç değeri içermektedir. İsteyen doktor ({test.istemYapan}) derhal bilgilendirilmelidir!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      {test.durum === 'beklemede' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              setCollectionTest(test)
                              setShowCollectionModal(true)
                            }}
                          >
                            <TestTube className="h-4 w-4 mr-1" />
                            Numune Topla
                          </Button>
                          <Button size="sm" variant="outline" className="border-2">
                            <Barcode className="h-4 w-4 mr-1" />
                            Barkod Bas
                          </Button>
                        </>
                      )}

                      {(test.durum === 'numune-alindi' || test.durum === 'analiz-ediliyor') && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => {
                            setResultEntryTest(test)
                            setShowResultEntryModal(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Sonuç Gir
                        </Button>
                      )}

                      {test.durum === 'tamamlandi' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setApprovalTest(test)
                            setShowApprovalModal(true)
                          }}
                        >
                          <CheckCheck className="h-4 w-4 mr-1" />
                          Onayla
                        </Button>
                      )}

                      {(test.durum === 'onaylandi' || test.durum === 'kritik-deger') && (
                        <>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Printer className="h-4 w-4 mr-1" />
                            Rapor Yazdır
                          </Button>
                          <Button size="sm" variant="outline" className="border-2">
                            <Mail className="h-4 w-4 mr-1" />
                            Doktora Gönder
                          </Button>
                        </>
                      )}

                      <Button size="sm" variant="outline" className="border-2">
                        <Eye className="h-4 w-4 mr-1" />
                        Detaylar
                      </Button>
                    </div>

                    {/* Approval Info */}
                    {test.onaylayanDoktor && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Onaylayan: <strong>{test.onaylayanDoktor}</strong></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Trend Graphs Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-600" />
                Hemoglobin Trend Grafiği - Mehmet Yılmaz
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hemoglobinTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tarih" />
                  <YAxis domain={[12, 18]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="referansMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Referans Üst" />
                  <Area type="monotone" dataKey="referansMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Referans Alt" />
                  <Line type="monotone" dataKey="deger" stroke="#dc2626" strokeWidth={3} name="Hemoglobin (g/dL)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-600" />
                Glukoz Trend Grafiği - Ayşe Demir
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={glucoseTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tarih" />
                  <YAxis domain={[0, 500]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="referansMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Normal Üst (100)" />
                  <Area type="monotone" dataKey="referansMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Normal Alt (70)" />
                  <Line type="monotone" dataKey="deger" stroke="#dc2626" strokeWidth={3} name="Glukoz (mg/dL)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Dikkat: Glukoz değerleri sürekli referans aralığının üzerinde seyretmektedir. Diyabet yönetimi gözden geçirilmelidir.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-600" />
                Kreatinin Trend Grafiği - Mustafa Çelik
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={creatinineTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tarih" />
                  <YAxis domain={[0, 4]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="referansMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Referans Üst (1.3)" />
                  <Area type="monotone" dataKey="referansMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Referans Alt (0.7)" />
                  <Line type="monotone" dataKey="deger" stroke="#dc2626" strokeWidth={3} name="Kreatinin (mg/dL)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Kritik: Kreatinin değerleri hızla yükselmektedir. Böbrek fonksiyonları bozulmuştur. Nefroloji konsültasyonu önerilir.
                </p>
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
              <h3 className="text-lg font-bold text-purple-900 mb-2">KVKK Uyumluluk - Laboratuvar Sistemi</h3>
              <p className="text-sm text-purple-800">
                Tüm laboratuvar sonuçları ve hasta bilgileri KVKK kapsamında korunmaktadır. LOINC kodları uluslararası
                standartlara uygundur. Kritik değer bildirimleri güvenli kanallardan yapılır ve kayıt altına alınır.
                Sistem ISO 15189 Tıbbi Laboratuvarlar akreditasyon standardına uygundur.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    
  )
}
