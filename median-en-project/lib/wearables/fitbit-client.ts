/**
 * Fitbit API Integration Client
 * Production-ready Fitbit Web API for RPM
 *
 * Features:
 * - OAuth 2.0 authorization
 * - Real-time vital signs sync
 * - Sleep tracking
 * - Activity monitoring
 * - RPM billing compliance
 */

import axios, { AxiosInstance } from "axios";
import { VitalReading, VitalType, RPMBillingMetrics } from "./apple-health-client";

// ==================== TYPES ====================

export interface FitbitConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface FitbitAuthorization {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  userId: string;
  scope: string[];
}

export interface FitbitDevice {
  id: string;
  deviceVersion: string;
  type: string;
  batteryLevel: number;
  lastSyncTime: Date;
}

// ==================== FITBIT CLIENT ====================

export class FitbitClient {
  private config: FitbitConfig;
  private httpClient: AxiosInstance;
  private baseURL = "https://api.fitbit.com/1";

  constructor(config: FitbitConfig) {
    this.config = config;

    this.httpClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // ==================== OAUTH AUTHORIZATION ====================

  /**
   * Get OAuth authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const scopes = [
      "activity",
      "heartrate",
      "location",
      "nutrition",
      "profile",
      "settings",
      "sleep",
      "social",
      "weight",
      "oxygen_saturation",
      "respiratory_rate",
      "temperature",
    ];

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: scopes.join(" "),
      state,
    });

    return `https://www.fitbit.com/oauth2/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCode(code: string): Promise<FitbitAuthorization> {
    try {
      const auth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString("base64");

      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: this.config.redirectUri,
        }),
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: new Date(Date.now() + response.data.expires_in * 1000),
        userId: response.data.user_id,
        scope: response.data.scope.split(" "),
      };
    } catch (error: any) {
      console.error("❌ Token exchange failed:", error.message);
      throw new Error(`Fitbit authorization failed: ${error.message}`);
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(
    refreshToken: string
  ): Promise<FitbitAuthorization> {
    try {
      const auth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString("base64");

      const response = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: new Date(Date.now() + response.data.expires_in * 1000),
        userId: response.data.user_id,
        scope: response.data.scope.split(" "),
      };
    } catch (error: any) {
      console.error("❌ Token refresh failed:", error.message);
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  // ==================== VITAL SIGNS ====================

  /**
   * Get heart rate data
   */
  async getHeartRate(
    accessToken: string,
    userId: string,
    date: Date
  ): Promise<VitalReading[]> {
    try {
      const dateStr = this.formatDate(date);
      const response = await this.httpClient.get(
        `/user/${userId}/activities/heart/date/${dateStr}/1d/1sec.json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const readings: VitalReading[] = [];

      if (response.data["activities-heart-intraday"]?.dataset) {
        response.data["activities-heart-intraday"].dataset.forEach((point: any) => {
          readings.push({
            type: VitalType.HEART_RATE,
            value: point.value,
            unit: "bpm",
            measuredAt: new Date(`${dateStr}T${point.time}`),
            source: "Fitbit",
          });
        });
      }

      console.log(`❤️ Heart Rate: ${readings.length} readings`);
      return readings;
    } catch (error: any) {
      console.error("❌ Get heart rate failed:", error.message);
      return [];
    }
  }

  /**
   * Get SpO2 (oxygen saturation) data
   */
  async getOxygenSaturation(
    accessToken: string,
    userId: string,
    date: Date
  ): Promise<VitalReading[]> {
    try {
      const dateStr = this.formatDate(date);
      const response = await this.httpClient.get(
        `/user/${userId}/spo2/date/${dateStr}.json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const readings: VitalReading[] = [];

      if (response.data.value) {
        readings.push({
          type: VitalType.OXYGEN_SATURATION,
          value: response.data.value,
          unit: "%",
          measuredAt: new Date(dateStr),
          source: "Fitbit",
        });
      }

      console.log(`🫁 SpO2: ${readings.length} readings`);
      return readings;
    } catch (error: any) {
      console.error("❌ Get SpO2 failed:", error.message);
      return [];
    }
  }

  /**
   * Get respiratory rate
   */
  async getRespiratoryRate(
    accessToken: string,
    userId: string,
    date: Date
  ): Promise<VitalReading[]> {
    try {
      const dateStr = this.formatDate(date);
      const response = await this.httpClient.get(
        `/user/${userId}/br/date/${dateStr}.json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const readings: VitalReading[] = [];

      if (response.data.br && response.data.br.length > 0) {
        response.data.br.forEach((reading: any) => {
          readings.push({
            type: VitalType.RESPIRATORY_RATE,
            value: reading.value.breathingRate,
            unit: "breaths/min",
            measuredAt: new Date(reading.dateTime),
            source: "Fitbit",
          });
        });
      }

      console.log(`🫁 Respiratory Rate: ${readings.length} readings`);
      return readings;
    } catch (error: any) {
      console.error("❌ Get respiratory rate failed:", error.message);
      return [];
    }
  }

  /**
   * Get sleep data
   */
  async getSleepData(
    accessToken: string,
    userId: string,
    date: Date
  ): Promise<VitalReading[]> {
    try {
      const dateStr = this.formatDate(date);
      const response = await this.httpClient.get(
        `/user/${userId}/sleep/date/${dateStr}.json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const readings: VitalReading[] = [];

      if (response.data.summary) {
        readings.push({
          type: VitalType.SLEEP_ANALYSIS,
          value: response.data.summary.totalMinutesAsleep / 60, // Convert to hours
          unit: "hours",
          measuredAt: new Date(dateStr),
          source: "Fitbit",
        });
      }

      console.log(`😴 Sleep: ${readings.length} readings`);
      return readings;
    } catch (error: any) {
      console.error("❌ Get sleep data failed:", error.message);
      return [];
    }
  }

  /**
   * Get all vitals for RPM monitoring
   */
  async getAllVitals(
    accessToken: string,
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Map<VitalType, VitalReading[]>> {
    console.log("📊 Collecting all vital signs from Fitbit...");

    const vitals = new Map<VitalType, VitalReading[]>();
    const days = this.getDateRange(startDate, endDate);

    // Collect data for each day
    for (const date of days) {
      const [heartRate, spo2, respiratoryRate, sleep] = await Promise.all([
        this.getHeartRate(accessToken, userId, date),
        this.getOxygenSaturation(accessToken, userId, date),
        this.getRespiratoryRate(accessToken, userId, date),
        this.getSleepData(accessToken, userId, date),
      ]);

      // Aggregate readings
      this.appendReadings(vitals, VitalType.HEART_RATE, heartRate);
      this.appendReadings(vitals, VitalType.OXYGEN_SATURATION, spo2);
      this.appendReadings(vitals, VitalType.RESPIRATORY_RATE, respiratoryRate);
      this.appendReadings(vitals, VitalType.SLEEP_ANALYSIS, sleep);
    }

    const totalReadings = Array.from(vitals.values()).reduce(
      (sum, readings) => sum + readings.length,
      0
    );

    console.log(`✅ Collected ${totalReadings} total Fitbit readings`);

    return vitals;
  }

  // ==================== DEVICES ====================

  /**
   * Get connected devices
   */
  async getDevices(
    accessToken: string,
    userId: string
  ): Promise<FitbitDevice[]> {
    try {
      const response = await this.httpClient.get(`/user/${userId}/devices.json`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const devices: FitbitDevice[] = response.data.map((device: any) => ({
        id: device.id,
        deviceVersion: device.deviceVersion,
        type: device.type,
        batteryLevel: device.battery === "High" ? 100 : device.battery === "Medium" ? 50 : 20,
        lastSyncTime: new Date(device.lastSyncTime),
      }));

      console.log(`📱 Found ${devices.length} Fitbit devices`);
      return devices;
    } catch (error: any) {
      console.error("❌ Get devices failed:", error.message);
      return [];
    }
  }

  // ==================== RPM BILLING ====================

  /**
   * Calculate RPM billing metrics
   */
  async calculateRPMMetrics(
    patientId: string,
    accessToken: string,
    userId: string,
    month: Date
  ): Promise<RPMBillingMetrics> {
    console.log(`📈 Calculating Fitbit RPM billing metrics`);

    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const allVitals = await this.getAllVitals(
      accessToken,
      userId,
      startDate,
      endDate
    );

    // Calculate days with readings
    const daysWithData = new Set<string>();
    allVitals.forEach((readings) => {
      readings.forEach((reading) => {
        daysWithData.add(reading.measuredAt.toISOString().split("T")[0]);
      });
    });

    const daysWithReadings = daysWithData.size;

    const totalReadings = Array.from(allVitals.values()).reduce(
      (sum, readings) => sum + readings.length,
      0
    );

    const averageReadingsPerDay =
      daysWithReadings > 0 ? totalReadings / daysWithReadings : 0;

    const totalMinutesMonitored = Math.min(
      totalReadings * 2,
      daysWithReadings * 30
    );

    const metrics: RPMBillingMetrics = {
      patientId,
      month: month.toISOString().slice(0, 7),
      totalMinutesMonitored,
      daysWithReadings,
      qualifiesFor99453: true,
      qualifiesFor99454: daysWithReadings >= 16,
      qualifiesFor99457: totalMinutesMonitored >= 20,
      qualifiesFor99458: totalMinutesMonitored >= 40,
      averageReadingsPerDay,
      vitalAbnormalities: [],
    };

    console.log(`✅ Fitbit RPM Metrics:`);
    console.log(`   Days: ${daysWithReadings}/30`);
    console.log(`   Minutes: ${totalMinutesMonitored}`);
    console.log(`   99454: ${metrics.qualifiesFor99454 ? "✓" : "✗"}`);

    return metrics;
  }

  // ==================== HELPERS ====================

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  private getDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  private appendReadings(
    map: Map<VitalType, VitalReading[]>,
    type: VitalType,
    readings: VitalReading[]
  ): void {
    const existing = map.get(type) || [];
    map.set(type, [...existing, ...readings]);
  }
}

// ==================== FACTORY ====================

export function createFitbitClient(config: FitbitConfig): FitbitClient {
  return new FitbitClient(config);
}
