import { Location, Route, Checkpoint, FareEstimate, RouteOption } from "@shared/schema";

// Convert miles to kilometers
export function milesToKm(miles: number): number {
  return miles * 1.60934;
}

// Convert km to miles
export function kmToMiles(km: number): number {
  return km / 1.60934;
}

// Starting point options
export const START_POINTS: Record<string, { name: string; lat: number; lng: number; addKm: Record<string, number> }> = {
  orchard: { 
    name: 'Orchard Road', 
    lat: 1.3041, 
    lng: 103.8315,
    addKm: { causeway: 0, secondLink: 0 } // Base distances
  },
  changi: { 
    name: 'Changi Airport', 
    lat: 1.3644, 
    lng: 103.9915,
    addKm: { causeway: 15, secondLink: 35 } // Additional km from Changi
  },
  raffles: { 
    name: 'Raffles Place', 
    lat: 1.2840, 
    lng: 103.8517,
    addKm: { causeway: 2, secondLink: -3 } // Slight difference from CBD
  },
  marina: { 
    name: 'Marina Bay Sands', 
    lat: 1.2847, 
    lng: 103.8610,
    addKm: { causeway: 3, secondLink: -2 }
  },
  jurong: {
    name: 'Jurong East MRT',
    lat: 1.3329,
    lng: 103.7422,
    addKm: { causeway: 8, secondLink: -12 } // Closer to Tuas
  },
  woodlands: {
    name: 'Woodlands MRT',
    lat: 1.4370,
    lng: 103.7865,
    addKm: { causeway: -18, secondLink: 5 } // Very close to Causeway
  },
  tampines: {
    name: 'Tampines MRT',
    lat: 1.3545,
    lng: 103.9453,
    addKm: { causeway: 10, secondLink: 25 } // East side
  },
  sentosa: {
    name: 'Sentosa / VivoCity',
    lat: 1.2644,
    lng: 103.8220,
    addKm: { causeway: 5, secondLink: -8 } // South, closer to Tuas
  },
  bugis: {
    name: 'Bugis MRT',
    lat: 1.3009,
    lng: 103.8558,
    addKm: { causeway: 1, secondLink: -1 }
  },
  novena: {
    name: 'Novena MRT',
    lat: 1.3204,
    lng: 103.8439,
    addKm: { causeway: -2, secondLink: 2 }
  },
  harbourfront: {
    name: 'HarbourFront MRT',
    lat: 1.2653,
    lng: 103.8203,
    addKm: { causeway: 5, secondLink: -8 }
  },
  clementi: {
    name: 'Clementi MRT',
    lat: 1.3151,
    lng: 103.7654,
    addKm: { causeway: 6, secondLink: -10 }
  },
  punggol: {
    name: 'Punggol MRT',
    lat: 1.4052,
    lng: 103.9024,
    addKm: { causeway: 5, secondLink: 20 } // Northeast
  },
  serangoon: {
    name: 'Serangoon MRT',
    lat: 1.3498,
    lng: 103.8736,
    addKm: { causeway: 3, secondLink: 8 }
  }
};

// Destination options
export const DESTINATIONS: Record<string, { name: string; lat: number; lng: number; adjustKm: Record<string, number> }> = {
  forestCity: {
    name: 'Forest City Marina Hotel',
    lat: 1.4259,
    lng: 103.6319,
    adjustKm: { causeway: 0, secondLink: 0 }
  },
  jbCiq: {
    name: 'JB Sentral / CIQ',
    lat: 1.4617,
    lng: 103.7614,
    adjustKm: { causeway: -25, secondLink: 10 }
  },
  legoland: {
    name: 'Legoland Malaysia',
    lat: 1.4250,
    lng: 103.6287,
    adjustKm: { causeway: -5, secondLink: -2 }
  }
};

// Default fare calculation parameters (can be overridden by user)
export const DEFAULT_FARE_PARAMS = {
  baseFare: 15,
  perKmRate: 0.75,
  perMinRate: 0.25
};

// Checkpoints for Causeway route
const CAUSEWAY_CHECKPOINTS: Checkpoint[] = [
  { name: "Orchard Road, Singapore", country: "Singapore", type: "waypoint", description: "Starting point in Singapore's famous shopping district" },
  { name: "Woodlands Checkpoint", country: "Singapore", type: "immigration", description: "Singapore Immigration & Customs Authority checkpoint" },
  { name: "Johor-Singapore Causeway", country: "Singapore", type: "waypoint", description: "1.056 km causeway built in 1924, one of world's busiest border crossings" },
  { name: "Sultan Iskandar Building (CIQ)", country: "Malaysia", type: "immigration", description: "Malaysia Immigration checkpoint in Johor Bahru" },
  { name: "Johor Bahru City", country: "Malaysia", type: "waypoint", description: "Capital of Johor state, Malaysia" },
  { name: "Forest City Marina Hotel", country: "Malaysia", type: "waypoint", description: "Destination in Forest City development" }
];

// Checkpoints for Second Link route
const SECOND_LINK_CHECKPOINTS: Checkpoint[] = [
  { name: "Orchard Road, Singapore", country: "Singapore", type: "waypoint", description: "Starting point in Singapore's famous shopping district" },
  { name: "Tuas Checkpoint", country: "Singapore", type: "immigration", description: "Singapore Immigration at Tuas (less congested than Woodlands)" },
  { name: "Malaysia-Singapore Second Link", country: "Singapore", type: "waypoint", description: "1.92 km bridge opened in 1998, less traffic than Causeway" },
  { name: "Sultan Abu Bakar Complex (CIQ)", country: "Malaysia", type: "immigration", description: "Malaysia Immigration at Tanjung Kupang" },
  { name: "Gelang Patah", country: "Malaysia", type: "waypoint", description: "Town near Forest City" },
  { name: "Forest City Marina Hotel", country: "Malaysia", type: "waypoint", description: "Destination in Forest City development" }
];

// Route data for different paths
export const ROUTES: Record<string, RouteOption> = {
  causeway: {
    name: 'Via Johor-Singapore Causeway',
    distance: 40, // miles
    distanceKm: 64, // km - actual road distance
    estimatedMinutes: 75, // without traffic, with border crossing
    description: 'Historic route via the Johor-Singapore Causeway (built 1924). Longer route but passes through JB city center.',
    checkpoints: CAUSEWAY_CHECKPOINTS
  },
  secondLink: {
    name: 'Via Malaysia-Singapore Second Link',
    distance: 28, // miles
    distanceKm: 45, // km - shorter for Forest City
    estimatedMinutes: 55, // without traffic, with border crossing
    description: 'Faster route via Tuas Second Link (opened 1998). More direct to Forest City, usually less congested.',
    checkpoints: SECOND_LINK_CHECKPOINTS
  }
};

// Calculate Grab fare estimates with customizable parameters
export function calculateFareEstimates(
  distanceKm: number, 
  estimatedMinutes: number,
  params: { baseFare: number; perKmRate: number; perMinRate: number } = DEFAULT_FARE_PARAMS
): FareEstimate[] {
  const baseCost = params.baseFare + (distanceKm * params.perKmRate) + (estimatedMinutes * params.perMinRate);
  
  return [
    {
      service: "GrabCar",
      minFare: Math.round(baseCost * 0.9),
      maxFare: Math.round(baseCost * 1.1),
      currency: "SGD",
      estimatedMinutes
    },
    {
      service: "GrabCar Plus",
      minFare: Math.round(baseCost * 1.2),
      maxFare: Math.round(baseCost * 1.4),
      currency: "SGD",
      estimatedMinutes
    },
    {
      service: "GrabCar Premium",
      minFare: Math.round(baseCost * 1.5),
      maxFare: Math.round(baseCost * 1.8),
      currency: "SGD",
      estimatedMinutes
    }
  ];
}

// Public bus/transport options for comparison
export const PUBLIC_TRANSPORT_OPTIONS = [
  {
    name: "Causeway Link Bus",
    route: "CW1/CW2 from JB Sentral",
    cost: "RM 4.20 (~S$1.25)",
    duration: "45-90 min (varies with traffic)",
    frequency: "Every 15-30 min",
    notes: "Budget option, need to alight for immigration",
    bookingUrl: "https://www.causewaylink.com.my/",
    type: "bus"
  },
  {
    name: "SBS Transit 170",
    route: "Queen Street to JB Sentral",
    cost: "S$1.09 - S$2.29",
    duration: "60-120 min",
    frequency: "Every 8-15 min",
    notes: "Most affordable, crosses Causeway only",
    bookingUrl: "https://www.sbstransit.com.sg/",
    type: "bus"
  },
  {
    name: "Transtar Cross-Border",
    route: "Various SG pickups to JB",
    cost: "S$6 - S$10",
    duration: "60-90 min",
    frequency: "Scheduled departures",
    notes: "More comfortable, fewer stops",
    bookingUrl: "https://www.transtar.travel/",
    type: "bus"
  },
  {
    name: "KKKL Express",
    route: "Singapore to JB & Forest City",
    cost: "S$8 - S$15",
    duration: "75-120 min",
    frequency: "Multiple daily",
    notes: "Direct to Forest City available",
    bookingUrl: "https://www.kkkl.com.my/",
    type: "bus"
  }
];

// Taxi/ride-hailing alternatives
export const TAXI_OPTIONS = [
  {
    name: "Grab",
    cost: "S$60-100",
    duration: "45-75 min",
    notes: "Door-to-door, most convenient",
    bookingUrl: "https://grab.onelink.me/2695613898",
    type: "ridehail"
  },
  {
    name: "Gojek",
    cost: "S$55-95",
    duration: "45-75 min",
    notes: "Alternative to Grab, similar service",
    bookingUrl: "https://www.gojek.com/sg/",
    type: "ridehail"
  },
  {
    name: "ComfortDelGro Taxi",
    cost: "S$70-120",
    duration: "45-75 min",
    notes: "Traditional taxi, metered fare + surcharges",
    bookingUrl: "https://www.cdgtaxi.com.sg/",
    type: "taxi"
  }
];

// Border checkpoint resources
export const CHECKPOINT_RESOURCES = [
  {
    name: "Woodlands Checkpoint Camera",
    url: "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras/woodlands.html",
    type: "camera",
    description: "LTA live traffic camera at Woodlands"
  },
  {
    name: "Tuas Checkpoint Camera", 
    url: "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras/tuas.html",
    type: "camera",
    description: "LTA live traffic camera at Tuas"
  },
  {
    name: "Beat The Jam",
    url: "https://www.beatthejam.asia/",
    type: "crowdsourced",
    description: "Crowdsourced border wait times"
  },
  {
    name: "One Motoring Traffic Info",
    url: "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information.html",
    type: "official",
    description: "LTA Singapore traffic information"
  }
];

// Get adjusted distance based on start point and destination
export function getAdjustedDistance(
  routeType: 'causeway' | 'secondLink',
  startPoint: string = 'orchard',
  destination: string = 'forestCity'
): { distanceKm: number; estimatedMinutes: number } {
  const baseRoute = ROUTES[routeType];
  const start = START_POINTS[startPoint] || START_POINTS.orchard;
  const dest = DESTINATIONS[destination] || DESTINATIONS.forestCity;
  
  const addKm = start.addKm[routeType] || 0;
  const adjustKm = dest.adjustKm[routeType] || 0;
  
  const distanceKm = Math.max(10, baseRoute.distanceKm + addKm + adjustKm);
  const estimatedMinutes = Math.round(baseRoute.estimatedMinutes * (distanceKm / baseRoute.distanceKm));
  
  return { distanceKm, estimatedMinutes };
}

// Educational facts about the region
export const EDUCATIONAL_FACTS = [
  {
    title: "Johor-Singapore Causeway",
    description: "The 1.056 km causeway was built in 1924 using 2 million tonnes of granite from Pulau Ubin. It carries 350,000 travelers daily, making it one of the world's busiest border crossings.",
    source: "Historical records"
  },
  {
    title: "Johor Strait Geography", 
    description: "The Johor Strait is 50 km long and varies from 600 meters wide (at the Causeway) to 5 km wide. Its shallow depth of 8-12 meters connects the Malacca Strait to the Singapore Strait.",
    source: "Encyclopedia Britannica"
  },
  {
    title: "Singapore-Malaysia Border",
    description: "Since Singapore's separation from Malaysia in 1965, the Causeway has served as the main international border crossing. Water pipelines in the Causeway supply Singapore with treated water.",
    source: "National Archives"
  },
  {
    title: "Forest City Marina Hotel",
    description: "Located in the 30 sq km Forest City development on reclaimed islands. The marina hotel offers waterfront views and is part of a car-free smart city concept with vertical gardens.",
    source: "Country Garden"
  },
  {
    title: "Malaysia-Singapore Second Link",
    description: "The 1.92 km Second Link bridge opened in 1998, providing an alternative to the congested Causeway. It connects Tuas (Singapore) to Tanjung Kupang (Malaysia) and is often faster for reaching southern Johor.",
    source: "Land Transport Authority"
  },
  {
    title: "Cross-Border Travel Tips",
    description: "Peak hours are weekday mornings (7-9 AM) and evenings (5-8 PM). Weekends and public holidays see heavy traffic. The Second Link is typically less congested than the Causeway.",
    source: "ICA Singapore"
  }
];

// Get route data for a specific route type
export function getRouteData(routeType: 'causeway' | 'secondLink' = 'secondLink'): Route {
  const start: Location = { lat: 1.3041, lng: 103.8315, name: 'Orchard Road, Singapore' };
  const end: Location = { lat: 1.4259, lng: 103.6319, name: 'Forest City Marina Hotel, Malaysia' };
  
  const selectedRoute = ROUTES[routeType];

  return {
    start,
    end,
    distance: selectedRoute.distance,
    distanceKm: selectedRoute.distanceKm,
    routeType,
    checkpoints: selectedRoute.checkpoints
  };
}

// Get both routes for comparison
export function getRouteComparison() {
  return {
    causeway: ROUTES.causeway,
    secondLink: ROUTES.secondLink
  };
}

// Format travel time
export function formatTravelTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins} min`;
}
