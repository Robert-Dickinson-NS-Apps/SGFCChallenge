import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface RoutesApiResponse {
  routes?: Array<{
    distanceMeters: number;
    duration: string;
    staticDuration: string;
  }>;
  error?: {
    message: string;
    status: string;
  };
}

function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)s/);
  return match ? parseInt(match[1], 10) : 0;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
}

function formatDistance(meters: number): string {
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/route-info", async (req: Request, res: Response) => {
    try {
      const { origin, destination, waypoint } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination required" });
      }

      if (!GOOGLE_MAPS_API_KEY) {
        return res.status(500).json({ error: "Google Maps API key not configured" });
      }

      const intermediates = waypoint ? [{
        address: waypoint as string
      }] : [];

      const requestBody = {
        origin: {
          address: origin as string
        },
        destination: {
          address: destination as string
        },
        intermediates,
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "en-US",
        units: "METRIC"
      };

      const response = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.staticDuration"
          },
          body: JSON.stringify(requestBody)
        }
      );

      const data: RoutesApiResponse = await response.json();

      if (data.error) {
        return res.status(500).json({ error: "Failed to get route info", details: data.error });
      }

      if (!data.routes || data.routes.length === 0) {
        return res.status(500).json({ error: "No routes found" });
      }

      const route = data.routes[0];
      const distanceMeters = route.distanceMeters;
      const durationSeconds = parseDuration(route.duration);
      const staticDurationSeconds = parseDuration(route.staticDuration);

      res.json({
        distance: {
          text: formatDistance(distanceMeters),
          meters: distanceMeters,
          km: Math.round(distanceMeters / 1000)
        },
        duration: {
          text: formatDuration(staticDurationSeconds),
          seconds: staticDurationSeconds,
          minutes: Math.round(staticDurationSeconds / 60)
        },
        durationInTraffic: {
          text: formatDuration(durationSeconds),
          seconds: durationSeconds,
          minutes: Math.round(durationSeconds / 60)
        }
      });
    } catch (error) {
      console.error("Route info error:", error);
      res.status(500).json({ error: "Failed to fetch route information" });
    }
  });

  app.get("/api/places/autocomplete", async (req: Request, res: Response) => {
    try {
      const { input, types, components } = req.query;
      
      if (!input) {
        return res.status(400).json({ error: "Input required" });
      }

      if (!GOOGLE_MAPS_API_KEY) {
        return res.status(500).json({ error: "Google Maps API key not configured" });
      }

      const typesParam = types ? `&types=${types}` : '';
      const componentsParam = components ? `&components=${components}` : '';
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input as string)}${typesParam}${componentsParam}&key=${GOOGLE_MAPS_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error("Places autocomplete error:", error);
      res.status(500).json({ error: "Failed to fetch place suggestions" });
    }
  });

  app.get("/api/maps-key", (req: Request, res: Response) => {
    if (!GOOGLE_MAPS_API_KEY) {
      return res.status(500).json({ error: "Google Maps API key not configured" });
    }
    res.json({ key: GOOGLE_MAPS_API_KEY });
  });

  app.get("/api/places/details", async (req: Request, res: Response) => {
    try {
      const { place_id } = req.query;
      
      if (!place_id) {
        return res.status(400).json({ error: "Place ID required" });
      }

      if (!GOOGLE_MAPS_API_KEY) {
        return res.status(500).json({ error: "Google Maps API key not configured" });
      }

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry,formatted_address,name&key=${GOOGLE_MAPS_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error("Places details error:", error);
      res.status(500).json({ error: "Failed to fetch place details" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
