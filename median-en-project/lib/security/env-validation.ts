// Environment Variable Validation
// Ensures all required security configurations are present
// HIPAA & FDA Compliance requirements

export interface SecurityConfig {
  deployment: {
    type: 'en-only' | 'tr-only' | 'local'
    siteUrl: string
    locale: string
    region: string
  }
  hipaa: {
    enabled: boolean
    mfaRequired: boolean
    sessionTimeout: number
    dataResidency: 'us' | 'tr' | 'multi'
  }
  fda: {
    enabled: boolean
    environment: 'production' | 'staging' | 'development'
    apiVersion: string
    pccpEnabled: boolean
  }
  security: {
    httpsOnly: boolean
    csrfProtection: boolean
    rateLimiting: boolean
    auditLogging: boolean
  }
}

/**
 * Validate environment variables
 * Throws error if required variables are missing or invalid
 */
export function validateEnvironment(): SecurityConfig {
  const errors: string[] = []

  // Deployment configuration
  const deploymentType = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE as SecurityConfig['deployment']['type']
  if (!deploymentType || !['en-only', 'tr-only', 'local'].includes(deploymentType)) {
    errors.push('NEXT_PUBLIC_DEPLOYMENT_TYPE must be set to en-only, tr-only, or local')
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    errors.push('NEXT_PUBLIC_SITE_URL is required')
  }

  // Validate HTTPS in production
  if (deploymentType !== 'local' && siteUrl && !siteUrl.startsWith('https://')) {
    errors.push('NEXT_PUBLIC_SITE_URL must use HTTPS in production')
  }

  const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE
  if (!locale || !['en', 'tr'].includes(locale)) {
    errors.push('NEXT_PUBLIC_DEFAULT_LOCALE must be set to en or tr')
  }

  // HIPAA configuration
  const hipaaMode = process.env.NEXT_PUBLIC_HIPAA_MODE === 'true'
  const dataResidency = process.env.NEXT_PUBLIC_DATA_RESIDENCY as SecurityConfig['hipaa']['dataResidency']

  if (deploymentType === 'en-only' && !hipaaMode) {
    errors.push('HIPAA mode must be enabled for US deployment')
  }

  if (deploymentType === 'en-only' && dataResidency !== 'us') {
    errors.push('Data residency must be US for EN deployment')
  }

  if (deploymentType === 'tr-only' && dataResidency !== 'tr') {
    errors.push('Data residency must be TR for TR deployment')
  }

  // FDA configuration
  const fdaEnabled = process.env.NEXT_PUBLIC_ENABLE_FDA_AI_COMPLIANCE === 'true'
  const fdaEnvironment = process.env.NEXT_PUBLIC_FDA_ENVIRONMENT as SecurityConfig['fda']['environment']

  if (deploymentType === 'en-only' && !fdaEnabled) {
    console.warn('[WARNING] FDA AI Compliance is not enabled for US deployment')
  }

  // Security configuration
  const mfaEnabled = process.env.NEXT_PUBLIC_ENABLE_MFA === 'true'
  const sessionTimeout = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '1800000', 10)

  if (deploymentType !== 'local' && sessionTimeout > 3600000) {
    errors.push('Session timeout cannot exceed 60 minutes for production')
  }

  // Throw error if validation failed
  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}`
    )
  }

  // Return validated configuration
  return {
    deployment: {
      type: deploymentType,
      siteUrl: siteUrl || '',
      locale: locale || 'en',
      region: deploymentType === 'en-only' ? 'us-east-1' : 'eu-central-1',
    },
    hipaa: {
      enabled: hipaaMode,
      mfaRequired: mfaEnabled,
      sessionTimeout,
      dataResidency: dataResidency || 'us',
    },
    fda: {
      enabled: fdaEnabled,
      environment: fdaEnvironment || 'development',
      apiVersion: process.env.NEXT_PUBLIC_FDA_API_VERSION || 'v1',
      pccpEnabled: process.env.NEXT_PUBLIC_PCCP_ENABLED === 'true',
    },
    security: {
      httpsOnly: deploymentType !== 'local',
      csrfProtection: true,
      rateLimiting: deploymentType !== 'local',
      auditLogging: true,
    },
  }
}

/**
 * Get current security configuration
 * Returns cached configuration
 */
let cachedConfig: SecurityConfig | null = null

export function getSecurityConfig(): SecurityConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironment()
  }
  return cachedConfig
}

/**
 * Check if current environment is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if HIPAA mode is enabled
 */
export function isHIPAAEnabled(): boolean {
  return getSecurityConfig().hipaa.enabled
}

/**
 * Check if FDA compliance is enabled
 */
export function isFDAEnabled(): boolean {
  return getSecurityConfig().fda.enabled
}

/**
 * Get deployment type
 */
export function getDeploymentType(): 'en-only' | 'tr-only' | 'local' {
  return getSecurityConfig().deployment.type
}

/**
 * Check if feature is enabled
 * Used for feature flags
 */
export function isFeatureEnabled(feature: string): boolean {
  const envVar = `NEXT_PUBLIC_ENABLE_${feature.toUpperCase().replace(/-/g, '_')}`
  return process.env[envVar] === 'true'
}

/**
 * Validate on module load (fail fast)
 */
if (typeof window === 'undefined') {
  // Server-side validation
  try {
    validateEnvironment()
    console.log('[Security] Environment validation passed')
  } catch (error) {
    console.error('[Security] Environment validation failed:', error)
    if (isProduction()) {
      // In production, fail hard
      throw error
    }
  }
}
