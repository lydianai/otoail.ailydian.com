'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

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

// US Medical Coding Standards (CPT, ICD-10, HCPCS, DRG)
const PROCEDURE_CODES = [
  // Evaluation & Management (E&M) - CPT Codes
  { code: '99202', name: 'Office Visit - New Patient, Level 2', category: 'E&M', price: 135.00, icd10: 'Z00.00', drg: null },
  { code: '99203', name: 'Office Visit - New Patient, Level 3', category: 'E&M', price: 172.00, icd10: 'Z00.00', drg: null },
  { code: '99204', name: 'Office Visit - New Patient, Level 4', category: 'E&M', price: 257.00, icd10: 'Z00.00', drg: null },
  { code: '99205', name: 'Office Visit - New Patient, Level 5', category: 'E&M', price: 342.00, icd10: 'Z00.00', drg: null },
  { code: '99211', name: 'Office Visit - Established Patient, Level 1', category: 'E&M', price: 57.00, icd10: 'Z00.00', drg: null },
  { code: '99212', name: 'Office Visit - Established Patient, Level 2', category: 'E&M', price: 93.00, icd10: 'Z00.00', drg: null },
  { code: '99213', name: 'Office Visit - Established Patient, Level 3', category: 'E&M', price: 131.00, icd10: 'Z00.00', drg: null },
  { code: '99214', name: 'Office Visit - Established Patient, Level 4', category: 'E&M', price: 197.00, icd10: 'Z00.00', drg: null },
  { code: '99215', name: 'Office Visit - Established Patient, Level 5', category: 'E&M', price: 263.00, icd10: 'Z00.00', drg: null },
  { code: '99221', name: 'Initial Hospital Care, Level 1', category: 'E&M', price: 188.00, icd10: 'Z00.00', drg: null },
  { code: '99222', name: 'Initial Hospital Care, Level 2', category: 'E&M', price: 276.00, icd10: 'Z00.00', drg: null },
  { code: '99223', name: 'Initial Hospital Care, Level 3', category: 'E&M', price: 379.00, icd10: 'Z00.00', drg: null },
  { code: '99231', name: 'Subsequent Hospital Care, Level 1', category: 'E&M', price: 95.00, icd10: 'Z00.00', drg: null },
  { code: '99232', name: 'Subsequent Hospital Care, Level 2', category: 'E&M', price: 143.00, icd10: 'Z00.00', drg: null },
  { code: '99233', name: 'Subsequent Hospital Care, Level 3', category: 'E&M', price: 207.00, icd10: 'Z00.00', drg: null },
  { code: '99281', name: 'Emergency Department Visit, Level 1', category: 'E&M', price: 145.00, icd10: 'R07.9', drg: null },
  { code: '99282', name: 'Emergency Department Visit, Level 2', category: 'E&M', price: 238.00, icd10: 'R07.9', drg: null },
  { code: '99283', name: 'Emergency Department Visit, Level 3', category: 'E&M', price: 365.00, icd10: 'R07.9', drg: null },
  { code: '99284', name: 'Emergency Department Visit, Level 4', category: 'E&M', price: 547.00, icd10: 'R07.9', drg: null },
  { code: '99285', name: 'Emergency Department Visit, Level 5', category: 'E&M', price: 785.00, icd10: 'R07.9', drg: null },

  // Laboratory - CPT Codes
  { code: '80053', name: 'Comprehensive Metabolic Panel (CMP)', category: 'Laboratory', price: 42.00, icd10: 'Z00.00', drg: null },
  { code: '80061', name: 'Lipid Panel', category: 'Laboratory', price: 38.00, icd10: 'E78.5', drg: null },
  { code: '82947', name: 'Glucose, Blood Quantitative', category: 'Laboratory', price: 15.00, icd10: 'R73.09', drg: null },
  { code: '83036', name: 'Hemoglobin A1c (HbA1c)', category: 'Laboratory', price: 45.00, icd10: 'E11.9', drg: null },
  { code: '84443', name: 'TSH (Thyroid Stimulating Hormone)', category: 'Laboratory', price: 55.00, icd10: 'E03.9', drg: null },
  { code: '84439', name: 'Free T4 (Thyroxine)', category: 'Laboratory', price: 52.00, icd10: 'E03.9', drg: null },
  { code: '85025', name: 'Complete Blood Count (CBC) with Differential', category: 'Laboratory', price: 28.00, icd10: 'D64.9', drg: null },
  { code: '85027', name: 'Complete Blood Count (CBC)', category: 'Laboratory', price: 22.00, icd10: 'D64.9', drg: null },
  { code: '85610', name: 'Prothrombin Time (PT)', category: 'Laboratory', price: 18.00, icd10: 'D68.9', drg: null },
  { code: '85730', name: 'Partial Thromboplastin Time (PTT)', category: 'Laboratory', price: 18.00, icd10: 'D68.9', drg: null },
  { code: '82565', name: 'Creatinine, Blood', category: 'Laboratory', price: 16.00, icd10: 'N18.9', drg: null },
  { code: '84520', name: 'Blood Urea Nitrogen (BUN)', category: 'Laboratory', price: 15.00, icd10: 'N18.9', drg: null },
  { code: '84132', name: 'Potassium (K)', category: 'Laboratory', price: 15.00, icd10: 'E87.5', drg: null },
  { code: '84295', name: 'Sodium (Na)', category: 'Laboratory', price: 15.00, icd10: 'E87.1', drg: null },
  { code: '84550', name: 'Uric Acid', category: 'Laboratory', price: 16.00, icd10: 'E79.0', drg: null },
  { code: '82306', name: 'Vitamin D, 25-Hydroxy', category: 'Laboratory', price: 88.00, icd10: 'E55.9', drg: null },
  { code: '82607', name: 'Vitamin B12', category: 'Laboratory', price: 52.00, icd10: 'D51.9', drg: null },
  { code: '82746', name: 'Folate, Serum', category: 'Laboratory', price: 48.00, icd10: 'D52.9', drg: null },
  { code: '83036', name: 'Glycosylated Hemoglobin (HbA1c)', category: 'Laboratory', price: 45.00, icd10: 'E11.9', drg: null },
  { code: '84478', name: 'Triglycerides', category: 'Laboratory', price: 24.00, icd10: 'E78.1', drg: null },
  { code: '83718', name: 'HDL Cholesterol', category: 'Laboratory', price: 26.00, icd10: 'E78.5', drg: null },
  { code: '83721', name: 'LDL Cholesterol, Direct', category: 'Laboratory', price: 28.00, icd10: 'E78.5', drg: null },
  { code: '82947', name: 'Glucose, Blood', category: 'Laboratory', price: 15.00, icd10: 'R73.09', drg: null },
  { code: '87081', name: 'Culture, Bacterial, Screening', category: 'Laboratory', price: 55.00, icd10: 'Z11.0', drg: null },
  { code: '87086', name: 'Urine Culture, Bacterial', category: 'Laboratory', price: 48.00, icd10: 'N39.0', drg: null },
  { code: '87070', name: 'Culture, Bacterial, Blood', category: 'Laboratory', price: 95.00, icd10: 'A41.9', drg: null },
  { code: '81001', name: 'Urinalysis, Manual', category: 'Laboratory', price: 12.00, icd10: 'R82.90', drg: null },
  { code: '81003', name: 'Urinalysis, Automated', category: 'Laboratory', price: 14.00, icd10: 'R82.90', drg: null },
  { code: '87340', name: 'Hepatitis B Surface Antigen (HBsAg)', category: 'Laboratory', price: 32.00, icd10: 'B18.1', drg: null },
  { code: '86803', name: 'Hepatitis C Antibody', category: 'Laboratory', price: 42.00, icd10: 'B18.2', drg: null },
  { code: '86701', name: 'HIV-1 Antibody', category: 'Laboratory', price: 48.00, icd10: 'Z11.4', drg: null },
  { code: '82977', name: 'Gamma-Glutamyl Transferase (GGT)', category: 'Laboratory', price: 22.00, icd10: 'R74.8', drg: null },
  { code: '84075', name: 'Alkaline Phosphatase', category: 'Laboratory', price: 20.00, icd10: 'R74.8', drg: null },
  { code: '84450', name: 'AST (SGOT)', category: 'Laboratory', price: 18.00, icd10: 'R74.0', drg: null },
  { code: '84460', name: 'ALT (SGPT)', category: 'Laboratory', price: 18.00, icd10: 'R74.0', drg: null },
  { code: '82247', name: 'Bilirubin, Total', category: 'Laboratory', price: 18.00, icd10: 'R17', drg: null },
  { code: '82248', name: 'Bilirubin, Direct', category: 'Laboratory', price: 18.00, icd10: 'R17', drg: null },
  { code: '84155', name: 'Total Protein', category: 'Laboratory', price: 17.00, icd10: 'R77.9', drg: null },
  { code: '82040', name: 'Albumin, Serum', category: 'Laboratory', price: 16.00, icd10: 'R77.0', drg: null },

  // Radiology - CPT Codes
  { code: '71045', name: 'Chest X-Ray, Single View', category: 'Radiology', price: 68.00, icd10: 'R05', drg: null },
  { code: '71046', name: 'Chest X-Ray, Two Views', category: 'Radiology', price: 95.00, icd10: 'R05', drg: null },
  { code: '74018', name: 'Abdomen X-Ray, Single View', category: 'Radiology', price: 72.00, icd10: 'R10.9', drg: null },
  { code: '73030', name: 'Shoulder X-Ray, Minimum 2 Views', category: 'Radiology', price: 82.00, icd10: 'M25.511', drg: null },
  { code: '73060', name: 'Humerus X-Ray, Minimum 2 Views', category: 'Radiology', price: 80.00, icd10: 'M25.529', drg: null },
  { code: '73110', name: 'Wrist X-Ray, Complete', category: 'Radiology', price: 78.00, icd10: 'M25.539', drg: null },
  { code: '73130', name: 'Hand X-Ray, Minimum 3 Views', category: 'Radiology', price: 80.00, icd10: 'M25.549', drg: null },
  { code: '73500', name: 'Hip X-Ray, Unilateral', category: 'Radiology', price: 88.00, icd10: 'M25.551', drg: null },
  { code: '73560', name: 'Knee X-Ray, 1 or 2 Views', category: 'Radiology', price: 82.00, icd10: 'M25.561', drg: null },
  { code: '73610', name: 'Ankle X-Ray, Complete', category: 'Radiology', price: 78.00, icd10: 'M25.571', drg: null },
  { code: '73620', name: 'Foot X-Ray, Minimum 2 Views', category: 'Radiology', price: 76.00, icd10: 'M25.579', drg: null },
  { code: '72040', name: 'Cervical Spine X-Ray, 2-3 Views', category: 'Radiology', price: 95.00, icd10: 'M54.2', drg: null },
  { code: '72100', name: 'Lumbar Spine X-Ray, 2-3 Views', category: 'Radiology', price: 98.00, icd10: 'M54.5', drg: null },
  { code: '72146', name: 'MRI Lumbar Spine without Contrast', category: 'Radiology', price: 1250.00, icd10: 'M54.5', drg: null },
  { code: '72148', name: 'MRI Lumbar Spine with and without Contrast', category: 'Radiology', price: 1850.00, icd10: 'M54.5', drg: null },
  { code: '70450', name: 'CT Head/Brain without Contrast', category: 'Radiology', price: 725.00, icd10: 'R51', drg: null },
  { code: '70460', name: 'CT Head/Brain with Contrast', category: 'Radiology', price: 1125.00, icd10: 'R51', drg: null },
  { code: '71250', name: 'CT Chest without Contrast', category: 'Radiology', price: 825.00, icd10: 'R05', drg: null },
  { code: '71260', name: 'CT Chest with Contrast', category: 'Radiology', price: 1245.00, icd10: 'R05', drg: null },
  { code: '74150', name: 'CT Abdomen without Contrast', category: 'Radiology', price: 850.00, icd10: 'R10.9', drg: null },
  { code: '74160', name: 'CT Abdomen with Contrast', category: 'Radiology', price: 1285.00, icd10: 'R10.9', drg: null },
  { code: '74170', name: 'CT Abdomen and Pelvis without Contrast', category: 'Radiology', price: 1050.00, icd10: 'R10.9', drg: null },
  { code: '74176', name: 'CT Abdomen and Pelvis with Contrast', category: 'Radiology', price: 1625.00, icd10: 'R10.9', drg: null },
  { code: '70551', name: 'MRI Brain without Contrast', category: 'Radiology', price: 1425.00, icd10: 'R51', drg: null },
  { code: '70553', name: 'MRI Brain with and without Contrast', category: 'Radiology', price: 2050.00, icd10: 'R51', drg: null },
  { code: '72141', name: 'MRI Cervical Spine without Contrast', category: 'Radiology', price: 1225.00, icd10: 'M54.2', drg: null },
  { code: '72156', name: 'MRI Thoracic Spine without Contrast', category: 'Radiology', price: 1225.00, icd10: 'M54.6', drg: null },
  { code: '73221', name: 'MRI Upper Extremity without Contrast', category: 'Radiology', price: 1185.00, icd10: 'M25.50', drg: null },
  { code: '73721', name: 'MRI Lower Extremity without Contrast', category: 'Radiology', price: 1185.00, icd10: 'M25.561', drg: null },
  { code: '76700', name: 'Ultrasound, Abdominal, Complete', category: 'Radiology', price: 325.00, icd10: 'R10.9', drg: null },
  { code: '76705', name: 'Ultrasound, Abdominal, Limited', category: 'Radiology', price: 225.00, icd10: 'R10.9', drg: null },
  { code: '76770', name: 'Ultrasound, Retroperitoneal', category: 'Radiology', price: 295.00, icd10: 'R10.9', drg: null },
  { code: '76856', name: 'Ultrasound, Pelvic, Complete', category: 'Radiology', price: 335.00, icd10: 'N94.89', drg: null },
  { code: '76642', name: 'Ultrasound, Breast, Complete', category: 'Radiology', price: 285.00, icd10: 'N63', drg: null },
  { code: '93000', name: 'Electrocardiogram (EKG), Routine', category: 'Radiology', price: 45.00, icd10: 'R94.31', drg: null },
  { code: '93005', name: 'Electrocardiogram (EKG), Tracing Only', category: 'Radiology', price: 22.00, icd10: 'R94.31', drg: null },
  { code: '93015', name: 'Cardiovascular Stress Test', category: 'Radiology', price: 285.00, icd10: 'Z13.6', drg: null },
  { code: '93306', name: 'Echocardiography, Transthoracic, Complete', category: 'Radiology', price: 685.00, icd10: 'R94.31', drg: null },
  { code: '93350', name: 'Echocardiography, Stress', category: 'Radiology', price: 925.00, icd10: 'I25.10', drg: null },
  { code: '77067', name: 'Mammography, Bilateral', category: 'Radiology', price: 245.00, icd10: 'Z12.31', drg: null },
  { code: '78815', name: 'PET Scan, Whole Body', category: 'Radiology', price: 4850.00, icd10: 'C80.1', drg: null },

  // Surgical Procedures - CPT Codes
  { code: '44950', name: 'Appendectomy', category: 'Surgical', price: 8250.00, icd10: 'K35.80', drg: '338' },
  { code: '47562', name: 'Laparoscopic Cholecystectomy', category: 'Surgical', price: 9850.00, icd10: 'K80.20', drg: '417' },
  { code: '47600', name: 'Open Cholecystectomy', category: 'Surgical', price: 10250.00, icd10: 'K80.20', drg: '405' },
  { code: '49505', name: 'Inguinal Hernia Repair, Initial', category: 'Surgical', price: 7250.00, icd10: 'K40.90', drg: '392' },
  { code: '49520', name: 'Umbilical Hernia Repair', category: 'Surgical', price: 6850.00, icd10: 'K42.9', drg: '392' },
  { code: '46221', name: 'Hemorrhoidectomy, Internal and External', category: 'Surgical', price: 5250.00, icd10: 'K64.9', drg: '393' },
  { code: '60240', name: 'Thyroidectomy, Total', category: 'Surgical', price: 11250.00, icd10: 'E04.9', drg: '626' },
  { code: '60220', name: 'Thyroidectomy, Partial', category: 'Surgical', price: 9750.00, icd10: 'E04.9', drg: '626' },
  { code: '19301', name: 'Mastectomy, Partial', category: 'Surgical', price: 12500.00, icd10: 'C50.919', drg: '582' },
  { code: '19303', name: 'Mastectomy, Simple, Complete', category: 'Surgical', price: 14750.00, icd10: 'C50.919', drg: '582' },
  { code: '19307', name: 'Mastectomy, Modified Radical', category: 'Surgical', price: 18500.00, icd10: 'C50.919', drg: '582' },
  { code: '27447', name: 'Total Knee Arthroplasty', category: 'Surgical', price: 32500.00, icd10: 'M17.0', drg: '470' },
  { code: '27130', name: 'Total Hip Arthroplasty', category: 'Surgical', price: 35000.00, icd10: 'M16.0', drg: '470' },
  { code: '23472', name: 'Total Shoulder Arthroplasty', category: 'Surgical', price: 38500.00, icd10: 'M19.011', drg: '483' },
  { code: '63030', name: 'Lumbar Laminectomy', category: 'Surgical', price: 22500.00, icd10: 'M48.06', drg: '471' },
  { code: '22612', name: 'Lumbar Spinal Fusion', category: 'Surgical', price: 42500.00, icd10: 'M43.16', drg: '453' },
  { code: '29881', name: 'Knee Arthroscopy with Meniscectomy', category: 'Surgical', price: 9850.00, icd10: 'M23.209', drg: '510' },
  { code: '29827', name: 'Shoulder Arthroscopy with Rotator Cuff Repair', category: 'Surgical', price: 12750.00, icd10: 'M75.101', drg: '510' },
  { code: '25600', name: 'Closed Treatment of Distal Radius Fracture', category: 'Surgical', price: 4250.00, icd10: 'S52.501A', drg: '564' },
  { code: '27752', name: 'Closed Treatment of Tibial Shaft Fracture', category: 'Surgical', price: 5850.00, icd10: 'S82.201A', drg: '564' },

  // Cardiology Procedures - CPT Codes
  { code: '93458', name: 'Cardiac Catheterization, Left Heart', category: 'Cardiology', price: 8500.00, icd10: 'I25.10', drg: '247' },
  { code: '92920', name: 'Coronary Angioplasty, Single Vessel', category: 'Cardiology', price: 22500.00, icd10: 'I25.10', drg: '246' },
  { code: '92928', name: 'Coronary Angioplasty with Stent, Single Vessel', category: 'Cardiology', price: 25750.00, icd10: 'I25.10', drg: '246' },
  { code: '92929', name: 'Coronary Angioplasty with Stent, Additional Vessel', category: 'Cardiology', price: 18500.00, icd10: 'I25.10', drg: '246' },
  { code: '33533', name: 'Coronary Artery Bypass, Single', category: 'Cardiology', price: 65000.00, icd10: 'I25.10', drg: '231' },
  { code: '33534', name: 'Coronary Artery Bypass, Two Vessels', category: 'Cardiology', price: 72500.00, icd10: 'I25.10', drg: '231' },
  { code: '33535', name: 'Coronary Artery Bypass, Three Vessels', category: 'Cardiology', price: 82500.00, icd10: 'I25.10', drg: '231' },
  { code: '33536', name: 'Coronary Artery Bypass, Four or More Vessels', category: 'Cardiology', price: 92500.00, icd10: 'I25.10', drg: '231' },
  { code: '33405', name: 'Heart Valve Replacement, Aortic', category: 'Cardiology', price: 95000.00, icd10: 'I35.0', drg: '216' },
  { code: '33430', name: 'Heart Valve Replacement, Mitral', category: 'Cardiology', price: 98500.00, icd10: 'I34.0', drg: '216' },
  { code: '33206', name: 'Pacemaker Insertion, Dual Chamber', category: 'Cardiology', price: 38500.00, icd10: 'I49.9', drg: '242' },
  { code: '33249', name: 'ICD (Implantable Cardioverter-Defibrillator) Insertion', category: 'Cardiology', price: 72500.00, icd10: 'I49.01', drg: '222' },

  // Neurosurgery - CPT Codes
  { code: '61510', name: 'Craniotomy for Brain Tumor Excision', category: 'Neurosurgery', price: 68500.00, icd10: 'D33.2', drg: '023' },
  { code: '61700', name: 'Aneurysm Clipping, Simple', category: 'Neurosurgery', price: 82500.00, icd10: 'I67.1', drg: '021' },
  { code: '63075', name: 'Discectomy, Lumbar', category: 'Neurosurgery', price: 18500.00, icd10: 'M51.26', drg: '471' },
  { code: '63081', name: 'Vertebral Corpectomy, Lumbar', category: 'Neurosurgery', price: 38500.00, icd10: 'M48.06', drg: '453' },
  { code: '62223', name: 'Ventriculoperitoneal Shunt Placement', category: 'Neurosurgery', price: 32500.00, icd10: 'G91.9', drg: '057' },

  // Urology - CPT Codes
  { code: '52000', name: 'Cystoscopy', category: 'Urology', price: 3250.00, icd10: 'N39.0', drg: '659' },
  { code: '52601', name: 'TURP (Transurethral Resection of Prostate)', category: 'Urology', price: 12500.00, icd10: 'N40.0', drg: '713' },
  { code: '52234', name: 'Cystoscopy with Fulguration of Bladder Tumor', category: 'Urology', price: 8500.00, icd10: 'D41.4', drg: '659' },
  { code: '50590', name: 'Lithotripsy (ESWL)', category: 'Urology', price: 8250.00, icd10: 'N20.0', drg: '661' },
  { code: '52352', name: 'Ureteroscopy with Stone Removal', category: 'Urology', price: 9850.00, icd10: 'N20.1', drg: '661' },
  { code: '50080', name: 'Percutaneous Nephrostolithotomy', category: 'Urology', price: 15500.00, icd10: 'N20.0', drg: '661' },
  { code: '50220', name: 'Nephrectomy, Total', category: 'Urology', price: 22500.00, icd10: 'C64.9', drg: '656' },
  { code: '50545', name: 'Laparoscopic Nephrectomy', category: 'Urology', price: 25500.00, icd10: 'C64.9', drg: '656' },
  { code: '55866', name: 'Radical Prostatectomy, Laparoscopic', category: 'Urology', price: 32500.00, icd10: 'C61', drg: '707' },
  { code: '54150', name: 'Circumcision, Adult', category: 'Urology', price: 2250.00, icd10: 'N47.0', drg: '724' },

  // OB/GYN - CPT Codes
  { code: '59400', name: 'Vaginal Delivery with Prenatal and Postpartum Care', category: 'OB/GYN', price: 8500.00, icd10: 'O80', drg: '767' },
  { code: '59510', name: 'Cesarean Delivery with Prenatal and Postpartum Care', category: 'OB/GYN', price: 12500.00, icd10: 'O82', drg: '765' },
  { code: '59820', name: 'Dilation and Curettage (D&C)', category: 'OB/GYN', price: 3250.00, icd10: 'N92.0', drg: '761' },
  { code: '58150', name: 'Total Abdominal Hysterectomy', category: 'OB/GYN', price: 15500.00, icd10: 'N85.2', drg: '740' },
  { code: '58260', name: 'Vaginal Hysterectomy', category: 'OB/GYN', price: 13500.00, icd10: 'N85.2', drg: '742' },
  { code: '58550', name: 'Laparoscopic Hysterectomy', category: 'OB/GYN', price: 17500.00, icd10: 'N85.2', drg: '740' },
  { code: '58140', name: 'Myomectomy', category: 'OB/GYN', price: 12250.00, icd10: 'D25.9', drg: '742' },
  { code: '58662', name: 'Laparoscopic Ovarian Cystectomy', category: 'OB/GYN', price: 10500.00, icd10: 'N83.20', drg: '742' },
  { code: '58615', name: 'Tubal Ligation', category: 'OB/GYN', price: 5250.00, icd10: 'Z30.2', drg: '742' },
  { code: '58555', name: 'Hysteroscopy, Diagnostic', category: 'OB/GYN', price: 3850.00, icd10: 'N93.9', drg: '761' },

  // Ophthalmology - CPT Codes
  { code: '66984', name: 'Cataract Surgery with IOL, Complex', category: 'Ophthalmology', price: 6850.00, icd10: 'H25.9', drg: '124' },
  { code: '66850', name: 'Cataract Removal with IOL Insertion', category: 'Ophthalmology', price: 5250.00, icd10: 'H25.9', drg: '124' },
  { code: '67108', name: 'Retinal Detachment Repair', category: 'Ophthalmology', price: 14500.00, icd10: 'H33.009', drg: '124' },
  { code: '67036', name: 'Vitrectomy, Pars Plana Approach', category: 'Ophthalmology', price: 12850.00, icd10: 'H43.819', drg: '124' },
  { code: '66170', name: 'Trabeculectomy (Glaucoma Surgery)', category: 'Ophthalmology', price: 9850.00, icd10: 'H40.9', drg: '124' },
  { code: '65426', name: 'Pterygium Excision', category: 'Ophthalmology', price: 3850.00, icd10: 'H11.009', drg: '124' },
  { code: '67312', name: 'Strabismus Surgery, One Muscle', category: 'Ophthalmology', price: 6250.00, icd10: 'H50.9', drg: '124' },

  // ENT - CPT Codes
  { code: '42820', name: 'Tonsillectomy', category: 'ENT', price: 4850.00, icd10: 'J35.01', drg: '134' },
  { code: '42830', name: 'Adenoidectomy', category: 'ENT', price: 3850.00, icd10: 'J35.2', drg: '134' },
  { code: '42821', name: 'Tonsillectomy and Adenoidectomy', category: 'ENT', price: 6250.00, icd10: 'J35.3', drg: '134' },
  { code: '30520', name: 'Septoplasty', category: 'ENT', price: 7850.00, icd10: 'J34.2', drg: '129' },
  { code: '30400', name: 'Rhinoplasty, Primary', category: 'ENT', price: 12500.00, icd10: 'J34.89', drg: '129' },
  { code: '31254', name: 'Functional Endoscopic Sinus Surgery (FESS)', category: 'ENT', price: 10500.00, icd10: 'J32.9', drg: '129' },
  { code: '69631', name: 'Tympanoplasty', category: 'ENT', price: 8850.00, icd10: 'H73.009', drg: '133' },
  { code: '69501', name: 'Mastoidectomy', category: 'ENT', price: 11250.00, icd10: 'H70.009', drg: '133' },
  { code: '69930', name: 'Cochlear Implant', category: 'ENT', price: 95000.00, icd10: 'H90.3', drg: '133' },
  { code: '31575', name: 'Laryngoscopy, Flexible', category: 'ENT', price: 2850.00, icd10: 'J38.7', drg: '149' },

  // Critical Care & ICU - Daily Charges
  { code: 'ICU-L1', name: 'ICU Level 1 (per day)', category: 'Critical Care', price: 4850.00, icd10: 'Z99.89', drg: null },
  { code: 'ICU-L2', name: 'ICU Level 2 (per day)', category: 'Critical Care', price: 6250.00, icd10: 'Z99.89', drg: null },
  { code: 'ICU-L3', name: 'ICU Level 3 (per day)', category: 'Critical Care', price: 8500.00, icd10: 'Z99.89', drg: null },
  { code: 'CICU', name: 'Cardiac ICU (per day)', category: 'Critical Care', price: 7250.00, icd10: 'I50.9', drg: null },
  { code: 'NICU', name: 'Neonatal ICU (per day)', category: 'Critical Care', price: 6850.00, icd10: 'P07.39', drg: null },
  { code: 'PICU', name: 'Pediatric ICU (per day)', category: 'Critical Care', price: 6450.00, icd10: 'Z99.89', drg: null },
  { code: 'BICU', name: 'Burn ICU (per day)', category: 'Critical Care', price: 9850.00, icd10: 'T30.0', drg: null },
  { code: '94002', name: 'Mechanical Ventilation (per day)', category: 'Critical Care', price: 2250.00, icd10: 'Z99.11', drg: null },
  { code: '94660', name: 'CPAP/BiPAP (per day)', category: 'Critical Care', price: 1150.00, icd10: 'Z99.12', drg: null },

  // Inpatient Room & Board
  { code: 'ROOM-PR', name: 'Private Room (per day)', category: 'Room & Board', price: 2250.00, icd10: 'Z99.89', drg: null },
  { code: 'ROOM-SP', name: 'Semi-Private Room (per day)', category: 'Room & Board', price: 1650.00, icd10: 'Z99.89', drg: null },
  { code: 'ROOM-OB', name: 'Observation Room (per day)', category: 'Room & Board', price: 1250.00, icd10: 'Z99.89', drg: null },
  { code: 'NURSING', name: 'Nursing Care (per day)', category: 'Room & Board', price: 450.00, icd10: 'Z99.89', drg: null },

  // Dialysis & Special Treatments
  { code: '90935', name: 'Hemodialysis, Single Session', category: 'Dialysis', price: 985.00, icd10: 'N18.6', drg: '682' },
  { code: '90945', name: 'Peritoneal Dialysis (per day)', category: 'Dialysis', price: 725.00, icd10: 'N18.6', drg: '682' },
  { code: '36514', name: 'Plasmapheresis', category: 'Dialysis', price: 4850.00, icd10: 'D89.9', drg: null },
  { code: '36430', name: 'Blood Transfusion, RBC', category: 'Transfusion', price: 650.00, icd10: 'D64.9', drg: null },
  { code: '36430-P', name: 'Blood Transfusion, Platelets', category: 'Transfusion', price: 1150.00, icd10: 'D69.6', drg: null },
  { code: '36430-F', name: 'Blood Transfusion, Fresh Frozen Plasma', category: 'Transfusion', price: 485.00, icd10: 'D68.9', drg: null },
  { code: '90283', name: 'IVIG (Immunoglobulin) Therapy', category: 'Infusion', price: 7250.00, icd10: 'D80.9', drg: null },
  { code: '96413', name: 'Chemotherapy, IV Push', category: 'Oncology', price: 9850.00, icd10: 'Z51.11', drg: null },
  { code: '77402', name: 'Radiation Therapy, Simple', category: 'Oncology', price: 2250.00, icd10: 'Z51.0', drg: null },
  { code: '99183', name: 'Hyperbaric Oxygen Therapy', category: 'Specialty', price: 1650.00, icd10: 'T70.3', drg: null },

  // Endoscopy - CPT Codes
  { code: '43235', name: 'Esophagogastroduodenoscopy (EGD)', category: 'Endoscopy', price: 2250.00, icd10: 'K29.90', drg: '377' },
  { code: '45378', name: 'Colonoscopy, Diagnostic', category: 'Endoscopy', price: 2850.00, icd10: 'Z12.11', drg: '377' },
  { code: '45380', name: 'Colonoscopy with Biopsy', category: 'Endoscopy', price: 3450.00, icd10: 'K63.5', drg: '377' },
  { code: '45385', name: 'Colonoscopy with Polypectomy', category: 'Endoscopy', price: 3850.00, icd10: 'K63.5', drg: '377' },
  { code: '31622', name: 'Bronchoscopy, Diagnostic', category: 'Endoscopy', price: 2650.00, icd10: 'R05', drg: '199' },
  { code: '43260', name: 'ERCP (Endoscopic Retrograde Cholangiopancreatography)', category: 'Endoscopy', price: 6850.00, icd10: 'K80.50', drg: '405' },

  // Physical Therapy & Rehabilitation
  { code: '97110', name: 'Physical Therapy, Therapeutic Exercise (15 min)', category: 'Rehabilitation', price: 85.00, icd10: 'M79.3', drg: null },
  { code: '97112', name: 'Physical Therapy, Neuromuscular Re-education (15 min)', category: 'Rehabilitation', price: 95.00, icd10: 'M79.3', drg: null },
  { code: '97140', name: 'Physical Therapy, Manual Therapy (15 min)', category: 'Rehabilitation', price: 105.00, icd10: 'M79.3', drg: null },
  { code: '97032', name: 'Physical Therapy, Electrical Stimulation (15 min)', category: 'Rehabilitation', price: 65.00, icd10: 'M79.3', drg: null },
  { code: '97035', name: 'Physical Therapy, Ultrasound (15 min)', category: 'Rehabilitation', price: 75.00, icd10: 'M79.3', drg: null },
  { code: '97010', name: 'Physical Therapy, Hot/Cold Therapy (15 min)', category: 'Rehabilitation', price: 55.00, icd10: 'M79.3', drg: null },

  // Emergency Department Procedures
  { code: '99281-C', name: 'ED Level 1 - Critical (Red Zone)', category: 'Emergency', price: 785.00, icd10: 'R07.9', drg: null },
  { code: '99282-U', name: 'ED Level 2 - Urgent (Yellow Zone)', category: 'Emergency', price: 465.00, icd10: 'R07.9', drg: null },
  { code: '99283-S', name: 'ED Level 3 - Semi-Urgent (Green Zone)', category: 'Emergency', price: 285.00, icd10: 'R07.9', drg: null },
  { code: '92950', name: 'Cardiopulmonary Resuscitation (CPR)', category: 'Emergency', price: 2250.00, icd10: 'I46.9', drg: null },
  { code: '92960', name: 'Cardioversion', category: 'Emergency', price: 985.00, icd10: 'I48.91', drg: null },
  { code: '31500', name: 'Endotracheal Intubation', category: 'Emergency', price: 1250.00, icd10: 'J96.00', drg: null },
  { code: '36556', name: 'Central Venous Catheter Insertion', category: 'Emergency', price: 985.00, icd10: 'Z45.2', drg: null },
  { code: '32551', name: 'Chest Tube Insertion', category: 'Emergency', price: 1650.00, icd10: 'J94.8', drg: null },
  { code: '12001', name: 'Simple Wound Repair, 2.5 cm or less', category: 'Emergency', price: 485.00, icd10: 'S01.01XA', drg: null },
  { code: '12004', name: 'Complex Wound Repair, Over 7.5 cm', category: 'Emergency', price: 985.00, icd10: 'S01.01XA', drg: null },

  // Pathology
  { code: '88305', name: 'Tissue Pathology, Level IV', category: 'Pathology', price: 485.00, icd10: 'Z12.89', drg: null },
  { code: '88307', name: 'Tissue Pathology, Level V', category: 'Pathology', price: 725.00, icd10: 'Z12.89', drg: null },
  { code: '88175', name: 'Cytopathology, Pap Smear', category: 'Pathology', price: 185.00, icd10: 'Z12.4', drg: null },
  { code: '88342', name: 'Immunohistochemistry, First Stain', category: 'Pathology', price: 485.00, icd10: 'Z12.89', drg: null },
  { code: '88271', name: 'FISH (Fluorescence In Situ Hybridization)', category: 'Pathology', price: 1650.00, icd10: 'Z12.89', drg: null },
  { code: '88184', name: 'Flow Cytometry', category: 'Pathology', price: 1250.00, icd10: 'D75.9', drg: null },
  { code: '38221', name: 'Bone Marrow Biopsy', category: 'Pathology', price: 985.00, icd10: 'D75.9', drg: null },
  { code: '10021', name: 'Fine Needle Aspiration Biopsy', category: 'Pathology', price: 485.00, icd10: 'Z12.89', drg: null },
]

type ClaimStatus = 'Draft' | 'Submitted' | 'Accepted' | 'Partial Payment' | 'Denied' | 'Appeal' | 'Paid'
type PaymentMethod = 'Cash' | 'Credit Card' | 'Debit Card' | 'Check' | 'Wire Transfer' | 'Patient Portal'
type PayerType = 'Medicare' | 'Medicaid' | 'Blue Cross Blue Shield' | 'UnitedHealthcare' | 'Aetna' | 'Cigna' | 'Humana' | 'Kaiser Permanente' | 'Anthem' | 'Self-Pay'

interface ProcedureItem {
  code: string
  name: string
  category: string
  price: number
  quantity: number
  icd10?: string
  drg?: string | null
  modifiers?: string[]
}

interface Claim {
  id: string
  claimNumber: string
  patientName: string
  patientMRN: string
  dateOfService: string
  items: ProcedureItem[]
  subtotal: number
  adjustments: number
  contractualAllowance: number
  patientResponsibility: number
  insurancePayment: number
  total: number
  paidAmount: number
  balance: number
  status: ClaimStatus
  payer: PayerType
  paymentMethod?: PaymentMethod
  denialCode?: string
  denialReason?: string
  notes?: string
  authorizationNumber?: string
  eligibilityVerified: boolean
  claimScrubbed: boolean
}

interface Patient {
  id: string
  name: string
  mrn: string
  phone: string
  payer: PayerType
  memberId: string
  groupNumber: string
}

const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Robert Wilson', mrn: 'MRN001234', phone: '(555) 123-4567', payer: 'Medicare', memberId: '1AB2-CD3-EF45', groupNumber: 'N/A' },
  { id: 'P002', name: 'Mary Smith', mrn: 'MRN001235', phone: '(555) 234-5678', payer: 'Blue Cross Blue Shield', memberId: 'XYZ123456789', groupNumber: 'GRP7890' },
  { id: 'P003', name: 'James Johnson', mrn: 'MRN001236', phone: '(555) 345-6789', payer: 'UnitedHealthcare', memberId: 'UHC987654321', groupNumber: 'EMP0012' },
  { id: 'P004', name: 'Patricia Martinez', mrn: 'MRN001237', phone: '(555) 456-7890', payer: 'Aetna', memberId: 'AET456789012', groupNumber: 'PPO4567' },
  { id: 'P005', name: 'Michael Anderson', mrn: 'MRN001238', phone: '(555) 567-8901', payer: 'Cigna', memberId: 'CGN321654987', groupNumber: 'HMO8901' },
  { id: 'P006', name: 'Jennifer Lewis', mrn: 'MRN001239', phone: '(555) 678-9012', payer: 'Humana', memberId: 'HUM654321098', groupNumber: 'ADV2345' },
  { id: 'P007', name: 'John Garcia', mrn: 'MRN001240', phone: '(555) 789-0123', payer: 'Kaiser Permanente', memberId: 'KP147258369', groupNumber: 'REG6789' },
  { id: 'P008', name: 'Sarah Brown', mrn: 'MRN001241', phone: '(555) 890-1234', payer: 'Self-Pay', memberId: 'N/A', groupNumber: 'N/A' },
]

const DENIAL_CODES = [
  { code: 'CO-16', reason: 'Claim lacks information or has submission/billing error' },
  { code: 'CO-18', reason: 'Duplicate claim/service' },
  { code: 'CO-22', reason: 'Payment adjusted because this care may be covered by another payer' },
  { code: 'CO-45', reason: 'Charge exceeds fee schedule/maximum allowable' },
  { code: 'CO-50', reason: 'Non-covered service' },
  { code: 'CO-97', reason: 'Benefit for service included in payment/allowance for another service' },
  { code: 'CO-119', reason: 'Benefit maximum reached for period' },
  { code: 'PR-1', reason: 'Deductible amount' },
  { code: 'PR-2', reason: 'Coinsurance amount' },
  { code: 'PR-3', reason: 'Copayment amount' },
  { code: 'OA-23', reason: 'Indicating the impact of prior payer adjudication' },
]

const MOCK_CLAIMS: Claim[] = [
  {
    id: 'CLM001',
    claimNumber: 'CLM-2025-001234',
    patientName: 'Robert Wilson',
    patientMRN: 'MRN001234',
    dateOfService: '2025-12-20',
    items: [
      { ...PROCEDURE_CODES[0], quantity: 1 },
      { ...PROCEDURE_CODES[20], quantity: 1 },
      { ...PROCEDURE_CODES[60], quantity: 1 },
    ],
    subtotal: 1525.00,
    adjustments: 0,
    contractualAllowance: 305.00,
    patientResponsibility: 244.00,
    insurancePayment: 976.00,
    total: 1220.00,
    paidAmount: 1220.00,
    balance: 0,
    status: 'Paid',
    payer: 'Medicare',
    authorizationNumber: 'AUTH-2025-001',
    eligibilityVerified: true,
    claimScrubbed: true,
  },
  {
    id: 'CLM002',
    claimNumber: 'CLM-2025-001235',
    patientName: 'Mary Smith',
    patientMRN: 'MRN001235',
    dateOfService: '2025-12-18',
    items: [
      { ...PROCEDURE_CODES[8], quantity: 1 },
      { ...PROCEDURE_CODES[110], quantity: 1 },
    ],
    subtotal: 1488.00,
    adjustments: 0,
    contractualAllowance: 223.20,
    patientResponsibility: 253.00,
    insurancePayment: 1011.80,
    total: 1264.80,
    paidAmount: 800.00,
    balance: 464.80,
    status: 'Partial Payment',
    payer: 'Blue Cross Blue Shield',
    paymentMethod: 'Credit Card',
    authorizationNumber: 'AUTH-2025-002',
    eligibilityVerified: true,
    claimScrubbed: true,
  },
  {
    id: 'CLM003',
    claimNumber: 'CLM-2025-001236',
    patientName: 'James Johnson',
    patientMRN: 'MRN001236',
    dateOfService: '2025-11-15',
    items: [
      { ...PROCEDURE_CODES[100], quantity: 1 },
    ],
    subtotal: 9850.00,
    adjustments: 0,
    contractualAllowance: 1477.50,
    patientResponsibility: 1674.50,
    insurancePayment: 6698.00,
    total: 8372.50,
    paidAmount: 0,
    balance: 8372.50,
    status: 'Denied',
    payer: 'UnitedHealthcare',
    denialCode: 'CO-50',
    denialReason: 'Non-covered service - Prior authorization required',
    eligibilityVerified: true,
    claimScrubbed: true,
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const getStatusBadge = (status: ClaimStatus) => {
  const styles = {
    'Draft': 'bg-gray-100 text-gray-700 border-gray-300',
    'Submitted': 'bg-blue-100 text-blue-700 border-blue-300',
    'Accepted': 'bg-green-100 text-green-700 border-green-300',
    'Partial Payment': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Denied': 'bg-red-100 text-red-700 border-red-300',
    'Appeal': 'bg-orange-100 text-orange-700 border-orange-300',
    'Paid': 'bg-green-100 text-green-700 border-green-300',
  }
  return styles[status] || styles['Draft']
}

const getAgingBadge = (days: number) => {
  if (days <= 30) return { text: '0-30 days', style: 'bg-green-100 text-green-700 border-green-300' }
  if (days <= 60) return { text: '31-60 days', style: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
  if (days <= 90) return { text: '61-90 days', style: 'bg-orange-100 text-orange-700 border-orange-300' }
  return { text: '90+ days', style: 'bg-red-100 text-red-700 border-red-300' }
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'claims' | 'ar' | 'stats' | 'denials'>('new')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedItems, setSelectedItems] = useState<ProcedureItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent')
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [showPatientSelector, setShowPatientSelector] = useState(false)
  const [eligibilityStatus, setEligibilityStatus] = useState<'verified' | 'pending' | 'failed' | null>(null)
  const [authRequired, setAuthRequired] = useState(false)
  const [authNumber, setAuthNumber] = useState('')

  const categories = ['All', ...Array.from(new Set(PROCEDURE_CODES.map(c => c.category)))]

  const filteredCodes = PROCEDURE_CODES.filter(code => {
    const matchesSearch = searchTerm === '' ||
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (code.icd10 && code.icd10.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || code.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addItemToClaim = (code: typeof PROCEDURE_CODES[0]) => {
    const existingItem = selectedItems.find(item => item.code === code.code)
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.code === code.code ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setSelectedItems([...selectedItems, { ...code, quantity: 1 }])
    }
  }

  const removeItemFromClaim = (code: string) => {
    setSelectedItems(selectedItems.filter(item => item.code !== code))
  }

  const updateQuantity = (code: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromClaim(code)
    } else {
      setSelectedItems(selectedItems.map(item =>
        item.code === code ? { ...item, quantity } : item
      ))
    }
  }

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateContractualAllowance = () => {
    // Simulate contractual adjustment (typically 15-20% for commercial payers)
    const adjustmentRate = selectedPatient?.payer === 'Medicare' ? 0.20 :
                          selectedPatient?.payer === 'Medicaid' ? 0.30 :
                          selectedPatient?.payer === 'Self-Pay' ? 0 : 0.15
    return calculateSubtotal() * adjustmentRate
  }

  const calculatePatientResponsibility = () => {
    // Simulate patient responsibility (copay, coinsurance, deductible)
    const afterAllowance = calculateSubtotal() - calculateContractualAllowance() - calculateDiscount()
    const coinsuranceRate = selectedPatient?.payer === 'Medicare' ? 0.20 :
                           selectedPatient?.payer === 'Medicaid' ? 0 :
                           selectedPatient?.payer === 'Self-Pay' ? 1.0 : 0.20
    return afterAllowance * coinsuranceRate
  }

  const calculateInsurancePayment = () => {
    const afterAllowance = calculateSubtotal() - calculateContractualAllowance() - calculateDiscount()
    return afterAllowance - calculatePatientResponsibility()
  }

  const calculateDiscount = () => {
    if (discountType === 'percent') {
      return calculateSubtotal() * (discount / 100)
    }
    return discount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateContractualAllowance() - calculateDiscount()
  }

  const verifyEligibility = () => {
    setEligibilityStatus('pending')
    // Simulate real-time eligibility check
    setTimeout(() => {
      setEligibilityStatus('verified')
    }, 1500)
  }

  const submitClaim = () => {
    if (!selectedPatient || selectedItems.length === 0) {
      alert('Please select a patient and add at least one procedure.')
      return
    }

    if (!eligibilityStatus || eligibilityStatus !== 'verified') {
      alert('Please verify patient eligibility before submitting claim.')
      return
    }

    const newClaim: Claim = {
      id: `CLM${(claims.length + 1).toString().padStart(3, '0')}`,
      claimNumber: `CLM-2025-${(claims.length + 1).toString().padStart(6, '0')}`,
      patientName: selectedPatient.name,
      patientMRN: selectedPatient.mrn,
      dateOfService: new Date().toISOString().split('T')[0],
      items: selectedItems,
      subtotal: calculateSubtotal(),
      adjustments: 0,
      contractualAllowance: calculateContractualAllowance(),
      patientResponsibility: calculatePatientResponsibility(),
      insurancePayment: calculateInsurancePayment(),
      total: calculateTotal(),
      paidAmount: 0,
      balance: calculateTotal(),
      status: 'Submitted',
      payer: selectedPatient.payer,
      authorizationNumber: authNumber || undefined,
      eligibilityVerified: true,
      claimScrubbed: true,
    }

    setClaims([newClaim, ...claims])
    // Reset form
    setSelectedPatient(null)
    setSelectedItems([])
    setDiscount(0)
    setEligibilityStatus(null)
    setAuthNumber('')
    alert('Claim submitted successfully! EDI 837 file generated.')
  }

  const todayRevenue = claims
    .filter(claim => claim.dateOfService === new Date().toISOString().split('T')[0])
    .reduce((sum, claim) => sum + claim.paidAmount, 0)

  const weekRevenue = claims
    .filter(claim => {
      const claimDate = new Date(claim.dateOfService)
      const today = new Date()
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return claimDate >= weekAgo
    })
    .reduce((sum, claim) => sum + claim.paidAmount, 0)

  const monthRevenue = claims
    .filter(claim => {
      const claimDate = new Date(claim.dateOfService)
      const today = new Date()
      return claimDate.getMonth() === today.getMonth() && claimDate.getFullYear() === today.getFullYear()
    })
    .reduce((sum, claim) => sum + claim.paidAmount, 0)

  const totalAR = claims.reduce((sum, claim) => sum + claim.balance, 0)
  const totalBilled = claims.reduce((sum, claim) => sum + claim.total, 0)
  const netCollectionRate = totalBilled > 0 ? ((totalBilled - totalAR) / totalBilled * 100) : 0

  // Calculate Days in A/R
  const daysInAR = claims.length > 0 ?
    claims.reduce((sum, claim) => {
      const daysSince = Math.floor((new Date().getTime() - new Date(claim.dateOfService).getTime()) / (1000 * 60 * 60 * 24))
      return sum + daysSince
    }, 0) / claims.length : 0

  const deniedClaims = claims.filter(claim => claim.status === 'Denied')

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        {/* Header */}
        <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-40">
          <div className="max-w-[1920px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Receipt className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                      Revenue Cycle Management
                    </h1>
                    <p className="text-base text-gray-600 mt-1 font-medium">Medical Billing, Claims Processing & A/R Management - Epic Resolute Compatible</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setActiveTab('new')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Claim
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-8 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Today Revenue</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(todayRevenue)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">This Week</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(weekRevenue)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Receipt className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">This Month</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(monthRevenue)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Total A/R</span>
              </div>
              <p className="text-2xl font-bold text-orange-700">{formatCurrency(totalAR)}</p>
              <p className="text-xs text-gray-500 mt-1">Days in A/R: {daysInAR.toFixed(0)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-600">Net Collection</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{netCollectionRate.toFixed(1)}%</p>
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                New Claim
              </button>
              <button
                onClick={() => setActiveTab('claims')}
                className={cn(
                  'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                  activeTab === 'claims'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Claims History
              </button>
              <button
                onClick={() => setActiveTab('ar')}
                className={cn(
                  'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                  activeTab === 'ar'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Clock className="h-4 w-4 inline mr-2" />
                A/R Management
              </button>
              <button
                onClick={() => setActiveTab('denials')}
                className={cn(
                  'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                  activeTab === 'denials'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                Denials ({deniedClaims.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={cn(
                  'flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all',
                  activeTab === 'stats'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Analytics
              </button>
            </div>
          </div>

          {/* New Claim Tab */}
          {activeTab === 'new' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Patient & Procedure Selection */}
              <div className="lg:col-span-2 space-y-6">
                {/* Patient Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Patient Information
                  </h3>
                  {selectedPatient ? (
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-lg text-gray-900">{selectedPatient.name}</p>
                          <p className="text-sm text-gray-600 mt-1">MRN: {selectedPatient.mrn}</p>
                          <p className="text-sm text-gray-600">Phone: {selectedPatient.phone}</p>
                          <div className="mt-2 flex gap-2">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {selectedPatient.payer}
                            </Badge>
                            {eligibilityStatus === 'verified' && (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <BadgeCheck className="h-3 w-3 mr-1 inline" />
                                Eligible
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Member ID: {selectedPatient.memberId}</p>
                          {selectedPatient.groupNumber !== 'N/A' && (
                            <p className="text-xs text-gray-500">Group: {selectedPatient.groupNumber}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPatient(null)}
                            className="border-2"
                          >
                            Change
                          </Button>
                          {!eligibilityStatus && (
                            <Button
                              size="sm"
                              onClick={verifyEligibility}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {MOCK_PATIENTS.slice(0, 4).map(patient => (
                          <button
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className="p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
                          >
                            <p className="font-bold text-gray-900">{patient.name}</p>
                            <p className="text-xs text-gray-600 mt-1">MRN: {patient.mrn}</p>
                            <Badge className="mt-2 bg-blue-50 text-blue-700 text-xs">
                              {patient.payer}
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
                        Show All Patients
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
                              className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                            >
                              <p className="font-semibold text-sm">{patient.name}</p>
                              <p className="text-xs text-gray-600">MRN: {patient.mrn} | {patient.payer}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Procedure Code Finder */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-600" />
                    Procedure Code Search (CPT, ICD-10, HCPCS)
                  </h3>

                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search CPT code, procedure name, or ICD-10..."
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
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredCodes.slice(0, 20).map(code => (
                      <div
                        key={code.code}
                        className="p-3 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => addItemToClaim(code)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-mono text-xs">
                                CPT: {code.code}
                              </Badge>
                              {code.icd10 && (
                                <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-mono text-xs">
                                  ICD-10: {code.icd10}
                                </Badge>
                              )}
                              {code.drg && (
                                <Badge className="bg-orange-50 text-orange-700 border-orange-200 font-mono text-xs">
                                  DRG: {code.drg}
                                </Badge>
                              )}
                              <Badge className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                                {code.category}
                              </Badge>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{code.name}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-lg font-bold text-green-700">{formatCurrency(code.price)}</p>
                            <Button
                              size="sm"
                              className="mt-1 h-7 bg-gradient-to-r from-blue-500 to-purple-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                addItemToClaim(code)
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredCodes.length > 20 && (
                      <p className="text-center text-sm text-gray-500 py-2">
                        +{filteredCodes.length - 20} more results...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Claim Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-600" />
                    Claim Summary
                  </h3>

                  {selectedItems.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No procedures added</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                        {selectedItems.map(item => (
                          <div key={item.code} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="text-xs font-mono text-blue-600 font-bold">{item.code}</p>
                                <p className="text-sm font-semibold text-gray-900 mt-1">{item.name}</p>
                                {item.icd10 && (
                                  <p className="text-xs text-purple-600 mt-1">ICD-10: {item.icd10}</p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItemFromClaim(item.code)}
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
                          <span className="text-gray-600">Gross Charges:</span>
                          <span className="font-bold">{formatCurrency(calculateSubtotal())}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-600">
                          <span>Contractual Allowance:</span>
                          <span className="font-bold">-{formatCurrency(calculateContractualAllowance())}</span>
                        </div>

                        {/* Authorization Number */}
                        <div className="mt-3">
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">
                            Prior Authorization # (if required):
                          </label>
                          <Input
                            placeholder="AUTH-2025-XXXXX"
                            value={authNumber}
                            onChange={(e) => setAuthNumber(e.target.value)}
                            className="border-2 text-sm"
                          />
                        </div>

                        <div className="flex gap-2 mt-3">
                          <div className="flex-1">
                            <Input
                              type="number"
                              placeholder="Discount"
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
                            <option value="fixed">$</option>
                          </select>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-blue-600">
                            <span>Discount:</span>
                            <span className="font-bold">-{formatCurrency(calculateDiscount())}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                          <span className="text-gray-700">Net Charges:</span>
                          <span className="text-gray-900">{formatCurrency(calculateTotal())}</span>
                        </div>

                        <div className="flex justify-between text-sm text-blue-600">
                          <span>Insurance Payment:</span>
                          <span className="font-bold">{formatCurrency(calculateInsurancePayment())}</span>
                        </div>

                        <div className="flex justify-between text-sm text-orange-600">
                          <span>Patient Responsibility:</span>
                          <span className="font-bold">{formatCurrency(calculatePatientResponsibility())}</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <Button
                          onClick={submitClaim}
                          disabled={!eligibilityStatus || eligibilityStatus !== 'verified'}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg disabled:opacity-50"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Submit Claim (EDI 837)
                        </Button>
                        {eligibilityStatus === 'pending' && (
                          <p className="text-xs text-center text-blue-600">Verifying eligibility...</p>
                        )}
                        <Button
                          variant="outline"
                          className="w-full border-2"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print CMS-1500
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Claims History Tab */}
          {activeTab === 'claims' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b-2 border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Claims History</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search claim or patient..."
                      className="w-64 border-2"
                    />
                    <Button variant="outline" className="border-2">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export ERA
                    </Button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Claim #</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">DOS</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Billed</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Paid</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Balance</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {claims.map(claim => (
                      <tr key={claim.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-mono font-bold text-sm text-blue-600">{claim.claimNumber}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{claim.patientName}</p>
                          <p className="text-xs text-gray-500">MRN: {claim.patientMRN}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(claim.dateOfService).toLocaleDateString('en-US')}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-50 text-blue-700 text-xs">
                            {claim.payer}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {formatCurrency(claim.total)}
                        </td>
                        <td className="px-6 py-4 font-bold text-green-700">
                          {formatCurrency(claim.paidAmount)}
                        </td>
                        <td className="px-6 py-4 font-bold text-orange-700">
                          {formatCurrency(claim.balance)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={cn('font-bold border', getStatusBadge(claim.status))}>
                            {claim.status}
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

          {/* A/R Management Tab */}
          {activeTab === 'ar' && (
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
              <div className="p-6 border-b-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Accounts Receivable Management</h3>
                <p className="text-sm text-gray-600 mt-1">Aging analysis and collection tracking</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Claim #</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">DOS</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Paid</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Balance</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Aging</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {claims.filter(claim => claim.balance > 0).map(claim => {
                      const daysSinceClaim = Math.floor((new Date().getTime() - new Date(claim.dateOfService).getTime()) / (1000 * 60 * 60 * 24))
                      const aging = getAgingBadge(daysSinceClaim)
                      return (
                        <tr key={claim.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-mono font-bold text-sm text-blue-600">{claim.claimNumber}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{claim.patientName}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(claim.dateOfService).toLocaleDateString('en-US')}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="bg-blue-50 text-blue-700 text-xs">
                              {claim.payer}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {formatCurrency(claim.total)}
                          </td>
                          <td className="px-6 py-4 font-bold text-green-700">
                            {formatCurrency(claim.paidAmount)}
                          </td>
                          <td className="px-6 py-4 font-bold text-red-700">
                            {formatCurrency(claim.balance)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={cn('font-bold border text-xs', aging.style)}>
                              {aging.text}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button size="sm" className="h-8 bg-gradient-to-r from-green-500 to-green-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              Post Payment
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

          {/* Denials Management Tab */}
          {activeTab === 'denials' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
                <div className="p-6 border-b-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">Denial Management</h3>
                  <p className="text-sm text-gray-600 mt-1">Track and appeal denied claims</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Claim #</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Patient</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payer</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Denial Code</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Reason</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {deniedClaims.map(claim => (
                        <tr key={claim.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-mono font-bold text-sm text-blue-600">{claim.claimNumber}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{claim.patientName}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="bg-blue-50 text-blue-700 text-xs">
                              {claim.payer}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 font-bold text-red-700">
                            {formatCurrency(claim.total)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge className="bg-red-50 text-red-700 border-red-200 font-mono text-xs">
                              {claim.denialCode}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                            {claim.denialReason}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button size="sm" className="h-8 bg-orange-500 hover:bg-orange-600">
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Appeal
                              </Button>
                              <Button size="sm" variant="outline" className="h-8">
                                <Edit className="h-3 w-3 mr-1" />
                                Correct
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Common Denial Codes Reference */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Common Denial Codes Reference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DENIAL_CODES.map(denial => (
                    <div key={denial.code} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Badge className="bg-red-50 text-red-700 border-red-200 font-mono text-xs mb-2">
                        {denial.code}
                      </Badge>
                      <p className="text-sm text-gray-700">{denial.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue by Payer */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Revenue by Payer Mix
                  </h3>
                  <div className="space-y-3">
                    {['Medicare', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Aetna', 'Self-Pay'].map(payer => {
                      const amount = claims
                        .filter(claim => claim.payer === payer)
                        .reduce((sum, claim) => sum + claim.paidAmount, 0)
                      const percentage = totalBilled > 0 ? (amount / totalBilled * 100) : 0
                      return (
                        <div key={payer} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-700">{payer}</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                              <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Claim Status Distribution */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Claim Status Distribution
                  </h3>
                  <div className="space-y-3">
                    {['Paid', 'Submitted', 'Partial Payment', 'Denied', 'Draft', 'Appeal'].map(status => {
                      const count = claims.filter(claim => claim.status === status).length
                      const percentage = claims.length > 0 ? (count / claims.length * 100) : 0
                      return (
                        <div key={status} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={cn('font-bold border', getStatusBadge(status as ClaimStatus))}>
                                {status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-gray-900">{count}</span>
                              <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(0)}%)</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* A/R Aging Buckets */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  A/R Aging Buckets
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { range: '0-30', color: 'green' },
                    { range: '31-60', color: 'yellow' },
                    { range: '61-90', color: 'orange' },
                    { range: '90+', color: 'red' }
                  ].map(bucket => {
                    const bucketClaims = claims.filter(claim => {
                      const days = Math.floor((new Date().getTime() - new Date(claim.dateOfService).getTime()) / (1000 * 60 * 60 * 24))
                      if (bucket.range === '0-30') return days <= 30
                      if (bucket.range === '31-60') return days > 30 && days <= 60
                      if (bucket.range === '61-90') return days > 60 && days <= 90
                      return days > 90
                    })
                    const amount = bucketClaims.reduce((sum, claim) => sum + claim.balance, 0)
                    return (
                      <div key={bucket.range} className={`p-6 rounded-xl border-2 border-${bucket.color}-200 bg-${bucket.color}-50`}>
                        <p className="text-sm font-semibold text-gray-600 mb-2">{bucket.range} days</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
                        <p className="text-xs text-gray-500 mt-1">{bucketClaims.length} claims</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Key Performance Indicators (KPIs)
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Net Collection Rate</p>
                    <p className="text-4xl font-bold text-green-700">{netCollectionRate.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500 mt-2">Industry benchmark: 95%</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Days in A/R</p>
                    <p className="text-4xl font-bold text-blue-700">{daysInAR.toFixed(0)}</p>
                    <p className="text-xs text-gray-500 mt-2">Industry benchmark: 30-40 days</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Denial Rate</p>
                    <p className="text-4xl font-bold text-purple-700">{((deniedClaims.length / claims.length) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-gray-500 mt-2">Industry benchmark: 5-10%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HIPAA Compliance Notice */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">HIPAA Compliance & Data Security</h3>
                <p className="text-sm text-blue-800">
                  All billing and claims data is processed in compliance with HIPAA regulations and CMS guidelines. Patient information is encrypted at rest and in transit using AES-256 encryption. Access is restricted to authorized personnel only. EDI 837 claims are transmitted via secure SFTP to clearinghouses. System maintains full audit trails for compliance monitoring.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}
