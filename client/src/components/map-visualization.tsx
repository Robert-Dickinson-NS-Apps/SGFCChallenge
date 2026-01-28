import { Card, CardContent } from "@/components/ui/card";
import { Navigation, ExternalLink } from "lucide-react";
import { ROUTES, START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";
import { cn } from "@/lib/utils";

interface MapVisualizationProps {
  selectedRoute: 'causeway' | 'secondLink';
  onRouteChange: (route: 'causeway' | 'secondLink') => void;
  startPoint: string;
  destination: string;
}

export function MapVisualization({ selectedRoute, onRouteChange, startPoint, destination }: MapVisualizationProps) {
  const start = START_POINTS[startPoint] || START_POINTS.orchard;
  const dest = DESTINATIONS[destination] || DESTINATIONS.forestCity;

  const getMapUrl = () => {
    const centerLat = (start.lat + dest.lat) / 2;
    const centerLng = (start.lng + dest.lng) / 2;
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d150000!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg`;
  };

  const getDirectionsUrl = () => {
    const waypoint = selectedRoute === 'causeway' ? 'Woodlands+Checkpoint+Singapore' : 'Tuas+Checkpoint+Singapore';
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start.name + ', Singapore')}&destination=${encodeURIComponent(dest.name + ', Malaysia')}&waypoints=${waypoint}&travelmode=driving`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-800">Interactive Route Map</h3>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Click to explore
                </span>
              </div>
              <a 
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-full font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Navigate Now
              </a>
            </div>
            
            <div className="relative bg-gray-50 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              <div className="w-full h-full">
                <iframe
                  src={getMapUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-800 flex items-center">
                    <Navigation className="w-4 h-4 mr-2 text-red-600" />
                    {ROUTES[selectedRoute].name}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    From: {start.name} → To: {dest.name}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {/* Route Selector */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h3>
            <div className="space-y-3">
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedRoute === 'secondLink' 
                    ? "bg-red-600 text-white border-red-600" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                )}
                onClick={() => onRouteChange('secondLink')}
              >
                <div>
                  <p className={cn("font-medium", selectedRoute === 'secondLink' ? "text-white" : "text-gray-800")}>
                    Second Link
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600")}>
                    via Tuas (Faster)
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", selectedRoute === 'secondLink' ? "text-white" : "text-gray-800")}>
                    {ROUTES.secondLink.distanceKm} km
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600")}>
                    ~{ROUTES.secondLink.estimatedMinutes} min
                  </p>
                </div>
              </div>
              
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedRoute === 'causeway' 
                    ? "bg-red-600 text-white border-red-600" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                )}
                onClick={() => onRouteChange('causeway')}
              >
                <div>
                  <p className={cn("font-medium", selectedRoute === 'causeway' ? "text-white" : "text-gray-800")}>
                    Causeway
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600")}>
                    via Woodlands
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", selectedRoute === 'causeway' ? "text-white" : "text-gray-800")}>
                    {ROUTES.causeway.distanceKm} km
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600")}>
                    ~{ROUTES.causeway.estimatedMinutes} min
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Route Info */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                {ROUTES[selectedRoute].description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <span className="text-gray-600">Singapore Immigration</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-gray-600">Malaysia Immigration</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
