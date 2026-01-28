# SG to Forest City - Drive Route Planner

## Overview

SG to Forest City is a comprehensive web application that helps users plan trips from Singapore to Malaysia. The app provides route comparisons via the Johor-Singapore Causeway and the Malaysia-Singapore Second Link, showing border checkpoints, customizable fare calculations, multi-modal transport comparisons, and real-time traffic resources.

## User Preferences

- Preferred communication style: Simple, everyday language.
- Theme: Singapore national colors (red and white)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with development server integration
- **Styling**: Tailwind CSS with red/Singapore-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for data fetching and caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Development**: Full-stack development with Vite middleware integration

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with migrations support
- **Current Storage**: In-memory storage implementation (MemStorage class)

## Key Components

### Core Application Components
1. **Route Calculation Engine** (`client/src/lib/distance-calculator.ts`)
   - Two route options: Causeway (64 km) and Second Link (45 km)
   - Customizable fare calculator with adjustable rates
   - Multiple start points: Orchard Road, Changi Airport, Raffles Place, Marina Bay Sands
   - Multiple destinations: Forest City, JB Sentral, Legoland
   - Border checkpoint information for both routes
   - Public transport comparison data
   - Real-time checkpoint camera links

2. **Trip Planner** (`client/src/components/trip-planner.tsx`)
   - Customizable start and end points
   - Dynamic distance and time calculations

3. **Fare Calculator** (`client/src/components/fare-calculator.tsx`)
   - Transparent fare calculation with adjustable parameters
   - Base fare, per-km rate, and per-minute rate inputs
   - Calculation breakdown for user verification

4. **Transport Comparison** (`client/src/components/transport-comparison.tsx`)
   - Grab vs public bus comparison
   - Cost, duration, and convenience factors
   - Recommendations based on travel needs

5. **Checkpoint Resources** (`client/src/components/checkpoint-resources.tsx`)
   - Links to live traffic cameras (LTA)
   - Crowdsourced border wait times
   - Peak hours warnings and travel tips

6. **Interactive Visualizations**
   - Route overview with distance, time, and checkpoints
   - Google Maps embed with "Open in Google Maps" link
   - Custom SVG globe view showing both routes
   - Immigration arrival card links (SGAC and MDAC)

### Shared Schema (`shared/schema.ts`)
- Location coordinates (latitude, longitude, name)
- Route data with checkpoints array
- Checkpoint schema (name, country, type, description)
- Fare estimate schema (service, minFare, maxFare, currency)
- Route option schema for comparisons

## Routes Included

### Via Johor-Singapore Causeway
- Distance: 64 km (40 miles) from Orchard Road
- Estimated time: ~75 minutes
- Checkpoints: Woodlands → Sultan Iskandar Building → JB City
- Notes: Historic route, passes through JB city center

### Via Malaysia-Singapore Second Link
- Distance: 45 km (28 miles) from Orchard Road
- Estimated time: ~55 minutes
- Checkpoints: Tuas → Sultan Abu Bakar Complex → Gelang Patah
- Notes: Faster route, typically less congested (recommended)

## External Resources Linked

### Immigration Arrival Cards
- Singapore Arrival Card (SGAC): https://eservices.ica.gov.sg/sgarrivalcard/
- Malaysia Digital Arrival Card (MDAC): https://imigresen-online.imi.gov.my/mdac/main

### Traffic & Border Info
- LTA Woodlands Checkpoint Camera
- LTA Tuas Checkpoint Camera
- Beat The Jam (crowdsourced wait times)
- One Motoring Traffic Info

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Data fetching and caching
- **wouter**: Lightweight routing

### UI/UX Libraries
- **@radix-ui/***: Accessible UI primitives
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for creating variant-based components

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reload
- **Production**: `NODE_ENV=production` with optimized builds

### Scripts
- `npm run dev`: Development server with TypeScript compilation
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup

## Recent Changes

- **January 2026**: Major upgrade to comprehensive route planner
  - Added customizable start/end points (Orchard, Changi, Raffles, Marina Bay)
  - Added transparent fare calculator with adjustable rates
  - Added multi-modal transport comparison (Grab vs bus)
  - Added live traffic camera and border wait time links
  - Added immigration arrival card links (SGAC, MDAC)
  - Changed theme from green/Grab to red/Singapore national colors
  - Added "Open in Google Maps" link for detailed directions
