import { z } from "zod";

// Location schema for geographic coordinates
export const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
});

// Route data schema
export const routeSchema = z.object({
  start: locationSchema,
  end: locationSchema,
  distance: z.number(), // in miles
  distanceKm: z.number(), // in kilometers
  routeType: z.enum(['direct', 'causeway']).optional(),
});

// Speed calculation schema
export const speedSchema = z.object({
  name: z.string(),
  mph: z.number(),
  days: z.number(),
  hours: z.number(),
  minutes: z.number().optional(),
});

// Educational fact schema
export const factSchema = z.object({
  title: z.string(),
  description: z.string(),
  source: z.string().optional(),
});

// Calorie and carbon calculation
export const healthStatsSchema = z.object({
  calories: z.number(),
  carbonSaved: z.number(), // kg of CO2
  waterBottles: z.number(), // equivalent hydration needed
});

export type Location = z.infer<typeof locationSchema>;
export type Route = z.infer<typeof routeSchema>;
export type Speed = z.infer<typeof speedSchema>;
export type Fact = z.infer<typeof factSchema>;
export type HealthStats = z.infer<typeof healthStatsSchema>;
