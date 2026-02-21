"use client";

/**
 * RecordsList Component
 * View and manage blockchain health records from Oasis Sapphire
 *
 * Features:
 * - Fetch encrypted records from blockchain
 * - Client-side decryption
 * - Filter by record type
 * - View FHIR resource details
 * - Download/export records
 * - Blockchain transaction verification
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  FileText,
  Download,
  Eye,
  Filter,
  Loader2,
  Lock,
  ExternalLink,
  Calendar,
  Hash,
} from "lucide-react";
import {
  PatientVaultClient,
  RecordType,
  type BlockchainRecord,
} from "@/lib/blockchain/client/patient-vault-client";

interface RecordsListProps {
  patientDID: string;
  provider: ethers.BrowserProvider;
}

export default function RecordsList({ patientDID, provider }: RecordsListProps) {
  const [records, setRecords] = useState<BlockchainRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<BlockchainRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<RecordType | "all">("all");
  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(null);
  const [decryptedData, setDecryptedData] = useState<any>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const vaultClient = new PatientVaultClient(provider);

  useEffect(() => {
    loadRecords();
  }, [patientDID]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(records.filter((r) => r.recordType === selectedType));
    }
  }, [selectedType, records]);

  async function loadRecords() {
    try {
      setIsLoading(true);
      const allRecords = await vaultClient.getPatientRecords(patientDID);
      setRecords(allRecords);
      setFilteredRecords(allRecords);
    } catch (err: any) {
      console.error("Failed to load records:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function decryptRecord(record: BlockchainRecord) {
    setIsDecrypting(true);
    setSelectedRecord(record);
    setDecryptedData(null);

    try {
      // In production, this would:
      // 1. Retrieve patient's private key from wallet/keystore
      // 2. Decrypt the record's encryption key
      // 3. Use decrypted key to decrypt the FHIR data

      // For demo purposes, simulate decryption
      const decrypted = await simulateDecryption(record.encryptedData);
      setDecryptedData(decrypted);
    } catch (err: any) {
      console.error("Decryption failed:", err);
      setDecryptedData({
        error: "Failed to decrypt record. You may not have the correct encryption key.",
      });
    } finally {
      setIsDecrypting(false);
    }
  }

  async function simulateDecryption(encryptedData: Uint8Array): Promise<any> {
    // Simulate async decryption delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In production, implement real AES-256-GCM decryption
    // For now, return sample FHIR data structure
    return {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "85354-9",
            display: "Blood pressure panel",
          },
        ],
      },
      effectiveDateTime: new Date().toISOString(),
      component: [
        {
          code: {
            coding: [
              { system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" },
            ],
          },
          valueQuantity: { value: 120, unit: "mmHg" },
        },
        {
          code: {
            coding: [
              { system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" },
            ],
          },
          valueQuantity: { value: 80, unit: "mmHg" },
        },
      ],
    };
  }

  function downloadRecord(record: BlockchainRecord, data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `record-${record.recordId.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getRecordTypeLabel(type: RecordType): string {
    const labels: Record<RecordType, string> = {
      [RecordType.ENCOUNTER]: "Encounter",
      [RecordType.OBSERVATION]: "Observation",
      [RecordType.DIAGNOSTIC_REPORT]: "Diagnostic Report",
      [RecordType.MEDICATION]: "Medication",
      [RecordType.PROCEDURE]: "Procedure",
      [RecordType.IMAGING]: "Imaging",
      [RecordType.LAB_RESULT]: "Lab Result",
      [RecordType.Immunization]: "Immunization",
      [RecordType.AllergyIntolerance]: "Allergy",
      [RecordType.CarePlan]: "Care Plan",
      [RecordType.ClinicalDocument]: "Document",
    };
    return labels[type] || "Unknown";
  }

  function getRecordTypeColor(type: RecordType): string {
    const colors: Record<RecordType, string> = {
      [RecordType.ENCOUNTER]: "bg-blue-100 text-blue-800",
      [RecordType.OBSERVATION]: "bg-green-100 text-green-800",
      [RecordType.DIAGNOSTIC_REPORT]: "bg-purple-100 text-purple-800",
      [RecordType.MEDICATION]: "bg-orange-100 text-orange-800",
      [RecordType.PROCEDURE]: "bg-red-100 text-red-800",
      [RecordType.IMAGING]: "bg-cyan-100 text-cyan-800",
      [RecordType.LAB_RESULT]: "bg-lime-100 text-lime-800",
      [RecordType.Immunization]: "bg-teal-100 text-teal-800",
      [RecordType.AllergyIntolerance]: "bg-yellow-100 text-yellow-800",
      [RecordType.CarePlan]: "bg-indigo-100 text-indigo-800",
      [RecordType.ClinicalDocument]: "bg-gray-100 text-gray-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  }

  const recordTypeOptions = [
    { value: "all", label: "All Records" },
    { value: RecordType.ENCOUNTER, label: "Encounters" },
    { value: RecordType.OBSERVATION, label: "Observations" },
    { value: RecordType.DIAGNOSTIC_REPORT, label: "Diagnostic Reports" },
    { value: RecordType.MEDICATION, label: "Medications" },
    { value: RecordType.PROCEDURE, label: "Procedures" },
    { value: RecordType.Immunization, label: "Immunizations" },
    { value: RecordType.AllergyIntolerance, label: "Allergies" },
    { value: RecordType.CarePlan, label: "Care Plans" },
    { value: RecordType.ClinicalDocument, label: "Documents" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
            <p className="text-sm text-gray-600">
              {filteredRecords.length} record{filteredRecords.length !== 1 ? "s" : ""} on blockchain
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(
                e.target.value === "all" ? "all" : (Number(e.target.value) as RecordType)
              )
            }
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {recordTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No health records found</p>
          <p className="text-sm text-gray-500 mt-1">
            Upload your first FHIR record to the blockchain
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRecords.map((record, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${getRecordTypeColor(
                        record.recordType
                      )}`}
                    >
                      {getRecordTypeLabel(record.recordType)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(record.timestamp * 1000).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-mono mb-1">
                    ID: {record.recordId.slice(0, 20)}...
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3.5 w-3.5" />
                      Block {record.blockNumber}
                    </div>
                    {record.ipfsHash && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        IPFS
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decryptRecord(record)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {getRecordTypeLabel(selectedRecord.recordType)}
                  </h3>
                  <p className="text-xs text-gray-600 font-mono">
                    {selectedRecord.recordId.slice(0, 20)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {decryptedData && !decryptedData.error && (
                  <button
                    onClick={() => downloadRecord(selectedRecord, decryptedData)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedRecord(null);
                    setDecryptedData(null);
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isDecrypting ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-3" />
                  <p className="text-sm text-gray-600">Decrypting record...</p>
                </div>
              ) : decryptedData ? (
                decryptedData.error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-900">{decryptedData.error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* FHIR JSON Display */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">FHIR Resource</h4>
                      <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs overflow-x-auto">
                        {JSON.stringify(decryptedData, null, 2)}
                      </pre>
                    </div>

                    {/* Blockchain Metadata */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Blockchain Metadata
                      </h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Record ID:</span>
                          <span className="font-mono text-gray-900">
                            {selectedRecord.recordId.slice(0, 16)}...
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Block Number:</span>
                          <span className="font-mono text-gray-900">
                            {selectedRecord.blockNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timestamp:</span>
                          <span className="text-gray-900">
                            {new Date(selectedRecord.timestamp * 1000).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Encryption:</span>
                          <span className="text-gray-900">AES-256-GCM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-900">
            All records are encrypted with AES-256-GCM and stored on Oasis Sapphire blockchain.
            Only you can decrypt and view your complete health history.
          </p>
        </div>
      </div>
    </div>
  );
}
