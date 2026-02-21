// ============================================
// TÜRK OTO AI - Real OBD-II Bluetooth Handler
// Production-ready OBD-II device connection
// ============================================

import type { OBDData } from '@/types';
import { OBDValidator } from './validators';

// OBD-II Service UUID (Standard ELM327)
const OBD_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const OBD_CHARACTERISTIC_UUID = '0000fff1-0000-1000-8000-00805f9b34fb';

// OBD-II PID Commands
export const OBD_PIDS = {
  ENGINE_RPM: '010C',           // Engine RPM
  VEHICLE_SPEED: '010D',        // Vehicle Speed
  ENGINE_LOAD: '0104',          // Calculated Engine Load
  COOLANT_TEMP: '0105',         // Engine Coolant Temperature
  THROTTLE_POS: '0111',         // Throttle Position
  FUEL_LEVEL: '012F',           // Fuel Tank Level
  BATTERY_VOLTAGE: 'ATRV',      // Battery Voltage (AT command)
  DTC_CODES: '03',              // Request DTC codes
} as const;

export interface OBDDevice {
  device: any; // BluetoothDevice from Web Bluetooth API
  server?: any; // BluetoothRemoteGATTServer
  service?: any; // BluetoothRemoteGATTService
  characteristic?: any; // BluetoothRemoteGATTCharacteristic
  isConnected: boolean;
}

export class OBDBluetoothManager {
  private device: OBDDevice | null = null;
  private dataCallback: ((data: Partial<OBDData>) => void) | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;

  /**
   * Check if Web Bluetooth API is available
   */
  static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'bluetooth' in navigator && (navigator as any).bluetooth;
  }

  /**
   * Request OBD-II device pairing
   */
  async requestDevice(): Promise<boolean> {
    if (!OBDBluetoothManager.isSupported()) {
      throw new Error('Web Bluetooth API is not supported in this browser');
    }

    try {
      const bluetooth = (navigator as any).bluetooth;
      const device = await bluetooth.requestDevice({
        filters: [
          { services: [OBD_SERVICE_UUID] },
          { namePrefix: 'OBD' },
          { namePrefix: 'ELM327' },
          { namePrefix: 'OBDII' },
        ],
        optionalServices: [OBD_SERVICE_UUID],
      });

      if (!device) {
        throw new Error('No device selected');
      }

      this.device = {
        device,
        isConnected: false,
      };

      // Add disconnect listener
      device.addEventListener('gattserverdisconnected', this.onDisconnect.bind(this));

      return true;
    } catch (error) {
      console.error('[OBD Bluetooth] Device request failed:', error);
      throw error;
    }
  }

  /**
   * Connect to the OBD-II device
   */
  async connect(): Promise<boolean> {
    if (!this.device) {
      throw new Error('No device paired. Call requestDevice() first.');
    }

    try {
      console.log('[OBD Bluetooth] Connecting to device...');

      const server = await this.device.device.gatt?.connect();
      if (!server) {
        throw new Error('Failed to connect to GATT server');
      }

      this.device.server = server;

      console.log('[OBD Bluetooth] Getting OBD service...');
      const service = await server.getPrimaryService(OBD_SERVICE_UUID);
      this.device.service = service;

      console.log('[OBD Bluetooth] Getting characteristic...');
      const characteristic = await service.getCharacteristic(OBD_CHARACTERISTIC_UUID);
      this.device.characteristic = characteristic;

      this.device.isConnected = true;

      console.log('[OBD Bluetooth] Connected successfully');

      // Initialize OBD-II adapter
      await this.sendCommand('ATZ'); // Reset
      await this.wait(1000);
      await this.sendCommand('ATE0'); // Echo off
      await this.sendCommand('ATL0'); // Linefeeds off
      await this.sendCommand('ATS0'); // Spaces off
      await this.sendCommand('ATH1'); // Headers on
      await this.sendCommand('ATSP0'); // Auto protocol

      return true;
    } catch (error) {
      console.error('[OBD Bluetooth] Connection failed:', error);
      this.device.isConnected = false;
      throw error;
    }
  }

  /**
   * Disconnect from device
   */
  async disconnect(): Promise<void> {
    this.stopPolling();

    if (this.device?.server?.connected) {
      this.device.server.disconnect();
    }

    if (this.device) {
      this.device.isConnected = false;
    }

    console.log('[OBD Bluetooth] Disconnected');
  }

  /**
   * Send command to OBD-II device
   */
  private async sendCommand(command: string): Promise<string> {
    if (!this.device?.characteristic) {
      throw new Error('Device not connected');
    }

    try {
      const encoder = new TextEncoder();
      const commandData = encoder.encode(command + '\r');

      await this.device.characteristic.writeValue(commandData);
      await this.wait(100); // Wait for response

      const value = await this.device.characteristic.readValue();
      const decoder = new TextDecoder();
      const response = decoder.decode(value);

      return response.trim();
    } catch (error) {
      console.error('[OBD Bluetooth] Command failed:', command, error);
      throw error;
    }
  }

  /**
   * Parse OBD-II response
   */
  private parseResponse(pid: string, response: string): number | string[] | null {
    // Remove whitespace and convert to uppercase
    const clean = response.replace(/\s/g, '').toUpperCase();

    // Check for error responses
    if (clean.includes('NODATA') || clean.includes('ERROR') || clean.includes('?')) {
      return null;
    }

    try {
      switch (pid) {
        case OBD_PIDS.ENGINE_RPM: {
          // 010C response: 41 0C XX XX (RPM = ((A*256)+B)/4)
          const match = clean.match(/410C([0-9A-F]{2})([0-9A-F]{2})/);
          if (match) {
            const A = parseInt(match[1], 16);
            const B = parseInt(match[2], 16);
            return ((A * 256) + B) / 4;
          }
          break;
        }

        case OBD_PIDS.VEHICLE_SPEED: {
          // 010D response: 41 0D XX (Speed = A)
          const match = clean.match(/410D([0-9A-F]{2})/);
          if (match) {
            return parseInt(match[1], 16);
          }
          break;
        }

        case OBD_PIDS.ENGINE_LOAD: {
          // 0104 response: 41 04 XX (Load = A*100/255)
          const match = clean.match(/4104([0-9A-F]{2})/);
          if (match) {
            const A = parseInt(match[1], 16);
            return (A * 100) / 255;
          }
          break;
        }

        case OBD_PIDS.COOLANT_TEMP: {
          // 0105 response: 41 05 XX (Temp = A - 40)
          const match = clean.match(/4105([0-9A-F]{2})/);
          if (match) {
            const A = parseInt(match[1], 16);
            return A - 40;
          }
          break;
        }

        case OBD_PIDS.THROTTLE_POS: {
          // 0111 response: 41 11 XX (Throttle = A*100/255)
          const match = clean.match(/4111([0-9A-F]{2})/);
          if (match) {
            const A = parseInt(match[1], 16);
            return (A * 100) / 255;
          }
          break;
        }

        case OBD_PIDS.FUEL_LEVEL: {
          // 012F response: 41 2F XX (Fuel = A*100/255)
          const match = clean.match(/412F([0-9A-F]{2})/);
          if (match) {
            const A = parseInt(match[1], 16);
            return (A * 100) / 255;
          }
          break;
        }

        case OBD_PIDS.BATTERY_VOLTAGE: {
          // ATRV response: "12.5V"
          const match = clean.match(/([0-9.]+)V/);
          if (match) {
            return parseFloat(match[1]);
          }
          break;
        }

        case OBD_PIDS.DTC_CODES: {
          // Parse DTC codes
          const codes: string[] = [];
          const matches = clean.match(/[0-9A-F]{4}/g);
          if (matches) {
            matches.forEach(code => {
              if (code !== '0000') {
                // Convert hex to DTC format (P0XXX, C0XXX, B0XXX, U0XXX)
                const prefix = ['P', 'C', 'B', 'U'][parseInt(code[0], 16) >> 2];
                const dtc = prefix + code.substring(1);
                codes.push(dtc);
              }
            });
          }
          return codes;
        }
      }
    } catch (error) {
      console.error('[OBD Bluetooth] Parse error:', error);
    }

    return null;
  }

  /**
   * Start polling OBD data
   */
  startPolling(callback: (data: Partial<OBDData>) => void, intervalMs: number = 1000): void {
    if (this.isPolling) {
      console.warn('[OBD Bluetooth] Already polling');
      return;
    }

    this.dataCallback = callback;
    this.isPolling = true;

    this.intervalId = setInterval(async () => {
      if (!this.device?.isConnected) {
        this.stopPolling();
        return;
      }

      try {
        const data = await this.pollData();
        if (this.dataCallback && data) {
          this.dataCallback(data);
        }
      } catch (error) {
        console.error('[OBD Bluetooth] Polling error:', error);
      }
    }, intervalMs);

    console.log('[OBD Bluetooth] Started polling');
  }

  /**
   * Stop polling
   */
  stopPolling(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPolling = false;
    this.dataCallback = null;
    console.log('[OBD Bluetooth] Stopped polling');
  }

  /**
   * Poll OBD data once
   */
  private async pollData(): Promise<Partial<OBDData> | null> {
    try {
      const data: Partial<OBDData> = {
        timestamp: new Date().toISOString(),
      };

      // Poll all PIDs
      const rpmResponse = await this.sendCommand(OBD_PIDS.ENGINE_RPM);
      const rpm = this.parseResponse(OBD_PIDS.ENGINE_RPM, rpmResponse);
      if (rpm !== null) data.rpm = rpm as number;

      const speedResponse = await this.sendCommand(OBD_PIDS.VEHICLE_SPEED);
      const speed = this.parseResponse(OBD_PIDS.VEHICLE_SPEED, speedResponse);
      if (speed !== null) data.speed = speed as number;

      const loadResponse = await this.sendCommand(OBD_PIDS.ENGINE_LOAD);
      const load = this.parseResponse(OBD_PIDS.ENGINE_LOAD, loadResponse);
      if (load !== null) data.engineLoad = load as number;

      const tempResponse = await this.sendCommand(OBD_PIDS.COOLANT_TEMP);
      const temp = this.parseResponse(OBD_PIDS.COOLANT_TEMP, tempResponse);
      if (temp !== null) data.coolantTemp = temp as number;

      const throttleResponse = await this.sendCommand(OBD_PIDS.THROTTLE_POS);
      const throttle = this.parseResponse(OBD_PIDS.THROTTLE_POS, throttleResponse);
      if (throttle !== null) data.throttlePosition = throttle as number;

      const fuelResponse = await this.sendCommand(OBD_PIDS.FUEL_LEVEL);
      const fuel = this.parseResponse(OBD_PIDS.FUEL_LEVEL, fuelResponse);
      if (fuel !== null) data.fuelLevel = fuel as number;

      const voltageResponse = await this.sendCommand(OBD_PIDS.BATTERY_VOLTAGE);
      const voltage = this.parseResponse(OBD_PIDS.BATTERY_VOLTAGE, voltageResponse);
      if (voltage !== null) data.batteryVoltage = voltage as number;

      // Calculate efficiency (simplified: 100 - engineLoad)
      if (data.engineLoad !== undefined) {
        data.efficiency = Math.max(0, 100 - data.engineLoad);
      }

      // Validate and sanitize data
      const validation = OBDValidator.validateOBDData(data);

      if (!validation.isValid) {
        console.warn('[OBD Bluetooth] Data validation warnings:', validation.errors);
      }

      // Analyze health status
      const health = OBDValidator.analyzeHealthStatus(validation.sanitized);
      if (health.warnings.length > 0) {
        console.warn('[OBD Bluetooth] Health warnings:', health.warnings);
      }

      return validation.sanitized;
    } catch (error) {
      console.error('[OBD Bluetooth] Poll data failed:', error);
      return null;
    }
  }

  /**
   * Get DTC codes
   */
  async getDTCCodes(): Promise<string[]> {
    try {
      const response = await this.sendCommand(OBD_PIDS.DTC_CODES);
      const codes = this.parseResponse(OBD_PIDS.DTC_CODES, response);
      return (codes as string[]) || [];
    } catch (error) {
      console.error('[OBD Bluetooth] Get DTC failed:', error);
      return [];
    }
  }

  /**
   * Clear DTC codes
   */
  async clearDTCCodes(): Promise<boolean> {
    try {
      await this.sendCommand('04'); // Clear DTCs command
      return true;
    } catch (error) {
      console.error('[OBD Bluetooth] Clear DTC failed:', error);
      return false;
    }
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return this.device?.isConnected ?? false;
  }

  /**
   * Get device name
   */
  getDeviceName(): string | null {
    return this.device?.device.name ?? null;
  }

  /**
   * Handle disconnect event
   */
  private onDisconnect(): void {
    console.log('[OBD Bluetooth] Device disconnected');
    if (this.device) {
      this.device.isConnected = false;
    }
    this.stopPolling();
  }

  /**
   * Utility: Wait for specified time
   */
  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let obdManagerInstance: OBDBluetoothManager | null = null;

export function getOBDManager(): OBDBluetoothManager {
  if (!obdManagerInstance) {
    obdManagerInstance = new OBDBluetoothManager();
  }
  return obdManagerInstance;
}
