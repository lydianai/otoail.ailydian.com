'use client';

/**
 * Google Maps Integration with Real-time Traffic & Navigation
 * Features:
 * - Real Google Maps with Turkey support
 * - Live traffic layer
 * - Turn-by-turn directions
 * - Custom dark Tesla-style theme
 * - Current location tracking
 * - Speed display
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, TrafficLayer, InfoWindow } from '@react-google-maps/api';
import { Navigation, MapPin, X, Layers, DollarSign, Camera, Fuel, Zap } from 'lucide-react';
import { useTurkeyPOIs, type POIFilters } from '@/hooks/useTurkeyPOIs';

interface GoogleMapsViewProps {
  className?: string;
  speed?: number;
  accentColor?: string;
  poiFilters?: POIFilters;
}

// Dark Tesla-style map theme
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3a3a3a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2833" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f1419" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#0f1419" }],
  },
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function GoogleMapsView({
  className = '',
  speed = 0,
  accentColor = '#3b82f6',
  poiFilters
}: GoogleMapsViewProps) {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>({
    lat: 41.0082,
    lng: 28.9784
  });
  const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [showTraffic, setShowTraffic] = useState(true);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<any>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Load Turkey POIs
  const { data: poiData, getFilteredPOIs } = useTurkeyPOIs();
  const filteredPOIs = getFilteredPOIs();

  // Get current location
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('GPS Error:', error);
          // Fallback to Istanbul
          setCurrentPosition({ lat: 41.0082, lng: 28.9784 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Calculate route when destination is set
  useEffect(() => {
    if (!destination || !mapLoaded) return;

    setIsCalculatingRoute(true);

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        setIsCalculatingRoute(false);

        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [destination, currentPosition, mapLoaded]);

  // Handle map click to set destination
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setDestination({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  }, []);

  const handleClearRoute = useCallback(() => {
    setDestination(null);
    setDirections(null);
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMapLoaded(false);
  }, []);

  // API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  return (
    <div className={`relative w-full h-full ${className}`}>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={16}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy'
          }}
          onClick={handleMapClick}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Traffic Layer */}
          {showTraffic && <TrafficLayer />}

          {/* Current Location Marker */}
          <Marker
            position={currentPosition}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: accentColor,
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 8
            }}
          />

          {/* Destination Marker */}
          {destination && (
            <Marker
              position={destination}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: '#ef4444',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 6
              }}
            />
          )}

          {/* Directions Renderer */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: accentColor,
                  strokeWeight: 5,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}

          {/* HGS Points */}
          {filteredPOIs?.hgs.map((hgs) => (
            <Marker
              key={hgs.id}
              position={{ lat: hgs.lat, lng: hgs.lng }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#f59e0b',
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 10
              }}
              onClick={() => setSelectedPOI({ type: 'hgs', data: hgs })}
            />
          ))}

          {/* Radar Points */}
          {filteredPOIs?.radar.map((radar) => (
            <Marker
              key={radar.id}
              position={{ lat: radar.lat, lng: radar.lng }}
              icon={{
                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                fillColor: '#ef4444',
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 8,
                rotation: 180
              }}
              onClick={() => setSelectedPOI({ type: 'radar', data: radar })}
            />
          ))}

          {/* Gas Stations */}
          {filteredPOIs?.gas.map((gas) => (
            <Marker
              key={gas.id}
              position={{ lat: gas.lat, lng: gas.lng }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#10b981',
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 10
              }}
              onClick={() => setSelectedPOI({ type: 'gas', data: gas })}
            />
          ))}

          {/* EV Charging Stations */}
          {filteredPOIs?.ev.map((ev) => (
            <Marker
              key={ev.id}
              position={{ lat: ev.lat, lng: ev.lng }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: ev.available ? '#3b82f6' : '#6b7280',
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 10
              }}
              onClick={() => setSelectedPOI({ type: 'ev', data: ev })}
            />
          ))}

          {/* Info Window for Selected POI */}
          {selectedPOI && (
            <InfoWindow
              position={{
                lat: selectedPOI.data.lat,
                lng: selectedPOI.data.lng
              }}
              onCloseClick={() => setSelectedPOI(null)}
            >
              <div className="bg-black text-white p-3 rounded-lg max-w-xs">
                <h3 className="font-bold text-sm mb-2">{selectedPOI.data.name}</h3>

                {selectedPOI.type === 'hgs' && (
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-300">Tür: {selectedPOI.data.type === 'bridge' ? 'Köprü' : selectedPOI.data.type === 'tunnel' ? 'Tünel' : 'Otoyol'}</p>
                    <p className="text-yellow-400 font-bold">Fiyat: ₺{selectedPOI.data.price.toFixed(2)}</p>
                  </div>
                )}

                {selectedPOI.type === 'radar' && (
                  <div className="space-y-1 text-xs">
                    <p className="text-red-400 font-bold">Hız Limiti: {selectedPOI.data.limit} km/h</p>
                    <p className="text-gray-300">Yön: {selectedPOI.data.direction === 'both' ? 'İki yön' : selectedPOI.data.direction}</p>
                  </div>
                )}

                {selectedPOI.type === 'gas' && (
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-300">Marka: {selectedPOI.data.brand}</p>
                    <p className="text-green-400">Dizel: ₺{selectedPOI.data.diesel.toFixed(2)}</p>
                    <p className="text-blue-400">Benzin: ₺{selectedPOI.data.gasoline.toFixed(2)}</p>
                    <p className="text-purple-400">LPG: ₺{selectedPOI.data.lpg.toFixed(2)}</p>
                  </div>
                )}

                {selectedPOI.type === 'ev' && (
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-300">Sağlayıcı: {selectedPOI.data.provider}</p>
                    <p className="text-blue-400">Güç: {selectedPOI.data.power} kW</p>
                    <p className="text-gray-300">Fişler: {selectedPOI.data.plugs.join(', ')}</p>
                    <p className="text-green-400">Fiyat: ₺{selectedPOI.data.price.toFixed(2)}/kWh</p>
                    <p className={selectedPOI.data.available ? 'text-green-400' : 'text-red-400'}>
                      {selectedPOI.data.available ? '✓ Kullanılabilir' : '✗ Dolu'}
                    </p>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Top Left Controls */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
        {/* Traffic Toggle */}
        <button
          onClick={() => setShowTraffic(!showTraffic)}
          className={`backdrop-blur-xl p-4 rounded-2xl border-2 shadow-2xl transition-all flex items-center gap-3 ${
            showTraffic
              ? 'bg-emerald-500/20 border-emerald-500/70'
              : 'bg-black/40 border-white/20'
          }`}
        >
          <Layers className={`w-5 h-5 ${showTraffic ? 'text-emerald-400' : 'text-white'}`} />
          <span className={`text-sm font-bold ${showTraffic ? 'text-emerald-400' : 'text-white'}`}>
            Trafik
          </span>
        </button>

        {/* Route Info */}
        {directions && directions.routes[0] && (
          <div className="backdrop-blur-xl bg-black/90 border-2 border-white/10 rounded-2xl p-4 shadow-2xl max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Rota Bilgisi</h3>
              </div>
              <button
                onClick={handleClearRoute}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Mesafe:</span>
                <span className="text-white font-bold">
                  {directions.routes[0].legs[0].distance?.text}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Süre:</span>
                <span className="text-white font-bold">
                  {directions.routes[0].legs[0].duration?.text}
                </span>
              </div>
            </div>

            {/* Turn-by-Turn Steps */}
            <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
              {directions.routes[0].legs[0].steps.slice(0, 5).map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 bg-white/5 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-400">{index + 1}</span>
                  </div>
                  <div className="flex-1 text-xs text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: step.instructions }} />
                    <div className="text-gray-500 mt-1">{step.distance?.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculating State */}
        {isCalculatingRoute && (
          <div className="backdrop-blur-xl bg-black/90 border-2 border-blue-500/50 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
              <span className="text-sm font-bold text-white">Rota Hesaplanıyor...</span>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!destination && !isCalculatingRoute && (
          <div className="backdrop-blur-xl bg-black/90 border-2 border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-xs font-bold text-white">Hedef Seçin</div>
                <div className="text-xs text-gray-400">Haritaya dokunun</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Speed Display (Bottom Center) */}
      {speed > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="backdrop-blur-xl bg-black/90 border-2 border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{speed.toFixed(0)}</div>
              <div className="text-xs text-gray-400 font-bold">KM/H</div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Controls (Right Side) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        <button
          onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 16) + 1)}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-white text-2xl font-bold hover:bg-black/50 transition-all shadow-2xl"
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 16) - 1)}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-white text-2xl font-bold hover:bg-black/50 transition-all shadow-2xl"
        >
          −
        </button>
        <button
          onClick={() => mapRef.current?.panTo(currentPosition)}
          className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:bg-black/50 transition-all shadow-2xl"
        >
          <MapPin className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
