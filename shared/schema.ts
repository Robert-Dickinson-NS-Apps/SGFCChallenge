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
});

// Speed calculation schema
export const speedSchema = z.object({
  name: z.string(),
  mph: z.number(),
  days: z.number(),
  hours: z.number(),
});

export type Location = z.infer<typeof locationSchema>;
export type Route = z.infer<typeof routeSchema>;
export type Speed = z.infer<typeof speedSchema>;
