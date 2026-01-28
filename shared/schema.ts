import { z } from "zod";

// Location schema for geographic coordinates
export const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
});

// Checkpoint schema for border crossings
export const checkpointSchema = z.object({
  name: z.string(),
  country: z.enum(['Singapore', 'Malaysia']),
  type: z.enum(['immigration', 'customs', 'waypoint']),
  description: z.string().optional(),
});

// Route data schema
export const routeSchema = z.object({
  start: locationSchema,
  end: locationSchema,
  distance: z.number(), // in km
  distanceKm: z.number(), // in kilometers
  routeType: z.enum(['causeway', 'secondLink']).optional(),
  checkpoints: z.array(checkpointSchema).optional(),
});

// Fare estimate schema
export const fareEstimateSchema = z.object({
  service: z.string(),
  minFare: z.number(),
  maxFare: z.number(),
  currency: z.string(),
  estimatedMinutes: z.number(),
});

// Educational fact schema
export const factSchema = z.object({
  title: z.string(),
  description: z.string(),
  source: z.string().optional(),
});

// Route comparison
export const routeOptionSchema = z.object({
  name: z.string(),
  distance: z.number(),
  distanceKm: z.number(),
  estimatedMinutes: z.number(),
  checkpoints: z.array(checkpointSchema),
  description: z.string(),
});

export type Location = z.infer<typeof locationSchema>;
export type Checkpoint = z.infer<typeof checkpointSchema>;
export type Route = z.infer<typeof routeSchema>;
export type FareEstimate = z.infer<typeof fareEstimateSchema>;
export type Fact = z.infer<typeof factSchema>;
export type RouteOption = z.infer<typeof routeOptionSchema>;
