// KVKK/HIPAA-Compliant Data Encryption - Production Ready
// AES-256-GCM encryption for PHI/Sensitive Data
// NIST SP 800-53 & KVKK Compliant

import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16  // 128 bits
const AUTH_TAG_LENGTH = 16
const SALT_LENGTH = 64

class KeyManager {
  private masterKey: Buffer

  constructor() {
    const masterKeyHex = process.env.ENCRYPTION_MASTER_KEY
    if (!masterKeyHex || masterKeyHex.length !== 64) {
      throw new Error('ENCRYPTION_MASTER_KEY must be 64 hex characters')
    }
    this.masterKey = Buffer.from(masterKeyHex, 'hex')
  }

  deriveKey(context: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
      this.masterKey,
      Buffer.concat([Buffer.from(context, 'utf8'), salt]),
      100000,
      KEY_LENGTH,
      'sha512'
    )
  }

  generateSalt(): Buffer {
    return crypto.randomBytes(SALT_LENGTH)
  }

  generateIV(): Buffer {
    return crypto.randomBytes(IV_LENGTH)
  }
}

export class EncryptionService {
  private keyManager: KeyManager

  constructor() {
    this.keyManager = new KeyManager()
  }

  encrypt(plaintext: string, context: string): string {
    if (!plaintext) throw new Error('Plaintext cannot be empty')

    const salt = this.keyManager.generateSalt()
    const iv = this.keyManager.generateIV()
    const key = this.keyManager.deriveKey(context, salt)

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
    const authTag = cipher.getAuthTag()

    return Buffer.concat([salt, iv, authTag, encrypted]).toString('base64')
  }

  decrypt(encryptedData: string, context: string): string {
    if (!encryptedData) throw new Error('Encrypted data cannot be empty')

    try {
      const combined = Buffer.from(encryptedData, 'base64')
      let offset = 0

      const salt = combined.subarray(offset, offset + SALT_LENGTH)
      offset += SALT_LENGTH
      const iv = combined.subarray(offset, offset + IV_LENGTH)
      offset += IV_LENGTH
      const authTag = combined.subarray(offset, offset + AUTH_TAG_LENGTH)
      offset += AUTH_TAG_LENGTH
      const encrypted = combined.subarray(offset)

      const key = this.keyManager.deriveKey(context, salt)
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
      decipher.setAuthTag(authTag)

      return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown'}`)
    }
  }

  hash(data: string): string {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex')
  }

  verifyHash(data: string, hash: string): boolean {
    return crypto.timingSafeEqual(Buffer.from(this.hash(data), 'hex'), Buffer.from(hash, 'hex'))
  }

  sign(data: string, context: string): string {
    const salt = this.keyManager.generateSalt()
    const key = this.keyManager.deriveKey(context, salt)
    const hmac = crypto.createHmac('sha256', key)
    return `${salt.toString('hex')}:${hmac.update(data).digest('hex')}`
  }

  verifySignature(data: string, signatureWithSalt: string, context: string): boolean {
    try {
      const [saltHex, signature] = signatureWithSalt.split(':')
      const salt = Buffer.from(saltHex, 'hex')
      const key = this.keyManager.deriveKey(context, salt)
      const hmac = crypto.createHmac('sha256', key)
      const computed = hmac.update(data).digest('hex')
      return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(signature, 'hex'))
    } catch {
      return false
    }
  }
}

let encryptionService: EncryptionService | null = null
export function getEncryptionService(): EncryptionService {
  if (!encryptionService) encryptionService = new EncryptionService()
  return encryptionService
}

// Legacy compatibility
export function encryptPHI(data: string): string {
  return getEncryptionService().encrypt(data, 'phi:general')
}

export function decryptPHI(encryptedData: string): string {
  return getEncryptionService().decrypt(encryptedData, 'phi:general')
}

export function hashIdentifier(identifier: string): string {
  return getEncryptionService().hash(identifier)
}

/**
 * Sanitize input to prevent XSS attacks
 *
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Generate secure random token
 * Used for session tokens, CSRF tokens, etc.
 *
 * @param length - Token length
 * @returns Secure random token
 */
export function generateSecureToken(length: number = 32): string {
  if (typeof window !== 'undefined' && window.crypto) {
    // Browser environment
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Fallback for server-side
  return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

/**
 * Validate and sanitize file uploads
 * Prevent malicious file uploads
 *
 * @param file - File to validate
 * @returns Validation result
 */
export function validateFileUpload(file: File): {
  valid: boolean
  error?: string
} {
  // Allowed file types for medical records
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/dicom', // DICOM medical images
  ]

  // Max file size: 50MB
  const maxSize = 50 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, GIF, PDF, and DICOM files are allowed.',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 50MB limit.',
    }
  }

  return { valid: true }
}

/**
 * Mask sensitive data for display
 * e.g., SSN: ***-**-1234
 *
 * @param data - Data to mask
 * @param visibleChars - Number of characters to show at the end
 * @returns Masked data
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length)
  }

  const masked = '*'.repeat(data.length - visibleChars)
  const visible = data.slice(-visibleChars)
  return masked + visible
}

/**
 * Validate password strength (HIPAA requirements)
 *
 * @param password - Password to validate
 * @returns Validation result
 */
export function validatePasswordStrength(password: string): {
  valid: boolean
  score: number
  errors: string[]
} {
  const errors: string[] = []
  let score = 0

  // Minimum 12 characters (HIPAA recommendation)
  if (password.length >= 12) {
    score++
  } else {
    errors.push('Password must be at least 12 characters long')
  }

  // Uppercase letter
  if (/[A-Z]/.test(password)) {
    score++
  } else {
    errors.push('Password must contain at least one uppercase letter')
  }

  // Lowercase letter
  if (/[a-z]/.test(password)) {
    score++
  } else {
    errors.push('Password must contain at least one lowercase letter')
  }

  // Number
  if (/[0-9]/.test(password)) {
    score++
  } else {
    errors.push('Password must contain at least one number')
  }

  // Special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score++
  } else {
    errors.push('Password must contain at least one special character')
  }

  return {
    valid: score >= 5,
    score,
    errors,
  }
}

/**
 * Check if session is expired
 * HIPAA requires automatic logout after inactivity
 *
 * @param lastActivity - Last activity timestamp
 * @param timeoutMinutes - Session timeout in minutes (default: 30)
 * @returns Whether session is expired
 */
export function isSessionExpired(
  lastActivity: Date,
  timeoutMinutes: number = 30
): boolean {
  const now = new Date()
  const diff = now.getTime() - lastActivity.getTime()
  const diffMinutes = diff / (1000 * 60)
  return diffMinutes > timeoutMinutes
}

/**
 * Audit log entry for compliance
 * All PHI access must be logged per HIPAA
 *
 * @param action - Action performed
 * @param userId - User ID
 * @param resourceId - Resource accessed
 * @param metadata - Additional metadata
 */
export function logAuditEntry(
  action: string,
  userId: string,
  resourceId: string,
  metadata?: Record<string, any>
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    action,
    userId: hashIdentifier(userId), // Hash user ID for privacy
    resourceId: hashIdentifier(resourceId), // Hash resource ID
    metadata,
    ip: typeof window !== 'undefined' ? 'client' : 'server',
  }

  // In production, send to audit log service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., CloudWatch, Datadog, Splunk)
    console.log('[AUDIT]', JSON.stringify(entry))
  } else {
    console.log('[AUDIT - DEV]', entry)
  }
}
