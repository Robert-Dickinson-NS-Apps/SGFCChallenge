import { Card, CardContent } from "@/components/ui/card";
import { Route, MapPin, Clock, ArrowRight, FileText, ExternalLink } from "lucide-react";
import { getRouteData, formatTravelTime, ROUTES, getAdjustedDistance, START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";
import { cn } from "@/lib/utils";

interface RouteOverviewProps {
  selectedRoute: 'causeway' | 'secondLink';
  onRouteChange: (route: 'causeway' | 'secondLink') => void;
  startPoint: string;
  destination: string;
}

export function RouteOverview({ selectedRoute, onRouteChange, startPoint, destination }: RouteOverviewProps) {
  const routeData = getRouteData(selectedRoute);
  const adjustedRoute = getAdjustedDistance(selectedRoute, startPoint, destination);
  const adjustedSecondLink = getAdjustedDistance('secondLink', startPoint, destination);
  const adjustedCauseway = getAdjustedDistance('causeway', startPoint, destination);
  const startName = START_POINTS[startPoint]?.name || 'Singapore';
  const destName = DESTINATIONS[destination]?.name || 'Forest City';

  // Create dynamic checkpoints based on selected start/destination
  const dynamicCheckpoints = routeData.checkpoints?.map((checkpoint, index) => {
    if (index === 0) {
      return { ...checkpoint, name: `${startName}, Singapore`, description: `Starting point in Singapore` };
    }
    if (index === (routeData.checkpoints?.length || 0) - 1) {
      return { ...checkpoint, name: destName, description: `Your destination in Malaysia` };
    }
    return checkpoint;
  });

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Drive Routes: {startName} to {destName}</h2>
        <p className="text-gray-600 text-lg">Compare routes and estimate your trip time</p>
      </div>
      
      {/* Route Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card 
          className={cn(
            "cursor-pointer transition-all border-2",
            selectedRoute === 'secondLink' 
              ? "border-red-600 bg-red-50" 
              : "border-gray-200 hover:border-red-300"
          )}
          onClick={() => onRouteChange('secondLink')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Via Second Link (Recommended)</p>
                <p className="text-sm text-gray-600">Tuas → Forest City</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{adjustedSecondLink.distanceKm} km</p>
                <p className="text-sm text-gray-500">{formatTravelTime(adjustedSecondLink.estimatedMinutes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "cursor-pointer transition-all border-2",
            selectedRoute === 'causeway' 
              ? "border-red-600 bg-red-50" 
              : "border-gray-200 hover:border-red-300"
          )}
          onClick={() => onRouteChange('causeway')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Via Causeway</p>
                <p className="text-sm text-gray-600">Woodlands → JB → Forest City</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-700">{adjustedCauseway.distanceKm} km</p>
                <p className="text-sm text-gray-500">{formatTravelTime(adjustedCauseway.estimatedMinutes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Distance</p>
                <p className="text-2xl font-bold text-gray-800">{adjustedRoute.distanceKm} km</p>
                <p className="text-gray-500 text-sm">{Math.round(adjustedRoute.distanceKm * 0.621)} miles</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Route className="text-red-600 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Estimated Time</p>
                <p className="text-2xl font-bold text-gray-800">{formatTravelTime(adjustedRoute.estimatedMinutes)}</p>
                <p className="text-gray-500 text-sm">Without heavy traffic</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="text-blue-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Border Crossings</p>
                <p className="text-2xl font-bold text-gray-800">2 Checkpoints</p>
                <p className="text-gray-500 text-sm">SG + MY Immigration</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <MapPin className="text-orange-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Checkpoints */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Checkpoints</h3>
          <div className="space-y-3">
            {dynamicCheckpoints?.map((checkpoint, index) => (
              <div key={index} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3",
                  checkpoint.type === 'immigration' ? "bg-red-500" : 
                  checkpoint.country === 'Singapore' ? "bg-red-400" : "bg-blue-500"
                )}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-800">{checkpoint.name}</p>
                    <span className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      checkpoint.country === 'Singapore' 
                        ? "bg-red-100 text-red-700" 
                        : "bg-blue-100 text-blue-700"
                    )}>
                      {checkpoint.country}
                    </span>
                    {checkpoint.type === 'immigration' && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Immigration
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{checkpoint.description}</p>
                </div>
                {index < (dynamicCheckpoints?.length || 0) - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Immigration Arrival Cards */}
      <Card className="border-gray-200 mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-500" />
            Required Arrival Cards
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Complete these digital forms within 3 days before your trip. Both are free and take about 5 minutes each.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://eservices.ica.gov.sg/sgarrivalcard/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-red-50 rounded-lg p-4 border border-red-200 hover:border-red-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Singapore Arrival Card (SGAC)</p>
                  <p className="text-sm text-gray-600">For returning to Singapore</p>
                  <p className="text-xs text-red-600 mt-1">Official ICA Website</p>
                </div>
                <ExternalLink className="w-5 h-5 text-red-500" />
              </div>
            </a>
            <a 
              href="https://imigresen-online.imi.gov.my/mdac/main" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-blue-50 rounded-lg p-4 border border-blue-200 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Malaysia Digital Arrival Card (MDAC)</p>
                  <p className="text-sm text-gray-600">For entering Malaysia</p>
                  <p className="text-xs text-blue-600 mt-1">Official Immigration Website</p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500" />
              </div>
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Singapore citizens are exempt from MDAC. Check official websites for full exemption details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
