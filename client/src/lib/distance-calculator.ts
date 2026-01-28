import { Location, Route, Checkpoint, FareEstimate, RouteOption } from "@shared/schema";

// Convert miles to kilometers
export function milesToKm(miles: number): number {
  return miles * 1.60934;
}

// Convert km to miles
export function kmToMiles(km: number): number {
  return km / 1.60934;
}

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

// Calculate Grab fare estimates
export function calculateFareEstimates(distanceKm: number, estimatedMinutes: number): FareEstimate[] {
  // Base fare calculations (approximate Grab cross-border rates)
  const baseFareSGD = 15; // Base cross-border fare
  const perKmRate = 0.75; // SGD per km
  const perMinRate = 0.25; // SGD per minute
  
  const baseCost = baseFareSGD + (distanceKm * perKmRate) + (estimatedMinutes * perMinRate);
  
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
