'use client';

/**
 * Weather API Hook
 * Tesla Dashboard için hava durumu verileri
 */

import { useState, useEffect, useCallback } from 'react';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  visibility: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  location: string;
  timestamp: number;
}

export interface UseWeatherAPIReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: (lat: number, lon: number) => Promise<void>;
}

export function useWeatherAPI(
  initialLat?: number,
  initialLon?: number
): UseWeatherAPIReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // OpenWeatherMap API (free tier)
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Hava durumu verisi alınamadı');
      }

      const data = await response.json();

      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        clouds: data.clouds.all,
        visibility: data.visibility,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        location: data.name,
        timestamp: Date.now(),
      });
    } catch (err: any) {
      setError(err.message || 'Hava durumu hatası');
      console.error('Weather API error:', err);

      // Fallback demo data
      setWeather({
        temp: 22,
        feelsLike: 23,
        humidity: 60,
        pressure: 1013,
        windSpeed: 5,
        windDeg: 180,
        clouds: 40,
        visibility: 10000,
        description: 'Parçalı bulutlu',
        icon: '02d',
        sunrise: Date.now() / 1000 - 3600,
        sunset: Date.now() / 1000 + 3600,
        location: 'İstanbul',
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch on mount if coordinates provided
  useEffect(() => {
    if (initialLat !== undefined && initialLon !== undefined) {
      fetchWeather(initialLat, initialLon);
    }
  }, [initialLat, initialLon, fetchWeather]);

  return {
    weather,
    isLoading,
    error,
    refetch: fetchWeather,
  };
}
