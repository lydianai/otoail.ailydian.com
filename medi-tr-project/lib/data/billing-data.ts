/**
 * Billing & Revenue Cycle Management Data Service
 * Claims, payments, denials, and RCM analytics for US hospitals
 */

export type ClaimStatus =
  | 'Draft'
  | 'Submitted'
  | 'In Review'
  | 'Accepted'
  | 'Partially Paid'
  | 'Paid'
  | 'Denied'
  | 'Appealed'
  | 'Voided'

export type PayerType = 'Medicare' | 'Medicaid' | 'Commercial' | 'Self-Pay' | 'Workers Comp'

export type DenialReason =
  | 'Missing Information'
  | 'Invalid CPT Code'
  | 'Authorization Required'
  | 'Not Covered'
  | 'Timely Filing'
  | 'Duplicate Claim'
  | 'Medical Necessity'
  | 'Coordination of Benefits'

export type PaymentMethod = 'EFT' | 'Check' | 'Wire Transfer' | 'Credit Card' | 'Cash'

export interface InsurancePayer {
  id: string
  name: string
  type: PayerType
  payerID: string
  contactPhone: string
  claimsAddress: string
  averageDaysToPay: number
  denialRate: number
}

export interface Claim {
  id: string
  claimNumber: string
  patientName: string
  patientMRN: string
  patientAccountNumber: string
  dateOfService: string
  submittedDate?: string
  payer: string
  payerType: PayerType
  payerID: string
  billedAmount: number
  allowedAmount?: number
  paidAmount?: number
  patientResponsibility?: number
  adjustments?: number
  status: ClaimStatus
  cptCodes: Array<{ code: string; description: string; units: number; charge: number }>
  icd10Codes: string[]
  renderingProvider: string
  renderingNPI: string
  placeOfService: string
  denialReason?: DenialReason
  denialDate?: string
  appealDate?: string
  notes?: string[]
  daysInAR: number
  priority: 'Normal' | 'High' | 'Urgent'
}

export interface Payment {
  id: string
  paymentNumber: string
  claimNumber: string
  patientName: string
  payer: string
  paymentDate: string
  paymentMethod: PaymentMethod
  amount: number
  checkNumber?: string
  eraNumber?: string
  depositDate?: string
  reconciledDate?: string
  status: 'Pending' | 'Posted' | 'Reconciled'
}

export interface BillingStats {
  totalClaims: number
  submittedClaims: number
  paidClaims: number
  deniedClaims: number
  totalAR: number
  over90DaysAR: number
  averageDaysToPay: number
  collectionRate: number
  denialRate: number
  claimsByPayer: Record<PayerType, number>
  revenueByPayer: Record<PayerType, number>
}

// Common insurance payers
export const insurancePayers: InsurancePayer[] = [
  {
    id: 'PAYER-001',
    name: 'Medicare Part A',
    type: 'Medicare',
    payerID: '00000',
    contactPhone: '1-800-MEDICARE',
    claimsAddress: 'Medicare Administrative Contractor',
    averageDaysToPay: 14,
    denialRate: 0.12,
  },
  {
    id: 'PAYER-002',
    name: 'Medicare Part B',
    type: 'Medicare',
    payerID: '00001',
    contactPhone: '1-800-MEDICARE',
    claimsAddress: 'Medicare Administrative Contractor',
    averageDaysToPay: 14,
    denialRate: 0.15,
  },
  {
    id: 'PAYER-003',
    name: 'State Medicaid',
    type: 'Medicaid',
    payerID: 'MCD001',
    contactPhone: '1-800-STATE-MEDICAID',
    claimsAddress: 'State Medicaid Office',
    averageDaysToPay: 30,
    denialRate: 0.22,
  },
  {
    id: 'PAYER-004',
    name: 'Blue Cross Blue Shield',
    type: 'Commercial',
    payerID: 'BCBS001',
    contactPhone: '1-800-BCBS',
    claimsAddress: 'BCBS Claims Department',
    averageDaysToPay: 21,
    denialRate: 0.18,
  },
  {
    id: 'PAYER-005',
    name: 'UnitedHealthcare',
    type: 'Commercial',
    payerID: 'UHC001',
    contactPhone: '1-800-UHC',
    claimsAddress: 'UnitedHealthcare Claims',
    averageDaysToPay: 18,
    denialRate: 0.16,
  },
  {
    id: 'PAYER-006',
    name: 'Aetna',
    type: 'Commercial',
    payerID: 'AETNA001',
    contactPhone: '1-800-AETNA',
    claimsAddress: 'Aetna Claims Processing',
    averageDaysToPay: 19,
    denialRate: 0.17,
  },
  {
    id: 'PAYER-007',
    name: 'Cigna',
    type: 'Commercial',
    payerID: 'CIGNA001',
    contactPhone: '1-800-CIGNA',
    claimsAddress: 'Cigna Healthcare Claims',
    averageDaysToPay: 20,
    denialRate: 0.19,
  },
  {
    id: 'PAYER-008',
    name: 'Humana',
    type: 'Commercial',
    payerID: 'HUMANA001',
    contactPhone: '1-800-HUMANA',
    claimsAddress: 'Humana Claims Department',
    averageDaysToPay: 22,
    denialRate: 0.20,
  },
]

// Common CPT codes with descriptions and typical charges
export const commonCPTCodes: Record<
  string,
  { description: string; typicalCharge: number; rvuValue: number }
> = {
  '99213': { description: 'Office Visit Level 3', typicalCharge: 150, rvuValue: 1.3 },
  '99214': { description: 'Office Visit Level 4', typicalCharge: 215, rvuValue: 1.92 },
  '99215': { description: 'Office Visit Level 5', typicalCharge: 285, rvuValue: 2.8 },
  '99222': { description: 'Initial Hospital Care', typicalCharge: 350, rvuValue: 3.06 },
  '99223': { description: 'Initial Hospital Care', typicalCharge: 450, rvuValue: 4.19 },
  '99232': { description: 'Subsequent Hospital Care', typicalCharge: 185, rvuValue: 1.54 },
  '99233': { description: 'Subsequent Hospital Care', typicalCharge: 250, rvuValue: 2.23 },
  '99238': { description: 'Hospital Discharge', typicalCharge: 175, rvuValue: 1.28 },
  '99291': { description: 'Critical Care First Hour', typicalCharge: 550, rvuValue: 4.5 },
  '99292': { description: 'Critical Care Add-On', typicalCharge: 275, rvuValue: 2.25 },
  '70450': { description: 'CT Head without Contrast', typicalCharge: 850, rvuValue: 1.8 },
  '70553': { description: 'MRI Brain with Contrast', typicalCharge: 1450, rvuValue: 2.8 },
  '71250': { description: 'CT Chest without Contrast', typicalCharge: 900, rvuValue: 1.9 },
  '74177': { description: 'CT Abdomen/Pelvis with Contrast', typicalCharge: 1350, rvuValue: 2.9 },
  '93000': { description: 'ECG', typicalCharge: 85, rvuValue: 0.17 },
  '93306': { description: 'Echocardiogram Complete', typicalCharge: 650, rvuValue: 1.92 },
  '36415': { description: 'Venipuncture', typicalCharge: 25, rvuValue: 0.16 },
  '80053': { description: 'Comprehensive Metabolic Panel', typicalCharge: 65, rvuValue: 0.24 },
  '85025': { description: 'Complete Blood Count', typicalCharge: 35, rvuValue: 0.23 },
  '36561': { description: 'Central Line Insertion', typicalCharge: 850, rvuValue: 4.48 },
}

// Generate sample claims
export function generateClaims(count: number = 200): Claim[] {
  const claims: Claim[] = []

  const firstNames = [
    'John',
    'Mary',
    'James',
    'Patricia',
    'Robert',
    'Jennifer',
    'Michael',
    'Linda',
    'William',
    'Elizabeth',
    'David',
    'Barbara',
    'Richard',
    'Susan',
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Wilson',
    'Anderson',
  ]

  const providers = [
    { name: 'Dr. Sarah Johnson', npi: '1234567890' },
    { name: 'Dr. Michael Chen', npi: '2345678901' },
    { name: 'Dr. Emily Williams', npi: '3456789012' },
    { name: 'Dr. David Martinez', npi: '4567890123' },
    { name: 'Dr. Lisa Thompson', npi: '5678901234' },
  ]

  const statuses: ClaimStatus[] = [
    'Draft',
    'Submitted',
    'In Review',
    'Accepted',
    'Partially Paid',
    'Paid',
    'Denied',
  ]

  const denialReasons: DenialReason[] = [
    'Missing Information',
    'Invalid CPT Code',
    'Authorization Required',
    'Not Covered',
    'Timely Filing',
    'Medical Necessity',
  ]

  const placesOfService = ['Hospital', 'Office', 'Emergency Room', 'Outpatient', 'ASC']

  const icd10Examples = [
    'I10',
    'E11.9',
    'J44.0',
    'I25.10',
    'M54.5',
    'F41.9',
    'N18.3',
    'K21.9',
  ]

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const provider = providers[Math.floor(Math.random() * providers.length)]
    const payer = insurancePayers[Math.floor(Math.random() * insurancePayers.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    const dateOfService = new Date()
    dateOfService.setDate(dateOfService.getDate() - Math.floor(Math.random() * 90))

    const submittedDate = new Date(dateOfService)
    submittedDate.setDate(submittedDate.getDate() + Math.floor(Math.random() * 7) + 1)

    // Select 1-4 CPT codes
    const numCodes = Math.floor(Math.random() * 3) + 1
    const cptCodeKeys = Object.keys(commonCPTCodes)
    const selectedCPTs: Array<{ code: string; description: string; units: number; charge: number }> =
      []
    const usedCodes = new Set<string>()

    for (let j = 0; j < numCodes; j++) {
      let cptCode: string
      do {
        cptCode = cptCodeKeys[Math.floor(Math.random() * cptCodeKeys.length)]
      } while (usedCodes.has(cptCode))

      usedCodes.add(cptCode)
      const cptData = commonCPTCodes[cptCode]
      const units = Math.floor(Math.random() * 2) + 1
      const charge = cptData.typicalCharge * units

      selectedCPTs.push({
        code: cptCode,
        description: cptData.description,
        units,
        charge,
      })
    }

    const billedAmount = selectedCPTs.reduce((sum, cpt) => sum + cpt.charge, 0)
    const allowedAmount = Math.floor(billedAmount * (0.65 + Math.random() * 0.25)) // 65-90% of billed
    const contractualAdjustment = billedAmount - allowedAmount

    let paidAmount = 0
    let patientResponsibility = 0
    let adjustments = contractualAdjustment

    if (status === 'Paid' || status === 'Partially Paid') {
      if (status === 'Paid') {
        // Insurance pays their portion
        const coinsurance = payer.type === 'Medicare' ? 0.8 : 0.7 + Math.random() * 0.2
        paidAmount = Math.floor(allowedAmount * coinsurance)
        patientResponsibility = allowedAmount - paidAmount
      } else {
        // Partially paid
        paidAmount = Math.floor(allowedAmount * (0.5 + Math.random() * 0.3))
        patientResponsibility = allowedAmount - paidAmount
      }
    } else if (status === 'Accepted') {
      patientResponsibility = Math.floor(allowedAmount * 0.2)
    }

    const daysInAR = Math.floor(
      (new Date().getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    const claim: Claim = {
      id: `CLM-${String(i + 1).padStart(6, '0')}`,
      claimNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      patientName: `${firstName} ${lastName}`,
      patientMRN: `MRN${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
      patientAccountNumber: `ACCT${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
      dateOfService: dateOfService.toISOString(),
      submittedDate: status !== 'Draft' ? submittedDate.toISOString() : undefined,
      payer: payer.name,
      payerType: payer.type,
      payerID: payer.payerID,
      billedAmount,
      allowedAmount: status !== 'Draft' && status !== 'Submitted' ? allowedAmount : undefined,
      paidAmount: paidAmount > 0 ? paidAmount : undefined,
      patientResponsibility:
        patientResponsibility > 0 ? patientResponsibility : undefined,
      adjustments: adjustments > 0 ? adjustments : undefined,
      status,
      cptCodes: selectedCPTs,
      icd10Codes: [
        icd10Examples[Math.floor(Math.random() * icd10Examples.length)],
        icd10Examples[Math.floor(Math.random() * icd10Examples.length)],
      ],
      renderingProvider: provider.name,
      renderingNPI: provider.npi,
      placeOfService: placesOfService[Math.floor(Math.random() * placesOfService.length)],
      daysInAR,
      priority:
        daysInAR > 60 ? 'Urgent' : daysInAR > 30 ? 'High' : 'Normal',
    }

    if (status === 'Denied') {
      claim.denialReason =
        denialReasons[Math.floor(Math.random() * denialReasons.length)]
      claim.denialDate = new Date(
        submittedDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString()
    }

    claims.push(claim)
  }

  return claims.sort(
    (a, b) => new Date(b.dateOfService).getTime() - new Date(a.dateOfService).getTime()
  )
}

// Generate sample payments
export function generatePayments(claims: Claim[]): Payment[] {
  const payments: Payment[] = []
  const paymentMethods: PaymentMethod[] = ['EFT', 'Check', 'Wire Transfer']

  const paidClaims = claims.filter(
    (c) => c.status === 'Paid' || c.status === 'Partially Paid'
  )

  paidClaims.forEach((claim, i) => {
    if (claim.paidAmount && claim.paidAmount > 0) {
      const paymentDate = new Date(claim.submittedDate!)
      paymentDate.setDate(
        paymentDate.getDate() + Math.floor(Math.random() * 30) + 10
      )

      const paymentMethod =
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

      const payment: Payment = {
        id: `PMT-${String(i + 1).padStart(6, '0')}`,
        paymentNumber: `PAY${Math.floor(Math.random() * 900000) + 100000}`,
        claimNumber: claim.claimNumber,
        patientName: claim.patientName,
        payer: claim.payer,
        paymentDate: paymentDate.toISOString(),
        paymentMethod,
        amount: claim.paidAmount,
        checkNumber:
          paymentMethod === 'Check'
            ? `CHK${Math.floor(Math.random() * 90000) + 10000}`
            : undefined,
        eraNumber:
          paymentMethod === 'EFT'
            ? `ERA${Math.floor(Math.random() * 900000) + 100000}`
            : undefined,
        depositDate: new Date(
          paymentDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        reconciledDate:
          Math.random() > 0.3
            ? new Date(
                paymentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000
              ).toISOString()
            : undefined,
        status: Math.random() > 0.3 ? 'Reconciled' : 'Posted',
      }

      payments.push(payment)
    }
  })

  return payments
}

export function calculateBillingStats(claims: Claim[]): BillingStats {
  const claimsByPayer: Record<PayerType, number> = {
    Medicare: 0,
    Medicaid: 0,
    Commercial: 0,
    'Self-Pay': 0,
    'Workers Comp': 0,
  }

  const revenueByPayer: Record<PayerType, number> = {
    Medicare: 0,
    Medicaid: 0,
    Commercial: 0,
    'Self-Pay': 0,
    'Workers Comp': 0,
  }

  let totalBilled = 0
  let totalCollected = 0
  let totalDaysInAR = 0
  let over90DaysAR = 0

  claims.forEach((claim) => {
    claimsByPayer[claim.payerType]++
    totalBilled += claim.billedAmount

    if (claim.paidAmount) {
      totalCollected += claim.paidAmount
      revenueByPayer[claim.payerType] += claim.paidAmount
    }

    totalDaysInAR += claim.daysInAR

    if (claim.daysInAR > 90) {
      over90DaysAR += claim.billedAmount - (claim.paidAmount || 0)
    }
  })

  const submittedClaims = claims.filter(
    (c) => c.status !== 'Draft' && c.status !== 'Voided'
  ).length
  const paidClaims = claims.filter(
    (c) => c.status === 'Paid' || c.status === 'Partially Paid'
  ).length
  const deniedClaims = claims.filter((c) => c.status === 'Denied').length

  const totalAR = claims.reduce((sum, c) => {
    if (c.status === 'Paid') return sum
    return sum + c.billedAmount - (c.paidAmount || 0)
  }, 0)

  return {
    totalClaims: claims.length,
    submittedClaims,
    paidClaims,
    deniedClaims,
    totalAR,
    over90DaysAR,
    averageDaysToPay: submittedClaims > 0 ? totalDaysInAR / submittedClaims : 0,
    collectionRate: totalBilled > 0 ? (totalCollected / totalBilled) * 100 : 0,
    denialRate: submittedClaims > 0 ? (deniedClaims / submittedClaims) * 100 : 0,
    claimsByPayer,
    revenueByPayer,
  }
}

export const sampleClaims = generateClaims(200)
export const samplePayments = generatePayments(sampleClaims)
