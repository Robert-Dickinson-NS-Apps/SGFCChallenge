import { Card, CardContent } from "@/components/ui/card";
import { Route, MapPin, Clock, Car, ArrowRight } from "lucide-react";
import { getRouteData, getRouteComparison, calculateFareEstimates, formatTravelTime, ROUTES } from "@/lib/distance-calculator";
import { cn } from "@/lib/utils";

interface RouteOverviewProps {
  selectedRoute: 'causeway' | 'secondLink';
  onRouteChange: (route: 'causeway' | 'secondLink') => void;
}

export function RouteOverview({ selectedRoute, onRouteChange }: RouteOverviewProps) {
  const routeData = getRouteData(selectedRoute);
  const comparison = getRouteComparison();
  const fareEstimates = calculateFareEstimates(routeData.distanceKm, ROUTES[selectedRoute].estimatedMinutes);

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Singapore to Forest City Marina Hotel</h2>
        <p className="text-gray-600 text-lg">Compare routes and estimate your Grab car fare</p>
      </div>
      
      {/* Route Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card 
          className={cn(
            "cursor-pointer transition-all border-2",
            selectedRoute === 'secondLink' 
              ? "border-green-500 bg-green-50" 
              : "border-gray-200 hover:border-green-300"
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
                <p className="font-bold text-green-600">{comparison.secondLink.distanceKm} km</p>
                <p className="text-sm text-gray-500">{formatTravelTime(comparison.secondLink.estimatedMinutes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={cn(
            "cursor-pointer transition-all border-2",
            selectedRoute === 'causeway' 
              ? "border-green-500 bg-green-50" 
              : "border-gray-200 hover:border-green-300"
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
                <p className="font-bold text-gray-700">{comparison.causeway.distanceKm} km</p>
                <p className="text-sm text-gray-500">{formatTravelTime(comparison.causeway.estimatedMinutes)}</p>
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
                <p className="text-2xl font-bold text-gray-800">{routeData.distanceKm} km</p>
                <p className="text-gray-500 text-sm">{Math.round(routeData.distance)} miles</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Route className="text-green-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Estimated Time</p>
                <p className="text-2xl font-bold text-gray-800">{formatTravelTime(ROUTES[selectedRoute].estimatedMinutes)}</p>
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

      {/* Fare Estimates */}
      <Card className="border-gray-200 mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Car className="w-5 h-5 mr-2 text-green-500" />
            Estimated Grab Fares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fareEstimates.map((fare) => (
              <div 
                key={fare.service}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <p className="font-medium text-gray-800">{fare.service}</p>
                <p className="text-2xl font-bold text-green-600">
                  ${fare.minFare} - ${fare.maxFare}
                </p>
                <p className="text-sm text-gray-500">{fare.currency}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            * Fare estimates are approximate and may vary based on traffic, demand, and actual route taken. 
            Cross-border Grab rides require booking through the app.
          </p>
        </CardContent>
      </Card>

      {/* Route Checkpoints */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Checkpoints</h3>
          <div className="space-y-3">
            {routeData.checkpoints?.map((checkpoint, index) => (
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
                {index < (routeData.checkpoints?.length || 0) - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
