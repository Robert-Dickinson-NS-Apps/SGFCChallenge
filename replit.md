# Ocean Runner - Running Distance Calculator

## Overview

Ocean Runner is a web application that calculates running times from Orchard Road, Singapore to Forest City, Malaysia. The app provides an interactive visualization of the route with fun facts, distance calculations, and estimated completion times for different running speeds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with development server integration
- **Styling**: Tailwind CSS with custom ocean-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for data fetching and caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **Development**: Full-stack development with Vite middleware integration

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with migrations support
- **Current Storage**: In-memory storage implementation (MemStorage class)
- **Schema**: User management schema defined but not actively used

## Key Components

### Core Application Components
1. **Route Calculation Engine** (`client/src/lib/distance-calculator.ts`)
   - Haversine formula for great circle distance calculation
   - Running time calculations for different speeds
   - Unit conversions (miles to kilometers)

2. **Interactive Visualizations**
   - Route overview with distance and time statistics
   - Map visualization with animated runner position
   - Globe view with 3D earth representation
   - Interesting facts about the Pacific Ocean route

3. **UI Component Library**
   - Complete shadcn/ui implementation
   - Custom ocean-themed design system
   - Responsive design with mobile support
   - Interactive elements (buttons, cards, tooltips)

### Shared Schema
- Location coordinates (latitude, longitude, name)
- Route data (start, end, distances in miles and kilometers)
- Speed calculations (name, mph, estimated days and hours)

## Data Flow

1. **Static Data**: Route coordinates and calculations are computed client-side
2. **Component Hierarchy**: 
   - App → Home page → Individual sections (Header, RouteOverview, MapVisualization, etc.)
3. **State Management**: React Query for any future API calls, local state for UI interactions
4. **Styling**: CSS variables for theming, Tailwind classes for layout

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Data fetching and caching
- **wouter**: Lightweight routing
- **date-fns**: Date manipulation utilities

### UI/UX Libraries
- **@radix-ui/***: Accessible UI primitives
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel functionality
- **class-variance-authority**: Utility for creating variant-based components

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations with `db:push` command

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reload
- **Production**: `NODE_ENV=production` with optimized builds
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `npm run dev`: Development server with TypeScript compilation
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

### Replit Integration
- Custom vite plugins for Replit environment
- Development banner integration
- Cartographer plugin for enhanced development experience

The application is designed as a single-page application with server-side rendering capabilities, though currently operating as a client-side application with a minimal Express backend ready for future API expansion.