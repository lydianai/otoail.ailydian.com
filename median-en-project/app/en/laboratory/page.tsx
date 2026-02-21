'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

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

// LOINC Test Database with 100+ tests - US Laboratory Standards
const loincTestDatabase = {
  'Complete Blood Count (CBC)': [
    { loinc: '58410-2', testName: 'Complete Blood Count Panel', unit: '', referenceRange: '-', criticalLow: null, criticalHigh: null },
    { loinc: '718-7', testName: 'Hemoglobin', unit: 'g/dL', referenceRange: '13.5-17.5 (M), 12.0-15.5 (F)', criticalLow: 7, criticalHigh: 20 },
    { loinc: '789-8', testName: 'Red Blood Cell Count (RBC)', unit: '10⁶/µL', referenceRange: '4.5-5.9 (M), 4.1-5.1 (F)', criticalLow: 2.0, criticalHigh: 7.0 },
    { loinc: '4544-3', testName: 'Hematocrit', unit: '%', referenceRange: '41-53 (M), 36-46 (F)', criticalLow: 20, criticalHigh: 60 },
    { loinc: '787-2', testName: 'MCV (Mean Corpuscular Volume)', unit: 'fL', referenceRange: '80-100', criticalLow: null, criticalHigh: null },
    { loinc: '785-6', testName: 'MCH (Mean Corpuscular Hemoglobin)', unit: 'pg', referenceRange: '27-31', criticalLow: null, criticalHigh: null },
    { loinc: '786-4', testName: 'MCHC (Mean Corpuscular Hemoglobin Concentration)', unit: 'g/dL', referenceRange: '32-36', criticalLow: null, criticalHigh: null },
    { loinc: '788-0', testName: 'RDW (Red Cell Distribution Width)', unit: '%', referenceRange: '11.5-14.5', criticalLow: null, criticalHigh: null },
    { loinc: '6690-2', testName: 'White Blood Cell Count (WBC)', unit: '10³/µL', referenceRange: '4.5-11.0', criticalLow: 2.0, criticalHigh: 30.0 },
    { loinc: '770-8', testName: 'Neutrophils %', unit: '%', referenceRange: '40-70', criticalLow: null, criticalHigh: null },
    { loinc: '751-8', testName: 'Neutrophils Absolute', unit: '10³/µL', referenceRange: '2.0-7.0', criticalLow: 0.5, criticalHigh: null },
    { loinc: '736-9', testName: 'Lymphocytes %', unit: '%', referenceRange: '20-40', criticalLow: null, criticalHigh: null },
    { loinc: '731-0', testName: 'Lymphocytes Absolute', unit: '10³/µL', referenceRange: '1.0-4.0', criticalLow: null, criticalHigh: null },
    { loinc: '5905-5', testName: 'Monocytes %', unit: '%', referenceRange: '2-8', criticalLow: null, criticalHigh: null },
    { loinc: '742-7', testName: 'Monocytes Absolute', unit: '10³/µL', referenceRange: '0.2-0.8', criticalLow: null, criticalHigh: null },
    { loinc: '713-8', testName: 'Eosinophils %', unit: '%', referenceRange: '1-4', criticalLow: null, criticalHigh: null },
    { loinc: '711-2', testName: 'Eosinophils Absolute', unit: '10³/µL', referenceRange: '0.0-0.4', criticalLow: null, criticalHigh: null },
    { loinc: '706-2', testName: 'Basophils %', unit: '%', referenceRange: '0-1', criticalLow: null, criticalHigh: null },
    { loinc: '704-7', testName: 'Basophils Absolute', unit: '10³/µL', referenceRange: '0.0-0.1', criticalLow: null, criticalHigh: null },
    { loinc: '777-3', testName: 'Platelet Count', unit: '10³/µL', referenceRange: '150-400', criticalLow: 50, criticalHigh: 1000 },
    { loinc: '32207-3', testName: 'MPV (Mean Platelet Volume)', unit: 'fL', referenceRange: '7.4-10.4', criticalLow: null, criticalHigh: null },
    { loinc: '30395-0', testName: 'PCT (Plateletcrit)', unit: '%', referenceRange: '0.2-0.5', criticalLow: null, criticalHigh: null },
  ],
  'Basic Metabolic Panel (BMP)': [
    { loinc: '2345-7', testName: 'Glucose (Fasting)', unit: 'mg/dL', referenceRange: '70-100', criticalLow: 50, criticalHigh: 450 },
    { loinc: '2339-0', testName: 'Glucose (Random)', unit: 'mg/dL', referenceRange: '<140', criticalLow: 50, criticalHigh: 450 },
    { loinc: '4548-4', testName: 'Hemoglobin A1c', unit: '%', referenceRange: '4.0-6.0', criticalLow: null, criticalHigh: null },
    { loinc: '2160-0', testName: 'Creatinine', unit: 'mg/dL', referenceRange: '0.7-1.3 (M), 0.6-1.1 (F)', criticalLow: null, criticalHigh: 10 },
    { loinc: '3094-0', testName: 'BUN (Blood Urea Nitrogen)', unit: 'mg/dL', referenceRange: '7-20', criticalLow: null, criticalHigh: 100 },
    { loinc: '33914-3', testName: 'eGFR (Estimated Glomerular Filtration Rate)', unit: 'mL/min/1.73m²', referenceRange: '>60', criticalLow: 15, criticalHigh: null },
    { loinc: '3097-3', testName: 'BUN/Creatinine Ratio', unit: '', referenceRange: '10-20', criticalLow: null, criticalHigh: null },
    { loinc: '2951-2', testName: 'Sodium (Na)', unit: 'mmol/L', referenceRange: '136-145', criticalLow: 120, criticalHigh: 160 },
    { loinc: '2823-3', testName: 'Potassium (K)', unit: 'mmol/L', referenceRange: '3.5-5.1', criticalLow: 2.5, criticalHigh: 6.5 },
    { loinc: '2075-0', testName: 'Chloride (Cl)', unit: 'mmol/L', referenceRange: '98-107', criticalLow: 80, criticalHigh: 120 },
    { loinc: '2028-9', testName: 'Calcium (Ca)', unit: 'mg/dL', referenceRange: '8.5-10.5', criticalLow: 6.5, criticalHigh: 13 },
    { loinc: '2601-3', testName: 'Magnesium (Mg)', unit: 'mg/dL', referenceRange: '1.7-2.4', criticalLow: 1.0, criticalHigh: 5.0 },
    { loinc: '2777-1', testName: 'Phosphorus (P)', unit: 'mg/dL', referenceRange: '2.5-4.5', criticalLow: 1.0, criticalHigh: 8.0 },
    { loinc: '1751-7', testName: 'Albumin', unit: 'g/dL', referenceRange: '3.5-5.5', criticalLow: 2.0, criticalHigh: null },
    { loinc: '2885-2', testName: 'Total Protein', unit: 'g/dL', referenceRange: '6.4-8.3', criticalLow: null, criticalHigh: null },
  ],
  'Hepatic Function Panel': [
    { loinc: '1975-2', testName: 'Bilirubin Total', unit: 'mg/dL', referenceRange: '0.3-1.2', criticalLow: null, criticalHigh: 15 },
    { loinc: '1968-7', testName: 'Bilirubin Direct', unit: 'mg/dL', referenceRange: '0.0-0.3', criticalLow: null, criticalHigh: null },
    { loinc: '1742-6', testName: 'ALT (Alanine Aminotransferase)', unit: 'U/L', referenceRange: '0-55 (M), 0-45 (F)', criticalLow: null, criticalHigh: 1000 },
    { loinc: '1920-8', testName: 'AST (Aspartate Aminotransferase)', unit: 'U/L', referenceRange: '5-40', criticalLow: null, criticalHigh: 1000 },
    { loinc: '6768-6', testName: 'Alkaline Phosphatase (ALP)', unit: 'U/L', referenceRange: '40-150', criticalLow: null, criticalHigh: null },
    { loinc: '2324-2', testName: 'GGT (Gamma-Glutamyl Transferase)', unit: 'U/L', referenceRange: '0-55 (M), 0-38 (F)', criticalLow: null, criticalHigh: null },
    { loinc: '2532-0', testName: 'LDH (Lactate Dehydrogenase)', unit: 'U/L', referenceRange: '140-280', criticalLow: null, criticalHigh: null },
  ],
  'Cardiac Biomarkers': [
    { loinc: '2157-6', testName: 'CK (Creatine Kinase)', unit: 'U/L', referenceRange: '26-192 (M), 26-140 (F)', criticalLow: null, criticalHigh: 5000 },
    { loinc: '13969-1', testName: 'CK-MB', unit: 'U/L', referenceRange: '<24', criticalLow: null, criticalHigh: null },
    { loinc: '6598-7', testName: 'Troponin I', unit: 'ng/mL', referenceRange: '<0.04', criticalLow: null, criticalHigh: 0.5 },
    { loinc: '33762-6', testName: 'Troponin T (High Sensitivity)', unit: 'ng/L', referenceRange: '<14', criticalLow: null, criticalHigh: 100 },
    { loinc: '30934-4', testName: 'BNP (Brain Natriuretic Peptide)', unit: 'pg/mL', referenceRange: '<100', criticalLow: null, criticalHigh: null },
    { loinc: '33763-4', testName: 'NT-proBNP', unit: 'pg/mL', referenceRange: '<125', criticalLow: null, criticalHigh: null },
  ],
  'Thyroid Function Tests': [
    { loinc: '3016-3', testName: 'TSH (Thyroid Stimulating Hormone)', unit: 'µIU/mL', referenceRange: '0.27-4.2', criticalLow: null, criticalHigh: null },
    { loinc: '3026-2', testName: 'Free T3 (Triiodothyronine)', unit: 'pg/mL', referenceRange: '2.0-4.4', criticalLow: null, criticalHigh: null },
    { loinc: '3024-7', testName: 'Free T4 (Thyroxine)', unit: 'ng/dL', referenceRange: '0.93-1.7', criticalLow: null, criticalHigh: null },
    { loinc: '3053-6', testName: 'Total T3', unit: 'ng/dL', referenceRange: '80-200', criticalLow: null, criticalHigh: null },
    { loinc: '3051-0', testName: 'Total T4', unit: 'µg/dL', referenceRange: '5.1-14.1', criticalLow: null, criticalHigh: null },
    { loinc: '5385-0', testName: 'Anti-TPO (Thyroid Peroxidase Antibodies)', unit: 'IU/mL', referenceRange: '<34', criticalLow: null, criticalHigh: null },
    { loinc: '8098-6', testName: 'Anti-Thyroglobulin Antibodies', unit: 'IU/mL', referenceRange: '<115', criticalLow: null, criticalHigh: null },
  ],
  'Hormone Panel': [
    { loinc: '1986-9', testName: 'Cortisol', unit: 'µg/dL', referenceRange: '6.2-19.4', criticalLow: 3, criticalHigh: 50 },
    { loinc: '2141-0', testName: 'ACTH (Adrenocorticotropic Hormone)', unit: 'pg/mL', referenceRange: '7.2-63.3', criticalLow: null, criticalHigh: null },
    { loinc: '2986-8', testName: 'Testosterone', unit: 'ng/dL', referenceRange: '280-1100 (M)', criticalLow: null, criticalHigh: null },
    { loinc: '2243-4', testName: 'Estradiol (E2)', unit: 'pg/mL', referenceRange: 'Cycle-dependent', criticalLow: null, criticalHigh: null },
    { loinc: '2039-6', testName: 'Progesterone', unit: 'ng/mL', referenceRange: 'Cycle-dependent', criticalLow: null, criticalHigh: null },
    { loinc: '10501-5', testName: 'FSH (Follicle Stimulating Hormone)', unit: 'mIU/mL', referenceRange: '1.5-12.4 (M)', criticalLow: null, criticalHigh: null },
    { loinc: '10508-0', testName: 'LH (Luteinizing Hormone)', unit: 'mIU/mL', referenceRange: '1.7-8.6 (M)', criticalLow: null, criticalHigh: null },
    { loinc: '2842-3', testName: 'Prolactin', unit: 'ng/mL', referenceRange: '4.0-15.2 (M), 4.0-18.4 (F)', criticalLow: null, criticalHigh: null },
    { loinc: '1558-6', testName: 'PTH (Parathyroid Hormone)', unit: 'pg/mL', referenceRange: '15-65', criticalLow: null, criticalHigh: null },
  ],
  'Vitamins & Minerals': [
    { loinc: '2965-2', testName: 'Vitamin D (25-Hydroxyvitamin D)', unit: 'ng/mL', referenceRange: '30-100', criticalLow: null, criticalHigh: null },
    { loinc: '2464-6', testName: 'Vitamin B12 (Cobalamin)', unit: 'pg/mL', referenceRange: '200-900', criticalLow: null, criticalHigh: null },
    { loinc: '2284-8', testName: 'Folate (Folic Acid)', unit: 'ng/mL', referenceRange: '3-17', criticalLow: null, criticalHigh: null },
    { loinc: '2498-4', testName: 'Ferritin', unit: 'ng/mL', referenceRange: '30-400 (M), 15-150 (F)', criticalLow: null, criticalHigh: null },
  ],
  'Lipid Panel': [
    { loinc: '2093-3', testName: 'Total Cholesterol', unit: 'mg/dL', referenceRange: '<200', criticalLow: null, criticalHigh: null },
    { loinc: '2085-9', testName: 'HDL Cholesterol', unit: 'mg/dL', referenceRange: '>40 (M), >50 (F)', criticalLow: null, criticalHigh: null },
    { loinc: '13457-7', testName: 'LDL Cholesterol (Calculated)', unit: 'mg/dL', referenceRange: '<130', criticalLow: null, criticalHigh: null },
    { loinc: '18262-6', testName: 'LDL Cholesterol (Direct)', unit: 'mg/dL', referenceRange: '<130', criticalLow: null, criticalHigh: null },
    { loinc: '2571-8', testName: 'Triglycerides', unit: 'mg/dL', referenceRange: '<150', criticalLow: null, criticalHigh: 1000 },
    { loinc: '13458-5', testName: 'VLDL Cholesterol', unit: 'mg/dL', referenceRange: '5-40', criticalLow: null, criticalHigh: null },
    { loinc: '9830-1', testName: 'Cholesterol/HDL Ratio', unit: '', referenceRange: '<5', criticalLow: null, criticalHigh: null },
  ],
  'Coagulation Studies': [
    { loinc: '5902-2', testName: 'PT (Prothrombin Time)', unit: 'sec', referenceRange: '11-13.5', criticalLow: null, criticalHigh: 30 },
    { loinc: '6301-6', testName: 'INR (International Normalized Ratio)', unit: '', referenceRange: '0.8-1.2', criticalLow: null, criticalHigh: 5 },
    { loinc: '3173-2', testName: 'aPTT (Activated Partial Thromboplastin Time)', unit: 'sec', referenceRange: '25-35', criticalLow: null, criticalHigh: 100 },
    { loinc: '3255-7', testName: 'Fibrinogen', unit: 'mg/dL', referenceRange: '200-400', criticalLow: 100, criticalHigh: 700 },
    { loinc: '48065-7', testName: 'D-Dimer', unit: 'µg/mL', referenceRange: '<0.5', criticalLow: null, criticalHigh: null },
    { loinc: '27811-9', testName: 'Anti-Xa Activity', unit: 'IU/mL', referenceRange: 'Drug-dependent', criticalLow: null, criticalHigh: null },
  ],
  'Urinalysis': [
    { loinc: '24357-6', testName: 'Complete Urinalysis', unit: '', referenceRange: '-', criticalLow: null, criticalHigh: null },
    { loinc: '5767-9', testName: 'Urine Color', unit: '', referenceRange: 'Yellow', criticalLow: null, criticalHigh: null },
    { loinc: '5778-6', testName: 'Urine Clarity', unit: '', referenceRange: 'Clear', criticalLow: null, criticalHigh: null },
    { loinc: '5803-2', testName: 'Urine pH', unit: '', referenceRange: '4.5-8.0', criticalLow: null, criticalHigh: null },
    { loinc: '5811-5', testName: 'Urine Specific Gravity', unit: '', referenceRange: '1.003-1.030', criticalLow: null, criticalHigh: null },
    { loinc: '5804-0', testName: 'Urine Protein', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5792-7', testName: 'Urine Glucose', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5797-6', testName: 'Urine Ketones', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5794-3', testName: 'Urine Blood', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5799-2', testName: 'Urine Leukocyte Esterase', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5802-4', testName: 'Urine Nitrite', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '13945-1', testName: 'Urine Microscopy - RBC', unit: '/HPF', referenceRange: '0-3', criticalLow: null, criticalHigh: null },
    { loinc: '5821-4', testName: 'Urine Microscopy - WBC', unit: '/HPF', referenceRange: '0-5', criticalLow: null, criticalHigh: null },
  ],
  'Infectious Disease Serology': [
    { loinc: '22314-9', testName: 'HBsAg (Hepatitis B Surface Antigen)', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '16933-4', testName: 'Anti-HBs (Hepatitis B Surface Antibody)', unit: 'mIU/mL', referenceRange: '>10 (immune)', criticalLow: null, criticalHigh: null },
    { loinc: '13952-7', testName: 'Anti-HCV (Hepatitis C Antibody)', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '7918-6', testName: 'HIV 1+2 Antibody/Antigen', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '22462-6', testName: 'RPR (Rapid Plasma Reagin)', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '5010-4', testName: 'TPHA (T. pallidum Hemagglutination)', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '22327-1', testName: 'Rubella IgG', unit: 'IU/mL', referenceRange: '>10 (immune)', criticalLow: null, criticalHigh: null },
    { loinc: '40667-8', testName: 'Rubella IgM', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '22239-8', testName: 'Toxoplasma IgG', unit: 'IU/mL', referenceRange: '<4', criticalLow: null, criticalHigh: null },
    { loinc: '22244-8', testName: 'Toxoplasma IgM', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
    { loinc: '22602-7', testName: 'CMV IgG (Cytomegalovirus)', unit: 'IU/mL', referenceRange: '<6', criticalLow: null, criticalHigh: null },
    { loinc: '30325-7', testName: 'CMV IgM', unit: '', referenceRange: 'Negative', criticalLow: null, criticalHigh: null },
  ],
  'Inflammation Markers': [
    { loinc: '20575-7', testName: 'CRP (C-Reactive Protein)', unit: 'mg/L', referenceRange: '<5', criticalLow: null, criticalHigh: null },
    { loinc: '1988-5', testName: 'hs-CRP (High Sensitivity CRP)', unit: 'mg/L', referenceRange: '<3', criticalLow: null, criticalHigh: null },
    { loinc: '4537-7', testName: 'ESR (Erythrocyte Sedimentation Rate)', unit: 'mm/hr', referenceRange: '<20', criticalLow: null, criticalHigh: null },
    { loinc: '26881-3', testName: 'Procalcitonin', unit: 'ng/mL', referenceRange: '<0.5', criticalLow: null, criticalHigh: 10 },
  ],
  'Microbiology Cultures': [
    { loinc: '600-7', testName: 'Blood Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
    { loinc: '630-4', testName: 'Urine Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
    { loinc: '624-7', testName: 'Throat Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
    { loinc: '625-4', testName: 'Sputum Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
    { loinc: '626-2', testName: 'Stool Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
    { loinc: '17928-3', testName: 'Wound Culture', unit: '', referenceRange: 'No growth', criticalLow: null, criticalHigh: null },
  ],
}

// Test Panels - US Clinical Laboratory Standards
const testPanels = [
  {
    id: 'routine-checkup',
    name: 'Annual Physical Panel',
    tests: ['58410-2', '2345-7', '2093-3', '2085-9', '13457-7', '2571-8', '2160-0', '3094-0', '1742-6', '1920-8', '3016-3'],
    description: 'Comprehensive annual screening panel for routine health maintenance',
  },
  {
    id: 'diabetes-panel',
    name: 'Diabetes Management Panel',
    tests: ['2345-7', '2339-0', '4548-4', '2160-0', '3094-0', '2093-3', '2571-8', '2464-6'],
    description: 'Comprehensive diabetes monitoring and complication screening',
  },
  {
    id: 'thyroid-panel',
    name: 'Thyroid Function Panel',
    tests: ['3016-3', '3026-2', '3024-7', '5385-0', '8098-6'],
    description: 'Complete thyroid function assessment with antibodies',
  },
  {
    id: 'lipid-panel',
    name: 'Lipid Panel (Cardiovascular Risk)',
    tests: ['2093-3', '2085-9', '13457-7', '2571-8', '9830-1'],
    description: 'Cardiovascular risk assessment and lipid profile',
  },
  {
    id: 'liver-panel',
    name: 'Hepatic Function Panel',
    tests: ['1742-6', '1920-8', '6768-6', '2324-2', '1975-2', '1968-7', '1751-7'],
    description: 'Comprehensive liver function testing',
  },
  {
    id: 'kidney-panel',
    name: 'Renal Function Panel',
    tests: ['2160-0', '3094-0', '33914-3', '24357-6', '2951-2', '2823-3'],
    description: 'Complete kidney function assessment',
  },
]

// US Patient Data (HIPAA-compliant format)
const usPatients = [
  { id: 'P001', firstName: 'Robert', lastName: 'Wilson', mrn: 'MRN-0012345', dateOfBirth: '1975-05-15', gender: 'M' },
  { id: 'P002', firstName: 'Mary', lastName: 'Smith', mrn: 'MRN-0023456', dateOfBirth: '1982-08-22', gender: 'F' },
  { id: 'P003', firstName: 'James', lastName: 'Brown', mrn: 'MRN-0034567', dateOfBirth: '1968-03-10', gender: 'M' },
  { id: 'P004', firstName: 'Patricia', lastName: 'Johnson', mrn: 'MRN-0045678', dateOfBirth: '1990-11-30', gender: 'F' },
  { id: 'P005', firstName: 'Michael', lastName: 'Martinez', mrn: 'MRN-0056789', dateOfBirth: '1955-07-18', gender: 'M' },
  { id: 'P006', firstName: 'Jennifer', lastName: 'Anderson', mrn: 'MRN-0067890', dateOfBirth: '1995-02-25', gender: 'F' },
  { id: 'P007', firstName: 'John', lastName: 'Lewis', mrn: 'MRN-0078901', dateOfBirth: '1960-09-12', gender: 'M' },
  { id: 'P008', firstName: 'Sarah', lastName: 'Garcia', mrn: 'MRN-0089012', dateOfBirth: '1988-04-05', gender: 'F' },
]

interface LabTest {
  id: string
  accessionNumber: string
  orderNumber: string
  patient: {
    id: string
    firstName: string
    lastName: string
    mrn: string
  }
  orderDate: string
  orderTime: string
  specimenType: 'whole-blood' | 'urine' | 'serum' | 'plasma' | 'csf' | 'tissue'
  collectionDate?: string
  collectionTime?: string
  collectedBy?: string
  tests: {
    loinc: string
    testName: string
    unit: string
    referenceRange: string
    value?: string
    status: 'pending' | 'collected' | 'in-progress' | 'resulted' | 'verified'
    critical?: boolean
    flag?: 'high' | 'low' | 'normal' | 'abnormal'
  }[]
  status: 'pending' | 'collected' | 'in-progress' | 'resulted' | 'verified' | 'critical-result'
  priority: 'routine' | 'stat' | 'asap'
  orderingProvider: string
  referralLab?: string
  verifyingPathologist?: string
  verifiedDate?: string
  resultedDate?: string
  turnaroundTime?: number
  instrument?: string
  qcStatus?: 'passed' | 'failed' | 'pending'
}

// Sample lab tests data with US standards
const generateSampleTests = (): LabTest[] => {
  const tests: LabTest[] = []

  // Test 1: Completed CBC - Abbott CELL-DYN
  tests.push({
    id: 'LAB001',
    accessionNumber: 'LAB-2025-001234',
    orderNumber: 'ORD-2025-10001',
    patient: usPatients[0],
    orderDate: '12/23/2025',
    orderTime: '09:30',
    specimenType: 'whole-blood',
    collectionDate: '12/23/2025',
    collectionTime: '09:45',
    collectedBy: 'RN Mary Robinson, RN, ASCP',
    tests: [
      { loinc: '718-7', testName: 'Hemoglobin', unit: 'g/dL', referenceRange: '13.5-17.5', value: '14.2', status: 'verified', flag: 'normal' },
      { loinc: '6690-2', testName: 'White Blood Cell Count', unit: '10³/µL', referenceRange: '4.5-11.0', value: '7.8', status: 'verified', flag: 'normal' },
      { loinc: '777-3', testName: 'Platelet Count', unit: '10³/µL', referenceRange: '150-400', value: '245', status: 'verified', flag: 'normal' },
    ],
    status: 'verified',
    priority: 'routine',
    orderingProvider: 'Dr. Mary Smith, MD',
    verifyingPathologist: 'Dr. John Johnson, MD, FCAP',
    verifiedDate: '12/23/2025 11:30',
    resultedDate: '12/23/2025 11:15',
    turnaroundTime: 105,
    instrument: 'Abbott CELL-DYN Ruby',
    qcStatus: 'passed',
  })

  // Test 2: Critical glucose value - STAT order
  tests.push({
    id: 'LAB002',
    accessionNumber: 'LAB-2025-001235',
    orderNumber: 'ORD-2025-10002',
    patient: usPatients[1],
    orderDate: '12/23/2025',
    orderTime: '10:15',
    specimenType: 'serum',
    collectionDate: '12/23/2025',
    collectionTime: '10:30',
    collectedBy: 'Phlebotomist Robert Davis, CPT',
    tests: [
      { loinc: '2345-7', testName: 'Glucose (Fasting)', unit: 'mg/dL', referenceRange: '70-100', value: '485', status: 'verified', critical: true, flag: 'high' },
      { loinc: '4548-4', testName: 'Hemoglobin A1c', unit: '%', referenceRange: '4.0-6.0', value: '11.2', status: 'verified', flag: 'high' },
      { loinc: '2160-0', testName: 'Creatinine', unit: 'mg/dL', referenceRange: '0.7-1.3', value: '1.1', status: 'verified', flag: 'normal' },
    ],
    status: 'critical-result',
    priority: 'stat',
    orderingProvider: 'Dr. James Brown, MD',
    verifyingPathologist: 'Dr. Jennifer Anderson, MD, FCAP',
    verifiedDate: '12/23/2025 12:45',
    resultedDate: '12/23/2025 12:30',
    turnaroundTime: 135,
    instrument: 'Roche Cobas c702',
    qcStatus: 'passed',
  })

  // Test 3: Urinalysis in progress
  tests.push({
    id: 'LAB003',
    accessionNumber: 'LAB-2025-001236',
    orderNumber: 'ORD-2025-10003',
    patient: usPatients[2],
    orderDate: '12/23/2025',
    orderTime: '11:00',
    specimenType: 'urine',
    collectionDate: '12/23/2025',
    collectionTime: '11:20',
    collectedBy: 'MA Patricia Smith, CMA',
    tests: [
      { loinc: '5803-2', testName: 'Urine pH', unit: '', referenceRange: '4.5-8.0', status: 'in-progress' },
      { loinc: '5804-0', testName: 'Urine Protein', unit: '', referenceRange: 'Negative', status: 'in-progress' },
      { loinc: '5792-7', testName: 'Urine Glucose', unit: '', referenceRange: 'Negative', status: 'in-progress' },
    ],
    status: 'in-progress',
    priority: 'routine',
    orderingProvider: 'Dr. William Garcia, MD',
    turnaroundTime: 45,
    instrument: 'Siemens Clinitek Novus',
    qcStatus: 'passed',
  })

  // Test 4: Lipid panel - specimen collected
  tests.push({
    id: 'LAB004',
    accessionNumber: 'LAB-2025-001237',
    orderNumber: 'ORD-2025-10004',
    patient: usPatients[3],
    orderDate: '12/23/2025',
    orderTime: '11:30',
    specimenType: 'serum',
    collectionDate: '12/23/2025',
    collectionTime: '11:50',
    collectedBy: 'Phlebotomist John Robinson, CPT',
    tests: [
      { loinc: '2093-3', testName: 'Total Cholesterol', unit: 'mg/dL', referenceRange: '<200', status: 'collected' },
      { loinc: '2085-9', testName: 'HDL Cholesterol', unit: 'mg/dL', referenceRange: '>50', status: 'collected' },
      { loinc: '13457-7', testName: 'LDL Cholesterol', unit: 'mg/dL', referenceRange: '<130', status: 'collected' },
      { loinc: '2571-8', testName: 'Triglycerides', unit: 'mg/dL', referenceRange: '<150', status: 'collected' },
    ],
    status: 'collected',
    priority: 'routine',
    orderingProvider: 'Dr. Jennifer Anderson, MD',
    turnaroundTime: 20,
    instrument: 'Roche Cobas c702',
    qcStatus: 'pending',
  })

  // Test 5: STAT order - critical potassium
  tests.push({
    id: 'LAB005',
    accessionNumber: 'LAB-2025-001238',
    orderNumber: 'ORD-2025-10005',
    patient: usPatients[4],
    orderDate: '12/23/2025',
    orderTime: '12:00',
    specimenType: 'serum',
    collectionDate: '12/23/2025',
    collectionTime: '12:10',
    collectedBy: 'RN Sarah Wilson, RN, BSN',
    tests: [
      { loinc: '2823-3', testName: 'Potassium (K)', unit: 'mmol/L', referenceRange: '3.5-5.1', value: '6.8', status: 'verified', critical: true, flag: 'high' },
      { loinc: '2951-2', testName: 'Sodium (Na)', unit: 'mmol/L', referenceRange: '136-145', value: '138', status: 'verified', flag: 'normal' },
      { loinc: '2160-0', testName: 'Creatinine', unit: 'mg/dL', referenceRange: '0.7-1.3', value: '3.2', status: 'verified', flag: 'high' },
    ],
    status: 'critical-result',
    priority: 'stat',
    orderingProvider: 'Dr. John Lewis, MD',
    verifyingPathologist: 'Dr. Robert Johnson, MD, FCAP',
    verifiedDate: '12/23/2025 12:35',
    resultedDate: '12/23/2025 12:30',
    turnaroundTime: 25,
    instrument: 'Abbott Alinity c',
    qcStatus: 'passed',
  })

  // Test 6: Reference lab - cardiac biomarkers
  tests.push({
    id: 'LAB006',
    accessionNumber: 'LAB-2025-001239',
    orderNumber: 'ORD-2025-10006',
    patient: usPatients[5],
    orderDate: '12/23/2025',
    orderTime: '13:00',
    specimenType: 'serum',
    collectionDate: '12/23/2025',
    collectionTime: '13:15',
    collectedBy: 'Phlebotomist Jennifer Garcia, CPT',
    tests: [
      { loinc: '33763-4', testName: 'NT-proBNP', unit: 'pg/mL', referenceRange: '<125', status: 'collected' },
      { loinc: '33762-6', testName: 'Troponin T (High Sensitivity)', unit: 'ng/L', referenceRange: '<14', status: 'collected' },
    ],
    status: 'collected',
    priority: 'stat',
    orderingProvider: 'Dr. Patricia Smith, MD',
    referralLab: 'Quest Diagnostics Reference Laboratory',
    turnaroundTime: 60,
    instrument: 'Send-Out',
  })

  // Test 7: Pending collection - thyroid panel
  tests.push({
    id: 'LAB007',
    accessionNumber: 'LAB-2025-001240',
    orderNumber: 'ORD-2025-10007',
    patient: usPatients[6],
    orderDate: '12/23/2025',
    orderTime: '14:00',
    specimenType: 'whole-blood',
    tests: [
      { loinc: '3016-3', testName: 'TSH (Thyroid Stimulating Hormone)', unit: 'µIU/mL', referenceRange: '0.27-4.2', status: 'pending' },
      { loinc: '3024-7', testName: 'Free T4 (Thyroxine)', unit: 'ng/dL', referenceRange: '0.93-1.7', status: 'pending' },
      { loinc: '3026-2', testName: 'Free T3 (Triiodothyronine)', unit: 'pg/mL', referenceRange: '2.0-4.4', status: 'pending' },
    ],
    status: 'pending',
    priority: 'routine',
    orderingProvider: 'Dr. Robert Wilson, MD',
    turnaroundTime: 0,
    instrument: 'Siemens Atellica IM',
  })

  return tests
}

// Trend data for quality control - Levey-Jennings charts
const hemoglobinTrend = [
  { date: '11/15/25', value: 13.8, refMin: 13.5, refMax: 17.5 },
  { date: '11/22/25', value: 14.1, refMin: 13.5, refMax: 17.5 },
  { date: '11/29/25', value: 14.0, refMin: 13.5, refMax: 17.5 },
  { date: '12/06/25', value: 13.9, refMin: 13.5, refMax: 17.5 },
  { date: '12/13/25', value: 14.3, refMin: 13.5, refMax: 17.5 },
  { date: '12/20/25', value: 14.2, refMin: 13.5, refMax: 17.5 },
]

const glucoseTrend = [
  { date: '11/15/25', value: 320, refMin: 70, refMax: 100 },
  { date: '11/22/25', value: 295, refMin: 70, refMax: 100 },
  { date: '11/29/25', value: 410, refMin: 70, refMax: 100 },
  { date: '12/06/25', value: 365, refMin: 70, refMax: 100 },
  { date: '12/13/25', value: 425, refMin: 70, refMax: 100 },
  { date: '12/20/25', value: 485, refMin: 70, refMax: 100 },
]

const creatinineTrend = [
  { date: '10/15/25', value: 0.9, refMin: 0.7, refMax: 1.3 },
  { date: '11/15/25', value: 1.0, refMin: 0.7, refMax: 1.3 },
  { date: '11/29/25', value: 1.2, refMin: 0.7, refMax: 1.3 },
  { date: '12/06/25', value: 1.8, refMin: 0.7, refMax: 1.3 },
  { date: '12/13/25', value: 2.5, refMin: 0.7, refMax: 1.3 },
  { date: '12/20/25', value: 3.2, refMin: 0.7, refMax: 1.3 },
]

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'order' | 'collection' | 'results' | 'pending' | 'external' | 'patient-history' | 'stats'>('overview')
  const [labTests, setLabTests] = useState<LabTest[]>(generateSampleTests())
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<typeof usPatients[0] | null>(null)
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
    pending: labTests.filter(t => t.status === 'pending').length,
    collected: labTests.filter(t => t.status === 'collected').length,
    inProgress: labTests.filter(t => t.status === 'in-progress').length,
    verified: labTests.filter(t => t.status === 'verified').length,
    critical: labTests.filter(t => t.status === 'critical-result').length,
    avgTurnaroundTime: Math.round(labTests.filter(t => t.turnaroundTime).reduce((acc, t) => acc + (t.turnaroundTime || 0), 0) / labTests.filter(t => t.turnaroundTime).length) || 0,
    statOrders: labTests.filter(t => t.priority === 'stat').length,
  }

  const filteredTests = labTests.filter(test => {
    const matchesSearch =
      test.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.accessionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || test.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || test.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'collected': 'bg-blue-100 text-blue-700 border-blue-300',
    'in-progress': 'bg-purple-100 text-purple-700 border-purple-300',
    'resulted': 'bg-green-100 text-green-700 border-green-300',
    'verified': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'critical-result': 'bg-red-100 text-red-700 border-red-300',
  }

  const statusLabels = {
    'pending': 'Awaiting Collection',
    'collected': 'Specimen Received',
    'in-progress': 'Testing in Progress',
    'resulted': 'Resulted',
    'verified': 'Verified',
    'critical-result': 'CRITICAL VALUE',
  }

  const generateAccessionNumber = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `LAB-2025-${timestamp.toString().slice(-6)}${random}`
  }

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
                  <FlaskConical className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Laboratory Information System
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">CLIA-Certified • CAP-Accredited • LOINC Standardized</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowNewOrderModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Test Order
              </Button>
              <Button variant="outline" className="border-2">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
              <Button variant="outline" className="border-2">
                <FilePdf className="h-4 w-4 mr-2" />
                Generate Report
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
              <FlaskConical className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-600">Today's Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalToday}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-yellow-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-xs font-semibold text-gray-600">Pending</span>
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <TestTube className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-semibold text-gray-600">Collected</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.collected}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-purple-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-semibold text-gray-600">In Progress</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{stats.inProgress}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-green-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-xs font-semibold text-gray-600">Verified</span>
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.verified}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-red-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600">Critical</span>
            </div>
            <p className="text-3xl font-bold text-red-700">{stats.critical}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="text-xs font-semibold text-gray-600">STAT Orders</span>
            </div>
            <p className="text-3xl font-bold text-orange-700">{stats.statOrders}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-indigo-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-semibold text-gray-600">Avg TAT</span>
            </div>
            <p className="text-3xl font-bold text-indigo-700">{stats.avgTurnaroundTime}<span className="text-sm">min</span></p>
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
                <h3 className="text-lg font-bold text-red-900 mb-2">CRITICAL VALUE ALERT - Immediate Provider Notification Required</h3>
                <p className="text-sm text-red-700 mb-3">
                  {stats.critical} test result(s) have critical values requiring immediate physician notification per CLIA/CAP protocols.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" variant="destructive">
                    <Bell className="h-4 w-4 mr-2" />
                    Notify Providers
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300">
                    <Eye className="h-4 w-4 mr-2" />
                    View Critical Results
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
              { id: 'overview', label: 'All Tests', icon: FlaskConical },
              { id: 'order', label: 'New Order', icon: Plus },
              { id: 'collection', label: 'Specimen Collection', icon: TestTube },
              { id: 'results', label: 'Result Entry', icon: Edit },
              { id: 'pending', label: 'Pending Tests', icon: Clock },
              { id: 'external', label: 'Reference Lab', icon: ExternalLink },
              { id: 'patient-history', label: 'Patient Results', icon: History },
              { id: 'stats', label: 'QC Trends', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
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
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Patient name, accession number, MRN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Awaiting Collection</option>
                    <option value="collected">Specimen Received</option>
                    <option value="in-progress">Testing in Progress</option>
                    <option value="resulted">Resulted</option>
                    <option value="verified">Verified</option>
                    <option value="critical-result">Critical Value</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="routine">Routine</option>
                    <option value="stat">STAT</option>
                    <option value="asap">ASAP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test List */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Laboratory Test Orders</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      Showing {filteredTests.length} test orders
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                    <Activity className="h-3 w-3 mr-1" />
                    LOINC Standardized
                  </Badge>
                </div>
              </div>

              <div className="divide-y-2 divide-gray-100">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className={cn(
                      "p-6 hover:bg-blue-50/30 transition-all",
                      test.status === 'critical-result' && 'bg-red-50/20 border-l-4 border-l-red-500'
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                          <FlaskConical className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">
                              {test.patient.firstName} {test.patient.lastName}
                            </h4>
                            {test.priority === 'stat' && (
                              <Badge className="bg-red-600 text-white border-red-700 animate-pulse">
                                <Zap className="h-3 w-3 mr-1" />
                                STAT
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-mono">
                            Accession: {test.accessionNumber} • MRN: {test.patient.mrn}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={cn('font-semibold border-2', statusColors[test.status])}>
                              {test.status === 'critical-result' && <AlertTriangle className="h-3 w-3 mr-1 animate-pulse" />}
                              {statusLabels[test.status]}
                            </Badge>
                            <Badge variant="outline" className="font-semibold">
                              {test.specimenType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                            {test.turnaroundTime !== undefined && test.turnaroundTime > 0 && (
                              <Badge variant="outline" className="font-mono text-xs">
                                <Timer className="h-3 w-3 mr-1" />
                                TAT: {test.turnaroundTime} min
                              </Badge>
                            )}
                            {test.instrument && (
                              <Badge variant="outline" className="text-xs">
                                <Beaker className="h-3 w-3 mr-1" />
                                {test.instrument}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-bold text-gray-900">Ordered: {test.orderDate} {test.orderTime}</span>
                        </div>
                        {test.verifiedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="font-bold text-green-700">Verified: {test.verifiedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Test Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-semibold text-gray-600">Ordered Tests ({test.tests.length})</span>
                        </div>
                        <div className="space-y-1">
                          {test.tests.slice(0, 3).map((t, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-semibold text-gray-900">{t.testName}</span>
                              <span className="text-gray-500 text-xs ml-2">(LOINC: {t.loinc})</span>
                            </div>
                          ))}
                          {test.tests.length > 3 && (
                            <p className="text-xs text-gray-500 font-semibold">+{test.tests.length - 3} more tests...</p>
                          )}
                        </div>
                      </div>

                      {test.tests.some(t => t.value) && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold text-gray-600">Results</span>
                          </div>
                          <div className="space-y-2">
                            {test.tests.filter(t => t.value).map((t, idx) => (
                              <div key={idx} className={cn(
                                "text-xs p-2 rounded-lg flex items-center justify-between",
                                t.critical ? 'bg-red-100 border border-red-300' : 'bg-white border border-gray-200'
                              )}>
                                <div>
                                  <span className="font-semibold">{t.testName}:</span>{' '}
                                  <span className={cn("font-bold", t.critical && 'text-red-700')}>
                                    {t.value} {t.unit}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {t.flag === 'high' && <ArrowUp className="h-4 w-4 text-red-600" />}
                                  {t.flag === 'low' && <ArrowDown className="h-4 w-4 text-blue-600" />}
                                  {t.critical && <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Specimen Collection Info */}
                    {test.collectionDate && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center gap-2 text-sm">
                          <TestTube className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">
                            Collected: {test.collectionDate} {test.collectionTime}
                          </span>
                          <span className="text-blue-700">• Collected by: {test.collectedBy}</span>
                        </div>
                      </div>
                    )}

                    {/* Reference Lab Info */}
                    {test.referralLab && (
                      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl">
                        <div className="flex items-center gap-2 text-sm">
                          <ExternalLink className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-900">
                            Reference Laboratory: {test.referralLab}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Critical Value Alert */}
                    {test.status === 'critical-result' && (
                      <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 animate-pulse" />
                          <div>
                            <span className="text-xs font-semibold text-red-700">CRITICAL VALUE ALERT (CLIA/CAP Protocol):</span>
                            <p className="text-sm text-red-900 mt-1">
                              This result contains critical values requiring immediate notification to ordering provider ({test.orderingProvider}).
                              Documentation of notification required within 30 minutes per regulatory standards.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      {test.status === 'pending' && (
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
                            Collect Specimen
                          </Button>
                          <Button size="sm" variant="outline" className="border-2">
                            <Barcode className="h-4 w-4 mr-1" />
                            Print Labels
                          </Button>
                        </>
                      )}

                      {(test.status === 'collected' || test.status === 'in-progress') && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => {
                            setResultEntryTest(test)
                            setShowResultEntryModal(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Enter Results
                        </Button>
                      )}

                      {test.status === 'resulted' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            setApprovalTest(test)
                            setShowApprovalModal(true)
                          }}
                        >
                          <CheckCheck className="h-4 w-4 mr-1" />
                          Verify Results
                        </Button>
                      )}

                      {(test.status === 'verified' || test.status === 'critical-result') && (
                        <>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Printer className="h-4 w-4 mr-1" />
                            Print Report
                          </Button>
                          <Button size="sm" variant="outline" className="border-2">
                            <Mail className="h-4 w-4 mr-1" />
                            Send to Provider
                          </Button>
                        </>
                      )}

                      <Button size="sm" variant="outline" className="border-2">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>

                    {/* Verification Info */}
                    {test.verifyingPathologist && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Verified by: <strong>{test.verifyingPathologist}</strong></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* QC Trend Graphs Tab - Levey-Jennings Charts */}
        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Hemoglobin Trend Analysis - Patient: Robert Wilson
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hemoglobinTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[12, 18]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="refMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Reference Range Upper" />
                  <Area type="monotone" dataKey="refMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Reference Range Lower" />
                  <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={3} name="Hemoglobin (g/dL)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Glucose Trend Analysis - Patient: Mary Smith
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={glucoseTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 500]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="refMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Normal Upper (100)" />
                  <Area type="monotone" dataKey="refMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Normal Lower (70)" />
                  <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={3} name="Glucose (mg/dL)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Clinical Alert: Glucose values consistently elevated above reference range. Diabetes management review recommended.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Creatinine Trend Analysis - Patient: Michael Martinez
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={creatinineTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 4]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="refMax" stackId="1" stroke="#10b981" fill="#d1fae5" name="Reference Range Upper (1.3)" />
                  <Area type="monotone" dataKey="refMin" stackId="1" stroke="#10b981" fill="#d1fae5" name="Reference Range Lower (0.7)" />
                  <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={3} name="Creatinine (mg/dL)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Critical Clinical Alert: Rapidly rising creatinine indicates declining renal function. Nephrology consultation strongly recommended.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CLIA/CAP Compliance Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-2">CLIA-Certified Laboratory • CAP Accredited • ISO 15189 Compliant</h3>
              <p className="text-sm text-purple-800">
                All laboratory results are processed in accordance with CLIA (Clinical Laboratory Improvement Amendments) and CAP
                (College of American Pathologists) standards. LOINC codes ensure universal interoperability. Critical value
                notifications follow regulatory protocols with documented provider communication. Quality control performed daily
                with Levey-Jennings monitoring. Proficiency testing conducted quarterly per regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>

  </DashboardLayout>
  )
}
