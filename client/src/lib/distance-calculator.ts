import { Location, Route, Speed } from "@shared/schema";

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
    { name: 'Leisurely Jog', mph: 8 },
    { name: 'Average Run', mph: 10 },
    { name: 'Fast Run', mph: 12 }
  ];

  return speeds.map(speed => ({
    ...speed,
    hours: Math.round(distance / speed.mph),
    days: Math.round(distance / (speed.mph * 24))
  }));
}

// Get route data for Orchard Road Singapore to Forest City, Malaysia
export function getRouteData(): Route {
  const start: Location = { lat: 1.3041, lng: 103.8315, name: 'Orchard Road, Singapore' };
  const end: Location = { lat: 1.4259, lng: 103.7641, name: 'Forest City, Malaysia' };
  
  const distance = calculateDistance(start, end);
  const distanceKm = milesToKm(distance);

  return {
    start,
    end,
    distance,
    distanceKm
  };
}
