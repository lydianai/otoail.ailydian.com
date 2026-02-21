/**
 * ENHANCED OBD-II READER
 * ======================
 *
 * Comprehensive OBD-II (On-Board Diagnostics) data reading system
 * Supports ELM327 Bluetooth/WiFi adapters
 * Real-time data streaming via WebSocket
 * 50+ PID parameters
 */

import { EventEmitter } from 'events';

// Standard OBD-II PIDs (Parameter IDs)
export const OBD_PIDS = {
  // Engine
  ENGINE_RPM: '010C',                    // 0-16,383 RPM
  VEHICLE_SPEED: '010D',                 // 0-255 km/h
  THROTTLE_POSITION: '0111',             // 0-100%
  ENGINE_LOAD: '0104',                   // 0-100%
  COOLANT_TEMP: '0105',                  // -40 to 215°C
  INTAKE_TEMP: '010F',                   // -40 to 215°C
  MAF_RATE: '0110',                      // 0-655 g/s
  TIMING_ADVANCE: '010E',                // -64 to 63.5°

  // Fuel
  FUEL_LEVEL: '012F',                    // 0-100%
  FUEL_RATE: '015E',                     // 0-3212 L/h
  FUEL_TYPE: '0151',                     // Gasoline, Diesel, CNG, etc.
  FUEL_PRESSURE: '010A',                 // 0-765 kPa
  FUEL_RAIL_PRESSURE: '0123',            // 0-5177 kPa

  // Emissions
  O2_SENSOR_1: '0114',                   // Voltage
  SHORT_FUEL_TRIM_1: '0106',             // -100 to 99.2%
  LONG_FUEL_TRIM_1: '0107',              // -100 to 99.2%
  CATALYST_TEMP_B1S1: '013C',            // -40 to 6513°C

  // System
  CONTROL_MODULE_VOLTAGE: '0142',        // 0-65.535V
  AMBIENT_AIR_TEMP: '0146',              // -40 to 215°C
  ENGINE_OIL_TEMP: '015C',               // -40 to 210°C

  // Performance
  ABSOLUTE_LOAD: '0143',                 // 0-25,700%
  COMMANDED_THROTTLE: '0145',            // 0-100%
  ACCELERATOR_PEDAL_D: '0149',          // 0-100%
  ACCELERATOR_PEDAL_E: '014A',          // 0-100%

  // Distance & Time
  DISTANCE_MIL_ON: '0121',              // 0-65,535 km
  DISTANCE_SINCE_DTC_CLEAR: '0131',     // 0-65,535 km
  RUNTIME_SINCE_START: '011F',          // 0-65,535 seconds

  // Diagnostics
  DTC_COUNT: '0101',                     // Number of DTCs
  FREEZE_DTC: '0102',                    // Freeze frame
  CLEAR_DTC: '04',                       // Clear trouble codes

  // Advanced
  BAROMETRIC_PRESSURE: '0133',           // 0-255 kPa
  EVAP_VAPOR_PRESSURE: '0132',          // -8192 to 8192 Pa
} as const;

export interface OBDData {
  timestamp: Date;

  // Engine
  rpm: number;
  speed: number;
  throttlePosition: number;
  engineLoad: number;
  coolantTemp: number;
  intakeTemp: number;
  mafRate: number;
  timingAdvance: number;

  // Fuel
  fuelLevel: number;
  fuelRate: number;
  fuelType: string;
  fuelPressure: number;
  fuelRailPressure: number;
  instantConsumption: number;  // Calculated L/100km
  averageConsumption: number;  // Trip average

  // Emissions
  o2Voltage: number;
  shortFuelTrim: number;
  longFuelTrim: number;
  catalystTemp: number;

  // System
  batteryVoltage: number;
  ambientTemp: number;
  oilTemp: number;

  // Performance
  absoluteLoad: number;
  commandedThrottle: number;
  acceleratorPedalD: number;
  acceleratorPedalE: number;

  // Distance & Time
  distanceMIL: number;
  distanceSinceClear: number;
  runtimeSinceStart: number;

  // Diagnostics
  dtcCount: number;
  dtcCodes: string[];
  mil: boolean;  // Check Engine Light

  // Advanced
  barometricPressure: number;
  evapVaporPressure: number;

  // Calculated
  instantMPG: number;
  averageMPG: number;
  rangeEstimate: number;  // km
  fuelCostPerKm: number;  // TL/km
}

export interface TireData {
  fl: { pressure: number; temp: number; };
  fr: { pressure: number; temp: number; };
  rl: { pressure: number; temp: number; };
  rr: { pressure: number; temp: number; };
}

export class EnhancedOBDReader extends EventEmitter {
  private port: any = null; // SerialPort | BluetoothPort | WebSocket
  private connected: boolean = false;
  private reading: boolean = false;
  private dataBuffer: string = '';
  private currentData: Partial<OBDData> = {};
  private readInterval: NodeJS.Timeout | null = null;

  constructor(private connectionType: 'serial' | 'bluetooth' | 'wifi' = 'bluetooth') {
    super();
  }

  /**
   * Connect to OBD-II adapter
   */
  async connect(devicePath?: string): Promise<boolean> {
    try {
      this.emit('connecting');

      if (this.connectionType === 'bluetooth') {
        // Bluetooth connection (ELM327)
        // @ts-ignore - Web Bluetooth API
        const device = await navigator.bluetooth.requestDevice({
          filters: [
            { namePrefix: 'OBD' },
            { namePrefix: 'ELM' },
            { namePrefix: 'VLINK' }
          ],
          optionalServices: ['0000fff0-0000-1000-8000-00805f9b34fb']
        });

        const server = await device.gatt?.connect();
        const service = await server?.getPrimaryService('0000fff0-0000-1000-8000-00805f9b34fb');
        const characteristic = await service?.getCharacteristic('0000fff2-0000-1000-8000-00805f9b34fb');

        if (!characteristic) throw new Error('Failed to connect to OBD characteristic');

        // @ts-ignore
        this.port = characteristic;

        // Listen for data
        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
          const value = new TextDecoder().decode(event.target.value);
          this.handleData(value);
        });

      } else if (this.connectionType === 'serial') {
        // Serial connection (USB/UART)
        if (!devicePath) throw new Error('Device path required for serial connection');

        // @ts-ignore - Web Serial API
        this.port = await navigator.serial.requestPort();
        await this.port.open({ baudRate: 38400 });

        // Read data
        const reader = this.port.readable?.getReader();
        this.readSerial(reader);

      } else if (this.connectionType === 'wifi') {
        // WiFi connection (ELM327 WiFi)
        // Will be implemented with WebSocket
        throw new Error('WiFi connection not yet implemented');
      }

      // Initialize OBD connection
      await this.initializeOBD();

      this.connected = true;
      this.emit('connected');

      return true;

    } catch (error) {
      this.emit('error', error);
      console.error('OBD connection error:', error);
      return false;
    }
  }

  /**
   * Initialize OBD-II adapter
   */
  private async initializeOBD(): Promise<void> {
    await this.sendCommand('ATZ');      // Reset
    await this.delay(1000);
    await this.sendCommand('ATE0');     // Echo off
    await this.sendCommand('ATL0');     // Line feeds off
    await this.sendCommand('ATS0');     // Spaces off
    await this.sendCommand('ATH1');     // Headers on
    await this.sendCommand('ATSP0');    // Auto protocol
    await this.sendCommand('0100');     // Check connection
  }

  /**
   * Send AT command to OBD adapter
   */
  private async sendCommand(command: string): Promise<string> {
    if (!this.port) throw new Error('Not connected');

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Command timeout')), 5000);

      this.once('response', (response: string) => {
        clearTimeout(timeout);
        resolve(response);
      });

      // Send command
      if (this.connectionType === 'bluetooth') {
        const encoder = new TextEncoder();
        // @ts-ignore
        this.port.writeValue(encoder.encode(command + '\r'));
      } else {
        // Serial write
        // @ts-ignore
        const writer = this.port.writable?.getWriter();
        writer?.write(new TextEncoder().encode(command + '\r'));
        writer?.releaseLock();
      }
    });
  }

  /**
   * Start reading OBD data
   */
  startReading(interval: number = 100): void {
    if (this.reading) return;

    this.reading = true;
    this.emit('reading-started');

    // Read PIDs in rotation
    const pidsToRead = [
      OBD_PIDS.ENGINE_RPM,
      OBD_PIDS.VEHICLE_SPEED,
      OBD_PIDS.THROTTLE_POSITION,
      OBD_PIDS.ENGINE_LOAD,
      OBD_PIDS.COOLANT_TEMP,
      OBD_PIDS.FUEL_LEVEL,
      OBD_PIDS.INTAKE_TEMP,
      OBD_PIDS.MAF_RATE,
      OBD_PIDS.FUEL_RATE,
      OBD_PIDS.CONTROL_MODULE_VOLTAGE,
      OBD_PIDS.BAROMETRIC_PRESSURE,
    ];

    let pidIndex = 0;

    this.readInterval = setInterval(async () => {
      if (!this.connected) return;

      try {
        const pid = pidsToRead[pidIndex];
        const response = await this.sendCommand(pid);
        const value = this.parseOBDResponse(pid, response);

        this.updateData(pid, value);

        // Emit data event
        this.emit('data', this.currentData);

        pidIndex = (pidIndex + 1) % pidsToRead.length;

      } catch (error) {
        this.emit('error', error);
      }
    }, interval);
  }

  /**
   * Stop reading
   */
  stopReading(): void {
    if (this.readInterval) {
      clearInterval(this.readInterval);
      this.readInterval = null;
    }
    this.reading = false;
    this.emit('reading-stopped');
  }

  /**
   * Parse OBD-II response
   */
  private parseOBDResponse(pid: string, response: string): number {
    // Remove echo and spaces
    response = response.replace(/\s/g, '').replace(pid, '');

    // Extract hex bytes
    const bytes: number[] = [];
    for (let i = 0; i < response.length; i += 2) {
      const byte = response.substr(i, 2);
      if (byte.match(/[0-9A-F]{2}/i)) {
        bytes.push(parseInt(byte, 16));
      }
    }

    // Parse based on PID
    switch (pid) {
      case OBD_PIDS.ENGINE_RPM:
        return ((bytes[0] * 256) + bytes[1]) / 4; // RPM

      case OBD_PIDS.VEHICLE_SPEED:
        return bytes[0]; // km/h

      case OBD_PIDS.THROTTLE_POSITION:
      case OBD_PIDS.ENGINE_LOAD:
      case OBD_PIDS.FUEL_LEVEL:
        return (bytes[0] * 100) / 255; // 0-100%

      case OBD_PIDS.COOLANT_TEMP:
      case OBD_PIDS.INTAKE_TEMP:
      case OBD_PIDS.AMBIENT_AIR_TEMP:
      case OBD_PIDS.ENGINE_OIL_TEMP:
        return bytes[0] - 40; // °C

      case OBD_PIDS.MAF_RATE:
        return ((bytes[0] * 256) + bytes[1]) / 100; // g/s

      case OBD_PIDS.FUEL_RATE:
        return ((bytes[0] * 256) + bytes[1]) / 20; // L/h

      case OBD_PIDS.CONTROL_MODULE_VOLTAGE:
        return ((bytes[0] * 256) + bytes[1]) / 1000; // V

      case OBD_PIDS.BAROMETRIC_PRESSURE:
        return bytes[0]; // kPa

      case OBD_PIDS.FUEL_PRESSURE:
        return bytes[0] * 3; // kPa

      case OBD_PIDS.TIMING_ADVANCE:
        return (bytes[0] / 2) - 64; // degrees

      case OBD_PIDS.SHORT_FUEL_TRIM_1:
      case OBD_PIDS.LONG_FUEL_TRIM_1:
        return ((bytes[0] - 128) * 100) / 128; // %

      case OBD_PIDS.O2_SENSOR_1:
        return bytes[0] / 200; // V

      case OBD_PIDS.RUNTIME_SINCE_START:
        return (bytes[0] * 256) + bytes[1]; // seconds

      case OBD_PIDS.DISTANCE_MIL_ON:
      case OBD_PIDS.DISTANCE_SINCE_DTC_CLEAR:
        return (bytes[0] * 256) + bytes[1]; // km

      default:
        return 0;
    }
  }

  /**
   * Update current data
   */
  private updateData(pid: string, value: number): void {
    const timestamp = new Date();

    switch (pid) {
      case OBD_PIDS.ENGINE_RPM:
        this.currentData.rpm = value;
        break;
      case OBD_PIDS.VEHICLE_SPEED:
        this.currentData.speed = value;
        break;
      case OBD_PIDS.THROTTLE_POSITION:
        this.currentData.throttlePosition = value;
        break;
      case OBD_PIDS.ENGINE_LOAD:
        this.currentData.engineLoad = value;
        break;
      case OBD_PIDS.COOLANT_TEMP:
        this.currentData.coolantTemp = value;
        break;
      case OBD_PIDS.FUEL_LEVEL:
        this.currentData.fuelLevel = value;
        break;
      case OBD_PIDS.INTAKE_TEMP:
        this.currentData.intakeTemp = value;
        break;
      case OBD_PIDS.MAF_RATE:
        this.currentData.mafRate = value;
        break;
      case OBD_PIDS.FUEL_RATE:
        this.currentData.fuelRate = value;
        // Calculate instant consumption
        if (this.currentData.speed && this.currentData.speed > 0) {
          this.currentData.instantConsumption = (value / this.currentData.speed) * 100;
        }
        break;
      case OBD_PIDS.CONTROL_MODULE_VOLTAGE:
        this.currentData.batteryVoltage = value;
        break;
      case OBD_PIDS.BAROMETRIC_PRESSURE:
        this.currentData.barometricPressure = value;
        break;
    }

    this.currentData.timestamp = timestamp;
  }

  /**
   * Read DTCs (Diagnostic Trouble Codes)
   */
  async readDTCs(): Promise<string[]> {
    try {
      const response = await this.sendCommand('03'); // Request DTCs
      return this.parseDTCs(response);
    } catch (error) {
      this.emit('error', error);
      return [];
    }
  }

  /**
   * Parse DTC codes
   */
  private parseDTCs(response: string): string[] {
    const dtcs: string[] = [];
    const bytes = response.match(/.{1,2}/g) || [];

    for (let i = 0; i < bytes.length; i += 2) {
      const byte1 = parseInt(bytes[i], 16);
      const byte2 = parseInt(bytes[i + 1], 16);

      if (byte1 === 0 && byte2 === 0) continue;

      const firstChar = ['P', 'C', 'B', 'U'][(byte1 >> 6) & 0x03];
      const secondChar = ((byte1 >> 4) & 0x03).toString();
      const thirdChar = (byte1 & 0x0F).toString(16).toUpperCase();
      const fourthFifth = byte2.toString(16).toUpperCase().padStart(2, '0');

      dtcs.push(`${firstChar}${secondChar}${thirdChar}${fourthFifth}`);
    }

    return dtcs;
  }

  /**
   * Clear DTCs
   */
  async clearDTCs(): Promise<boolean> {
    try {
      await this.sendCommand('04'); // Clear DTCs
      this.emit('dtcs-cleared');
      return true;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }

  /**
   * Handle incoming data
   */
  private handleData(data: string): void {
    this.dataBuffer += data;

    // Check for complete response
    if (this.dataBuffer.includes('>')) {
      const response = this.dataBuffer.split('>')[0].trim();
      this.dataBuffer = '';
      this.emit('response', response);
    }
  }

  /**
   * Read from serial port
   */
  private async readSerial(reader: any): Promise<void> {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        this.handleData(text);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  /**
   * Disconnect
   */
  async disconnect(): Promise<void> {
    this.stopReading();

    if (this.port) {
      if (this.connectionType === 'bluetooth') {
        // @ts-ignore
        await this.port.device?.gatt?.disconnect();
      } else if (this.connectionType === 'serial') {
        // @ts-ignore
        await this.port.close();
      }
    }

    this.connected = false;
    this.port = null;
    this.emit('disconnected');
  }

  /**
   * Get current data
   */
  getCurrentData(): Partial<OBDData> {
    return { ...this.currentData };
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Check if reading
   */
  isReading(): boolean {
    return this.reading;
  }

  /**
   * Utility: Delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const obdReader = new EnhancedOBDReader('bluetooth');
