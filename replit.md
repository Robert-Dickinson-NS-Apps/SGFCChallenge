# SG to Forest City - Grab Car Route Planner

## Overview

SG to Forest City is a web application that helps users plan Grab car rides from Singapore (Orchard Road) to Forest City Marina Hotel in Malaysia. The app provides route comparisons via the Johor-Singapore Causeway and the Malaysia-Singapore Second Link, showing border checkpoints, estimated travel times, and approximate Grab fare estimates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with development server integration
- **Styling**: Tailwind CSS with green/Grab-themed color palette
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
   - Fare estimates for different Grab car services
   - Border checkpoint information for both routes
   - Educational facts about the Singapore-Malaysia border region

2. **Interactive Visualizations**
   - Route overview with distance, time, and fare estimates
   - Route selector for comparing Causeway vs Second Link
   - Google Maps embed for detailed driving directions
   - Custom SVG globe view showing both routes
   - Checkpoint timeline showing immigration stops

3. **UI Component Library**
   - Complete shadcn/ui implementation
   - Custom green/Grab-themed design system
   - Responsive design with mobile support
   - Interactive route selection cards

### Shared Schema (`shared/schema.ts`)
- Location coordinates (latitude, longitude, name)
- Route data with checkpoints array
- Checkpoint schema (name, country, type, description)
- Fare estimate schema (service, minFare, maxFare, currency)
- Route option schema for comparisons

## Routes Included

### Via Johor-Singapore Causeway
- Distance: 64 km (40 miles)
- Estimated time: ~75 minutes
- Checkpoints: Woodlands → Sultan Iskandar Building → JB City
- Notes: Historic route, passes through JB city center

### Via Malaysia-Singapore Second Link
- Distance: 45 km (28 miles)
- Estimated time: ~55 minutes
- Checkpoints: Tuas → Sultan Abu Bakar Complex → Gelang Patah
- Notes: Faster route, typically less congested

## Educational Content

The app includes real facts about:
- Johor-Singapore Causeway (built 1924, 1.056 km, 350,000 daily travelers)
- Johor Strait geography (50 km long, 8-12 m deep)
- Malaysia-Singapore Second Link (opened 1998)
- Forest City development and Marina Hotel
- Cross-border travel tips

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

- **January 2026**: Changed from running calculator to Grab car route planner
- Added two route options (Causeway and Second Link)
- Added border checkpoint information with immigration details
- Added Grab fare estimates for different service levels
- Updated destination to Forest City Marina Hotel
- Added real educational facts about the Singapore-Malaysia border region
