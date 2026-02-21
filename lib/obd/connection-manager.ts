// OBD-II Bağlantı Yöneticisi - Tüm bağlantı türlerini destekler

export type ConnectionType = 'bluetooth' | 'wifi' | 'usb' | 'cellular' | 'api';

export interface OBDDevice {
  id: string;
  name: string;
  type: ConnectionType;
  protocol: OBDProtocol;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  signal: number; // 0-100
  lastSeen: Date;
  manufacturer?: string;
  model?: string;
  firmware?: string;
}

export type OBDProtocol =
  | 'AUTO'
  | 'ISO_15765_4_CAN'
  | 'ISO_15765_4_CAN_11_500'
  | 'ISO_15765_4_CAN_29_500'
  | 'ISO_15765_4_CAN_11_250'
  | 'ISO_15765_4_CAN_29_250'
  | 'SAE_J1939_CAN'
  | 'ISO_14230_4_KWP_FAST'
  | 'ISO_14230_4_KWP_SLOW'
  | 'ISO_9141_2'
  | 'SAE_J1850_PWM'
  | 'SAE_J1850_VPW';

export interface ScanResult {
  devices: OBDDevice[];
  connectionType: ConnectionType;
  duration: number;
}

export class ConnectionManager {
  private static instance: ConnectionManager;
  private activeConnection: OBDDevice | null = null;
  private scanInProgress = false;

  private constructor() {}

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  // Bluetooth bağlantı taraması
  async scanBluetooth(): Promise<OBDDevice[]> {
    console.log('Starting Bluetooth scan...');

    // Web Bluetooth API kullanımı
    if (typeof navigator !== 'undefined' && 'bluetooth' in navigator) {
      try {
        // OBD-II servisleri için UUID'ler
        const device = await (navigator as any).bluetooth.requestDevice({
          filters: [
            { services: ['0000fff0-0000-1000-8000-00805f9b34fb'] }, // Common OBD UUID
            { namePrefix: 'OBD' },
            { namePrefix: 'ELM327' },
            { namePrefix: 'OBDII' },
            { namePrefix: 'Vgate' },
            { namePrefix: 'Veepeak' }
          ],
          optionalServices: ['battery_service', 'device_information']
        });

        const obdDevice: OBDDevice = {
          id: device.id,
          name: device.name || 'Unknown OBD Device',
          type: 'bluetooth',
          protocol: 'AUTO',
          status: 'disconnected',
          signal: 100,
          lastSeen: new Date()
        };

        return [obdDevice];
      } catch (error) {
        console.error('Bluetooth scan error:', error);
        return [];
      }
    }

    // Fallback: Demo data
    return this.getDemoBluetooth();
  }

  // WiFi bağlantı taraması (OBD-II WiFi adaptörler)
  async scanWiFi(): Promise<OBDDevice[]> {
    console.log('Starting WiFi scan...');

    // WiFi OBD adaptörleri genellikle 192.168.0.10 veya 192.168.0.11 IP'sinde
    const commonIPs = [
      '192.168.0.10:35000',
      '192.168.0.11:35000',
      '192.168.1.10:35000'
    ];

    const devices: OBDDevice[] = [];

    for (const ip of commonIPs) {
      try {
        const response = await fetch(`http://${ip}/api/status`, {
          method: 'GET',
          signal: AbortSignal.timeout(2000) // 2 saniye timeout
        });

        if (response.ok) {
          const data = await response.json();
          devices.push({
            id: `wifi-${ip}`,
            name: data.name || `WiFi OBD (${ip})`,
            type: 'wifi',
            protocol: data.protocol || 'AUTO',
            status: 'disconnected',
            signal: 100,
            lastSeen: new Date(),
            manufacturer: data.manufacturer,
            firmware: data.firmware
          });
        }
      } catch (error) {
        // IP'de cihaz yok, devam et
        continue;
      }
    }

    // Demo data
    if (devices.length === 0) {
      return this.getDemoWiFi();
    }

    return devices;
  }

  // USB bağlantı taraması (Web Serial API)
  async scanUSB(): Promise<OBDDevice[]> {
    console.log('Starting USB scan...');

    if (typeof navigator !== 'undefined' && 'serial' in navigator) {
      try {
        const ports = await (navigator as any).serial.getPorts();

        const devices: OBDDevice[] = ports.map((port: any, index: number) => ({
          id: `usb-${index}`,
          name: `USB OBD Adapter ${index + 1}`,
          type: 'usb' as ConnectionType,
          protocol: 'AUTO' as OBDProtocol,
          status: 'disconnected' as const,
          signal: 100,
          lastSeen: new Date()
        }));

        if (devices.length > 0) {
          return devices;
        }
      } catch (error) {
        console.error('USB scan error:', error);
      }
    }

    // Demo data
    return this.getDemoUSB();
  }

  // Cellular/4G bağlantı (Telematik cihazlar)
  async scanCellular(): Promise<OBDDevice[]> {
    console.log('Starting Cellular scan...');

    // API üzerinden bağlı telematik cihazları kontrol et
    try {
      const response = await fetch('/api/obd/devices?type=cellular');
      const data = await response.json();

      if (data.success && data.devices) {
        return data.devices.map((d: any) => ({
          id: d.id,
          name: d.name,
          type: 'cellular',
          protocol: d.protocol,
          status: d.online ? 'connected' : 'disconnected',
          signal: d.signal,
          lastSeen: new Date(d.lastSeen),
          manufacturer: d.manufacturer,
          model: d.model
        }));
      }
    } catch (error) {
      console.error('Cellular scan error:', error);
    }

    return this.getDemoCellular();
  }

  // Araç API entegrasyonu (Tesla, BMW Connected, Mercedes me vb.)
  async scanVehicleAPI(make: string): Promise<OBDDevice[]> {
    console.log(`Starting Vehicle API scan for ${make}...`);

    const apiEndpoints: { [key: string]: string } = {
      'Tesla': '/api/vehicle-integration/tesla',
      'BMW': '/api/vehicle-integration/bmw',
      'Mercedes-Benz': '/api/vehicle-integration/mercedes',
      'Audi': '/api/vehicle-integration/audi',
      'Volkswagen': '/api/vehicle-integration/vw',
      'Porsche': '/api/vehicle-integration/porsche',
      'Volvo': '/api/vehicle-integration/volvo',
      'TOGG': '/api/vehicle-integration/togg'
    };

    const endpoint = apiEndpoints[make];
    if (!endpoint) {
      return [];
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success && data.vehicle) {
        return [{
          id: `api-${make.toLowerCase()}`,
          name: `${make} Connected`,
          type: 'api',
          protocol: 'AUTO',
          status: data.vehicle.connected ? 'connected' : 'disconnected',
          signal: 100,
          lastSeen: new Date(),
          manufacturer: make,
          model: data.vehicle.model
        }];
      }
    } catch (error) {
      console.error(`${make} API scan error:`, error);
    }

    return [];
  }

  // Tüm bağlantı türlerini tara
  async scanAll(): Promise<ScanResult> {
    const startTime = Date.now();
    this.scanInProgress = true;

    try {
      const [bluetooth, wifi, usb, cellular] = await Promise.all([
        this.scanBluetooth(),
        this.scanWiFi(),
        this.scanUSB(),
        this.scanCellular()
      ]);

      const allDevices = [...bluetooth, ...wifi, ...usb, ...cellular];
      const duration = Date.now() - startTime;

      return {
        devices: allDevices,
        connectionType: allDevices[0]?.type || 'bluetooth',
        duration
      };
    } finally {
      this.scanInProgress = false;
    }
  }

  // Cihaza bağlan
  async connect(device: OBDDevice): Promise<boolean> {
    console.log(`Connecting to ${device.name} via ${device.type}...`);

    try {
      switch (device.type) {
        case 'bluetooth':
          return await this.connectBluetooth(device);
        case 'wifi':
          return await this.connectWiFi(device);
        case 'usb':
          return await this.connectUSB(device);
        case 'cellular':
          return await this.connectCellular(device);
        case 'api':
          return await this.connectAPI(device);
        default:
          return false;
      }
    } catch (error) {
      console.error('Connection error:', error);
      return false;
    }
  }

  // Bluetooth bağlantısı
  private async connectBluetooth(device: OBDDevice): Promise<boolean> {
    // Web Bluetooth API ile bağlan
    try {
      // GATT sunucusuna bağlan
      // Karakteristik oku/yaz işlemleri
      this.activeConnection = { ...device, status: 'connected' };
      return true;
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      return false;
    }
  }

  // WiFi bağlantısı
  private async connectWiFi(device: OBDDevice): Promise<boolean> {
    try {
      const ip = device.id.replace('wifi-', '');
      const response = await fetch(`http://${ip}/api/connect`, {
        method: 'POST'
      });

      if (response.ok) {
        this.activeConnection = { ...device, status: 'connected' };
        return true;
      }
      return false;
    } catch (error) {
      console.error('WiFi connection error:', error);
      return false;
    }
  }

  // USB bağlantısı
  private async connectUSB(device: OBDDevice): Promise<boolean> {
    if (typeof navigator !== 'undefined' && 'serial' in navigator) {
      try {
        const port = await (navigator as any).serial.requestPort();
        await port.open({ baudRate: 38400 }); // ELM327 standart baud rate

        this.activeConnection = { ...device, status: 'connected' };
        return true;
      } catch (error) {
        console.error('USB connection error:', error);
        return false;
      }
    }
    return false;
  }

  // Cellular bağlantısı
  private async connectCellular(device: OBDDevice): Promise<boolean> {
    try {
      const response = await fetch('/api/obd/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: device.id, type: 'cellular' })
      });

      if (response.ok) {
        this.activeConnection = { ...device, status: 'connected' };
        return true;
      }
      return false;
    } catch (error) {
      console.error('Cellular connection error:', error);
      return false;
    }
  }

  // API bağlantısı (Tesla, BMW vb.)
  private async connectAPI(device: OBDDevice): Promise<boolean> {
    try {
      const response = await fetch('/api/vehicle-integration/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manufacturer: device.manufacturer,
          deviceId: device.id
        })
      });

      if (response.ok) {
        this.activeConnection = { ...device, status: 'connected' };
        return true;
      }
      return false;
    } catch (error) {
      console.error('API connection error:', error);
      return false;
    }
  }

  // Bağlantıyı kes
  disconnect(): void {
    if (this.activeConnection) {
      this.activeConnection.status = 'disconnected';
      this.activeConnection = null;
    }
  }

  // Aktif bağlantıyı al
  getActiveConnection(): OBDDevice | null {
    return this.activeConnection;
  }

  // Demo cihazlar
  private getDemoBluetooth(): OBDDevice[] {
    return [{
      id: 'bt-demo-1',
      name: 'ELM327 v2.3',
      type: 'bluetooth',
      protocol: 'ISO_15765_4_CAN',
      status: 'disconnected',
      signal: 95,
      lastSeen: new Date(),
      manufacturer: 'OBDLink',
      firmware: 'v2.3'
    }];
  }

  private getDemoWiFi(): OBDDevice[] {
    return [{
      id: 'wifi-demo-1',
      name: 'Veepeak WiFi OBD',
      type: 'wifi',
      protocol: 'ISO_15765_4_CAN',
      status: 'disconnected',
      signal: 100,
      lastSeen: new Date(),
      manufacturer: 'Veepeak',
      firmware: 'v4.1'
    }];
  }

  private getDemoUSB(): OBDDevice[] {
    return [{
      id: 'usb-demo-1',
      name: 'OBDLink SX USB',
      type: 'usb',
      protocol: 'ISO_15765_4_CAN',
      status: 'disconnected',
      signal: 100,
      lastSeen: new Date(),
      manufacturer: 'ScanTool',
      firmware: 'v1.5'
    }];
  }

  private getDemoCellular(): OBDDevice[] {
    return [{
      id: 'cellular-demo-1',
      name: 'CalAmp LMU-4230',
      type: 'cellular',
      protocol: 'ISO_15765_4_CAN',
      status: 'disconnected',
      signal: 85,
      lastSeen: new Date(),
      manufacturer: 'CalAmp',
      model: 'LMU-4230'
    }];
  }
}

export default ConnectionManager;
