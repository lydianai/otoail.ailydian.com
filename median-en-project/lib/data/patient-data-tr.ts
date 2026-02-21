// Kapsamlı Hasta Veri Servisi - Türkiye Sağlık Sistemi
// KVKK uyumlu simüle veri - e-Nabız & Medula entegre

export interface PatientDemographics {
  id: string
  mrn: string // TC Kimlik No
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: Date
  age: number
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'
  ssn: string // TC Kimlik (şifreli/hash'li)
  race: string
  ethnicity: string
  preferredLanguage: string
  maritalStatus: string

  // İletişim Bilgileri
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  phone: {
    home?: string
    mobile?: string
    work?: string
  }
  email?: string

  // Acil İletişim
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }

  // Sigorta (SGK)
  insurance: {
    primary: {
      provider: string // SGK, Özel Sigorta
      policyNumber: string
      groupNumber: string
      subscriberId: string
      effectiveDate: Date
      expirationDate: Date
    }
    secondary?: {
      provider: string
      policyNumber: string
    }
  }

  // Klinik Bilgiler
  primaryCareProvider?: string
  assignedDoctor?: string
  assignedNurse?: string

  // Durum
  status: 'Active' | 'Inactive' | 'Deceased' | 'Merged'
  registrationDate: Date
  lastVisitDate?: Date
}

// Türk isim ve soyisimleri
const turkishFirstNamesMale = [
  'Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Hasan', 'Hüseyin', 'İbrahim', 'Ömer', 'Yusuf', 'Emre',
  'Burak', 'Can', 'Cem', 'Deniz', 'Eren', 'Furkan', 'Gökhan', 'Hakan', 'İsmail', 'Kemal',
  'Murat', 'Oğuz', 'Onur', 'Serkan', 'Tolga', 'Umut', 'Volkan', 'Yasin', 'Yiğit', 'Barış'
]

const turkishFirstNamesFemale = [
  'Ayşe', 'Fatma', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Meryem', 'Selin', 'Yasemin', 'Esra',
  'Merve', 'Büşra', 'Cansu', 'Defne', 'Ece', 'Gamze', 'Gözde', 'İrem', 'Neslihan', 'Özge',
  'Pınar', 'Seda', 'Şebnem', 'Tuba', 'Yeşim', 'Aslı', 'Burcu', 'Derya', 'Ebru', 'Gül'
]

const turkishLastNames = [
  'Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir',
  'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek',
  'Erdoğan', 'Güneş', 'Aksoy', 'Polat', 'Bozkurt', 'Taş', 'Karaca', 'Sarı', 'Çakır', 'Bulut',
  'Korkmaz', 'Tekin', 'Çelik', 'Aktaş', 'Özer', 'Tunç', 'Eren', 'Kaplan', 'Çevik', 'Acar'
]

const turkishCities = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri',
  'Eskişehir', 'Diyarbakır', 'Samsun', 'Denizli', 'Şanlıurfa', 'Malatya', 'Kahramanmaraş', 'Van', 'Hatay', 'Tekirdağ'
]

const insuranceProviders = [
  'SGK (Sosyal Güvenlik Kurumu)',
  'Özel Sigorta - Anadolu Sigorta',
  'Özel Sigorta - Allianz',
  'Özel Sigorta - AXA',
  'Özel Sigorta - Groupama',
  'Bağ-Kur',
  'Emekli Sandığı'
]

export function generateComprehensivePatients(count: number = 100): PatientDemographics[] {
  return Array.from({ length: count }, (_, i) => {
    const isMale = Math.random() > 0.5
    const firstName = isMale
      ? turkishFirstNamesMale[Math.floor(Math.random() * turkishFirstNamesMale.length)]
      : turkishFirstNamesFemale[Math.floor(Math.random() * turkishFirstNamesFemale.length)]
    const lastName = turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)]
    const city = turkishCities[Math.floor(Math.random() * turkishCities.length)]

    const dateOfBirth = new Date(
      Date.now() - (Math.random() * 70 + 18) * 365 * 24 * 60 * 60 * 1000
    )
    const age = Math.floor((Date.now() - dateOfBirth.getTime()) / (365 * 24 * 60 * 60 * 1000))

    // TC Kimlik No benzeri (11 haneli)
    const tcNo = String(Math.floor(Math.random() * 90000000000) + 10000000000)

    const registrationDate = new Date(
      Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000
    )

    const hasRecentVisit = Math.random() > 0.3
    const lastVisitDate = hasRecentVisit
      ? new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
      : undefined

    const status: ('Active' | 'Inactive' | 'Deceased')[] = ['Active', 'Active', 'Active', 'Active', 'Inactive', 'Deceased']
    const maritalStatuses = ['Evli', 'Bekar', 'Dul', 'Boşanmış']

    return {
      id: `HAS-${String(i + 1).padStart(6, '0')}`,
      mrn: tcNo,
      firstName,
      middleName: Math.random() > 0.7 ? turkishFirstNamesMale[Math.floor(Math.random() * turkishFirstNamesMale.length)] : undefined,
      lastName,
      dateOfBirth,
      age,
      gender: isMale ? 'Male' : 'Female',
      ssn: tcNo,
      race: 'Türk',
      ethnicity: 'Türk',
      preferredLanguage: 'Türkçe',
      maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],

      address: {
        street: `${Math.floor(Math.random() * 100) + 1}. Sokak No: ${Math.floor(Math.random() * 50) + 1}`,
        city,
        state: city, // Türkiye'de il
        zip: String(Math.floor(Math.random() * 90000) + 10000),
        country: 'Türkiye'
      },

      phone: {
        home: Math.random() > 0.5 ? `0${Math.floor(Math.random() * 400) + 200} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}` : undefined,
        mobile: `05${Math.floor(Math.random() * 100) + 300000000}`,
        work: Math.random() > 0.7 ? `0${Math.floor(Math.random() * 400) + 200} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}` : undefined
      },

      email: Math.random() > 0.3
        ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@email.com`
        : undefined,

      emergencyContact: {
        name: `${turkishFirstNamesMale[Math.floor(Math.random() * turkishFirstNamesMale.length)]} ${lastName}`,
        relationship: Math.random() > 0.5 ? 'Eş' : 'Kardeş',
        phone: `05${Math.floor(Math.random() * 100) + 300000000}`
      },

      insurance: {
        primary: {
          provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
          policyNumber: `POL-${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
          groupNumber: `GRP-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
          subscriberId: tcNo,
          effectiveDate: new Date(registrationDate.getTime() - 30 * 24 * 60 * 60 * 1000),
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        },
        secondary: Math.random() > 0.7
          ? {
              provider: 'Özel Sigorta',
              policyNumber: `SEC-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`
            }
          : undefined
      },

      primaryCareProvider: `Dr. ${turkishFirstNamesMale[Math.floor(Math.random() * turkishFirstNamesMale.length)]} ${turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)]}`,
      assignedDoctor: Math.random() > 0.5
        ? `Dr. ${turkishFirstNamesFemale[Math.floor(Math.random() * turkishFirstNamesFemale.length)]} ${turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)]}`
        : undefined,
      assignedNurse: Math.random() > 0.5
        ? `Hemşire ${turkishFirstNamesFemale[Math.floor(Math.random() * turkishFirstNamesFemale.length)]} ${turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)]}`
        : undefined,

      status: status[Math.floor(Math.random() * status.length)],
      registrationDate,
      lastVisitDate
    }
  })
}

// Export the function for use in components
export { turkishFirstNamesMale, turkishFirstNamesFemale, turkishLastNames, turkishCities, insuranceProviders }
