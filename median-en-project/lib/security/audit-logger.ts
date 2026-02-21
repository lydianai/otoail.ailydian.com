// HIPAA-Compliant Audit Logging System
// All PHI access must be logged and retained for 7 years
// 21 CFR Part 11 - Electronic Records and Signatures

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIEW_PHI'
  | 'MODIFY_PHI'
  | 'DELETE_PHI'
  | 'EXPORT_PHI'
  | 'PRINT_PHI'
  | 'ACCESS_DENIED'
  | 'PASSWORD_CHANGE'
  | 'MFA_ENABLE'
  | 'MFA_DISABLE'
  | 'USER_CREATE'
  | 'USER_MODIFY'
  | 'USER_DELETE'
  | 'ROLE_CHANGE'
  | 'PERMISSION_CHANGE'
  | 'FDA_SUBMISSION'
  | 'AI_MODEL_UPDATE'
  | 'PCCP_MODIFICATION'
  | 'COMPLIANCE_REVIEW'
  | 'SECURITY_ALERT'
  | 'DATA_BREACH'

export type AuditSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'

export interface AuditLogEntry {
  // Required fields
  id: string
  timestamp: string // ISO 8601 format
  action: AuditAction
  severity: AuditSeverity

  // User information
  userId: string // Hashed
  userRole: string
  userName: string // For display, hashed in storage

  // Resource information
  resourceType: string // e.g., 'Patient', 'AIModel', 'User'
  resourceId: string // Hashed
  resourceDescription?: string

  // Context
  ipAddress: string // Hashed for privacy
  userAgent?: string
  sessionId: string
  location?: string

  // Details
  details: string
  beforeState?: Record<string, any>
  afterState?: Record<string, any>

  // Compliance
  hipaaRelevant: boolean
  fdaRelevant: boolean
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'PHI'

  // Status
  success: boolean
  errorMessage?: string
}

/**
 * Hash sensitive data for audit logs
 */
function hashForAudit(data: string): string {
  // Simple hash - in production use SHA-256
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return `hash_${Math.abs(hash).toString(36)}`
}

/**
 * Generate unique audit log ID
 */
function generateAuditId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create audit log entry
 */
export function createAuditLog(params: {
  action: AuditAction
  severity?: AuditSeverity
  userId: string
  userRole: string
  userName: string
  resourceType: string
  resourceId: string
  resourceDescription?: string
  details: string
  beforeState?: Record<string, any>
  afterState?: Record<string, any>
  hipaaRelevant?: boolean
  fdaRelevant?: boolean
  dataClassification?: AuditLogEntry['dataClassification']
  success?: boolean
  errorMessage?: string
}): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: generateAuditId(),
    timestamp: new Date().toISOString(),
    action: params.action,
    severity: params.severity || 'INFO',

    // Hash user information
    userId: hashForAudit(params.userId),
    userRole: params.userRole,
    userName: hashForAudit(params.userName),

    // Hash resource information
    resourceType: params.resourceType,
    resourceId: hashForAudit(params.resourceId),
    resourceDescription: params.resourceDescription,

    // Context
    ipAddress: hashForAudit('unknown'), // Get from request in production
    sessionId: hashForAudit(`session_${Date.now()}`),

    // Details
    details: params.details,
    beforeState: params.beforeState,
    afterState: params.afterState,

    // Compliance
    hipaaRelevant: params.hipaaRelevant ?? true,
    fdaRelevant: params.fdaRelevant ?? false,
    dataClassification: params.dataClassification || 'PHI',

    // Status
    success: params.success ?? true,
    errorMessage: params.errorMessage,
  }

  return entry
}

/**
 * Log audit entry
 * In production, send to secure logging service
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  // Console logging for development
  if (process.env.NODE_ENV !== 'production') {
    console.log('[AUDIT]', {
      timestamp: entry.timestamp,
      action: entry.action,
      severity: entry.severity,
      userId: entry.userId,
      resource: `${entry.resourceType}:${entry.resourceId}`,
      success: entry.success,
    })
  }

  // In production, send to:
  // - CloudWatch Logs (AWS)
  // - Azure Monitor (Azure)
  // - Cloud Logging (GCP)
  // - Datadog, Splunk, etc.

  try {
    // Placeholder for production logging service
    if (process.env.NODE_ENV === 'production') {
      // await sendToLoggingService(entry)

      // Also write to console for Vercel logs
      console.log('[AUDIT]', JSON.stringify(entry))
    }
  } catch (error) {
    // Never fail the application due to logging errors
    // But log the logging error
    console.error('[AUDIT ERROR]', error)
  }
}

/**
 * Log PHI access (HIPAA requirement)
 */
export async function logPHIAccess(params: {
  action: Extract<AuditAction, 'VIEW_PHI' | 'MODIFY_PHI' | 'DELETE_PHI' | 'EXPORT_PHI' | 'PRINT_PHI'>
  userId: string
  userRole: string
  userName: string
  patientId: string
  patientName: string
  details: string
  beforeState?: Record<string, any>
  afterState?: Record<string, any>
}): Promise<void> {
  const entry = createAuditLog({
    action: params.action,
    severity: params.action === 'DELETE_PHI' ? 'WARNING' : 'INFO',
    userId: params.userId,
    userRole: params.userRole,
    userName: params.userName,
    resourceType: 'Patient',
    resourceId: params.patientId,
    resourceDescription: params.patientName,
    details: params.details,
    beforeState: params.beforeState,
    afterState: params.afterState,
    hipaaRelevant: true,
    fdaRelevant: false,
    dataClassification: 'PHI',
    success: true,
  })

  await logAudit(entry)
}

/**
 * Log FDA compliance action
 */
export async function logFDAAction(params: {
  action: Extract<AuditAction, 'FDA_SUBMISSION' | 'AI_MODEL_UPDATE' | 'PCCP_MODIFICATION' | 'COMPLIANCE_REVIEW'>
  userId: string
  userRole: string
  userName: string
  modelId: string
  modelName: string
  details: string
  beforeState?: Record<string, any>
  afterState?: Record<string, any>
  success?: boolean
  errorMessage?: string
}): Promise<void> {
  const entry = createAuditLog({
    action: params.action,
    severity: params.success === false ? 'ERROR' : 'INFO',
    userId: params.userId,
    userRole: params.userRole,
    userName: params.userName,
    resourceType: 'AIModel',
    resourceId: params.modelId,
    resourceDescription: params.modelName,
    details: params.details,
    beforeState: params.beforeState,
    afterState: params.afterState,
    hipaaRelevant: false,
    fdaRelevant: true,
    dataClassification: 'CONFIDENTIAL',
    success: params.success ?? true,
    errorMessage: params.errorMessage,
  })

  await logAudit(entry)
}

/**
 * Log security event
 */
export async function logSecurityEvent(params: {
  action: Extract<AuditAction, 'ACCESS_DENIED' | 'SECURITY_ALERT' | 'DATA_BREACH' | 'LOGIN' | 'LOGOUT'>
  severity: AuditSeverity
  userId: string
  userRole: string
  userName: string
  details: string
  success?: boolean
  errorMessage?: string
}): Promise<void> {
  const entry = createAuditLog({
    action: params.action,
    severity: params.severity,
    userId: params.userId,
    userRole: params.userRole,
    userName: params.userName,
    resourceType: 'Security',
    resourceId: 'system',
    details: params.details,
    hipaaRelevant: true,
    fdaRelevant: false,
    dataClassification: 'CONFIDENTIAL',
    success: params.success ?? true,
    errorMessage: params.errorMessage,
  })

  await logAudit(entry)

  // For critical security events, send alerts
  if (params.severity === 'CRITICAL') {
    // In production, send to alerting system
    console.error('[CRITICAL SECURITY EVENT]', params.details)
  }
}

/**
 * Query audit logs (for compliance reporting)
 * In production, query from logging service
 */
export async function queryAuditLogs(filters: {
  startDate?: Date
  endDate?: Date
  userId?: string
  action?: AuditAction
  resourceType?: string
  resourceId?: string
  severity?: AuditSeverity
  limit?: number
}): Promise<AuditLogEntry[]> {
  // In production, query from logging service
  // This is a placeholder
  console.log('[AUDIT QUERY]', filters)
  return []
}

/**
 * Export audit logs for compliance
 * HIPAA requires audit logs to be exportable
 */
export async function exportAuditLogs(params: {
  startDate: Date
  endDate: Date
  format: 'JSON' | 'CSV' | 'PDF'
}): Promise<Blob> {
  const logs = await queryAuditLogs({
    startDate: params.startDate,
    endDate: params.endDate,
  })

  if (params.format === 'JSON') {
    const blob = new Blob([JSON.stringify(logs, null, 2)], {
      type: 'application/json',
    })
    return blob
  }

  if (params.format === 'CSV') {
    // Convert to CSV
    const csv = logs.map(log => Object.values(log).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    return blob
  }

  // PDF export would require a PDF library
  throw new Error('PDF export not yet implemented')
}
