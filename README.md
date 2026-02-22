# TurkOto - Intelligent Vehicle Assistant

> Real-time OBD-II vehicle diagnostics platform with voice control, predictive maintenance, and Turkey-specific automotive services.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io)](https://socket.io)
[![Three.js](https://img.shields.io/badge/Three.js-r168-049EF4?logo=three.js)](https://threejs.org)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

---

## Overview

TurkOto is an intelligent vehicle assistant platform purpose-built for the Turkish market. It combines real-time OBD-II telemetry at 100Hz sampling rate, multi-dialect voice recognition, and predictive maintenance intelligence to deliver a next-generation in-vehicle experience.

Unlike generic automotive platforms, TurkOto integrates Turkey-specific infrastructure services including HGS/OGS toll systems, live fuel price feeds, and traffic fine lookups. A 3D vehicle dashboard visualization provides an intuitive representation of vehicle health and system status.

---

## Architecture

```mermaid
graph TD
    subgraph "Vehicle Interface"
        A[OBD-II Port] -->|100Hz| B[Telemetry Engine]
        C[Microphone] --> D[Voice Recognition]
        D --> E[NLU Pipeline]
    end
    subgraph "Intelligence Core"
        B --> F[Diagnostic Analyzer]
        E --> G[Command Processor]
        F --> H[Predictive Maintenance]
        G --> I[Action Executor]
    end
    subgraph "Services"
        I --> J[Navigation Fusion]
        I --> K[HGS/OGS Tolls]
        I --> L[Fuel Prices]
        H --> M[30-Day Forecast]
    end
```

---

## Key Features

### Real-Time OBD-II Telemetry
- 100Hz sampling rate for real-time vehicle data streaming
- Full PID coverage: engine RPM, coolant temperature, throttle position, MAF sensor, O2 sensors, fuel trim
- DTC (Diagnostic Trouble Code) real-time detection and lookup
- 5,000+ fault code database with repair guidance
- Freeze frame data capture on fault events
- WebSocket streaming to dashboard

### Voice Recognition - Turkish Dialects
- 7 regional dialect support: Istanbul, Ankara, Izmir, Black Sea, Eastern, GAP, Aegean
- 99% recognition accuracy on in-vehicle noise conditions
- 50+ message context memory for natural multi-turn conversations
- Wake word activation (hands-free operation)
- Command categories: navigation, diagnostics, calls, media, vehicle controls

### Predictive Maintenance
- 30-day failure probability forecasting based on telemetry trends
- Component-level risk scoring: battery, brake pads, belts, filters, tires
- Service interval tracking with dealer network integration
- Maintenance history timeline
- Cost estimation for upcoming service items

### Navigation Fusion
- Combined routing from Google Maps, Yandex Maps, and Waze simultaneously
- Best-route selection based on real-time traffic conditions
- Turkey-specific routing: ferry terminals, toll gates, mountain pass conditions
- Offline map support for low-connectivity areas

### Turkey-Specific Services
- **HGS/OGS Integration**: Real-time toll balance and transaction history
- **Fuel Prices**: Live prices at 10,000+ stations across Turkey
- **Traffic Fines**: License plate lookup for outstanding violations
- **Vehicle Inspection**: TUVTURK appointment scheduling
- **Insurance**: Policy lookup and renewal reminders

### 3D Vehicle Dashboard
- Photorealistic 3D vehicle model with system overlays
- Interactive component inspection (click any part for status)
- Animated indicators for active alerts
- Powered by Three.js + React Three Fiber

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) |
| 3D Engine | Three.js + React Three Fiber |
| Real-time | Socket.io |
| Cache | Redis (ioredis) |
| Database | PostgreSQL + Prisma ORM |
| Maps | Google Maps API |
| Auth | NextAuth.js |
| Validation | Zod |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- npm

### Installation

```bash
git clone https://github.com/lydianai/otoail.ailydian.com.git
cd otoail.ailydian.com
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Required environment variables:
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=...
```

### Database Setup

```bash
npm run prisma:migrate
npm run prisma:seed
```

### Development

```bash
npm run dev
# Next.js + Socket.io server starts on http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
otoail.ailydian.com/
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Main vehicle dashboard
│   ├── (diagnostics)/      # OBD-II diagnostic views
│   ├── (services)/         # HGS, fuel, traffic pages
│   └── api/                # API routes
├── components/
│   ├── dashboard3d/        # Three.js vehicle visualization
│   ├── telemetry/          # OBD-II real-time displays
│   ├── voice/              # Voice recognition UI
│   └── maps/               # Navigation components
├── lib/
│   ├── obd/                # OBD-II protocol parsing
│   ├── voice/              # Speech recognition pipeline
│   ├── predictive/         # Maintenance forecasting
│   └── services/           # HGS, fuel, traffic APIs
├── prisma/                 # Database schema and migrations
├── server.js               # Custom server with Socket.io
└── types/                  # Shared TypeScript types
```

---

## Security

Security vulnerabilities should be reported privately. See [SECURITY.md](SECURITY.md) for our responsible disclosure policy.

---

## License

Copyright (c) 2024-2026 Lydian (AiLydian). All Rights Reserved.

This software is proprietary. See [LICENSE](LICENSE) for full terms.

---

## Contact

- Website: [https://www.ailydian.com](https://www.ailydian.com)
- Email: sardagemrah@gmail.com
