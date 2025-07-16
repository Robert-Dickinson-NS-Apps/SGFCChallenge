import { Card, CardContent } from "@/components/ui/card";
import { Route, MapPin, Clock, Waves } from "lucide-react";
import { getRouteData, calculateRunningTimes } from "@/lib/distance-calculator";

export function RouteOverview() {
  const routeData = getRouteData();
  const runningTimes = calculateRunningTimes(routeData.distance);
  const averageSpeed = runningTimes.find(speed => speed.name === 'Average Run');

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-ocean-800 mb-2">Singapore to Malaysia Run Challenge</h2>
        <p className="text-ocean-600 text-lg">Calculate your running time from Singapore to Forest City, Malaysia</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ocean-600 text-sm font-medium">Total Distance</p>
                <p className="text-2xl font-bold text-ocean-800">{Math.round(routeData.distance).toLocaleString()} miles</p>
                <p className="text-ocean-500 text-sm">{Math.round(routeData.distanceKm).toLocaleString()} kilometers</p>
              </div>
              <div className="bg-ocean-100 p-3 rounded-lg">
                <Route className="text-ocean-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ocean-600 text-sm font-medium">Estimated Time</p>
                <p className="text-2xl font-bold text-ocean-800">{averageSpeed?.days} days</p>
                <p className="text-ocean-500 text-sm">@ {averageSpeed?.mph} mph average</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="text-green-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ocean-600 text-sm font-medium">Route Type</p>
                <p className="text-2xl font-bold text-ocean-800">Short Distance</p>
                <p className="text-ocean-500 text-sm">Cross-border run</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Waves className="text-blue-500 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
