// ============================================
// TÜRK OTO AI - Data Validators
// Comprehensive validation for OBD and user data
// ============================================

import type { OBDData, Vehicle } from '@/types';

/**
 * OBD Data Validators
 */
export class OBDValidator {
  /**
   * Validate RPM value (0-10000 reasonable range)
   */
  static validateRPM(rpm: number): boolean {
    return typeof rpm === 'number' && rpm >= 0 && rpm <= 10000 && !isNaN(rpm);
  }

  /**
   * Validate speed value (0-300 km/h reasonable range)
   */
  static validateSpeed(speed: number): boolean {
    return typeof speed === 'number' && speed >= 0 && speed <= 300 && !isNaN(speed);
  }

  /**
   * Validate engine load (0-100%)
   */
  static validateEngineLoad(load: number): boolean {
    return typeof load === 'number' && load >= 0 && load <= 100 && !isNaN(load);
  }

  /**
   * Validate coolant temperature (-40 to 150°C reasonable range)
   */
  static validateCoolantTemp(temp: number): boolean {
    return typeof temp === 'number' && temp >= -40 && temp <= 150 && !isNaN(temp);
  }

  /**
   * Validate throttle position (0-100%)
   */
  static validateThrottlePosition(position: number): boolean {
    return typeof position === 'number' && position >= 0 && position <= 100 && !isNaN(position);
  }

  /**
   * Validate fuel level (0-100%)
   */
  static validateFuelLevel(level: number): boolean {
    return typeof level === 'number' && level >= 0 && level <= 100 && !isNaN(level);
  }

  /**
   * Validate battery voltage (6-18V reasonable range for cars)
   */
  static validateBatteryVoltage(voltage: number): boolean {
    return typeof voltage === 'number' && voltage >= 6 && voltage <= 18 && !isNaN(voltage);
  }

  /**
   * Validate efficiency (0-100%)
   */
  static validateEfficiency(efficiency: number): boolean {
    return typeof efficiency === 'number' && efficiency >= 0 && efficiency <= 100 && !isNaN(efficiency);
  }

  /**
   * Validate timestamp
   */
  static validateTimestamp(timestamp: string | Date): boolean {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return !isNaN(date.getTime());
    } catch {
      return false;
    }
  }

  /**
   * Validate complete OBD data object
   */
  static validateOBDData(data: Partial<OBDData>): {
    isValid: boolean;
    errors: string[];
    sanitized: Partial<OBDData>;
  } {
    const errors: string[] = [];
    const sanitized: Partial<OBDData> = {};

    // Validate and sanitize each field
    if (data.rpm !== undefined) {
      if (this.validateRPM(data.rpm)) {
        sanitized.rpm = Math.round(data.rpm);
      } else {
        errors.push(`Invalid RPM value: ${data.rpm}`);
      }
    }

    if (data.speed !== undefined) {
      if (this.validateSpeed(data.speed)) {
        sanitized.speed = Math.round(data.speed);
      } else {
        errors.push(`Invalid speed value: ${data.speed}`);
      }
    }

    if (data.engineLoad !== undefined) {
      if (this.validateEngineLoad(data.engineLoad)) {
        sanitized.engineLoad = parseFloat(data.engineLoad.toFixed(2));
      } else {
        errors.push(`Invalid engine load: ${data.engineLoad}`);
      }
    }

    if (data.coolantTemp !== undefined) {
      if (this.validateCoolantTemp(data.coolantTemp)) {
        sanitized.coolantTemp = Math.round(data.coolantTemp);
      } else {
        errors.push(`Invalid coolant temperature: ${data.coolantTemp}`);
      }
    }

    if (data.throttlePosition !== undefined) {
      if (this.validateThrottlePosition(data.throttlePosition)) {
        sanitized.throttlePosition = parseFloat(data.throttlePosition.toFixed(2));
      } else {
        errors.push(`Invalid throttle position: ${data.throttlePosition}`);
      }
    }

    if (data.fuelLevel !== undefined) {
      if (this.validateFuelLevel(data.fuelLevel)) {
        sanitized.fuelLevel = parseFloat(data.fuelLevel.toFixed(2));
      } else {
        errors.push(`Invalid fuel level: ${data.fuelLevel}`);
      }
    }

    if (data.batteryVoltage !== undefined) {
      if (this.validateBatteryVoltage(data.batteryVoltage)) {
        sanitized.batteryVoltage = parseFloat(data.batteryVoltage.toFixed(2));
      } else {
        errors.push(`Invalid battery voltage: ${data.batteryVoltage}`);
      }
    }

    if (data.efficiency !== undefined) {
      if (this.validateEfficiency(data.efficiency)) {
        sanitized.efficiency = parseFloat(data.efficiency.toFixed(2));
      } else {
        errors.push(`Invalid efficiency: ${data.efficiency}`);
      }
    }

    if (data.timestamp !== undefined) {
      if (this.validateTimestamp(data.timestamp)) {
        sanitized.timestamp = typeof data.timestamp === 'string' ? data.timestamp : data.timestamp.toISOString();
      } else {
        errors.push(`Invalid timestamp: ${data.timestamp}`);
        sanitized.timestamp = new Date().toISOString();
      }
    } else {
      sanitized.timestamp = new Date().toISOString();
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized,
    };
  }

  /**
   * Check if OBD data indicates potential issues
   */
  static analyzeHealthStatus(data: Partial<OBDData>): {
    status: 'excellent' | 'good' | 'warning' | 'critical';
    warnings: string[];
  } {
    const warnings: string[] = [];
    let status: 'excellent' | 'good' | 'warning' | 'critical' = 'excellent';

    // Check coolant temperature
    if (data.coolantTemp !== undefined) {
      if (data.coolantTemp > 110) {
        warnings.push('Motor sıcaklığı yüksek - overheating risk');
        status = 'critical';
      } else if (data.coolantTemp > 100) {
        warnings.push('Motor sıcaklığı normal seviyenin üzerinde');
        if (status === 'excellent') status = 'warning';
      }
    }

    // Check battery voltage
    if (data.batteryVoltage !== undefined) {
      if (data.batteryVoltage < 11.5) {
        warnings.push('Akü voltajı kritik seviyede - şarj gerekli');
        status = 'critical';
      } else if (data.batteryVoltage < 12.4) {
        warnings.push('Akü voltajı düşük');
        if (status === 'excellent') status = 'warning';
      }
    }

    // Check fuel level
    if (data.fuelLevel !== undefined) {
      if (data.fuelLevel < 10) {
        warnings.push('Yakıt seviyesi kritik - acilen yakıt alın');
        if (status !== 'critical') status = 'warning';
      } else if (data.fuelLevel < 20) {
        warnings.push('Yakıt seviyesi düşük');
        if (status === 'excellent') status = 'good';
      }
    }

    // Check RPM (potential over-revving)
    if (data.rpm !== undefined && data.rpm > 6000) {
      warnings.push('Motor devri çok yüksek - motor hasar riski');
      if (status === 'excellent') status = 'warning';
    }

    if (warnings.length === 0 && status === 'excellent') {
      status = 'good';
    }

    return { status, warnings };
  }
}

/**
 * Vehicle Data Validators
 */
export class VehicleValidator {
  /**
   * Validate vehicle plate number (Turkish format)
   */
  static validatePlate(plate: string): boolean {
    // Turkish plate format: 34 ABC 1234 or 34ABC1234
    const plateRegex = /^(0[1-9]|[1-7][0-9]|8[01])\s?[A-Z]{1,3}\s?\d{2,4}$/i;
    return plateRegex.test(plate.trim());
  }

  /**
   * Validate vehicle year
   */
  static validateYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear + 1;
  }

  /**
   * Validate VIN (Vehicle Identification Number)
   */
  static validateVIN(vin: string): boolean {
    // VIN is 17 characters, alphanumeric except I, O, Q
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  }

  /**
   * Validate complete vehicle object
   */
  static validateVehicle(vehicle: Partial<Vehicle>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!vehicle.make || vehicle.make.trim().length === 0) {
      errors.push('Araç markası gerekli');
    }

    if (!vehicle.model || vehicle.model.trim().length === 0) {
      errors.push('Araç modeli gerekli');
    }

    if (vehicle.year !== undefined && !this.validateYear(vehicle.year)) {
      errors.push('Geçersiz araç yılı');
    }

    if ('licensePlate' in vehicle && vehicle.licensePlate && !this.validatePlate(vehicle.licensePlate)) {
      errors.push('Geçersiz plaka formatı (örnek: 34 ABC 1234)');
    }

    if (vehicle.vin && !this.validateVIN(vehicle.vin)) {
      errors.push('Geçersiz VIN (17 karakter olmalı)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * User Input Validators
 */
export class InputValidator {
  /**
   * Validate email address
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate Turkish phone number
   */
  static validatePhone(phone: string): boolean {
    // Turkish phone: +90 5XX XXX XX XX or 05XXXXXXXXX
    const phoneRegex = /^(\+90|0)?5\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): {
    isValid: boolean;
    strength: 'weak' | 'medium' | 'strong';
    messages: string[];
  } {
    const messages: string[] = [];
    let strength: 'weak' | 'medium' | 'strong' = 'weak';

    if (password.length < 8) {
      messages.push('Şifre en az 8 karakter olmalı');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) messages.push('En az bir büyük harf içermeli');
    if (!hasLowerCase) messages.push('En az bir küçük harf içermeli');
    if (!hasNumbers) messages.push('En az bir rakam içermeli');
    if (!hasSpecialChar) messages.push('En az bir özel karakter içermeli');

    // Calculate strength
    const criteriasMet = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (password.length >= 8 && criteriasMet >= 4) {
      strength = 'strong';
    } else if (password.length >= 8 && criteriasMet >= 2) {
      strength = 'medium';
    }

    return {
      isValid: messages.length === 0 && password.length >= 8,
      strength,
      messages,
    };
  }

  /**
   * Sanitize string input (prevent XSS)
   */
  static sanitizeString(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate URL
   */
  static validateURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Sanitize and validate any data before storage
 */
export function sanitizeForStorage<T>(data: T): T {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized: any = Array.isArray(data) ? [] : {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === 'string') {
      sanitized[key] = InputValidator.sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeForStorage(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
