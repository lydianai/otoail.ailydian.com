'use client';

import React, { useState } from 'react';
import { Code, BookOpen, Key, Zap, Download, Copy, Check, Terminal, FileCode, Database, Lock, Clock, TrendingUp, ExternalLink, AlertCircle, CheckCircle, Globe, Server } from 'lucide-react';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  authentication: boolean;
  rateLimit: string;
  example?: string;
}

interface CodeExample {
  language: string;
  code: string;
  description: string;
}

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'authentication' | 'endpoints' | 'examples' | 'integration'>('overview');
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'php'>('javascript');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const apiEndpoints: { category: string; endpoints: ApiEndpoint[] }[] = [
    {
      category: 'Hasta Yönetimi',
      endpoints: [
        {
          method: 'GET',
          endpoint: '/api/v1/patients',
          description: 'Tüm hasta listesini getirir (sayfalama destekli)',
          authentication: true,
          rateLimit: '1000/saat',
          example: '/api/v1/patients?page=1&limit=50&sort=created_at'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/patients/{id}',
          description: 'Belirli bir hastanın detaylarını getirir',
          authentication: true,
          rateLimit: '5000/saat'
        },
        {
          method: 'POST',
          endpoint: '/api/v1/patients',
          description: 'Yeni hasta kaydı oluşturur',
          authentication: true,
          rateLimit: '500/saat'
        },
        {
          method: 'PUT',
          endpoint: '/api/v1/patients/{id}',
          description: 'Mevcut hasta bilgilerini günceller',
          authentication: true,
          rateLimit: '1000/saat'
        }
      ]
    },
    {
      category: 'e-Nabız Entegrasyonu',
      endpoints: [
        {
          method: 'POST',
          endpoint: '/api/v1/enabiz/send-data',
          description: 'e-Nabız sistemine veri gönderir (SOAP/XML)',
          authentication: true,
          rateLimit: '2000/saat',
          example: 'Muayene, teşhis, reçete bilgileri gönderimi'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/enabiz/patient-history/{tcno}',
          description: 'Hasta geçmişini e-Nabız\'dan çeker',
          authentication: true,
          rateLimit: '3000/saat'
        },
        {
          method: 'POST',
          endpoint: '/api/v1/enabiz/vaccination',
          description: 'Aşı bilgilerini e-Nabız\'a gönderir',
          authentication: true,
          rateLimit: '1000/saat'
        }
      ]
    },
    {
      category: 'Medula Provizyon',
      endpoints: [
        {
          method: 'POST',
          endpoint: '/api/v1/medula/provision',
          description: 'SGK Medula provizyon sorgulama',
          authentication: true,
          rateLimit: '5000/saat'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/medula/takip/{takip-no}',
          description: 'Takip numarası ile provizyon sorgulama',
          authentication: true,
          rateLimit: '3000/saat'
        },
        {
          method: 'POST',
          endpoint: '/api/v1/medula/fatura',
          description: 'SGK fatura gönderimi',
          authentication: true,
          rateLimit: '2000/saat'
        }
      ]
    },
    {
      category: 'PACS & Görüntüleme',
      endpoints: [
        {
          method: 'POST',
          endpoint: '/api/v1/pacs/upload',
          description: 'DICOM görüntü yükleme',
          authentication: true,
          rateLimit: '500/saat',
          example: 'CT, MRI, X-Ray yükleme'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/pacs/images/{study-id}',
          description: 'Study ID ile görüntüleri getirir',
          authentication: true,
          rateLimit: '2000/saat'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/pacs/reports/{study-id}',
          description: 'Radyoloji raporlarını getirir',
          authentication: true,
          rateLimit: '3000/saat'
        }
      ]
    },
    {
      category: 'Laboratuvar',
      endpoints: [
        {
          method: 'POST',
          endpoint: '/api/v1/lab/results',
          description: 'Laboratuvar sonuçları gönderimi (HL7 ORU)',
          authentication: true,
          rateLimit: '3000/saat'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/lab/results/{patient-id}',
          description: 'Hasta laboratuvar sonuçlarını getirir',
          authentication: true,
          rateLimit: '5000/saat'
        },
        {
          method: 'GET',
          endpoint: '/api/v1/lab/tests',
          description: 'Mevcut test katalogunu listeler',
          authentication: true,
          rateLimit: '1000/saat'
        }
      ]
    },
    {
      category: 'Randevu Yönetimi',
      endpoints: [
        {
          method: 'GET',
          endpoint: '/api/v1/appointments',
          description: 'Randevu listesini getirir',
          authentication: true,
          rateLimit: '2000/saat'
        },
        {
          method: 'POST',
          endpoint: '/api/v1/appointments',
          description: 'Yeni randevu oluşturur',
          authentication: true,
          rateLimit: '1000/saat'
        },
        {
          method: 'PUT',
          endpoint: '/api/v1/appointments/{id}',
          description: 'Randevu günceller',
          authentication: true,
          rateLimit: '1000/saat'
        },
        {
          method: 'DELETE',
          endpoint: '/api/v1/appointments/{id}',
          description: 'Randevu iptal eder',
          authentication: true,
          rateLimit: '500/saat'
        }
      ]
    }
  ];

  const codeExamples: { [key: string]: CodeExample } = {
    enabiz_javascript: {
      language: 'JavaScript',
      code: `// e-Nabız Veri Gönderimi
const axios = require('axios');

const sendToEnabiz = async (patientData) => {
  const config = {
    headers: {
      'Authorization': \`Bearer \${process.env.API_TOKEN}\`,
      'Content-Type': 'application/json'
    }
  };

  const payload = {
    tc_no: patientData.tcNo,
    exam_date: new Date().toISOString(),
    diagnosis: patientData.diagnosis,
    treatments: patientData.treatments,
    prescriptions: patientData.prescriptions
  };

  try {
    const response = await axios.post(
      'https://api.vitalcare.com/v1/enabiz/send-data',
      payload,
      config
    );

    console.log('e-Nabız yanıt:', response.data);
    return response.data;
  } catch (error) {
    console.error('e-Nabız hata:', error.response.data);
    throw error;
  }
};

// Kullanım
sendToEnabiz({
  tcNo: '12345678901',
  diagnosis: 'J06.9 - Akut üst solunum yolu enfeksiyonu',
  treatments: ['Vital signs monitoring'],
  prescriptions: ['Paracetamol 500mg 2x1']
});`,
      description: 'e-Nabız sistemine muayene, teşhis ve reçete bilgileri gönderimi'
    },
    enabiz_python: {
      language: 'Python',
      code: `# e-Nabız Veri Gönderimi
import requests
import os
from datetime import datetime

def send_to_enabiz(patient_data):
    """e-Nabız sistemine hasta verisi gönderir"""

    headers = {
        'Authorization': f"Bearer {os.getenv('API_TOKEN')}",
        'Content-Type': 'application/json'
    }

    payload = {
        'tc_no': patient_data['tc_no'],
        'exam_date': datetime.now().isoformat(),
        'diagnosis': patient_data['diagnosis'],
        'treatments': patient_data['treatments'],
        'prescriptions': patient_data['prescriptions']
    }

    try:
        response = requests.post(
            'https://api.vitalcare.com/v1/enabiz/send-data',
            json=payload,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        print(f"e-Nabız yanıt: {response.json()}")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"e-Nabız hata: {e}")
        raise

# Kullanım örneği
patient = {
    'tc_no': '12345678901',
    'diagnosis': 'J06.9 - Akut üst solunum yolu enfeksiyonu',
    'treatments': ['Vital signs monitoring'],
    'prescriptions': ['Paracetamol 500mg 2x1']
}

send_to_enabiz(patient)`,
      description: 'Python ile e-Nabız entegrasyonu ve hata yönetimi'
    },
    enabiz_php: {
      language: 'PHP',
      code: `<?php
// e-Nabız Veri Gönderimi

function sendToEnabiz($patientData) {
    $apiToken = getenv('API_TOKEN');
    $url = 'https://api.vitalcare.com/v1/enabiz/send-data';

    $payload = [
        'tc_no' => $patientData['tc_no'],
        'exam_date' => date('c'),
        'diagnosis' => $patientData['diagnosis'],
        'treatments' => $patientData['treatments'],
        'prescriptions' => $patientData['prescriptions']
    ];

    $headers = [
        'Authorization: Bearer ' . $apiToken,
        'Content-Type: application/json'
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        echo "e-Nabız başarılı: " . $response . "\\n";
        return json_decode($response, true);
    } else {
        throw new Exception("e-Nabız hata: $response");
    }
}

// Kullanım
$patient = [
    'tc_no' => '12345678901',
    'diagnosis' => 'J06.9 - Akut üst solunum yolu enfeksiyonu',
    'treatments' => ['Vital signs monitoring'],
    'prescriptions' => ['Paracetamol 500mg 2x1']
];

sendToEnabiz($patient);
?>`,
      description: 'PHP cURL ile e-Nabız entegrasyonu'
    },
    medula_javascript: {
      language: 'JavaScript',
      code: `// Medula Provizyon Sorgulama
const queryMedulaProvision = async (patientTC, treatmentType) => {
  const response = await fetch('https://api.vitalcare.com/v1/medula/provision', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_TOKEN}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tc_no: patientTC,
      treatment_type: treatmentType, // AYAKTAN, YATARAK, ACIL
      hospital_code: '1234567890',
      brans_kodu: '1000' // Dahiliye
    })
  });

  const data = await response.json();

  if (data.success && data.provision_status === 'APPROVED') {
    console.log(\`Provizyon alındı: \${data.takip_no}\`);
    console.log(\`Kullanıcı hakkı: %\${data.katilim_payi}\`);
    return data;
  } else {
    console.error(\`Provizyon red: \${data.red_kodu} - \${data.red_aciklama}\`);
    throw new Error(data.red_aciklama);
  }
};

// Kullanım
queryMedulaProvision('12345678901', 'AYAKTAN')
  .then(provision => console.log('Takip No:', provision.takip_no))
  .catch(error => console.error('Hata:', error.message));`,
      description: 'SGK Medula sisteminden provizyon sorgulama ve hata yönetimi'
    },
    medula_python: {
      language: 'Python',
      code: `# Medula Provizyon Sorgulama
import requests

def query_medula_provision(patient_tc, treatment_type='AYAKTAN'):
    """SGK Medula provizyon sorgular"""

    url = 'https://api.vitalcare.com/v1/medula/provision'
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }

    payload = {
        'tc_no': patient_tc,
        'treatment_type': treatment_type,  # AYAKTAN, YATARAK, ACIL
        'hospital_code': '1234567890',
        'brans_kodu': '1000'  # Dahiliye
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()

    if data['success'] and data['provision_status'] == 'APPROVED':
        print(f"Provizyon alındı: {data['takip_no']}")
        print(f"Katılım payı: %{data['katilim_payi']}")
        return data
    else:
        error_msg = f"{data['red_kodu']} - {data['red_aciklama']}"
        print(f"Provizyon red edildi: {error_msg}")
        raise Exception(error_msg)

# Kullanım
try:
    provision = query_medula_provision('12345678901', 'AYAKTAN')
    print(f"Takip No: {provision['takip_no']}")
except Exception as e:
    print(f"Hata: {e}")`,
      description: 'Python ile Medula provizyon sorgulama'
    },
    hl7_javascript: {
      language: 'JavaScript',
      code: `// HL7 ORU (Laboratuvar Sonucu) Parsing
const parseHL7ORU = (hl7Message) => {
  const segments = hl7Message.split('\\r');
  const result = {
    patient: {},
    observations: []
  };

  segments.forEach(segment => {
    const fields = segment.split('|');
    const segmentType = fields[0];

    if (segmentType === 'PID') {
      // Patient Demographics
      result.patient = {
        id: fields[3],
        name: fields[5],
        birthDate: fields[7],
        gender: fields[8]
      };
    } else if (segmentType === 'OBR') {
      // Observation Request
      result.orderInfo = {
        orderNumber: fields[2],
        testCode: fields[4],
        observationDateTime: fields[7]
      };
    } else if (segmentType === 'OBX') {
      // Observation Result
      result.observations.push({
        valueType: fields[2],
        testCode: fields[3],
        testName: fields[3].split('^')[1],
        value: fields[5],
        units: fields[6],
        referenceRange: fields[7],
        abnormalFlag: fields[8],
        status: fields[11]
      });
    }
  });

  return result;
};

// HL7 mesaj örneği
const hl7 = \`MSH|^~\\\\&|LAB|HOSPITAL|HBYS|HOSPITAL|20241223120000||ORU^R01|MSG001|P|2.5
PID|1||123456||DOE^JOHN||19800101|M
OBR|1|ORD001|LAB001|CBC^Complete Blood Count||20241223110000
OBX|1|NM|WBC^White Blood Count||8.5|10^3/uL|4.0-11.0|N|||F
OBX|2|NM|HGB^Hemoglobin||14.2|g/dL|13.5-17.5|N|||F\`;

const labResults = parseHL7ORU(hl7);
console.log('Hasta:', labResults.patient);
console.log('Test Sonuçları:', labResults.observations);`,
      description: 'HL7 ORU mesajlarını parse ederek laboratuvar sonuçlarını çıkarma'
    },
    dicom_python: {
      language: 'Python',
      code: `# DICOM Görüntü Upload
import requests
import os

def upload_dicom_image(dicom_file_path, patient_id, study_description):
    """DICOM görüntüsünü PACS sistemine yükler"""

    url = 'https://api.vitalcare.com/v1/pacs/upload'

    headers = {
        'Authorization': f'Bearer {os.getenv("API_TOKEN")}'
    }

    # Multipart form data
    with open(dicom_file_path, 'rb') as f:
        files = {
            'dicom_file': (os.path.basename(dicom_file_path), f, 'application/dicom')
        }

        data = {
            'patient_id': patient_id,
            'study_description': study_description,
            'modality': 'CT',  # CT, MRI, CR, DX, US, etc.
            'body_part': 'CHEST'
        }

        response = requests.post(
            url,
            files=files,
            data=data,
            headers=headers,
            timeout=120  # DICOM dosyaları büyük olabilir
        )

    if response.status_code == 200:
        result = response.json()
        print(f"Upload başarılı!")
        print(f"Study ID: {result['study_id']}")
        print(f"Study UID: {result['study_instance_uid']}")
        return result
    else:
        print(f"Upload hatası: {response.text}")
        raise Exception(f"DICOM upload failed: {response.status_code}")

# Kullanım
upload_dicom_image(
    '/path/to/ct_scan.dcm',
    patient_id='12345',
    study_description='Thorax CT with contrast'
)`,
      description: 'DICOM görüntülerini PACS sistemine yükleme'
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-rose-500 bg-opacity-50 rounded-full text-sm font-semibold mb-6">
              <Code className="inline w-4 h-4 mr-2" />
              API Dokümantasyonu & Geliştirici Rehberi
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Median REST API v1
            </h1>
            <p className="text-xl text-rose-100 mb-8">
              HBYS sistemlerinizi Median platformuna entegre edin. HL7 FHIR R4 uyumlu,
              RESTful API ile e-Nabız, Medula, PACS ve laboratuvar entegrasyonları.
            </p>
            <div className="flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Server className="w-6 h-6" />
                <span className="text-lg font-semibold">HL7 FHIR R4</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                <span className="text-lg font-semibold">OAuth 2.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6" />
                <span className="text-lg font-semibold">10K req/saat</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6" />
                <span className="text-lg font-semibold">99.9% Uptime</span>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-semibold flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Key Alın
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-rose-600 transition-all font-semibold flex items-center gap-2">
                <Download className="w-5 h-5" />
                Postman Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex gap-1 overflow-x-auto">
              {[
                { id: 'overview', label: 'Genel Bakış', icon: BookOpen },
                { id: 'authentication', label: 'Kimlik Doğrulama', icon: Key },
                { id: 'endpoints', label: 'API Endpoints', icon: Database },
                { id: 'examples', label: 'Kod Örnekleri', icon: Code },
                { id: 'integration', label: 'Entegrasyon Senaryoları', icon: Zap }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-rose-600 text-rose-600 bg-rose-50'
                      : 'border-transparent text-gray-600 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Median API'ye Hoş Geldiniz</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Median REST API, sağlık kurumlarının HBYS sistemlerini kolayca entegre etmelerini sağlar.
                    HL7 FHIR R4 standardına uyumlu, güvenli ve ölçeklenebilir API altyapımız ile
                    e-Nabız, Medula, PACS, laboratuvar ve daha fazla sistemi entegre edebilirsiniz.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                      <Server className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Base URL</h3>
                    <code className="text-sm text-rose-600 bg-rose-50 px-2 py-1 rounded">
                      https://api.vitalcare.com/v1
                    </code>
                    <p className="text-sm text-gray-600 mt-2">
                      Production API endpoint
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Authentication</h3>
                    <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      OAuth 2.0 + JWT
                    </code>
                    <p className="text-sm text-gray-600 mt-2">
                      Bearer token authentication
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Rate Limit</h3>
                    <code className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                      10,000 req/saat
                    </code>
                    <p className="text-sm text-gray-600 mt-2">
                      Yüksek kullanım için artırılabilir
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 p-8 rounded-xl border-l-4 border-rose-600">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-rose-600" />
                    Temel Özellikler
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>HL7 FHIR R4 standardı desteği</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>RESTful API tasarımı</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>JSON request/response formatı</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>OAuth 2.0 ve JWT authentication</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>Webhook desteği (real-time events)</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>Comprehensive error handling</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>API versioning (v1, v2)</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                        <span>SSL/TLS şifreleme (AES-256)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Hızlı Başlangıç</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">API Key Alın</h4>
                        <p className="text-sm text-gray-600">
                          Median developer portal'dan ücretsiz API key oluşturun
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Authentication Yapın</h4>
                        <p className="text-sm text-gray-600">
                          OAuth 2.0 flow ile access token alın
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">İlk API Çağrısı</h4>
                        <p className="text-sm text-gray-600">
                          Bearer token ile API endpoint'lerine erişin
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Authentication Tab */}
            {activeTab === 'authentication' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Kimlik Doğrulama</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Median API, OAuth 2.0 protokolü ve JWT (JSON Web Tokens) kullanarak
                    güvenli kimlik doğrulama sağlar. Tüm API istekleri Bearer token ile
                    yapılmalıdır.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Key className="w-6 h-6 text-rose-600" />
                    Access Token Alma
                  </h3>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`POST https://api.vitalcare.com/oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "scope": "hbys:read hbys:write enabiz:send medula:provision"
}

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "hbys:read hbys:write enabiz:send medula:provision"
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">API İsteğinde Token Kullanımı</h3>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`GET https://api.vitalcare.com/v1/patients/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json`}
                    </pre>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-rose-600">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-rose-600" />
                      Güvenlik Önlemleri
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5" />
                        Client secret'ı asla client-side'da kullanmayın
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5" />
                        Token'ları güvenli şekilde saklayın (environment variables)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5" />
                        HTTPS kullanımı zorunludur
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5" />
                        Token'lar 1 saat sonra expire olur
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      Scope (Yetki) Seviyeleri
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><code className="bg-blue-100 px-2 py-1 rounded text-xs">hbys:read</code> - Veri okuma yetkisi</li>
                      <li><code className="bg-blue-100 px-2 py-1 rounded text-xs">hbys:write</code> - Veri yazma yetkisi</li>
                      <li><code className="bg-blue-100 px-2 py-1 rounded text-xs">enabiz:send</code> - e-Nabız veri gönderimi</li>
                      <li><code className="bg-blue-100 px-2 py-1 rounded text-xs">medula:provision</code> - Medula provizyon</li>
                      <li><code className="bg-blue-100 px-2 py-1 rounded text-xs">pacs:upload</code> - DICOM görüntü yükleme</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Endpoints Tab */}
            {activeTab === 'endpoints' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Median API endpoint'leri kategorilere ayrılmıştır. Her endpoint için
                    HTTP method, rate limit ve authentication gereksinimi belirtilmiştir.
                  </p>
                </div>

                {apiEndpoints.map((category, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-6 py-4">
                      <h3 className="text-xl font-bold">{category.category}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.endpoints.map((endpoint, endpointIdx) => (
                        <div key={endpointIdx} className="p-6 hover:bg-gray-50 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded font-bold text-sm ${
                                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                                endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                                endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {endpoint.method}
                              </span>
                              <code className="text-sm font-mono text-gray-900">
                                {endpoint.endpoint}
                              </code>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              {endpoint.authentication && (
                                <span className="flex items-center gap-1 text-gray-600">
                                  <Lock className="w-4 h-4" />
                                  Auth
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-gray-600">
                                <Clock className="w-4 h-4" />
                                {endpoint.rateLimit}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{endpoint.description}</p>
                          {endpoint.example && (
                            <div className="mt-3">
                              <code className="text-xs bg-gray-100 px-3 py-1 rounded text-gray-700">
                                Örnek: {endpoint.example}
                              </code>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Kod Örnekleri</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      JavaScript, Python ve PHP dillerinde kullanıma hazır kod örnekleri
                    </p>
                  </div>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="javascript">JavaScript (Node.js)</option>
                    <option value="python">Python</option>
                    <option value="php">PHP</option>
                  </select>
                </div>

                {/* e-Nabız Integration */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">e-Nabız Veri Gönderimi</h3>
                    <button
                      onClick={() => handleCopyCode(
                        codeExamples[`enabiz_${selectedLanguage}`].code,
                        'enabiz'
                      )}
                      className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                    >
                      {copiedCode === 'enabiz' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopyala
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      {codeExamples[`enabiz_${selectedLanguage}`].description}
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{codeExamples[`enabiz_${selectedLanguage}`].code}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Medula Provision */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Medula Provizyon Sorgulama</h3>
                    <button
                      onClick={() => handleCopyCode(
                        codeExamples[`medula_${selectedLanguage}`].code,
                        'medula'
                      )}
                      className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                    >
                      {copiedCode === 'medula' ? (
                        <>
                          <Check className="w-4 h-4" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopyala
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      {codeExamples[`medula_${selectedLanguage}`].description}
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{codeExamples[`medula_${selectedLanguage}`].code}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* HL7 Parsing */}
                {selectedLanguage === 'javascript' && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">HL7 ORU (Lab Results) Parsing</h3>
                      <button
                        onClick={() => handleCopyCode(codeExamples.hl7_javascript.code, 'hl7')}
                        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                      >
                        {copiedCode === 'hl7' ? (
                          <>
                            <Check className="w-4 h-4" />
                            Kopyalandı
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Kopyala
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">
                        {codeExamples.hl7_javascript.description}
                      </p>
                      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{codeExamples.hl7_javascript.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* DICOM Upload */}
                {selectedLanguage === 'python' && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold">DICOM Görüntü Upload (PACS)</h3>
                      <button
                        onClick={() => handleCopyCode(codeExamples.dicom_python.code, 'dicom')}
                        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                      >
                        {copiedCode === 'dicom' ? (
                          <>
                            <Check className="w-4 h-4" />
                            Kopyalandı
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Kopyala
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">
                        {codeExamples.dicom_python.description}
                      </p>
                      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{codeExamples.dicom_python.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Integration Tab */}
            {activeTab === 'integration' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Entegrasyon Senaryoları</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Gerçek dünya entegrasyon örnekleri ve best practices
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">API Playground</h3>
                        <p className="text-sm text-gray-600">Interactive sandbox</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canlı API endpoint'lerini test edin. Authentication olmadan
                      sandbox ortamında deneyim kazanın.
                    </p>
                    <button className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Playground'ı Aç
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Download className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Postman Collection</h3>
                        <p className="text-sm text-gray-600">Hazır API koleksiyonu</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Tüm API endpoint'lerini içeren Postman koleksiyonunu indirin.
                      Environment variables dahil.
                    </p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Collection İndir
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileCode className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">SDK & Libraries</h3>
                        <p className="text-sm text-gray-600">Official client libraries</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      JavaScript, Python, PHP, Java ve .NET için resmi SDK'lar.
                      NPM, pip, composer ile kolayca kurulum.
                    </p>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <Code className="w-4 h-4" />
                      SDK Dokümantasyonu
                    </button>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Webhooks</h3>
                        <p className="text-sm text-gray-600">Real-time event notifications</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Hasta kaydı, randevu, lab sonucu gibi olaylar için webhook
                      kurulumu. Real-time bildirimler.
                    </p>
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Webhook Rehberi
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 p-8 rounded-xl border-l-4 border-rose-600">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">Destek ve Yardım</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Developer Portal</h4>
                      <p className="text-sm text-gray-700">
                        API key yönetimi, kullanım istatistikleri, log görüntüleme
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Community Forum</h4>
                      <p className="text-sm text-gray-700">
                        Diğer geliştiricilerle bilgi paylaşımı, soru-cevap
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technical Support</h4>
                      <p className="text-sm text-gray-700">
                        Email: api@lydianmedi.com<br/>
                        Telefon: +90 850 123 45 67
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Code className="w-16 h-16 mx-auto mb-6 text-rose-100" />
            <h2 className="text-4xl font-bold mb-6">
              API Entegrasyonunda Yardım mı Gerekiyor?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Teknik ekibimiz entegrasyon sürecinizde size yardımcı olmaya hazır.
              Özel entegrasyon danışmanlığı, eğitim ve teknik destek.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-4 bg-white text-rose-600 rounded-lg hover:bg-rose-50 transition-all font-bold text-lg shadow-xl">
                Teknik Destek Talep Et
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-rose-600 transition-all font-bold text-lg">
                Dokümantasyon İndir (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
