import { Location, Route, Speed, HealthStats } from "@shared/schema";

// Calculate great circle distance between two points using Haversine formula
export function calculateDistance(start: Location, end: Location): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLon = (end.lng - start.lng) * Math.PI / 180;
  const lat1 = start.lat * Math.PI / 180;
  const lat2 = end.lat * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

// Convert miles to kilometers
export function milesToKm(miles: number): number {
  return miles * 1.60934;
}

// Calculate running times for different speeds
export function calculateRunningTimes(distance: number): Speed[] {
  const speeds = [
    { name: 'Leisurely Jog', mph: 5 },
    { name: 'Average Run', mph: 6 },
    { name: 'Fast Run', mph: 8 }
  ];

  return speeds.map(speed => {
    const totalMinutes = Math.round((distance / speed.mph) * 60);
    return {
      ...speed,
      hours: Math.round(totalMinutes / 60),
      days: totalMinutes,
      minutes: totalMinutes
    };
  });
}

// Calculate calories burned based on distance and pace
export function calculateHealthStats(distanceMiles: number, weightKg: number = 70): HealthStats {
  // Running burns approximately 100 calories per mile for a 155lb person
  // Adjusted by weight: (weight in kg / 70) * 100 calories per mile
  const caloriesPerMile = (weightKg / 70) * 100;
  const calories = Math.round(distanceMiles * caloriesPerMile);
  
  // Carbon savings: driving produces ~0.21 kg CO2 per km
  // Running produces essentially 0 (just increased breathing)
  const distanceKm = milesToKm(distanceMiles);
  const carbonSaved = Math.round(distanceKm * 0.21 * 10) / 10;
  
  // Hydration: approximately 500ml per 30 minutes of running
  // Average run speed of 6 mph = 10 min/mile
  const runningMinutes = distanceMiles * 10;
  const waterBottles = Math.ceil((runningMinutes / 30) * 0.5 / 0.5); // 500ml bottles
  
  return {
    calories,
    carbonSaved,
    waterBottles
  };
}

// Route data for different paths
export const ROUTES = {
  causeway: {
    name: 'Via Johor-Singapore Causeway',
    distance: 40, // miles (64 km actual road distance)
    distanceKm: 64,
    description: 'Historic route via the Johor-Singapore Causeway (built 1924)',
    waypoints: ['Orchard Road', 'Woodlands Checkpoint', 'Sultan Iskandar Building', 'Johor Bahru', 'Forest City']
  },
  secondLink: {
    name: 'Via Malaysia-Singapore Second Link',
    distance: 28, // miles (45 km - shorter for Forest City)
    distanceKm: 45,
    description: 'Faster route via Tuas Second Link (opened 1998)',
    waypoints: ['Orchard Road', 'Tuas Checkpoint', 'Second Link', 'Gelang Patah', 'Forest City']
  }
};

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
    title: "Forest City Development",
    description: "Forest City is a 30 sq km mixed-use development on 4 reclaimed islands in Johor. Started in 2014, it's designed as a car-free smart city with vertical gardens.",
    source: "Country Garden"
  },
  {
    title: "Historical Construction",
    description: "The Causeway cost 17 million Straits dollars (~$1.6 billion today) and employed 2,300+ workers. It was considered one of the greatest engineering works in the Far East at the time.",
    source: "Singapore National Library"
  },
  {
    title: "Climate Conditions",
    description: "Both Singapore and Malaysia share a tropical rainforest climate with temperatures of 27-32°C year-round. Expect high humidity (80-90%) and potential afternoon thunderstorms.",
    source: "Meteorological data"
  }
];

// Get route data for Orchard Road Singapore to Forest City, Malaysia
export function getRouteData(routeType: 'causeway' | 'secondLink' = 'secondLink'): Route {
  const start: Location = { lat: 1.3041, lng: 103.8315, name: 'Orchard Road, Singapore' };
  const end: Location = { lat: 1.4259, lng: 103.7641, name: 'Forest City, Malaysia' };
  
  const selectedRoute = ROUTES[routeType];

  return {
    start,
    end,
    distance: selectedRoute.distance,
    distanceKm: selectedRoute.distanceKm,
    routeType
  };
}

// Get both routes for comparison
export function getRouteComparison() {
  return {
    causeway: getRouteData('causeway'),
    secondLink: getRouteData('secondLink'),
    details: ROUTES
  };
}
