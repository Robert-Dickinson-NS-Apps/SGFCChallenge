import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation } from "lucide-react";
import { START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";

interface TripPlannerProps {
  startPoint: string;
  destination: string;
  onStartPointChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export function TripPlanner({ startPoint, destination, onStartPointChange, onDestinationChange }: TripPlannerProps) {
  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-red-600" />
          Plan Your Trip
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
              Starting Point (Singapore)
            </label>
            <Select value={startPoint} onValueChange={onStartPointChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select starting point" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(START_POINTS).map(([key, point]) => (
                  <SelectItem key={key} value={key}>
                    {point.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1 text-blue-500" />
              Destination (Malaysia)
            </label>
            <Select value={destination} onValueChange={onDestinationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DESTINATIONS).map(([key, dest]) => (
                  <SelectItem key={key} value={key}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
              {START_POINTS[startPoint]?.name || 'Select start'}
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">
              <MapPin className="w-4 h-4 inline mr-1 text-blue-500" />
              {DESTINATIONS[destination]?.name || 'Select destination'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
