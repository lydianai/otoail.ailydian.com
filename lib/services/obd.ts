// ============================================
// TÜRK OTO AI - OBD-II Service SDK
// ELM327 Bluetooth Integration
// ============================================

import { OBDData } from '@/types';

// ==================== Constants ====================
const ELM327_COMMANDS = {
  RESET: 'ATZ',
  ECHO_OFF: 'ATE0',
  LINE_FEED_OFF: 'ATL0',
  SPACES_OFF: 'ATS0',
  HEADERS_OFF: 'ATH0',
  AUTO_PROTOCOL: 'ATSP0',
  SET_PROTOCOL_AUTO: 'ATSP0',

  // OBD-II PIDs (Parameter IDs)
  ENGINE_RPM: '010C',           // Engine RPM
  VEHICLE_SPEED: '010D',        // Vehicle Speed (km/h)
  ENGINE_LOAD: '0104',          // Engine Load (%)
  THROTTLE_POS: '0111',         // Throttle Position (%)
  COOLANT_TEMP: '0105',         // Coolant Temperature (°C)
  FUEL_LEVEL: '012F',           // Fuel Tank Level (%)
  BATTERY_VOLTAGE: 'ATRV',      // Battery Voltage
  MAF_FLOW: '0110',             // Mass Air Flow (g/s)
  INTAKE_TEMP: '010F',          // Intake Air Temperature
  TIMING_ADVANCE: '010E',       // Timing Advance
  DTC_CHECK: '0101',            // Check for DTCs
  DTC_READ: '03',               // Read DTCs
  DTC_CLEAR: '04',              // Clear DTCs
} as const;

// ==================== Types ====================
interface OBDServiceConfig {
  samplingRate?: number; // Hz (default: 10Hz = every 100ms)
  autoReconnect?: boolean;
  debug?: boolean;
}

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';
type OBDCallback = (data: Partial<OBDData>) => void;

// ==================== OBD Service Class ====================
export class OBDService {
  private device: any | null = null; // BluetoothDevice
  private characteristic: any | null = null; // BluetoothRemoteGATTCharacteristic
  private connectionState: ConnectionState = 'disconnected';
  private samplingInterval: NodeJS.Timeout | null = null;
  private callbacks: Set<OBDCallback> = new Set();
  private config: Required<OBDServiceConfig>;
  private buffer: string = '';

  constructor(config: OBDServiceConfig = {}) {
    this.config = {
      samplingRate: config.samplingRate || 10,
      autoReconnect: config.autoReconnect ?? true,
      debug: config.debug ?? false,
    };
  }

  // ==================== Connection Management ====================

  /**
   * Connect to ELM327 OBD-II device via Bluetooth
   */
  async connect(): Promise<void> {
    if (!(navigator as any).bluetooth) {
      throw new Error('Web Bluetooth API not supported in this browser');
    }

    try {
      this.connectionState = 'connecting';
      this.log('Requesting Bluetooth device...');

      // Request Bluetooth device with OBD-II service UUID
      this.device = await (navigator as any).bluetooth.requestDevice({
        filters: [
          { namePrefix: 'OBD' },
          { namePrefix: 'ELM327' },
          { namePrefix: 'OBDII' },
          { namePrefix: 'Vgate' },
        ],
        optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb'], // Common OBD-II UUID
      });

      this.log(`Device selected: ${this.device.name}`);

      // Connect to GATT server
      const server = await this.device.gatt!.connect();
      this.log('GATT Server connected');

      // Get primary service
      const service = await server.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
      this.log('Service connected');

      // Get characteristic for reading/writing
      this.characteristic = await service.getCharacteristic('0000fff1-0000-1000-8000-00805f9b34fb');
      this.log('Characteristic obtained');

      // Start notifications
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', this.handleDataReceived.bind(this));
      this.log('Notifications started');

      // Initialize ELM327
      await this.initializeELM327();

      this.connectionState = 'connected';
      this.log('✅ OBD-II connected successfully');

      // Start data sampling
      this.startSampling();

    } catch (error) {
      this.connectionState = 'error';
      this.log('❌ Connection error:', error);
      throw error;
    }
  }

  /**
   * Disconnect from OBD-II device
   */
  async disconnect(): Promise<void> {
    this.stopSampling();

    if (this.characteristic) {
      await this.characteristic.stopNotifications();
      this.characteristic = null;
    }

    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }

    this.device = null;
    this.connectionState = 'disconnected';
    this.log('Disconnected from OBD-II');
  }

  /**
   * Initialize ELM327 with configuration commands
   */
  private async initializeELM327(): Promise<void> {
    this.log('Initializing ELM327...');

    const initCommands = [
      ELM327_COMMANDS.RESET,
      ELM327_COMMANDS.ECHO_OFF,
      ELM327_COMMANDS.LINE_FEED_OFF,
      ELM327_COMMANDS.SPACES_OFF,
      ELM327_COMMANDS.HEADERS_OFF,
      ELM327_COMMANDS.AUTO_PROTOCOL,
    ];

    for (const command of initCommands) {
      await this.sendCommand(command);
      await this.sleep(100); // Wait between commands
    }

    this.log('✅ ELM327 initialized');
  }

  // ==================== Data Sampling ====================

  /**
   * Start continuous data sampling
   */
  private startSampling(): void {
    if (this.samplingInterval) {
      clearInterval(this.samplingInterval);
    }

    const intervalMs = 1000 / this.config.samplingRate;
    this.log(`Starting sampling at ${this.config.samplingRate}Hz (every ${intervalMs}ms)`);

    this.samplingInterval = setInterval(async () => {
      try {
        const data = await this.readAllSensors();
        this.notifyCallbacks(data);
      } catch (error) {
        this.log('Sampling error:', error);
      }
    }, intervalMs);
  }

  /**
   * Stop data sampling
   */
  private stopSampling(): void {
    if (this.samplingInterval) {
      clearInterval(this.samplingInterval);
      this.samplingInterval = null;
      this.log('Sampling stopped');
    }
  }

  /**
   * Read all OBD-II sensors
   */
  private async readAllSensors(): Promise<Partial<OBDData>> {
    const timestamp = new Date();

    // Read multiple PIDs in parallel for better performance
    const [rpm, speed, engineLoad, throttle, coolantTemp, fuelLevel, batteryVoltage] = await Promise.all([
      this.readRPM(),
      this.readSpeed(),
      this.readEngineLoad(),
      this.readThrottlePosition(),
      this.readCoolantTemp(),
      this.readFuelLevel(),
      this.readBatteryVoltage(),
    ]);

    // Calculate efficiency based on load and speed
    const efficiency = this.calculateEfficiency(engineLoad ?? 0, speed ?? 0);

    // Check for DTCs (Diagnostic Trouble Codes)
    const dtcCodes = await this.readDTCs();

    return {
      timestamp,
      rpm: rpm ?? 0,
      speed: speed ?? 0,
      engineLoad: engineLoad ?? 0,
      throttlePosition: throttle ?? 0,
      coolantTemp: coolantTemp ?? 0,
      fuelLevel: fuelLevel ?? 0,
      batteryVoltage: batteryVoltage ?? 12.0,
      efficiency: efficiency ?? 0,
      dtcCodes: dtcCodes ?? [],
    };
  }

  // ==================== Individual Sensor Readers ====================

  private async readRPM(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.ENGINE_RPM);
    if (!response) return null;

    // Parse response: 41 0C XX XX (4 bytes)
    const bytes = this.parseHexResponse(response);
    if (bytes.length < 2) return null;

    return ((bytes[0] * 256) + bytes[1]) / 4; // RPM formula
  }

  private async readSpeed(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.VEHICLE_SPEED);
    if (!response) return null;

    const bytes = this.parseHexResponse(response);
    if (bytes.length < 1) return null;

    return bytes[0]; // km/h
  }

  private async readEngineLoad(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.ENGINE_LOAD);
    if (!response) return null;

    const bytes = this.parseHexResponse(response);
    if (bytes.length < 1) return null;

    return (bytes[0] * 100) / 255; // %
  }

  private async readThrottlePosition(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.THROTTLE_POS);
    if (!response) return null;

    const bytes = this.parseHexResponse(response);
    if (bytes.length < 1) return null;

    return (bytes[0] * 100) / 255; // %
  }

  private async readCoolantTemp(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.COOLANT_TEMP);
    if (!response) return null;

    const bytes = this.parseHexResponse(response);
    if (bytes.length < 1) return null;

    return bytes[0] - 40; // °C (offset by -40)
  }

  private async readFuelLevel(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.FUEL_LEVEL);
    if (!response) return null;

    const bytes = this.parseHexResponse(response);
    if (bytes.length < 1) return null;

    return (bytes[0] * 100) / 255; // %
  }

  private async readBatteryVoltage(): Promise<number | null> {
    const response = await this.sendCommand(ELM327_COMMANDS.BATTERY_VOLTAGE);
    if (!response) return null;

    // Parse voltage from response (e.g., "12.6V")
    const match = response.match(/(\d+\.\d+)V/);
    if (!match) return null;

    return parseFloat(match[1]);
  }

  private async readDTCs(): Promise<string[]> {
    const response = await this.sendCommand(ELM327_COMMANDS.DTC_READ);
    if (!response) return [];

    // Parse DTC codes from response
    const dtcs: string[] = [];
    const bytes = this.parseHexResponse(response);

    for (let i = 0; i < bytes.length; i += 2) {
      if (i + 1 < bytes.length) {
        const code = this.decodeDTC(bytes[i], bytes[i + 1]);
        if (code) dtcs.push(code);
      }
    }

    return dtcs;
  }

  // ==================== Helper Methods ====================

  /**
   * Send command to ELM327 and wait for response
   */
  private async sendCommand(command: string): Promise<string | null> {
    if (!this.characteristic) {
      throw new Error('Not connected to OBD-II device');
    }

    try {
      // Clear buffer
      this.buffer = '';

      // Send command
      const encoder = new TextEncoder();
      const data = encoder.encode(command + '\r');
      await this.characteristic.writeValue(data);

      // Wait for response (timeout after 2 seconds)
      const response = await this.waitForResponse(2000);
      return response;

    } catch (error) {
      this.log('Command error:', error);
      return null;
    }
  }

  /**
   * Handle data received from ELM327
   */
  private handleDataReceived(event: Event): void {
    const target = event.target as any;
    const value = target.value;

    if (!value) return;

    const decoder = new TextDecoder();
    const text = decoder.decode(value);
    this.buffer += text;
  }

  /**
   * Wait for complete response from ELM327
   */
  private async waitForResponse(timeoutMs: number): Promise<string | null> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      if (this.buffer.includes('>')) {
        const response = this.buffer.split('>')[0].trim();
        this.buffer = '';
        return response;
      }
      await this.sleep(10);
    }

    return null; // Timeout
  }

  /**
   * Parse hex response from ELM327
   */
  private parseHexResponse(response: string): number[] {
    // Remove spaces and convert hex string to bytes
    const hex = response.replace(/\s+/g, '');
    const bytes: number[] = [];

    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.substr(i, 2), 16);
      if (!isNaN(byte)) {
        bytes.push(byte);
      }
    }

    // Remove echo (41 0C) and return data bytes
    return bytes.slice(2);
  }

  /**
   * Decode DTC code from two bytes
   */
  private decodeDTC(byte1: number, byte2: number): string | null {
    if (byte1 === 0 && byte2 === 0) return null;

    const firstChar = ['P', 'C', 'B', 'U'][(byte1 >> 6) & 0x03];
    const secondChar = ((byte1 >> 4) & 0x03).toString();
    const thirdChar = (byte1 & 0x0F).toString(16).toUpperCase();
    const fourthChar = ((byte2 >> 4) & 0x0F).toString(16).toUpperCase();
    const fifthChar = (byte2 & 0x0F).toString(16).toUpperCase();

    return `${firstChar}${secondChar}${thirdChar}${fourthChar}${fifthChar}`;
  }

  /**
   * Calculate fuel efficiency based on load and speed
   */
  private calculateEfficiency(load: number, speed: number): number {
    if (speed === 0) return 0;

    // Simplified efficiency calculation
    // Higher load = more fuel consumption
    // Optimal efficiency around 60-80 km/h at 40-60% load
    const optimalSpeed = 70;
    const optimalLoad = 50;

    const speedFactor = 1 - Math.abs(speed - optimalSpeed) / 100;
    const loadFactor = 1 - Math.abs(load - optimalLoad) / 100;

    return Math.max(0, Math.min(100, (speedFactor + loadFactor) / 2 * 100));
  }

  // ==================== Callback Management ====================

  /**
   * Subscribe to OBD data updates
   */
  subscribe(callback: OBDCallback): () => void {
    this.callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Notify all subscribers with new data
   */
  private notifyCallbacks(data: Partial<OBDData>): void {
    this.callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        this.log('Callback error:', error);
      }
    });
  }

  // ==================== Utility Methods ====================

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[OBD Service]', ...args);
    }
  }

  // ==================== Public Getters ====================

  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  isConnected(): boolean {
    return this.connectionState === 'connected';
  }

  getDevice(): any | null {
    return this.device;
  }

  getSamplingRate(): number {
    return this.config.samplingRate;
  }

  setSamplingRate(hz: number): void {
    this.config.samplingRate = hz;
    if (this.isConnected()) {
      this.stopSampling();
      this.startSampling();
    }
  }
}

// ==================== Singleton Instance ====================
let obdServiceInstance: OBDService | null = null;

export function getOBDService(config?: OBDServiceConfig): OBDService {
  if (!obdServiceInstance) {
    obdServiceInstance = new OBDService(config);
  }
  return obdServiceInstance;
}

// ==================== Browser Check ====================
export function isWebBluetoothSupported(): boolean {
  return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
}
