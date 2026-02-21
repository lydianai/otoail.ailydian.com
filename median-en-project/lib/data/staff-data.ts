/**
 * Staff & Human Resources Data Service
 * Employee management, credentialing, scheduling for healthcare facilities
 */

export type StaffRole =
  | 'Physician'
  | 'Nurse Practitioner'
  | 'Physician Assistant'
  | 'Registered Nurse'
  | 'Licensed Practical Nurse'
  | 'Certified Nursing Assistant'
  | 'Pharmacist'
  | 'Physical Therapist'
  | 'Occupational Therapist'
  | 'Respiratory Therapist'
  | 'Radiologic Technologist'
  | 'Lab Technician'
  | 'Medical Assistant'
  | 'Administrative Staff'
  | 'IT Support'
  | 'Facility Management'

export type Department =
  | 'Emergency Medicine'
  | 'Internal Medicine'
  | 'Surgery'
  | 'Pediatrics'
  | 'Obstetrics & Gynecology'
  | 'Cardiology'
  | 'Neurology'
  | 'Orthopedics'
  | 'Radiology'
  | 'Laboratory'
  | 'Pharmacy'
  | 'Nursing'
  | 'Administration'
  | 'IT'
  | 'Facilities'

export type EmploymentStatus = 'Active' | 'On Leave' | 'Inactive' | 'Terminated'
export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Per Diem' | 'Contract'

export interface Credential {
  type: string
  number: string
  state?: string
  issuedDate: Date
  expirationDate: Date
  status: 'Active' | 'Expired' | 'Pending Renewal'
}

export interface StaffMember {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  role: StaffRole
  department: Department
  email: string
  phone: string
  npi?: string
  deaNumber?: string
  credentials: Credential[]
  employmentStatus: EmploymentStatus
  employmentType: EmploymentType
  hireDate: Date
  yearsOfExperience: number
  specialties?: string[]
  certifications?: string[]
  hourlyRate?: number
  salary?: number
  shiftPreference?: 'Day' | 'Evening' | 'Night' | 'Rotating'
  weeklyHours?: number
  photoUrl?: string
}

export interface ShiftSchedule {
  id: string
  staffId: string
  staffName: string
  role: StaffRole
  department: Department
  shiftDate: Date
  shiftType: 'Day' | 'Evening' | 'Night'
  startTime: string
  endTime: string
  hours: number
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Called Off' | 'No Show'
}

export interface StaffStats {
  totalStaff: number
  activeStaff: number
  onLeave: number
  fullTime: number
  partTime: number
  physicians: number
  nurses: number
  avgYearsExperience: number
  credentialsExpiringSoon: number
}

// Specialties by role
export const specialtiesByRole: Record<StaffRole, string[]> = {
  Physician: [
    'Emergency Medicine',
    'Internal Medicine',
    'Family Medicine',
    'Surgery',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Psychiatry',
    'Anesthesiology',
  ],
  'Nurse Practitioner': [
    'Family Practice',
    'Adult-Gerontology',
    'Pediatrics',
    'Emergency',
    'Acute Care',
  ],
  'Physician Assistant': ['General Practice', 'Surgery', 'Emergency Medicine'],
  'Registered Nurse': ['Medical-Surgical', 'ICU', 'ER', 'Pediatrics', 'OR', 'Oncology'],
  'Licensed Practical Nurse': ['General Nursing', 'Long-Term Care', 'Rehabilitation'],
  'Certified Nursing Assistant': ['Patient Care', 'Geriatrics'],
  Pharmacist: ['Clinical Pharmacy', 'Oncology Pharmacy', 'Critical Care'],
  'Physical Therapist': ['Orthopedic', 'Neurological', 'Sports Medicine'],
  'Occupational Therapist': ['Pediatrics', 'Hand Therapy', 'Geriatrics'],
  'Respiratory Therapist': ['Critical Care', 'Neonatal', 'Pulmonary Rehabilitation'],
  'Radiologic Technologist': ['CT', 'MRI', 'Mammography', 'Interventional'],
  'Lab Technician': ['Clinical Chemistry', 'Hematology', 'Microbiology'],
  'Medical Assistant': ['Clinical', 'Administrative'],
  'Administrative Staff': ['Reception', 'Billing', 'Medical Records'],
  'IT Support': ['EHR Support', 'Network Administration', 'Security'],
  'Facility Management': ['Maintenance', 'Safety', 'Environmental Services'],
}

// Generate sample staff members
export function generateStaffMembers(count: number = 150): StaffMember[] {
  const staff: StaffMember[] = []

  const firstNames = [
    'James',
    'Mary',
    'John',
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
    'Joseph',
    'Jessica',
    'Thomas',
    'Sarah',
    'Charles',
    'Karen',
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
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ]

  const roles: StaffRole[] = [
    'Physician',
    'Nurse Practitioner',
    'Physician Assistant',
    'Registered Nurse',
    'Licensed Practical Nurse',
    'Certified Nursing Assistant',
    'Pharmacist',
    'Physical Therapist',
    'Respiratory Therapist',
    'Radiologic Technologist',
    'Lab Technician',
    'Medical Assistant',
  ]

  const departments: Department[] = [
    'Emergency Medicine',
    'Internal Medicine',
    'Surgery',
    'Pediatrics',
    'Cardiology',
    'Neurology',
    'Radiology',
    'Laboratory',
    'Pharmacy',
    'Nursing',
  ]

  const statuses: EmploymentStatus[] = ['Active', 'Active', 'Active', 'Active', 'On Leave']
  const types: EmploymentType[] = ['Full-Time', 'Full-Time', 'Full-Time', 'Part-Time', 'Per Diem']

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const role = roles[Math.floor(Math.random() * roles.length)]
    const department = departments[Math.floor(Math.random() * departments.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const type = types[Math.floor(Math.random() * types.length)]

    const hireDate = new Date()
    hireDate.setFullYear(hireDate.getFullYear() - Math.floor(Math.random() * 15))
    const yearsExperience = Math.floor(Math.random() * 25) + 1

    const credentials: Credential[] = []

    // Add appropriate credentials based on role
    if (role === 'Physician' || role === 'Nurse Practitioner') {
      const licenseExpiry = new Date()
      licenseExpiry.setFullYear(licenseExpiry.getFullYear() + 2)

      credentials.push({
        type: role === 'Physician' ? 'Medical License' : 'NP License',
        number: `${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        state: 'CA',
        issuedDate: new Date(hireDate),
        expirationDate: licenseExpiry,
        status: licenseExpiry > new Date() ? 'Active' : 'Expired',
      })

      if (role === 'Physician') {
        const deaExpiry = new Date()
        deaExpiry.setFullYear(deaExpiry.getFullYear() + 3)

        credentials.push({
          type: 'DEA Registration',
          number: `DEA${Math.floor(Math.random() * 9000000) + 1000000}`,
          issuedDate: new Date(hireDate),
          expirationDate: deaExpiry,
          status: deaExpiry > new Date() ? 'Active' : 'Expired',
        })
      }
    } else if (role.includes('Nurse')) {
      const licenseExpiry = new Date()
      licenseExpiry.setFullYear(licenseExpiry.getFullYear() + 2)

      credentials.push({
        type: 'Nursing License',
        number: `RN${Math.floor(Math.random() * 900000) + 100000}`,
        state: 'CA',
        issuedDate: new Date(hireDate),
        expirationDate: licenseExpiry,
        status: licenseExpiry > new Date() ? 'Active' : 'Expired',
      })
    }

    // BLS/ACLS certifications
    const blsExpiry = new Date()
    blsExpiry.setFullYear(blsExpiry.getFullYear() + Math.random() > 0.5 ? 2 : -1)

    credentials.push({
      type: 'BLS Certification',
      number: `BLS${Math.floor(Math.random() * 90000) + 10000}`,
      issuedDate: new Date(hireDate),
      expirationDate: blsExpiry,
      status: blsExpiry > new Date() ? 'Active' : 'Expired',
    })

    const specialties = specialtiesByRole[role]
      ? [specialtiesByRole[role][Math.floor(Math.random() * specialtiesByRole[role].length)]]
      : undefined

    const staffMember: StaffMember = {
      id: `STAFF-${String(i + 1).padStart(6, '0')}`,
      employeeId: `EMP${String(Math.floor(Math.random() * 90000) + 10000)}`,
      firstName,
      lastName,
      role,
      department,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@lydianmedi.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      npi:
        role === 'Physician' || role === 'Nurse Practitioner'
          ? String(Math.floor(Math.random() * 9000000000) + 1000000000)
          : undefined,
      deaNumber:
        role === 'Physician'
          ? `DEA${Math.floor(Math.random() * 9000000) + 1000000}`
          : undefined,
      credentials,
      employmentStatus: status,
      employmentType: type,
      hireDate,
      yearsOfExperience: yearsExperience,
      specialties,
      hourlyRate:
        type === 'Part-Time' || type === 'Per Diem'
          ? Math.floor(Math.random() * 100) + 40
          : undefined,
      salary:
        type === 'Full-Time'
          ? Math.floor(Math.random() * 200000) + 60000
          : undefined,
      shiftPreference:
        ['Day', 'Evening', 'Night', 'Rotating'][Math.floor(Math.random() * 4)] as any,
      weeklyHours: type === 'Full-Time' ? 40 : Math.floor(Math.random() * 20) + 10,
    }

    staff.push(staffMember)
  }

  return staff.sort((a, b) => a.lastName.localeCompare(b.lastName))
}

// Generate shift schedule
export function generateShiftSchedule(
  staff: StaffMember[],
  days: number = 7
): ShiftSchedule[] {
  const schedules: ShiftSchedule[] = []
  const shiftTypes: Array<'Day' | 'Evening' | 'Night'> = ['Day', 'Evening', 'Night']
  const shiftTimes = {
    Day: { start: '07:00', end: '15:00', hours: 8 },
    Evening: { start: '15:00', end: '23:00', hours: 8 },
    Night: { start: '23:00', end: '07:00', hours: 8 },
  }

  let scheduleId = 1

  for (let day = 0; day < days; day++) {
    const date = new Date()
    date.setDate(date.getDate() + day)

    // Assign shifts to active staff
    const activeStaff = staff.filter((s) => s.employmentStatus === 'Active')

    for (const member of activeStaff) {
      // Not everyone works every day
      if (Math.random() > 0.6) continue

      const shiftType =
        member.shiftPreference === 'Rotating'
          ? shiftTypes[Math.floor(Math.random() * shiftTypes.length)]
          : (member.shiftPreference as 'Day' | 'Evening' | 'Night')

      const shift = shiftTimes[shiftType]

      schedules.push({
        id: `SHIFT-${String(scheduleId++).padStart(6, '0')}`,
        staffId: member.id,
        staffName: `${member.firstName} ${member.lastName}`,
        role: member.role,
        department: member.department,
        shiftDate: date,
        shiftType,
        startTime: shift.start,
        endTime: shift.end,
        hours: shift.hours,
        status: day < 0 ? 'Completed' : day === 0 ? 'In Progress' : 'Scheduled',
      })
    }
  }

  return schedules.sort((a, b) => a.shiftDate.getTime() - b.shiftDate.getTime())
}

export function calculateStaffStats(staff: StaffMember[]): StaffStats {
  const now = new Date()
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)

  const credentialsExpiringSoon = staff.filter((member) =>
    member.credentials.some(
      (cred) =>
        cred.expirationDate > now && cred.expirationDate <= threeMonthsFromNow
    )
  ).length

  return {
    totalStaff: staff.length,
    activeStaff: staff.filter((s) => s.employmentStatus === 'Active').length,
    onLeave: staff.filter((s) => s.employmentStatus === 'On Leave').length,
    fullTime: staff.filter((s) => s.employmentType === 'Full-Time').length,
    partTime: staff.filter(
      (s) => s.employmentType === 'Part-Time' || s.employmentType === 'Per Diem'
    ).length,
    physicians: staff.filter((s) => s.role === 'Physician').length,
    nurses: staff.filter((s) => s.role.includes('Nurse')).length,
    avgYearsExperience: Math.round(
      staff.reduce((sum, s) => sum + s.yearsOfExperience, 0) / staff.length
    ),
    credentialsExpiringSoon,
  }
}

export const sampleStaff = generateStaffMembers(150)
export const sampleSchedule = generateShiftSchedule(sampleStaff, 7)
