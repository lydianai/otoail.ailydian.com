'use client';

/**
 * Advanced Interactive Map with Traffic, Weather & Navigation
 * Adapted from otoai-dashboard for turk-oto-ai
 * Features:
 * - Real-time traffic simulation (LOW/MODERATE/HEAVY/BLOCKED)
 * - Dynamic weather (CLEAR/RAIN/FOG) with canvas animations
 * - Click-to-navigate with turn-by-turn directions
 * - POI markers (CHARGER/PARKING/COFFEE)
 * - Accident/roadwork alerts with emergency lights
 * - Day/night mode with radar scanner
 * - Rush hour simulation
 */

import React, { useEffect, useState, useRef } from 'react';

interface AdvancedMapViewProps {
  className?: string;
  speed?: number;
  accentColor?: string;
}

interface POI {
  id: number;
  x: number;
  y: number;
  type: 'CHARGER' | 'PARKING' | 'COFFEE';
}

interface RouteStep {
  id: number;
  action: 'STRAIGHT' | 'LEFT' | 'RIGHT' | 'UTURN' | 'DESTINATION';
  dist: string;
  street: string;
}

export default function AdvancedMapView({
  className = '',
  speed = 0,
  accentColor = '#3b82f6'
}: AdvancedMapViewProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [weather, setWeather] = useState<'CLEAR' | 'RAIN' | 'FOG'>('CLEAR');
  const [weatherAlertVisible, setWeatherAlertVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Always night mode for consistent look
  const isDay = false;

  const styles = {
    bg: '#050505',
    road: '#1a1a1a',
    roadStroke: '#000000',
    textMain: 'text-white',
    textSub: 'text-gray-400',
    cardBg: 'bg-[#111]/90 border-white/10 shadow-2xl',
    gridColor: accentColor,
    gridOpacity: 0.2
  };

  // Navigation State
  const [destination, setDestination] = useState<{x: number, y: number} | null>(null);
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Traffic & Environment Simulation State
  const [simulatedHour, setSimulatedHour] = useState(8);
  const [accident, setAccident] = useState<{ road: 'MAIN' | 'CROSS'; type: 'ACCIDENT' | 'WORK' } | null>(null);
  const [pois, setPois] = useState<POI[]>([]);

  const [mainRoadDensity, setMainRoadDensity] = useState<'LOW' | 'MODERATE' | 'HEAVY' | 'BLOCKED'>('LOW');
  const [crossRoadDensity, setCrossRoadDensity] = useState<'LOW' | 'MODERATE' | 'HEAVY' | 'BLOCKED'>('MODERATE');

  // Time & Weather Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedHour(prev => {
        const next = (prev + 1) % 24;
        if (next === 6) setWeather('FOG');
        else if (next === 10) setWeather('RAIN');
        else if (next === 15) setWeather('CLEAR');
        else if (next === 22) setWeather('RAIN');
        return next;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Weather Alert Logic
  useEffect(() => {
    if (weather === 'RAIN' || weather === 'FOG') {
      setWeatherAlertVisible(true);
    } else {
      setWeatherAlertVisible(false);
    }
  }, [weather]);

  // POI Generator
  useEffect(() => {
     const interval = setInterval(() => {
        if (Math.random() > 0.6 && pois.length < 4) {
           const newPoi: POI = {
              id: Date.now(),
              x: 100 + Math.random() * 800,
              y: 100 + Math.random() * 400,
              type: ['CHARGER', 'PARKING', 'COFFEE'][Math.floor(Math.random() * 3)] as any
           };
           setPois(prev => [...prev, newPoi]);

           setTimeout(() => {
              setPois(prev => prev.filter(p => p.id !== newPoi.id));
           }, 6000);
        }
     }, 2000);
     return () => clearInterval(interval);
  }, [pois.length]);

  // Traffic Logic based on Time & Accidents
  useEffect(() => {
     const isRushHour = (simulatedHour >= 7 && simulatedHour <= 9) || (simulatedHour >= 16 && simulatedHour <= 19);

     if (!accident && Math.random() < 0.15) {
         const road = Math.random() > 0.5 ? 'MAIN' : 'CROSS';
         const type = Math.random() > 0.7 ? 'ACCIDENT' : 'WORK';
         setAccident({ road, type });
         setTimeout(() => setAccident(null), 15000);
     }

     const getDensityForHour = (isRush: boolean) => {
        const rand = Math.random();
        if (isRush) return rand > 0.2 ? 'HEAVY' : 'MODERATE';
        return rand > 0.6 ? 'MODERATE' : 'LOW';
     };

     let main = getDensityForHour(isRushHour);
     let cross = getDensityForHour(isRushHour);

     if (accident?.road === 'MAIN') main = 'BLOCKED';
     if (accident?.road === 'CROSS') cross = 'BLOCKED';

     setMainRoadDensity(main as any);
     setCrossRoadDensity(cross as any);

  }, [simulatedHour, accident]);

  const getTrafficStyle = (density: 'LOW' | 'MODERATE' | 'HEAVY' | 'BLOCKED') => {
     switch(density) {
        case 'BLOCKED': return { color: '#7f1d1d', width: 24, opacity: 0.9, label: 'KAPALI', dash: '12 12' };
        case 'HEAVY': return { color: '#ef4444', width: 28, opacity: 0.7, label: 'YOĞUN', dash: '0' };
        case 'MODERATE': return { color: '#f97316', width: 18, opacity: 0.6, label: 'ORTA', dash: '0' };
        case 'LOW': return { color: '#4b5563', width: 12, opacity: 0.4, label: 'AKICI', dash: '0' };
     }
  };

  const mainTrafficStyle = getTrafficStyle(mainRoadDensity);
  const crossTrafficStyle = getTrafficStyle(crossRoadDensity);

  // Helper to render multiple cars based on density
  const renderTrafficStream = (path: string, density: 'LOW' | 'MODERATE' | 'HEAVY' | 'BLOCKED', color: string, idPrefix: string, reverse: boolean = false) => {
    if (density === 'BLOCKED') return null;

    const config = {
      LOW: { count: 1, duration: 8, gap: 0 },
      MODERATE: { count: 3, duration: 6, gap: 2 },
      HEAVY: { count: 6, duration: 15, gap: 2.2 }
    };

    const { count, duration, gap } = config[density];

    return Array.from({ length: count }).map((_, i) => (
       <circle key={`${idPrefix}-${i}`} r={reverse ? "3" : "4"} fill={color} filter="url(#glow-headlight)">
          <animateMotion
            dur={`${duration}s`}
            begin={`-${i * gap}s`}
            repeatCount="indefinite"
            path={path}
            rotate="auto"
            keyPoints={reverse ? "1;0" : "0;1"}
            keyTimes="0;1"
          />
       </circle>
    ));
  };

  // Geolocation Setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocation({ lat: 41.0082, lng: 28.9784 });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
       setLocation({ lat: 41.0082, lng: 28.9784 });
    }
  }, []);

  // Weather Animation (Rain)
  useEffect(() => {
    if (weather !== 'RAIN' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const drops: { x: number; y: number; speed: number; length: number }[] = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 0;
      canvas.height = canvas.parentElement?.clientHeight || 0;
    };
    resize();

    for (let i = 0; i < 100; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 15 + Math.random() * 10,
        length: 10 + Math.random() * 20
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.4)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      drops.forEach(drop => {
        const angle = speed > 50 ? Math.PI / 6 : 0;
        drop.y += drop.speed + (speed * 0.1);
        drop.x -= (speed * 0.05);

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < 0) drop.x = canvas.width;

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - Math.sin(angle) * drop.length, drop.y + Math.cos(angle) * drop.length);
        ctx.stroke();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [weather, speed]);

  // Navigation Logic
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDestination({ x, y });
    setIsCalculating(true);
    setRouteSteps([]);

    setTimeout(() => {
       const streets = ['Atatürk Blv.', 'İstiklal Cd.', 'Cumhuriyet Cd.', 'Sahil Yolu', 'Bağdat Cd.', 'Kennedy Cd.', 'Barbaros Blv.', 'Büyükdere Cd.'];
       const actions = ['STRAIGHT', 'LEFT', 'RIGHT', 'UTURN'];

       const numSteps = Math.floor(Math.random() * 3) + 2;
       const newSteps: RouteStep[] = [];

       for (let i = 0; i < numSteps; i++) {
          newSteps.push({
             id: Date.now() + i,
             action: actions[Math.floor(Math.random() * actions.length)] as any,
             dist: (Math.random() * 5 + 0.5).toFixed(1) + ' km',
             street: streets[Math.floor(Math.random() * streets.length)]
          });
       }
       newSteps.push({
          id: Date.now() + 99,
          action: 'DESTINATION',
          dist: '0 m',
          street: 'Hedefiniz Sağda'
       });

       setRouteSteps(newSteps);
       setIsCalculating(false);
    }, 800);
  };

  const getActionIcon = (action: string) => {
     switch(action) {
        case 'LEFT': return <path d="M9 18L15 12L9 6" transform="scale(-1, 1) translate(-24, 0)"/>;
        case 'RIGHT': return <path d="M9 18L15 12L9 6"/>;
        case 'UTURN': return <path d="M3 12a9 9 0 0 1 15-6.7L16 3m2 2.3l2.5 2.5" transform="rotate(180, 12, 12)"/>;
        case 'DESTINATION': return <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>;
        default: return <path d="M12 19V5M5 12l7-7 7 7"/>;
     }
  };

  const mainRoadPath = "M 400 900 C 500 700 300 500 600 200 S 900 100 900 0";
  const mainRoadPathReverse = "M 430 900 C 530 700 330 500 630 200 S 930 100 930 0";
  const crossRoadPath = "M -100 300 C 200 350 500 250 1200 300";

  return (
    <div
      className={`w-full h-full relative overflow-hidden cursor-crosshair group transition-colors duration-700 ${className}`}
      onClick={handleMapClick}
      style={{
        backgroundColor: styles.bg,
        boxShadow: `inset 0 0 100px ${accentColor}10`
      }}
    >

       {/* Background Grid */}
       <div className="absolute inset-0 transition-all duration-700 linear"
            style={{
              backgroundImage: `linear-gradient(${styles.gridColor}33 1px, transparent 1px), linear-gradient(90deg, ${styles.gridColor}33 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              backgroundPosition: `50% ${Date.now() * (speed * 0.001)}px`,
              opacity: styles.gridOpacity
            }}>
       </div>

       {/* Map Vector Layer */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow-headlight" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-accident" x="-50%" y="-50%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="radar-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
               <stop offset="0%" stopColor={accentColor} stopOpacity="0.4"/>
               <stop offset="100%" stopColor={accentColor} stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* RADAR SCANNER EFFECT */}
          <g transform="translate(500, 300)">
            <circle r="400" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.1" />
            <circle r="250" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
            <path d="M0,0 L0,-400 A400,400 0 0,1 100,-380 Z" fill="url(#radar-gradient)">
               <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Roads */}
          <path d={mainRoadPath} stroke={styles.roadStroke} strokeWidth="82" fill="none" className="transition-colors duration-700" />
          <path d={crossRoadPath} stroke={styles.roadStroke} strokeWidth="62" fill="none" className="transition-colors duration-700" />
          <path d={mainRoadPath} stroke={styles.road} strokeWidth="80" fill="none" className="transition-colors duration-700" />
          <path d={crossRoadPath} stroke={styles.road} strokeWidth="60" fill="none" className="transition-colors duration-700" />

          {/* Traffic Overlay */}
          <path
            d={mainRoadPath}
            stroke={mainTrafficStyle.color}
            strokeWidth={mainTrafficStyle.width}
            fill="none"
            strokeDasharray={mainTrafficStyle.dash}
            className="transition-all duration-1000 ease-in-out"
            style={{ opacity: mainTrafficStyle.opacity }}
          />

          {/* Traffic Simulation */}
          {renderTrafficStream(mainRoadPath, mainRoadDensity, mainTrafficStyle.color === '#ef4444' ? '#ff3333' : '#ffffff', 'main-fwd')}
          {renderTrafficStream(mainRoadPathReverse, mainRoadDensity, '#ff0000', 'main-rev', true)}
          {renderTrafficStream(crossRoadPath, crossRoadDensity, crossTrafficStyle.color === '#ef4444' ? '#ff9999' : '#ffffff', 'cross')}

          {/* POIs */}
          {pois.map(poi => (
             <g key={poi.id} transform={`translate(${poi.x}, ${poi.y})`} className="animate-[bounce_2s_infinite]">
                <circle r="12" fill={styles.bg} stroke={accentColor} strokeWidth="2" opacity="0.8" />
                {poi.type === 'CHARGER' && <path d="M-2,-5 L2,-5 L2,0 L5,0 L-1,6 L-1,1 L-4,1 Z" fill={accentColor} transform="translate(0, 0)" />}
                {poi.type === 'PARKING' && <text x="0" y="4" textAnchor="middle" fill={accentColor} fontSize="10" fontWeight="bold">P</text>}
                {poi.type === 'COFFEE' && <path d="M-4,-2 L4,-2 L3,4 L-3,4 Z" fill={accentColor} />}
             </g>
          ))}

          {/* Nav Route Line */}
          <path
            d={mainRoadPath}
            stroke={accentColor}
            strokeWidth={routeSteps.length > 0 ? "4" : "0"}
            fill="none"
            strokeDasharray="12 6"
            className="transition-all duration-500"
            opacity={routeSteps.length > 0 ? "0.9" : "0"}
          >
             <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Accident Markers */}
          {accident && (
            <g transform={`translate(${accident.road === 'MAIN' ? 450 : 500}, ${accident.road === 'MAIN' ? 450 : 300})`}>
               <circle r="40" fill="blue" opacity="0.3" filter="url(#glow-accident)">
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="0.5s" repeatCount="indefinite" />
               </circle>
               <circle r="40" fill="red" opacity="0.3" filter="url(#glow-accident)">
                  <animate attributeName="opacity" values="0;0.6;0" dur="0.5s" repeatCount="indefinite" />
               </circle>
               <circle r="15" fill="#111" stroke="#fff" strokeWidth="2" />
               <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">!</text>
            </g>
          )}

       </svg>

       {/* Weather Layers */}
       {weather === 'RAIN' && (
          <div className="absolute inset-0 pointer-events-none z-30">
             <canvas ref={canvasRef} className="w-full h-full opacity-40"></canvas>
          </div>
       )}
       {weather === 'FOG' && (
          <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-1000"
               style={{
                  background: 'linear-gradient(to top, rgba(20,20,30,0.9), transparent)',
                  backdropFilter: 'blur(4px)'
               }}>
          </div>
       )}

       {/* Car Marker */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[36px] drop-shadow-2xl transition-colors duration-500"
               style={{ borderBottomColor: '#ffffff' }}></div>
          <div className="absolute -inset-16 rounded-full border animate-[ping_2.5s_linear_infinite] transition-colors duration-500"
               style={{ borderColor: accentColor, opacity: 0.3 }}></div>
       </div>

       {/* Weather Alert */}
       {weatherAlertVisible && (weather === 'RAIN' || weather === 'FOG') && (
           <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-red-900/90 backdrop-blur-xl border border-red-500/50 text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] max-w-sm w-full">
               <div className="p-3 bg-red-500/20 rounded-full animate-pulse shrink-0">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                   </svg>
               </div>
               <div className="flex-1">
                   <h3 className="font-bold text-lg tracking-wider text-red-100">
                      {weather === 'RAIN' ? 'ŞİDDETLİ YAĞIŞ' : 'YOĞUN SİS'}
                   </h3>
                   <p className="text-xs text-red-200/70 leading-tight">Görüş mesafesi düştü. Takip mesafesini koruyun.</p>
               </div>
               <button
                  onClick={(e) => { e.stopPropagation(); setWeatherAlertVisible(false); }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
               >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
           </div>
       )}

       {/* Destination Marker */}
       {destination && (
         <div
           className="absolute z-50 pointer-events-none -ml-6 -mt-6"
           style={{ left: destination.x, top: destination.y }}
         >
            <div className="w-12 h-12 rounded-full border-2 animate-ping" style={{ borderColor: accentColor }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
            {routeSteps.length > 0 && !isCalculating && (
               <div className={`absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap px-3 py-1 rounded bg-black text-white text-xs font-bold border border-white/20`}>
                  HEDEF
               </div>
            )}
         </div>
       )}

       {/* Navigation Overlay - Moved down to avoid overlap with dashboard vehicle info */}
       <div className="absolute top-20 left-6 z-10 max-h-[60%] flex flex-col gap-3">

          {isCalculating && (
             <div className={`backdrop-blur-xl p-4 rounded-2xl border ${styles.cardBg}`} style={{ borderColor: accentColor }}>
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: accentColor, borderTopColor: 'transparent' }}></div>
                    <span className={`text-sm font-bold ${styles.textMain}`}>Rota Hesaplanıyor...</span>
                 </div>
             </div>
          )}

          {!isCalculating && routeSteps.length > 0 && (
             <>
                <div className={`backdrop-blur-xl p-6 rounded-2xl border-l-4 shadow-2xl min-w-[300px] ${styles.cardBg}`} style={{ borderColor: accentColor }}>
                   <div className="flex justify-between items-start mb-4">
                      <div className={`text-5xl font-bold ${styles.textMain}`}>
                         {routeSteps[0].dist.split(' ')[0]} <span className={`text-lg font-normal ${styles.textSub}`}>{routeSteps[0].dist.split(' ')[1]}</span>
                      </div>
                      <div className={`p-3 rounded-lg bg-white/10`} style={{ color: accentColor }}>
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {getActionIcon(routeSteps[0].action)}
                         </svg>
                      </div>
                   </div>
                   <div className={`text-xl font-bold tracking-wide truncate ${styles.textMain}`}>{routeSteps[0].street}</div>

                   <div className="w-full h-1.5 bg-gray-700/30 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-current w-1/3" style={{ color: accentColor }}></div>
                   </div>
                </div>

                <div className="flex flex-col gap-2 overflow-hidden">
                   {routeSteps.slice(1).map((step) => (
                      <div key={step.id} className={`backdrop-blur-md p-3 rounded-xl border-l-2 flex items-center gap-4 ${styles.cardBg} opacity-80`} style={{ borderColor: 'gray' }}>
                          <div className="text-gray-400 scale-75">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {getActionIcon(step.action)}
                             </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className={`text-sm font-bold truncate ${styles.textMain}`}>{step.street}</div>
                             <div className={`text-xs ${styles.textSub}`}>sonra {step.dist}</div>
                          </div>
                      </div>
                   ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setRouteSteps([]); setDestination(null); }}
                  className="mt-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold transition-colors w-fit"
                >
                   ROTAYI İPTAL ET
                </button>
             </>
          )}

          {!isCalculating && routeSteps.length === 0 && (
             <div className={`backdrop-blur-md px-6 py-4 rounded-xl border flex items-center gap-4 transition-all ${styles.cardBg}`}>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center animate-pulse border-white/20`}>
                   <div className={`w-2 h-2 rounded-full bg-white`}></div>
                </div>
                <div>
                   <div className={`text-xs font-bold tracking-widest ${styles.textMain}`}>HEDEF SEÇİN</div>
                   <div className={`text-[10px] ${styles.textSub}`}>Rota oluşturmak için haritaya dokunun</div>
                </div>
             </div>
          )}
       </div>

       {/* Weather & Traffic Status - Moved to avoid overlap with dashboard UI */}
       <div className="absolute top-20 right-6 z-10 flex flex-col items-end gap-2 pointer-events-none">
          <div className={`backdrop-blur border px-4 py-2 rounded-full flex items-center gap-3 transition-all duration-1000 ${styles.cardBg}`}>
             {weather === 'RAIN' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><path d="M20 16.2A4.5 4.5 0 0 0 21.4 8 7 7 0 0 0 8 3a6 6 0 0 0-4.6 10.4"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line></svg>}
             {weather === 'FOG' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M5 6h14M5 10h14M5 14h14M5 18h14"></path></svg>}
             {weather === 'CLEAR' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>}

             <span className={`text-xs font-bold tracking-wider ${styles.textMain}`}>
                {weather === 'RAIN' ? 'YAĞMURLU' : weather === 'FOG' ? 'SİSLİ' : 'AÇIK'}
             </span>
          </div>

          <div className={`backdrop-blur border px-4 py-2 rounded-full flex flex-col items-end gap-1 transition-colors duration-1000 ${styles.cardBg}`} style={{ borderColor: mainTrafficStyle.color }}>
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: mainTrafficStyle.color }}></div>
                 <span className={`text-xs font-bold tracking-wider ${styles.textMain}`}>TRAFİK: <span style={{ color: mainTrafficStyle.color }}>{mainTrafficStyle.label}</span></span>
             </div>
             <div className={`text-[10px] font-mono ${styles.textSub}`}>SAAT: {simulatedHour.toString().padStart(2, '0')}:00</div>
             {accident && (
                <div className="text-[10px] font-bold text-red-500 animate-pulse uppercase">
                   ⚠️ {accident.type === 'ACCIDENT' ? 'KAZA BİLDİRİLDİ' : 'YOL ÇALIŞMASI'}
                </div>
             )}
          </div>
       </div>

    </div>
  );
}
