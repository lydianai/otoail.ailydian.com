"use client";

/**
 * ConsentManager Component
 * Manage provider access consents on Oasis Sapphire blockchain
 *
 * Features:
 * - Grant time-limited consent to healthcare providers
 * - View and revoke active consents
 * - Purpose-based access control
 * - Audit trail of consent grants/revocations
 * - HIPAA-compliant consent management
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Shield,
  Clock,
  UserCheck,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileText,
} from "lucide-react";
import {
  PatientVaultClient,
  ConsentPurpose,
  type Consent,
} from "@/lib/blockchain/client/patient-vault-client";

interface ConsentManagerProps {
  patientDID: string;
  provider: ethers.BrowserProvider;
  onConsentUpdate?: () => void;
}

interface NewConsentForm {
  providerAddress: string;
  purpose: ConsentPurpose;
  durationDays: number;
  allowedRecords: string[];
}

export default function ConsentManager({
  patientDID,
  provider,
  onConsentUpdate,
}: ConsentManagerProps) {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewConsentForm, setShowNewConsentForm] = useState(false);
  const [newConsent, setNewConsent] = useState<NewConsentForm>({
    providerAddress: "",
    purpose: ConsentPurpose.TREATMENT,
    durationDays: 30,
    allowedRecords: [],
  });
  const [isGranting, setIsGranting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const vaultClient = new PatientVaultClient(provider);

  useEffect(() => {
    loadConsents();
  }, [patientDID]);

  async function loadConsents() {
    try {
      setIsLoading(true);
      const activeConsents = await vaultClient.getActiveConsents(patientDID);
      setConsents(activeConsents);
    } catch (err: any) {
      console.error("Failed to load consents:", err);
      setError("Failed to load consents from blockchain");
    } finally {
      setIsLoading(false);
    }
  }

  async function grantConsent() {
    if (!newConsent.providerAddress) {
      setError("Provider address is required");
      return;
    }

    if (!ethers.isAddress(newConsent.providerAddress)) {
      setError("Invalid Ethereum address");
      return;
    }

    setIsGranting(true);
    setError(null);
    setSuccess(null);

    try {
      const durationSeconds = newConsent.durationDays * 24 * 60 * 60;
      const allowedRecordsBytes = newConsent.allowedRecords.map((id) =>
        ethers.id(id)
      );

      const receipt = await vaultClient.grantConsent(
        patientDID,
        newConsent.providerAddress,
        newConsent.purpose,
        durationSeconds,
        allowedRecordsBytes
      );

      setSuccess(`Consent granted successfully! TX: ${receipt.hash.slice(0, 10)}...`);

      // Reset form
      setNewConsent({
        providerAddress: "",
        purpose: ConsentPurpose.TREATMENT,
        durationDays: 30,
        allowedRecords: [],
      });
      setShowNewConsentForm(false);

      // Reload consents
      await loadConsents();
      onConsentUpdate?.();
    } catch (err: any) {
      console.error("Failed to grant consent:", err);
      setError(err.message || "Failed to grant consent");
    } finally {
      setIsGranting(false);
    }
  }

  async function revokeConsent(providerAddress: string) {
    if (!confirm("Are you sure you want to revoke access for this provider?")) {
      return;
    }

    try {
      const receipt = await vaultClient.revokeConsent(patientDID, providerAddress);
      setSuccess(`Consent revoked successfully! TX: ${receipt.hash.slice(0, 10)}...`);

      // Reload consents
      await loadConsents();
      onConsentUpdate?.();
    } catch (err: any) {
      console.error("Failed to revoke consent:", err);
      setError(err.message || "Failed to revoke consent");
    }
  }

  function formatDuration(seconds: number): string {
    const days = Math.floor(seconds / (24 * 60 * 60));
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;

    const hours = Math.floor(seconds / (60 * 60));
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;

    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  function formatExpiryDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays === 1) return "Expires tomorrow";
    if (diffDays < 7) return `Expires in ${diffDays} days`;

    return date.toLocaleDateString();
  }

  function getPurposeLabel(purpose: ConsentPurpose): string {
    const labels: Record<ConsentPurpose, string> = {
      [ConsentPurpose.TREATMENT]: "Treatment",
      [ConsentPurpose.RESEARCH]: "Research",
      [ConsentPurpose.INSURANCE]: "Insurance",
      [ConsentPurpose.EMERGENCY]: "Emergency",
      [ConsentPurpose.PATIENT_ACCESS]: "Second Opinion",
    };
    return labels[purpose] || "Unknown";
  }

  function getPurposeColor(purpose: ConsentPurpose): string {
    const colors: Record<ConsentPurpose, string> = {
      [ConsentPurpose.TREATMENT]: "bg-blue-100 text-blue-800",
      [ConsentPurpose.RESEARCH]: "bg-purple-100 text-purple-800",
      [ConsentPurpose.INSURANCE]: "bg-green-100 text-green-800",
      [ConsentPurpose.EMERGENCY]: "bg-red-100 text-red-800",
      [ConsentPurpose.PATIENT_ACCESS]: "bg-yellow-100 text-yellow-800",
    };
    return colors[purpose] || "bg-gray-100 text-gray-800";
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Consent Management</h3>
            <p className="text-sm text-gray-600">
              Control who can access your health records
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewConsentForm(!showNewConsentForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showNewConsentForm ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Grant Access
            </>
          )}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900">{error}</p>
          </div>
        </div>
      )}

      {/* New Consent Form */}
      {showNewConsentForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-gray-900">Grant New Access</h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provider Wallet Address
            </label>
            <input
              type="text"
              value={newConsent.providerAddress}
              onChange={(e) =>
                setNewConsent({ ...newConsent, providerAddress: e.target.value })
              }
              placeholder="0x..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Purpose
            </label>
            <select
              value={newConsent.purpose}
              onChange={(e) =>
                setNewConsent({
                  ...newConsent,
                  purpose: Number(e.target.value) as ConsentPurpose,
                })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={ConsentPurpose.TREATMENT}>Treatment</option>
              <option value={ConsentPurpose.RESEARCH}>Research</option>
              <option value={ConsentPurpose.INSURANCE}>Insurance</option>
              <option value={ConsentPurpose.EMERGENCY}>Emergency</option>
              <option value={ConsentPurpose.PATIENT_ACCESS}>Second Opinion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Duration
            </label>
            <select
              value={newConsent.durationDays}
              onChange={(e) =>
                setNewConsent({ ...newConsent, durationDays: Number(e.target.value) })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>1 day</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={180}>180 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>

          <button
            onClick={grantConsent}
            disabled={isGranting}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGranting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Granting Access...
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                Grant Access
              </>
            )}
          </button>
        </div>
      )}

      {/* Active Consents List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Active Consents ({consents.length})</h4>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : consents.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No active consents</p>
            <p className="text-sm text-gray-500 mt-1">
              Grant access to healthcare providers to share your records
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {consents.map((consent, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-mono text-gray-900">
                        {consent.provider.slice(0, 8)}...{consent.provider.slice(-6)}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getPurposeColor(
                          consent.purpose
                        )}`}
                      >
                        {getPurposeLabel(consent.purpose)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatExpiryDate(consent.expiryTime)}
                      </div>
                      {consent.allowedRecords.length > 0 && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {consent.allowedRecords.length} record
                          {consent.allowedRecords.length > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => revokeConsent(consent.provider)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900">
            All consent grants and revocations are recorded on the blockchain. You can revoke
            access at any time. Emergency access requests are logged separately.
          </p>
        </div>
      </div>
    </div>
  );
}
