'use client'

import { useState } from 'react'
import {
  Stethoscope,
  FileText,
  Search,
  Plus,
  Save,
  Printer,
  Send,
  User,
  Calendar,
  Clock,
  Heart,
  Activity,
  Pill,
  TestTube,
  Scan,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  MessageSquare,
  History,
  X,
  Eye,
  Thermometer,
  Wind,
  Weight,
  Ruler,
  Droplet,
  ArrowRight,
  Download,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// ICD-10 Türkçe Tanılar (50+ tanı)
interface ICD10Kod {
  kod: string
  tanim: string
  kategori: string
}

const icd10Kodlari: ICD10Kod[] = [
  // Solunum Sistemi
  { kod: 'J00', tanim: 'Akut nazofarenjit (Nezle)', kategori: 'Solunum Sistemi' },
  { kod: 'J02.9', tanim: 'Akut farenjit', kategori: 'Solunum Sistemi' },
  { kod: 'J03.9', tanim: 'Akut tonsillit', kategori: 'Solunum Sistemi' },
  { kod: 'J06.9', tanim: 'Akut üst solunum yolu enfeksiyonu', kategori: 'Solunum Sistemi' },
  { kod: 'J11.1', tanim: 'Grip (İnfluenza)', kategori: 'Solunum Sistemi' },
  { kod: 'J18.9', tanim: 'Pnömoni', kategori: 'Solunum Sistemi' },
  { kod: 'J20.9', tanim: 'Akut bronşit', kategori: 'Solunum Sistemi' },
  { kod: 'J40', tanim: 'Bronşit (Akut veya kronik belirsiz)', kategori: 'Solunum Sistemi' },
  { kod: 'J44.0', tanim: 'KOAH (Kronik obstrüktif akciğer hastalığı)', kategori: 'Solunum Sistemi' },
  { kod: 'J45.9', tanim: 'Astım', kategori: 'Solunum Sistemi' },

  // Dolaşım Sistemi
  { kod: 'I10', tanim: 'Esansiyel (primer) hipertansiyon', kategori: 'Dolaşım Sistemi' },
  { kod: 'I11.9', tanim: 'Hipertansif kalp hastalığı', kategori: 'Dolaşım Sistemi' },
  { kod: 'I20.0', tanim: 'Angina pektoris', kategori: 'Dolaşım Sistemi' },
  { kod: 'I21.9', tanim: 'Akut miyokard infarktüsü', kategori: 'Dolaşım Sistemi' },
  { kod: 'I25.1', tanim: 'Aterosklerotik kalp hastalığı', kategori: 'Dolaşım Sistemi' },
  { kod: 'I48', tanim: 'Atriyal fibrilasyon ve flutter', kategori: 'Dolaşım Sistemi' },
  { kod: 'I50.0', tanim: 'Konjestif kalp yetmezliği', kategori: 'Dolaşım Sistemi' },
  { kod: 'I63.9', tanim: 'Serebral enfarkt (İskemik inme)', kategori: 'Dolaşım Sistemi' },
  { kod: 'I64', tanim: 'İnme', kategori: 'Dolaşım Sistemi' },
  { kod: 'I80.3', tanim: 'Derin ven trombozu', kategori: 'Dolaşım Sistemi' },

  // Endokrin Sistem
  { kod: 'E10.9', tanim: 'Tip 1 Diabetes Mellitus', kategori: 'Endokrin Sistem' },
  { kod: 'E11.9', tanim: 'Tip 2 Diabetes Mellitus', kategori: 'Endokrin Sistem' },
  { kod: 'E11.65', tanim: 'Tip 2 DM ile hiperglisemi', kategori: 'Endokrin Sistem' },
  { kod: 'E03.9', tanim: 'Hipotiroidi', kategori: 'Endokrin Sistem' },
  { kod: 'E05.9', tanim: 'Hipertiroidi (Tirotoksikoz)', kategori: 'Endokrin Sistem' },
  { kod: 'E66.9', tanim: 'Obezite', kategori: 'Endokrin Sistem' },
  { kod: 'E78.0', tanim: 'Hiperlipidemi (Yüksek kolesterol)', kategori: 'Endokrin Sistem' },
  { kod: 'E78.5', tanim: 'Hiperlipoproteinemi', kategori: 'Endokrin Sistem' },

  // Sindirim Sistemi
  { kod: 'K21.9', tanim: 'Gastroözofageal reflü hastalığı (GÖRH)', kategori: 'Sindirim Sistemi' },
  { kod: 'K29.0', tanim: 'Akut gastrit', kategori: 'Sindirim Sistemi' },
  { kod: 'K29.7', tanim: 'Kronik gastrit', kategori: 'Sindirim Sistemi' },
  { kod: 'K30', tanim: 'Dispepsi (Hazımsızlık)', kategori: 'Sindirim Sistemi' },
  { kod: 'K52.9', tanim: 'Gastroenterit', kategori: 'Sindirim Sistemi' },
  { kod: 'K58.0', tanim: 'İrritabl barsak sendromu (İBS)', kategori: 'Sindirim Sistemi' },
  { kod: 'K80.2', tanim: 'Safra taşı (Kolelitiyazis)', kategori: 'Sindirim Sistemi' },
  { kod: 'K81.0', tanim: 'Akut kolesistit', kategori: 'Sindirim Sistemi' },

  // Genitoüriner Sistem
  { kod: 'N10', tanim: 'Akut pyelonefrit', kategori: 'Genitoüriner Sistem' },
  { kod: 'N30.0', tanim: 'Akut sistit', kategori: 'Genitoüriner Sistem' },
  { kod: 'N39.0', tanim: 'İdrar yolu enfeksiyonu', kategori: 'Genitoüriner Sistem' },
  { kod: 'N18.9', tanim: 'Kronik böbrek hastalığı', kategori: 'Genitoüriner Sistem' },
  { kod: 'N20.0', tanim: 'Böbrek taşı', kategori: 'Genitoüriner Sistem' },

  // Kas-İskelet Sistemi
  { kod: 'M10.9', tanim: 'Gut (Artrit)', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M15.9', tanim: 'Poliartroz', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M16.9', tanim: 'Kalça osteoartriti', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M17.9', tanim: 'Diz osteoartriti', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M25.5', tanim: 'Eklem ağrısı', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M54.2', tanim: 'Servikal ağrı (Boyun ağrısı)', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M54.5', tanim: 'Bel ağrısı', kategori: 'Kas-İskelet Sistemi' },
  { kod: 'M79.3', tanim: 'Fibromiyalji', kategori: 'Kas-İskelet Sistemi' },

  // Sinir Sistemi
  { kod: 'G35', tanim: 'Multipl skleroz', kategori: 'Sinir Sistemi' },
  { kod: 'G40.9', tanim: 'Epilepsi', kategori: 'Sinir Sistemi' },
  { kod: 'G43.9', tanim: 'Migren', kategori: 'Sinir Sistemi' },
  { kod: 'G44.2', tanim: 'Gerilim tipi baş ağrısı', kategori: 'Sinir Sistemi' },
  { kod: 'G47.0', tanim: 'Uyku bozukluğu', kategori: 'Sinir Sistemi' },
  { kod: 'G56.0', tanim: 'Karpal tünel sendromu', kategori: 'Sinir Sistemi' },

  // Ruh Sağlığı
  { kod: 'F32.9', tanim: 'Depresif bozukluk', kategori: 'Ruh Sağlığı' },
  { kod: 'F41.1', tanim: 'Anksiyete bozukluğu', kategori: 'Ruh Sağlığı' },
  { kod: 'F41.9', tanim: 'Yaygın anksiyete bozukluğu', kategori: 'Ruh Sağlığı' },
  { kod: 'F43.1', tanim: 'Travma sonrası stres bozukluğu (TSSB)', kategori: 'Ruh Sağlığı' },

  // Semptomlar ve Bulgular
  { kod: 'R05', tanim: 'Öksürük', kategori: 'Semptomlar' },
  { kod: 'R06.0', tanim: 'Nefes darlığı (Dispne)', kategori: 'Semptomlar' },
  { kod: 'R07.4', tanim: 'Göğüs ağrısı', kategori: 'Semptomlar' },
  { kod: 'R10.4', tanim: 'Karın ağrısı', kategori: 'Semptomlar' },
  { kod: 'R11', tanim: 'Bulantı ve kusma', kategori: 'Semptomlar' },
  { kod: 'R50.9', tanim: 'Ateş', kategori: 'Semptomlar' },
  { kod: 'R51', tanim: 'Baş ağrısı', kategori: 'Semptomlar' },
  { kod: 'R53', tanim: 'Yorgunluk ve halsizlik', kategori: 'Semptomlar' },
  { kod: 'R55', tanim: 'Senkop (Bayılma)', kategori: 'Semptomlar' },
]

// Türk İlaçları (100+ ilaç)
interface Ilac {
  ad: string
  etkenMadde: string
  kategori: string
}

const turkIlaclar: Ilac[] = [
  // Ağrı Kesiciler
  { ad: 'Parol 500 mg', etkenMadde: 'Parasetamol', kategori: 'Ağrı Kesici' },
  { ad: 'Minoset 500 mg', etkenMadde: 'Parasetamol', kategori: 'Ağrı Kesici' },
  { ad: 'Aferin 500 mg', etkenMadde: 'Parasetamol', kategori: 'Ağrı Kesici' },
  { ad: 'Calpol 500 mg', etkenMadde: 'Parasetamol', kategori: 'Ağrı Kesici' },

  // NSAİİ (Antiinflamatuarlar)
  { ad: 'Arveles 25 mg', etkenMadde: 'Deksketoprofen', kategori: 'NSAİİ' },
  { ad: 'Voltaren 50 mg', etkenMadde: 'Diklofenak', kategori: 'NSAİİ' },
  { ad: 'Majezik 275 mg', etkenMadde: 'Naproksen', kategori: 'NSAİİ' },
  { ad: 'Apranax 550 mg', etkenMadde: 'Naproksen Sodyum', kategori: 'NSAİİ' },
  { ad: 'Artril 400 mg', etkenMadde: 'İbuprofen', kategori: 'NSAİİ' },
  { ad: 'Nurofen 400 mg', etkenMadde: 'İbuprofen', kategori: 'NSAİİ' },
  { ad: 'Artifen 400 mg', etkenMadde: 'İbuprofen', kategori: 'NSAİİ' },
  { ad: 'Kaspo 90 mg', etkenMadde: 'Etorikoksib', kategori: 'NSAİİ' },

  // Antibiyotikler
  { ad: 'Augmentin 1000 mg', etkenMadde: 'Amoksisilin-Klavulanat', kategori: 'Antibiyotik' },
  { ad: 'Augmentin Bid 1000 mg', etkenMadde: 'Amoksisilin-Klavulanat', kategori: 'Antibiyotik' },
  { ad: 'Clavunat 1000 mg', etkenMadde: 'Amoksisilin-Klavulanat', kategori: 'Antibiyotik' },
  { ad: 'Amoklavin 1000 mg', etkenMadde: 'Amoksisilin-Klavulanat', kategori: 'Antibiyotik' },
  { ad: 'Zinnat 500 mg', etkenMadde: 'Sefuroksim', kategori: 'Antibiyotik' },
  { ad: 'Cefaks 500 mg', etkenMadde: 'Sefuroksim', kategori: 'Antibiyotik' },
  { ad: 'Zithromax 500 mg', etkenMadde: 'Azitromisin', kategori: 'Antibiyotik' },
  { ad: 'Azitrox 500 mg', etkenMadde: 'Azitromisin', kategori: 'Antibiyotik' },
  { ad: 'Azi-Once 500 mg', etkenMadde: 'Azitromisin', kategori: 'Antibiyotik' },
  { ad: 'Cipro 500 mg', etkenMadde: 'Siprofloksasin', kategori: 'Antibiyotik' },
  { ad: 'Ciproktan 500 mg', etkenMadde: 'Siprofloksasin', kategori: 'Antibiyotik' },
  { ad: 'Klacid 500 mg', etkenMadde: 'Klaritromisin', kategori: 'Antibiyotik' },
  { ad: 'Fromilid 500 mg', etkenMadde: 'Klaritromisin', kategori: 'Antibiyotik' },

  // Proton Pompa İnhibitörleri (Mide İlaçları)
  { ad: 'Lansor 30 mg', etkenMadde: 'Lansoprazol', kategori: 'Mide İlacı' },
  { ad: 'Lansox 30 mg', etkenMadde: 'Lansoprazol', kategori: 'Mide İlacı' },
  { ad: 'Nexium 40 mg', etkenMadde: 'Esomeprazol', kategori: 'Mide İlacı' },
  { ad: 'Losec 20 mg', etkenMadde: 'Omeprazol', kategori: 'Mide İlacı' },
  { ad: 'Omeprol 20 mg', etkenMadde: 'Omeprazol', kategori: 'Mide İlacı' },
  { ad: 'Pantpas 40 mg', etkenMadde: 'Pantoprazol', kategori: 'Mide İlacı' },
  { ad: 'Controloc 40 mg', etkenMadde: 'Pantoprazol', kategori: 'Mide İlacı' },
  { ad: 'Rabezol 20 mg', etkenMadde: 'Rabeprazol', kategori: 'Mide İlacı' },
  { ad: 'Pariet 20 mg', etkenMadde: 'Rabeprazol', kategori: 'Mide İlacı' },

  // H2 Reseptör Blokerleri
  { ad: 'Ranitab 150 mg', etkenMadde: 'Ranitidin', kategori: 'Mide İlacı' },
  { ad: 'Ulcuran 150 mg', etkenMadde: 'Ranitidin', kategori: 'Mide İlacı' },
  { ad: 'Famox 40 mg', etkenMadde: 'Famotidin', kategori: 'Mide İlacı' },

  // Antihistaminikler (Alerji)
  { ad: 'Aerius 5 mg', etkenMadde: 'Desloratidin', kategori: 'Antihistaminik' },
  { ad: 'Denosin 5 mg', etkenMadde: 'Desloratidin', kategori: 'Antihistaminik' },
  { ad: 'Zyrtec 10 mg', etkenMadde: 'Setirizin', kategori: 'Antihistaminik' },
  { ad: 'Cetra 10 mg', etkenMadde: 'Setirizin', kategori: 'Antihistaminik' },
  { ad: 'Telfast 120 mg', etkenMadde: 'Feksofenadine', kategori: 'Antihistaminik' },
  { ad: 'Allegra 120 mg', etkenMadde: 'Feksofenadine', kategori: 'Antihistaminik' },
  { ad: 'Xyzal 5 mg', etkenMadde: 'Levosetirisin', kategori: 'Antihistaminik' },

  // Bronkodilatörler (Solunum)
  { ad: 'Ventolin İnhaler', etkenMadde: 'Salbutamol', kategori: 'Bronkodilatör' },
  { ad: 'Berotec İnhaler', etkenMadde: 'Fenoterol', kategori: 'Bronkodilatör' },
  { ad: 'Seretide Diskus', etkenMadde: 'Flutikason-Salmeterol', kategori: 'Bronkodilatör' },
  { ad: 'Symbicort Turbuhaler', etkenMadde: 'Budesonid-Formoterol', kategori: 'Bronkodilatör' },
  { ad: 'Spiriva', etkenMadde: 'Tiotropyum', kategori: 'Bronkodilatör' },

  // Öksürük Şurupları
  { ad: 'Sudogest Şurup', etkenMadde: 'Guaifenesin', kategori: 'Öksürük Şurubu' },
  { ad: 'Pulmexan Şurup', etkenMadde: 'Guaifenesin-Difenhidramin', kategori: 'Öksürük Şurubu' },
  { ad: 'Koflet Şurup', etkenMadde: 'Bitkisel', kategori: 'Öksürük Şurubu' },
  { ad: 'Sinecod Damla', etkenMadde: 'Butamirat', kategori: 'Öksürük Şurubu' },

  // Diyabet İlaçları
  { ad: 'Glucophage 1000 mg', etkenMadde: 'Metformin', kategori: 'Antidiyabetik' },
  { ad: 'Diaformin 1000 mg', etkenMadde: 'Metformin', kategori: 'Antidiyabetik' },
  { ad: 'Amaryl 2 mg', etkenMadde: 'Glimepirid', kategori: 'Antidiyabetik' },
  { ad: 'Glimepid 2 mg', etkenMadde: 'Glimepirid', kategori: 'Antidiyabetik' },
  { ad: 'Januvia 100 mg', etkenMadde: 'Sitagliptin', kategori: 'Antidiyabetik' },
  { ad: 'Galvus 50 mg', etkenMadde: 'Vildagliptin', kategori: 'Antidiyabetik' },
  { ad: 'Forxiga 10 mg', etkenMadde: 'Dapagliflozin', kategori: 'Antidiyabetik' },
  { ad: 'Jardiance 10 mg', etkenMadde: 'Empagliflozin', kategori: 'Antidiyabetik' },

  // Kardiyovasküler İlaçlar
  { ad: 'Norvasc 5 mg', etkenMadde: 'Amlodipin', kategori: 'Antihipertansif' },
  { ad: 'Amplod 5 mg', etkenMadde: 'Amlodipin', kategori: 'Antihipertansif' },
  { ad: 'Coversyl 5 mg', etkenMadde: 'Perindopril', kategori: 'ACE İnhibitörü' },
  { ad: 'Prexum 5 mg', etkenMadde: 'Perindopril', kategori: 'ACE İnhibitörü' },
  { ad: 'Tritace 5 mg', etkenMadde: 'Ramipril', kategori: 'ACE İnhibitörü' },
  { ad: 'Ramil 5 mg', etkenMadde: 'Ramipril', kategori: 'ACE İnhibitörü' },
  { ad: 'Diovan 80 mg', etkenMadde: 'Valsartan', kategori: 'ARB' },
  { ad: 'Valsacor 80 mg', etkenMadde: 'Valsartan', kategori: 'ARB' },
  { ad: 'Cozaar 50 mg', etkenMadde: 'Losartan', kategori: 'ARB' },
  { ad: 'Lortaan 50 mg', etkenMadde: 'Losartan', kategori: 'ARB' },
  { ad: 'Beloc Zok 50 mg', etkenMadde: 'Metoprolol', kategori: 'Beta Bloker' },
  { ad: 'Metpamid 50 mg', etkenMadde: 'Metoprolol', kategori: 'Beta Bloker' },
  { ad: 'Concor 5 mg', etkenMadde: 'Bisoprolol', kategori: 'Beta Bloker' },
  { ad: 'Bisocard 5 mg', etkenMadde: 'Bisoprolol', kategori: 'Beta Bloker' },
  { ad: 'Tenormin 50 mg', etkenMadde: 'Atenolol', kategori: 'Beta Bloker' },

  // Statin (Kolesterol)
  { ad: 'Lipitor 20 mg', etkenMadde: 'Atorvastatin', kategori: 'Statin' },
  { ad: 'Ator 20 mg', etkenMadde: 'Atorvastatin', kategori: 'Statin' },
  { ad: 'Crestor 10 mg', etkenMadde: 'Rosuvastatin', kategori: 'Statin' },
  { ad: 'Rosucard 10 mg', etkenMadde: 'Rosuvastatin', kategori: 'Statin' },
  { ad: 'Sortis 20 mg', etkenMadde: 'Atorvastatin', kategori: 'Statin' },

  // Antikoagülanlar
  { ad: 'Coraspin 100 mg', etkenMadde: 'Aspirin', kategori: 'Antikoagülan' },
  { ad: 'Ecopirin 100 mg', etkenMadde: 'Aspirin', kategori: 'Antikoagülan' },
  { ad: 'Plavix 75 mg', etkenMadde: 'Klopidogrel', kategori: 'Antikoagülan' },
  { ad: 'Plagril 75 mg', etkenMadde: 'Klopidogrel', kategori: 'Antikoagülan' },
  { ad: 'Xarelto 20 mg', etkenMadde: 'Rivaroksaban', kategori: 'Antikoagülan' },
  { ad: 'Eliquis 5 mg', etkenMadde: 'Apiksaban', kategori: 'Antikoagülan' },

  // Diüretikler
  { ad: 'Lasix 40 mg', etkenMadde: 'Furosemid', kategori: 'Diüretik' },
  { ad: 'Desal 40 mg', etkenMadde: 'Furosemid', kategori: 'Diüretik' },
  { ad: 'Aldactone 25 mg', etkenMadde: 'Spironolakton', kategori: 'Diüretik' },

  // Tiroid İlaçları
  { ad: 'Levotiron 100 mcg', etkenMadde: 'Levotiroksin', kategori: 'Tiroid' },
  { ad: 'Euthyrox 100 mcg', etkenMadde: 'Levotiroksin', kategori: 'Tiroid' },
  { ad: 'Tefor 100 mcg', etkenMadde: 'Levotiroksin', kategori: 'Tiroid' },

  // Antidepresanlar
  { ad: 'Cipralex 10 mg', etkenMadde: 'Essitalopram', kategori: 'Antidepresan' },
  { ad: 'Selectra 10 mg', etkenMadde: 'Essitalopram', kategori: 'Antidepresan' },
  { ad: 'Prozac 20 mg', etkenMadde: 'Fluoksetin', kategori: 'Antidepresan' },
  { ad: 'Depreks 20 mg', etkenMadde: 'Fluoksetin', kategori: 'Antidepresan' },
  { ad: 'Lustral 50 mg', etkenMadde: 'Sertralin', kategori: 'Antidepresan' },
  { ad: 'Sertra 50 mg', etkenMadde: 'Sertralin', kategori: 'Antidepresan' },

  // Anksiyolitikler
  { ad: 'Xanax 0.5 mg', etkenMadde: 'Alprazolam', kategori: 'Anksiyolitik' },
  { ad: 'Mirzaten 15 mg', etkenMadde: 'Mirtazapin', kategori: 'Anksiyolitik' },

  // Vitaminler ve Mineraller
  { ad: 'Kalsiyum-D 600 mg', etkenMadde: 'Kalsiyum+D3', kategori: 'Vitamin' },
  { ad: 'Caltrate 600 mg', etkenMadde: 'Kalsiyum+D3', kategori: 'Vitamin' },
  { ad: 'Devit-3 50000 IU', etkenMadde: 'D Vitamini', kategori: 'Vitamin' },
  { ad: 'Devarol 300000 IU', etkenMadde: 'D Vitamini', kategori: 'Vitamin' },
  { ad: 'Ferro-Sanol 100 mg', etkenMadde: 'Demir', kategori: 'Vitamin' },
  { ad: 'Ferrosanol Duodenal', etkenMadde: 'Demir', kategori: 'Vitamin' },
  { ad: 'B12 Ankermann', etkenMadde: 'B12 Vitamini', kategori: 'Vitamin' },

  // Göz Damlaları
  { ad: 'Dexa-Sine Göz Damlası', etkenMadde: 'Deksametazon', kategori: 'Göz Damlası' },
  { ad: 'Tobrex Göz Damlası', etkenMadde: 'Tobramisin', kategori: 'Göz Damlası' },
  { ad: 'Refresh Tears', etkenMadde: 'Karboksimetilselüloz', kategori: 'Göz Damlası' },
  { ad: 'Systane', etkenMadde: 'Polietilen glikol', kategori: 'Göz Damlası' },
]

// Laboratuvar Testleri (LOINC)
interface LabTest {
  kod: string
  ad: string
  kategori: string
}

const labTestleri: LabTest[] = [
  // Tam Kan
  { kod: '58410-2', ad: 'Tam Kan Sayımı (Hemogram)', kategori: 'Tam Kan' },
  { kod: '718-7', ad: 'Hemoglobin', kategori: 'Tam Kan' },
  { kod: '787-2', ad: 'Hematokrit', kategori: 'Tam Kan' },
  { kod: '6690-2', ad: 'Lökosit Sayısı (WBC)', kategori: 'Tam Kan' },
  { kod: '777-3', ad: 'Trombosit Sayısı', kategori: 'Tam Kan' },
  { kod: '789-8', ad: 'Eritrosit Sayısı (RBC)', kategori: 'Tam Kan' },
  { kod: '4544-3', ad: 'Sedimentasyon (ESR)', kategori: 'Tam Kan' },

  // Biyokimya
  { kod: '2345-7', ad: 'Açlık Kan Şekeri (Glukoz)', kategori: 'Biyokimya' },
  { kod: '4548-4', ad: 'HbA1c (Glikozile hemoglobin)', kategori: 'Biyokimya' },
  { kod: '2160-0', ad: 'Kreatinin', kategori: 'Biyokimya' },
  { kod: '3094-0', ad: 'Üre (BUN)', kategori: 'Biyokimya' },
  { kod: '2951-2', ad: 'Sodyum (Na)', kategori: 'Biyokimya' },
  { kod: '2823-3', ad: 'Potasyum (K)', kategori: 'Biyokimya' },
  { kod: '17861-6', ad: 'Kalsiyum (Ca)', kategori: 'Biyokimya' },
  { kod: '1742-6', ad: 'ALT (SGPT)', kategori: 'Biyokimya' },
  { kod: '1920-8', ad: 'AST (SGOT)', kategori: 'Biyokimya' },
  { kod: '1975-2', ad: 'Bilirubin Total', kategori: 'Biyokimya' },
  { kod: '1968-7', ad: 'Bilirubin Direkt', kategori: 'Biyokimya' },
  { kod: '6768-6', ad: 'Alkalen Fosfataz (ALP)', kategori: 'Biyokimya' },
  { kod: '2093-3', ad: 'Total Kolesterol', kategori: 'Biyokimya' },
  { kod: '2571-8', ad: 'Trigliserit', kategori: 'Biyokimya' },
  { kod: '2085-9', ad: 'HDL Kolesterol', kategori: 'Biyokimya' },
  { kod: '13457-7', ad: 'LDL Kolesterol', kategori: 'Biyokimya' },
  { kod: '3084-1', ad: 'Ürik Asit', kategori: 'Biyokimya' },
  { kod: '17861-6', ad: 'Kalsiyum', kategori: 'Biyokimya' },
  { kod: '2777-1', ad: 'Fosfor', kategori: 'Biyokimya' },
  { kod: '2885-2', ad: 'Total Protein', kategori: 'Biyokimya' },
  { kod: '1751-7', ad: 'Albumin', kategori: 'Biyokimya' },

  // Koagülasyon
  { kod: '5902-2', ad: 'PT (Protrombin Zamanı)', kategori: 'Koagülasyon' },
  { kod: '6301-6', ad: 'INR', kategori: 'Koagülasyon' },
  { kod: '3173-2', ad: 'aPTT', kategori: 'Koagülasyon' },

  // Tiroid
  { kod: '3016-3', ad: 'TSH', kategori: 'Hormon' },
  { kod: '3026-2', ad: 'fT3 (Serbest T3)', kategori: 'Hormon' },
  { kod: '3024-7', ad: 'fT4 (Serbest T4)', kategori: 'Hormon' },

  // Kardiyak Markerlar
  { kod: '10839-9', ad: 'Troponin I', kategori: 'Kardiyak' },
  { kod: '33762-6', ad: 'NT-proBNP', kategori: 'Kardiyak' },
  { kod: '2157-6', ad: 'CK-MB', kategori: 'Kardiyak' },

  // Enfeksiyon Markerları
  { kod: '1988-5', ad: 'CRP (C-Reaktif Protein)', kategori: 'Enfeksiyon' },
  { kod: '26881-3', ad: 'Prokalsitonin', kategori: 'Enfeksiyon' },

  // İdrar Testi
  { kod: '5767-9', ad: 'Tam İdrar Tahlili', kategori: 'İdrar' },
  { kod: '5804-0', ad: 'İdrar Protein', kategori: 'İdrar' },
  { kod: '5811-5', ad: 'İdrar Glukoz', kategori: 'İdrar' },
  { kod: '5794-3', ad: 'İdrar Hemoglobin', kategori: 'İdrar' },
  { kod: '630-4', ad: 'İdrar Lökosit', kategori: 'İdrar' },

  // Vitamin
  { kod: '14635-7', ad: 'Vitamin D (25-OH)', kategori: 'Vitamin' },
  { kod: '2132-9', ad: 'Vitamin B12', kategori: 'Vitamin' },
  { kod: '2284-8', ad: 'Folat (Folik Asit)', kategori: 'Vitamin' },
  { kod: '2276-4', ad: 'Ferritin', kategori: 'Vitamin' },

  // Hepatit Markerları
  { kod: '5196-1', ad: 'HBsAg (Hepatit B yüzey antijeni)', kategori: 'Seroloji' },
  { kod: '16128-1', ad: 'Anti-HCV (Hepatit C antikoru)', kategori: 'Seroloji' },
  { kod: '7905-3', ad: 'Anti-HIV', kategori: 'Seroloji' },
]

// Radyoloji İncelemeleri
interface RadiolojiTest {
  kod: string
  ad: string
  bolge: string
}

const radiolojiTestleri: RadiolojiTest[] = [
  // X-Ray
  { kod: 'XR-CHEST-PA', ad: 'Akciğer Grafisi PA', bolge: 'Göğüs' },
  { kod: 'XR-CHEST-LAT', ad: 'Akciğer Grafisi Lateral', bolge: 'Göğüs' },
  { kod: 'XR-ABDOMEN', ad: 'Ayakta Direk Karın Grafisi (ADBG)', bolge: 'Karın' },
  { kod: 'XR-SPINE-LS', ad: 'Lomber Vertebra Grafisi AP+Lateral', bolge: 'Omurga' },
  { kod: 'XR-SPINE-C', ad: 'Servikal Vertebra Grafisi AP+Lateral', bolge: 'Omurga' },
  { kod: 'XR-KNEE', ad: 'Diz Grafisi AP+Lateral', bolge: 'Ekstremite' },
  { kod: 'XR-SHOULDER', ad: 'Omuz Grafisi AP', bolge: 'Ekstremite' },
  { kod: 'XR-HAND', ad: 'El Grafisi AP', bolge: 'Ekstremite' },
  { kod: 'XR-FOOT', ad: 'Ayak Grafisi AP+Lateral', bolge: 'Ekstremite' },
  { kod: 'XR-PELVIS', ad: 'Pelvis Grafisi AP', bolge: 'Pelvis' },

  // CT
  { kod: 'CT-BRAIN', ad: 'Beyin Bilgisayarlı Tomografi (BT)', bolge: 'Baş' },
  { kod: 'CT-CHEST', ad: 'Toraks BT', bolge: 'Göğüs' },
  { kod: 'CT-ABDOMEN', ad: 'Abdomen BT', bolge: 'Karın' },
  { kod: 'CT-SINUS', ad: 'Paranazal Sinüs BT', bolge: 'Baş' },
  { kod: 'CT-SPINE-L', ad: 'Lomber BT', bolge: 'Omurga' },
  { kod: 'CT-SPINE-C', ad: 'Servikal BT', bolge: 'Omurga' },

  // MRI
  { kod: 'MRI-BRAIN', ad: 'Beyin Manyetik Rezonans (MR)', bolge: 'Baş' },
  { kod: 'MRI-SPINE-L', ad: 'Lomber Omurga MR', bolge: 'Omurga' },
  { kod: 'MRI-SPINE-C', ad: 'Servikal Omurga MR', bolge: 'Omurga' },
  { kod: 'MRI-KNEE', ad: 'Diz MR', bolge: 'Ekstremite' },
  { kod: 'MRI-SHOULDER', ad: 'Omuz MR', bolge: 'Ekstremite' },
  { kod: 'MRI-ABDOMEN', ad: 'Karın MR', bolge: 'Karın' },

  // Ultrason
  { kod: 'US-ABDOMEN', ad: 'Tüm Batın Ultrasonografi', bolge: 'Karın' },
  { kod: 'US-THYROID', ad: 'Tiroid Ultrasonografi', bolge: 'Boyun' },
  { kod: 'US-BREAST', ad: 'Meme Ultrasonografi', bolge: 'Meme' },
  { kod: 'US-CAROTID', ad: 'Karotis Doppler USG', bolge: 'Boyun' },
  { kod: 'US-RENAL', ad: 'Böbrek Ultrasonografi', bolge: 'Karın' },
  { kod: 'US-PELVIC', ad: 'Pelvik Ultrasonografi', bolge: 'Pelvis' },
  { kod: 'US-CARDIAC', ad: 'Ekokardiyografi (EKO)', bolge: 'Kalp' },

  // Diğer
  { kod: 'MAMMO', ad: 'Mamografi', bolge: 'Meme' },
  { kod: 'DEXA', ad: 'DEXA (Kemik Yoğunluk Ölçümü)', bolge: 'Kemik' },
  { kod: 'ECG', ad: 'Elektrokardiyografi (EKG)', bolge: 'Kalp' },
]

// Branşlar
const konsultasyonBranslari = [
  'Kardiyoloji',
  'Nöroloji',
  'Göğüs Hastalıkları',
  'Gastroenteroloji',
  'Endokrinoloji',
  'Nefroloji',
  'Hematoloji',
  'Romatoloji',
  'Enfeksiyon Hastalıkları',
  'Ortopedi ve Travmatoloji',
  'Genel Cerrahi',
  'Beyin ve Sinir Cerrahisi',
  'Kalp ve Damar Cerrahisi',
  'Göğüs Cerrahisi',
  'Üroloji',
  'Kadın Hastalıkları ve Doğum',
  'Göz Hastalıkları',
  'KBB (Kulak Burun Boğaz)',
  'Dermatoloji',
  'Psikiyatri',
  'Fizik Tedavi ve Rehabilitasyon',
  'Radyasyon Onkolojisi',
  'Tıbbi Onkoloji',
]

// Şikayet Şablonları
const sikayetSablonlari = [
  'Göğüs ağrısı ve nefes darlığı',
  'Ateş, öksürük ve boğaz ağrısı',
  'Baş ağrısı ve baş dönmesi',
  'Karın ağrısı, bulantı ve kusma',
  'Bel ve boyun ağrısı',
  'Halsizlik ve yorgunluk',
  'Öksürük ve balgam çıkarma',
  'İdrar yaparken yanma',
  'Eklem ağrısı ve şişlik',
  'Çarpıntı ve göğüs sıkışması',
]

// Fizik Muayene Sistemleri
const fizikMuayeneSistemleri = [
  { id: 'genel', ad: 'Genel Durum' },
  { id: 'solunum', ad: 'Solunum Sistemi' },
  { id: 'kardiyovaskuler', ad: 'Kardiyovasküler Sistem' },
  { id: 'gastrointestinal', ad: 'Gastrointestinal Sistem' },
  { id: 'norolojik', ad: 'Nörolojik Sistem' },
  { id: 'kasiskelet', ad: 'Kas-İskelet Sistemi' },
  { id: 'dermatolojik', ad: 'Cilt ve Ekleri' },
]

interface Hasta {
  id: string
  ad: string
  soyad: string
  tcKimlik: string
  dogumTarihi: string
  yas: number
  cinsiyet: string
  telefon: string
  adres: string
  kanGrubu: string
}

interface VitalBelirtiler {
  tansiyon: string
  nabiz: string
  ates: string
  spo2: string
  kilo: string
  boy: string
}

interface ReceteIlac {
  ilac: Ilac
  doz: string
  frekans: string
  sure: string
  kullanimSekli: string
  aciklama: string
}

interface PreviousVisit {
  tarih: string
  doktor: string
  tani: string
  notlar: string
}

export default function ExaminationPage() {
  // Hasta Bilgileri
  const [hastaArama, setHastaArama] = useState('')
  const [secilenHasta, setSecilenHasta] = useState<Hasta | null>({
    id: 'P-12345',
    ad: 'Mehmet',
    soyad: 'Yılmaz',
    tcKimlik: '12345678901',
    dogumTarihi: '15.03.1978',
    yas: 47,
    cinsiyet: 'Erkek',
    telefon: '+90 532 123 4567',
    adres: 'Kızılay Mahallesi, Ankara',
    kanGrubu: 'A Rh+'
  })

  // Vital Belirtiler
  const [vitalBelirtiler, setVitalBelirtiler] = useState<VitalBelirtiler>({
    tansiyon: '130/85',
    nabiz: '78',
    ates: '37.2',
    spo2: '98',
    kilo: '82',
    boy: '175',
  })

  // Muayene Bilgileri
  const [anamnez, setAnamnez] = useState('')
  const [fizikMuayene, setFizikMuayene] = useState<Record<string, string>>({})
  const [icd10Arama, setIcd10Arama] = useState('')
  const [secilenICD10, setSecilenICD10] = useState<ICD10Kod[]>([])

  // İlaç Bilgileri
  const [ilacArama, setIlacArama] = useState('')
  const [receteIlaclar, setReceteIlaclar] = useState<ReceteIlac[]>([])
  const [yeniIlac, setYeniIlac] = useState<{
    ilac: Ilac | null
    doz: string
    frekans: string
    sure: string
    kullanimSekli: string
    aciklama: string
  }>({
    ilac: null,
    doz: '',
    frekans: '1x1',
    sure: '7 gün',
    kullanimSekli: 'Oral',
    aciklama: '',
  })

  // Lab ve Radyoloji
  const [labArama, setLabArama] = useState('')
  const [secilenLabTestler, setSecilenLabTestler] = useState<LabTest[]>([])
  const [radiolojiArama, setRadyolojiArama] = useState('')
  const [secilenRadyolojiTestler, setSecilenRadyolojiTestler] = useState<RadiolojiTest[]>([])

  // Konsültasyon
  const [konsultasyonBrans, setKonsultasyonBrans] = useState('')
  const [konsultasyonAciliyet, setKonsultasyonAciliyet] = useState('Normal')
  const [konsultasyonNotu, setKonsultasyonNotu] = useState('')

  // Diğer
  const [eNabizSync, setENabizSync] = useState(true)
  const [tedaviNotu, setTedaviNotu] = useState('')
  const [activeTab, setActiveTab] = useState('vital')

  // Önceki Muayeneler
  const [previousVisits] = useState<PreviousVisit[]>([
    {
      tarih: '15.11.2024',
      doktor: 'Dr. Ayşe Demir',
      tani: 'Hipertansiyon kontrolü',
      notlar: 'Tansiyon kontrolü iyi, ilaç tedavisi devam',
    },
    {
      tarih: '03.10.2024',
      doktor: 'Dr. Mehmet Kaya',
      tani: 'Akut üst solunum yolu enfeksiyonu',
      notlar: 'Antibiyotik tedavisi verildi, 7 gün sonra kontrol',
    },
    {
      tarih: '22.08.2024',
      doktor: 'Dr. Ayşe Demir',
      tani: 'Rutin kontrol',
      notlar: 'Genel sağlık durumu iyi',
    },
  ])

  // Filtreleme fonksiyonları
  const filtrelenmisICD10 = icd10Kodlari.filter(
    (kod) =>
      kod.kod.toLowerCase().includes(icd10Arama.toLowerCase()) ||
      kod.tanim.toLowerCase().includes(icd10Arama.toLowerCase()) ||
      kod.kategori.toLowerCase().includes(icd10Arama.toLowerCase())
  )

  const filtrelenmisIlaclar = turkIlaclar.filter(
    (ilac) =>
      ilac.ad.toLowerCase().includes(ilacArama.toLowerCase()) ||
      ilac.etkenMadde.toLowerCase().includes(ilacArama.toLowerCase()) ||
      ilac.kategori.toLowerCase().includes(ilacArama.toLowerCase())
  )

  const filtrelenmisLabTestler = labTestleri.filter(
    (test) =>
      test.ad.toLowerCase().includes(labArama.toLowerCase()) ||
      test.kod.toLowerCase().includes(labArama.toLowerCase()) ||
      test.kategori.toLowerCase().includes(labArama.toLowerCase())
  )

  const filtrelenmisRadyolojiTestler = radiolojiTestleri.filter(
    (test) =>
      test.ad.toLowerCase().includes(radiolojiArama.toLowerCase()) ||
      test.kod.toLowerCase().includes(radiolojiArama.toLowerCase()) ||
      test.bolge.toLowerCase().includes(radiolojiArama.toLowerCase())
  )

  // İşlem fonksiyonları
  const icd10Ekle = (kod: ICD10Kod) => {
    if (!secilenICD10.find((k) => k.kod === kod.kod)) {
      setSecilenICD10([...secilenICD10, kod])
    }
  }

  const icd10Cikar = (kod: string) => {
    setSecilenICD10(secilenICD10.filter((k) => k.kod !== kod))
  }

  const ilacReceteyeEkle = () => {
    if (yeniIlac.ilac && yeniIlac.doz && yeniIlac.frekans) {
      setReceteIlaclar([
      ...receteIlaclar,
      {
        ilac: yeniIlac.ilac,
        doz: yeniIlac.doz,
        frekans: yeniIlac.frekans,
        sure: yeniIlac.sure,
        kullanimSekli: yeniIlac.kullanimSekli,
        aciklama: yeniIlac.aciklama,
      },
      ])
      setYeniIlac({
      ilac: null,
      doz: '',
      frekans: '1x1',
      sure: '7 gün',
      kullanimSekli: 'Oral',
      aciklama: '',
      })
      setIlacArama('')
    }
  }

  const ilacRecetedenCikar = (index: number) => {
    setReceteIlaclar(receteIlaclar.filter((_, i) => i !== index))
  }

  const labTestEkle = (test: LabTest) => {
    if (!secilenLabTestler.find((t) => t.kod === test.kod)) {
      setSecilenLabTestler([...secilenLabTestler, test])
    }
  }

  const labTestCikar = (kod: string) => {
    setSecilenLabTestler(secilenLabTestler.filter((t) => t.kod !== kod))
  }

  const radiolojiTestEkle = (test: RadiolojiTest) => {
    if (!secilenRadyolojiTestler.find((t) => t.kod === test.kod)) {
      setSecilenRadyolojiTestler([...secilenRadyolojiTestler, test])
    }
  }

  const radiolojiTestCikar = (kod: string) => {
    setSecilenRadyolojiTestler(secilenRadyolojiTestler.filter((t) => t.kod !== kod))
  }

  const muayeneKaydet = () => {
    alert('Muayene kaydedildi!')
  }

  const raporYazdir = () => {
    alert('Muayene raporu yazdırılıyor...')
  }

  const eNabizaGonder = () => {
    alert('Muayene bilgileri e-Nabız\'a gönderiliyor...')
  }

  return (
    
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/30">
      {/* Başlık */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg shadow-red-500/30">
                  <Stethoscope className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Poliklinik Muayene
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    Hasta Muayene & Tedavi Planlama Sistemi
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={muayeneKaydet}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Muayeneyi Kaydet
              </Button>
              <Button
                onClick={eNabizaGonder}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                e-Nabız'a Gönder
              </Button>
              <Button onClick={raporYazdir} variant="outline" className="border-2">
                <Printer className="h-4 w-4 mr-2" />
                Rapor Yazdır
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sol Panel - Hasta Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            {/* Hasta Bilgileri Kartı */}
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-xl">
                    <User className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Hasta Bilgileri</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {secilenHasta ? (
                  <>
                    <div>
                      <span className="text-xs font-semibold text-gray-600">Ad Soyad</span>
                      <p className="text-lg font-bold text-gray-900">
                        {secilenHasta.ad} {secilenHasta.soyad}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600">TC Kimlik</span>
                        <p className="font-mono text-sm font-bold text-gray-900">
                          {secilenHasta.tcKimlik}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600">Yaş</span>
                        <p className="font-bold text-gray-900">{secilenHasta.yas} yaş</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-600">Cinsiyet</span>
                        <p className="font-bold text-gray-900">{secilenHasta.cinsiyet}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600">Kan Grubu</span>
                        <p className="font-bold text-red-600">{secilenHasta.kanGrubu}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-600">Doğum Tarihi</span>
                      <p className="font-bold text-gray-900">{secilenHasta.dogumTarihi}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-600">Telefon</span>
                      <p className="font-bold text-gray-900">{secilenHasta.telefon}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-600">Adres</span>
                      <p className="text-sm text-gray-700">{secilenHasta.adres}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <Input
                      placeholder="Hasta TC Kimlik No veya Ad Soyad..."
                      value={hastaArama}
                      onChange={(e) => setHastaArama(e.target.value)}
                      className="border-2"
                    />
                    <Button className="w-full mt-3">
                      <Search className="h-4 w-4 mr-2" />
                      Hasta Ara
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Önceki Muayeneler */}
            <Card className="border-2 border-blue-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Önceki Muayeneler</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {previousVisits.map((visit, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-blue-50 border-2 border-blue-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-900">{visit.tarih}</span>
                      </div>
                      <p className="text-xs text-gray-700 font-semibold">{visit.doktor}</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">{visit.tani}</p>
                      <p className="text-xs text-gray-600 mt-1">{visit.notlar}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* e-Nabız Sync */}
            <Card className="border-2 border-green-100 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-bold text-green-900">e-Nabız Senkronizasyon</p>
                      <p className="text-xs text-green-700">Otomatik gönderim</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={eNabizSync}
                    onCheckedChange={(checked) => setENabizSync(checked as boolean)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orta & Sağ Panel - Muayene Formu */}
          <div className="lg:col-span-3 space-y-6">
            {/* Vital Belirtiler */}
            <Card className="border-2 border-rose-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-xl">
                    <Activity className="h-5 w-5 text-rose-600" />
                  </div>
                  <CardTitle className="text-lg">Vital Belirtiler</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Heart className="h-3 w-3" />
                      Tansiyon (mmHg)
                    </label>
                    <Input
                      value={vitalBelirtiler.tansiyon}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, tansiyon: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="120/80"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Activity className="h-3 w-3" />
                      Nabız (atım/dk)
                    </label>
                    <Input
                      value={vitalBelirtiler.nabiz}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, nabiz: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Thermometer className="h-3 w-3" />
                      Ateş (°C)
                    </label>
                    <Input
                      value={vitalBelirtiler.ates}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, ates: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="36.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Wind className="h-3 w-3" />
                      SpO2 (%)
                    </label>
                    <Input
                      value={vitalBelirtiler.spo2}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, spo2: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="98"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Weight className="h-3 w-3" />
                      Kilo (kg)
                    </label>
                    <Input
                      value={vitalBelirtiler.kilo}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, kilo: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1 mb-2">
                      <Ruler className="h-3 w-3" />
                      Boy (cm)
                    </label>
                    <Input
                      value={vitalBelirtiler.boy}
                      onChange={(e) =>
                        setVitalBelirtiler({ ...vitalBelirtiler, boy: e.target.value })
                      }
                      className="border-2 font-bold"
                      placeholder="170"
                    />
                  </div>
                </div>
                {vitalBelirtiler.kilo && vitalBelirtiler.boy && (
                  <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <p className="text-sm font-semibold text-blue-900">
                      BMI (Vücut Kitle İndeksi):{' '}
                      <span className="text-lg">
                        {(
                          parseFloat(vitalBelirtiler.kilo) /
                          Math.pow(parseFloat(vitalBelirtiler.boy) / 100, 2)
                        ).toFixed(1)}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Anamnez */}
            <Card className="border-2 border-purple-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Anamnez (Hasta Şikayeti)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={anamnez}
                  onChange={(e) => setAnamnez(e.target.value)}
                  placeholder="Hastanın şikayetlerini, yakınmalarını ve öyküsünü detaylı olarak yazınız..."
                  className="min-h-[120px] border-2 text-base"
                />
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Sık Kullanılan Şablonlar:</p>
                  <div className="flex flex-wrap gap-2">
                    {sikayetSablonlari.map((sablon, idx) => (
                      <Badge
                        key={idx}
                        className="bg-gray-100 text-gray-700 cursor-pointer hover:bg-purple-100 hover:text-purple-700"
                        onClick={() => setAnamnez(anamnez + (anamnez ? ', ' : '') + sablon)}
                      >
                        + {sablon}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fizik Muayene */}
            <Card className="border-2 border-teal-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-xl">
                    <Clipboard className="h-5 w-5 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">Fizik Muayene Bulguları (Sistem Bazlı)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fizikMuayeneSistemleri.map((sistem) => (
                    <div key={sistem.id}>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        {sistem.ad}
                      </label>
                      <Textarea
                        value={fizikMuayene[sistem.id] || ''}
                        onChange={(e) =>
                          setFizikMuayene({ ...fizikMuayene, [sistem.id]: e.target.value })
                        }
                        placeholder={`${sistem.ad} muayene bulgularını yazınız...`}
                        className="min-h-[80px] border-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ICD-10 Tanı Kodları */}
            <Card className="border-2 border-red-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-xl">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">ICD-10 Tanı Kodları (50+ Tanı)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Seçilen Tanılar */}
                {secilenICD10.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <p className="text-sm font-semibold text-red-900 mb-3">Seçilen Tanılar:</p>
                    <div className="space-y-2">
                      {secilenICD10.map((kod) => (
                        <div
                          key={kod.kod}
                          className="flex items-center justify-between p-3 bg-white border-2 border-red-200 rounded-lg"
                        >
                          <div>
                            <Badge className="bg-red-600 text-white font-mono mr-2">{kod.kod}</Badge>
                            <span className="font-semibold text-gray-900">{kod.tanim}</span>
                            <span className="text-sm text-gray-600 ml-2">({kod.kategori})</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => icd10Cikar(kod.kod)}
                            className="text-red-600 hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ICD-10 Arama */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="ICD-10 kodu, hastalık adı veya kategori ara... (70+ tanı)"
                    value={icd10Arama}
                    onChange={(e) => setIcd10Arama(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>

                {/* ICD-10 Listesi */}
                <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
                  {filtrelenmisICD10.map((kod) => (
                    <div
                      key={kod.kod}
                      onClick={() => icd10Ekle(kod)}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-gray-600 text-white font-mono mr-2">{kod.kod}</Badge>
                          <span className="font-semibold text-gray-900">{kod.tanim}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {kod.kategori}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* e-Reçete (100+ İlaç) */}
            <Card className="border-2 border-green-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Pill className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">e-Reçete (100+ Türk İlacı)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Reçete Edilmiş İlaçlar */}
                {receteIlaclar.length > 0 && (
                  <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <p className="text-sm font-semibold text-green-900 mb-3">Reçete Edilen İlaçlar:</p>
                    <div className="space-y-2">
                      {receteIlaclar.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-3 bg-white border-2 border-green-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{item.ilac.ad}</p>
                            <p className="text-xs text-gray-600">Etken Madde: {item.ilac.etkenMadde}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
                              <span className="font-semibold">Doz: {item.doz}</span>
                              <span className="font-semibold">Frekans: {item.frekans}</span>
                              <span className="font-semibold">Süre: {item.sure}</span>
                              <span className="font-semibold">Kullanım: {item.kullanimSekli}</span>
                            </div>
                            {item.aciklama && (
                              <p className="text-xs text-gray-600 mt-1">Not: {item.aciklama}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => ilacRecetedenCikar(index)}
                            className="text-red-600 hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* İlaç Ekleme Formu */}
                <div className="space-y-4">
                  {/* İlaç Arama */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="İlaç adı, etken madde veya kategori ara... (100+ ilaç)"
                      value={ilacArama}
                      onChange={(e) => setIlacArama(e.target.value)}
                      className="pl-10 border-2"
                    />
                  </div>

                  {/* İlaç Listesi */}
                  {ilacArama && (
                    <div className="max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar">
                      {filtrelenmisIlaclar.slice(0, 20).map((ilac, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setYeniIlac({ ...yeniIlac, ilac })
                            setIlacArama('')
                          }}
                          className="p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{ilac.ad}</p>
                              <p className="text-xs text-gray-600">
                                {ilac.etkenMadde} - {ilac.kategori}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {ilac.kategori}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Seçili İlaç Detayları */}
                  {yeniIlac.ilac && (
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <p className="font-bold text-green-900 mb-3">Seçili İlaç: {yeniIlac.ilac.ad}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">Doz</label>
                          <Input
                            placeholder="500 mg"
                            value={yeniIlac.doz}
                            onChange={(e) => setYeniIlac({ ...yeniIlac, doz: e.target.value })}
                            className="border-2"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">Frekans</label>
                          <select
                            value={yeniIlac.frekans}
                            onChange={(e) => setYeniIlac({ ...yeniIlac, frekans: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
                          >
                            <option>1x1</option>
                            <option>2x1</option>
                            <option>3x1</option>
                            <option>4x1</option>
                            <option>1x2</option>
                            <option>2x2</option>
                            <option>3x2</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">Süre</label>
                          <select
                            value={yeniIlac.sure}
                            onChange={(e) => setYeniIlac({ ...yeniIlac, sure: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
                          >
                            <option>3 gün</option>
                            <option>5 gün</option>
                            <option>7 gün</option>
                            <option>10 gün</option>
                            <option>14 gün</option>
                            <option>21 gün</option>
                            <option>30 gün</option>
                            <option>Sürekli</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">Kullanım</label>
                          <select
                            value={yeniIlac.kullanimSekli}
                            onChange={(e) =>
                              setYeniIlac({ ...yeniIlac, kullanimSekli: e.target.value })
                            }
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
                          >
                            <option>Oral</option>
                            <option>Oral (Aç karnına)</option>
                            <option>Oral (Tok karnına)</option>
                            <option>Topikal</option>
                            <option>İnhaler</option>
                            <option>Göz damlası</option>
                            <option>Kulak damlası</option>
                            <option>IM (Kas içi)</option>
                            <option>IV (Damar içi)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">
                          Ek Açıklama (İsteğe bağlı)
                        </label>
                        <Input
                          placeholder="Özel kullanım talimatları..."
                          value={yeniIlac.aciklama}
                          onChange={(e) => setYeniIlac({ ...yeniIlac, aciklama: e.target.value })}
                          className="border-2"
                        />
                      </div>
                      <Button
                        onClick={ilacReceteyeEkle}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Reçeteye Ekle
                      </Button>
                    </div>
                  )}
                </div>

                {/* Tedavi Notu */}
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Tedavi Notu</label>
                  <Textarea
                    value={tedaviNotu}
                    onChange={(e) => setTedaviNotu(e.target.value)}
                    placeholder="Tedavi planı, öneriler ve hasta talimatlarını yazınız..."
                    className="min-h-[100px] border-2 text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Laboratuvar Tetkikleri */}
            <Card className="border-2 border-amber-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <TestTube className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Laboratuvar Tetkikleri (LOINC)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Seçilen Testler */}
                {secilenLabTestler.length > 0 && (
                  <div className="mb-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <p className="text-sm font-semibold text-amber-900 mb-3">İstenen Testler:</p>
                    <div className="space-y-2">
                      {secilenLabTestler.map((test) => (
                        <div
                          key={test.kod}
                          className="flex items-center justify-between p-3 bg-white border-2 border-amber-200 rounded-lg"
                        >
                          <div>
                            <Badge className="bg-amber-600 text-white font-mono mr-2">{test.kod}</Badge>
                            <span className="font-semibold text-gray-900">{test.ad}</span>
                            <span className="text-sm text-gray-600 ml-2">({test.kategori})</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => labTestCikar(test.kod)}
                            className="text-red-600 hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lab Test Arama */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Test adı, LOINC kodu veya kategori ara..."
                    value={labArama}
                    onChange={(e) => setLabArama(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>

                {/* Lab Test Listesi */}
                <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
                  {filtrelenmisLabTestler.map((test) => (
                    <div
                      key={test.kod}
                      onClick={() => labTestEkle(test)}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-gray-600 text-white font-mono mr-2">{test.kod}</Badge>
                          <span className="font-semibold text-gray-900">{test.ad}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {test.kategori}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Radyoloji İncelemeleri */}
            <Card className="border-2 border-indigo-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-xl">
                    <Scan className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">Radyoloji İncelemeleri</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Seçilen Radyoloji Testleri */}
                {secilenRadyolojiTestler.length > 0 && (
                  <div className="mb-4 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
                    <p className="text-sm font-semibold text-indigo-900 mb-3">
                      İstenen Görüntülemeler:
                    </p>
                    <div className="space-y-2">
                      {secilenRadyolojiTestler.map((test) => (
                        <div
                          key={test.kod}
                          className="flex items-center justify-between p-3 bg-white border-2 border-indigo-200 rounded-lg"
                        >
                          <div>
                            <Badge className="bg-indigo-600 text-white font-mono mr-2">{test.kod}</Badge>
                            <span className="font-semibold text-gray-900">{test.ad}</span>
                            <span className="text-sm text-gray-600 ml-2">({test.bolge})</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => radiolojiTestCikar(test.kod)}
                            className="text-red-600 hover:bg-red-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Radyoloji Test Arama */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Görüntüleme adı, kod veya bölge ara..."
                    value={radiolojiArama}
                    onChange={(e) => setRadyolojiArama(e.target.value)}
                    className="pl-10 border-2"
                  />
                </div>

                {/* Radyoloji Test Listesi */}
                <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
                  {filtrelenmisRadyolojiTestler.map((test) => (
                    <div
                      key={test.kod}
                      onClick={() => radiolojiTestEkle(test)}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-gray-600 text-white font-mono mr-2">{test.kod}</Badge>
                          <span className="font-semibold text-gray-900">{test.ad}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {test.bolge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Konsültasyon İstemi */}
            <Card className="border-2 border-orange-100 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <UserCheck className="h-5 w-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Konsültasyon İstemi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Branş Seçiniz</label>
                    <select
                      value={konsultasyonBrans}
                      onChange={(e) => setKonsultasyonBrans(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                    >
                      <option value="">Branş Seçiniz</option>
                      {konsultasyonBranslari.map((brans) => (
                        <option key={brans} value={brans}>
                          {brans}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Aciliyet</label>
                    <select
                      value={konsultasyonAciliyet}
                      onChange={(e) => setKonsultasyonAciliyet(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                    >
                      <option>Acil</option>
                      <option>Normal</option>
                      <option>Elektif</option>
                    </select>
                  </div>
                </div>
                <Textarea
                  value={konsultasyonNotu}
                  onChange={(e) => setKonsultasyonNotu(e.target.value)}
                  placeholder="Konsültasyon nedeni ve istenen değerlendirmeyi yazınız..."
                  className="min-h-[100px] border-2 text-base"
                />
                <Button className="mt-3 w-full bg-orange-600 hover:bg-orange-700">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Konsültasyon Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
    
  )
}
