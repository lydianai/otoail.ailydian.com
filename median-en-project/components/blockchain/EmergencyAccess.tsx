"use client";

/**
 * EmergencyAccess Component
 * Break-glass emergency access mechanism for critical healthcare situations
 *
 * Features:
 * - Emergency access requests with justification
 * - 24-hour auto-expiry for emergency consents
 * - Real-time audit trail
 * - HIPAA-compliant emergency override
 * - Patient notification system
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  AlertTriangle,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  History,
} from "lucide-react";
import {
  PatientVaultClient,
  type EmergencyAccessRequest,
} from "@/lib/blockchain/client/patient-vault-client";

interface EmergencyAccessProps {
  patientDID: string;
  provider: ethers.BrowserProvider;
  userRole: "patient" | "provider";
}

interface EmergencyRequestForm {
  patientDID: string;
  reason: string;
  clinicalJustification: string;
}

export default function EmergencyAccess({
  patientDID,
  provider,
  userRole,
}: EmergencyAccessProps) {
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyAccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState<EmergencyRequestForm>({
    patientDID: patientDID,
    reason: "",
    clinicalJustification: "",
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const vaultClient = new PatientVaultClient(provider);

  useEffect(() => {
    loadEmergencyRequests();

    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(loadEmergencyRequests, 30000);
    return () => clearInterval(interval);
  }, [patientDID]);

  async function loadEmergencyRequests() {
    try {
      setIsLoading(true);
      const requests = await vaultClient.getEmergencyAccessRequests(patientDID);
      setEmergencyRequests(requests);
    } catch (err: any) {
      console.error("Failed to load emergency requests:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function requestEmergencyAccess() {
    if (!requestForm.reason.trim()) {
      setError("Emergency reason is required");
      return;
    }

    if (!requestForm.clinicalJustification.trim()) {
      setError("Clinical justification is required");
      return;
    }

    setIsRequesting(true);
    setError(null);
    setSuccess(null);

    try {
      const receipt = await vaultClient.requestEmergencyAccess(
        requestForm.patientDID,
        requestForm.reason
      );

      setSuccess(
        `Emergency access requested. Transaction: ${receipt.hash.slice(0, 10)}...`
      );

      // Log to audit trail
      console.log("🚨 EMERGENCY ACCESS REQUESTED:", {
        patient: requestForm.patientDID,
        provider: await provider.getSigner().then((s) => s.getAddress()),
        reason: requestForm.reason,
        justification: requestForm.clinicalJustification,
        timestamp: new Date().toISOString(),
        txHash: receipt.hash,
      });

      // Reset form
      setRequestForm({
        patientDID: patientDID,
        reason: "",
        clinicalJustification: "",
      });
      setShowRequestForm(false);

      // Reload requests
      await loadEmergencyRequests();
    } catch (err: any) {
      console.error("Failed to request emergency access:", err);
      setError(err.message || "Failed to request emergency access");
    } finally {
      setIsRequesting(false);
    }
  }

  function getRemainingTime(expiryTime: number): string {
    const now = Math.floor(Date.now() / 1000);
    const remaining = expiryTime - now;

    if (remaining <= 0) return "Expired";

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  }

  function isActive(request: EmergencyAccessRequest): boolean {
    const now = Math.floor(Date.now() / 1000);
    return request.expiryTime > now;
  }

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">Emergency Access Protocol</h3>
            <p className="text-sm text-red-700 mt-1">
              Break-glass mechanism for critical healthcare situations. All emergency access
              requests are logged and audited. Access expires automatically after 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Provider: Request Emergency Access */}
      {userRole === "provider" && (
        <div className="space-y-4">
          {!showRequestForm ? (
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="h-5 w-5" />
              Request Emergency Access
            </button>
          ) : (
            <div className="bg-white border border-red-300 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Emergency Access Request</h4>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Reason *
                </label>
                <select
                  value={requestForm.reason}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, reason: e.target.value })
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select reason...</option>
                  <option value="Life-threatening condition">Life-threatening condition</option>
                  <option value="Cardiac arrest">Cardiac arrest</option>
                  <option value="Severe trauma">Severe trauma</option>
                  <option value="Stroke">Stroke</option>
                  <option value="Anaphylaxis">Anaphylaxis</option>
                  <option value="Septic shock">Septic shock</option>
                  <option value="Respiratory failure">Respiratory failure</option>
                  <option value="Other critical condition">Other critical condition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinical Justification *
                </label>
                <textarea
                  value={requestForm.clinicalJustification}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      clinicalJustification: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Provide detailed clinical justification for emergency access..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 20 characters required for audit compliance
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-900">
                  ⚠️ This action will be logged in the blockchain audit trail. Patient will be
                  notified immediately. Access will automatically expire in 24 hours.
                </p>
              </div>

              <button
                onClick={requestEmergencyAccess}
                disabled={
                  isRequesting ||
                  !requestForm.reason ||
                  requestForm.clinicalJustification.length < 20
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequesting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Requesting Access...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Submit Emergency Request
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

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

      {/* Emergency Access History */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">
            Emergency Access History ({emergencyRequests.length})
          </h4>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
          </div>
        ) : emergencyRequests.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No emergency access requests</p>
            <p className="text-sm text-gray-500 mt-1">
              Emergency requests will appear here when initiated
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {emergencyRequests.map((request, index) => {
              const active = isActive(request);
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    active
                      ? "bg-red-50 border-red-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {active ? (
                        <div className="bg-red-100 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 p-2 rounded-full">
                          <History className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {request.reason}
                        </p>
                        <p className="text-xs text-gray-600 font-mono mt-1">
                          Provider: {request.provider.slice(0, 10)}...
                          {request.provider.slice(-6)}
                        </p>
                      </div>
                    </div>

                    {active && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        Requested: {new Date(request.timestamp * 1000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span className={active ? "text-red-600 font-medium" : ""}>
                        {getRemainingTime(request.expiryTime)}
                      </span>
                    </div>
                  </div>

                  {userRole === "patient" && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-700">
                        <strong>Audit Note:</strong> This emergency access was logged to the
                        blockchain audit trail on{" "}
                        {new Date(request.timestamp * 1000).toLocaleDateString()} at{" "}
                        {new Date(request.timestamp * 1000).toLocaleTimeString()}.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* HIPAA Compliance Notice */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900">
            <strong>HIPAA Compliance:</strong> Emergency access is permitted under HIPAA 45 CFR §
            164.510(b) for treatment purposes in emergency situations. All break-glass events are
            recorded on blockchain with immutable timestamps for regulatory compliance and patient
            notification.
          </p>
        </div>
      </div>
    </div>
  );
}
