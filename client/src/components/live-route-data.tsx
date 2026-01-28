import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Clock, Route, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";

interface LiveRouteDataProps {
  selectedRoute: 'causeway' | 'secondLink';
  startPoint: string;
  destination: string;
  customStart?: { name: string; lat: number; lng: number } | null;
  customDestination?: { name: string; lat: number; lng: number } | null;
}

interface RouteInfo {
  distance: {
    text: string;
    meters: number;
    km: number;
  };
  duration: {
    text: string;
    seconds: number;
    minutes: number;
  };
  durationInTraffic: {
    text: string;
    seconds: number;
    minutes: number;
  } | null;
}

export function LiveRouteData({ selectedRoute, startPoint, destination, customStart, customDestination }: LiveRouteDataProps) {
  const start = customStart || START_POINTS[startPoint] || START_POINTS.orchard;
  const dest = customDestination || DESTINATIONS[destination] || DESTINATIONS.forestCity;
  
  const waypoint = selectedRoute === 'causeway' 
    ? 'Woodlands Checkpoint, Singapore' 
    : 'Tuas Checkpoint, Singapore';

  const originStr = customStart 
    ? `${start.lat},${start.lng}` 
    : `${start.name}, Singapore`;
  
  const destStr = customDestination 
    ? `${dest.lat},${dest.lng}` 
    : `${dest.name}, Malaysia`;

  const { data, isLoading, error, refetch, isFetching } = useQuery<RouteInfo>({
    queryKey: ['/api/route-info', originStr, destStr, waypoint],
    queryFn: async () => {
      const params = new URLSearchParams({
        origin: originStr,
        destination: destStr,
        waypoint: waypoint
      });
      const response = await fetch(`/api/route-info?${params}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to fetch route info');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1
  });

  const getTrafficCondition = () => {
    if (!data?.durationInTraffic || !data.duration) return null;
    const delay = data.durationInTraffic.minutes - data.duration.minutes;
    if (delay <= 5) return { label: "Light traffic", color: "text-green-600", bg: "bg-green-50" };
    if (delay <= 15) return { label: "Moderate traffic", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (delay <= 30) return { label: "Heavy traffic", color: "text-orange-600", bg: "bg-orange-50" };
    return { label: "Severe delays", color: "text-red-600", bg: "bg-red-50" };
  };

  const trafficCondition = getTrafficCondition();

  if (error) {
    return (
      <Card className="border-orange-200 bg-orange-50 mb-6">
        <CardContent className="p-4">
          <div className="flex items-start text-orange-700">
            <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Live traffic data unavailable</p>
              <p className="text-xs mt-1">
                To enable live data, enable the "Routes API" in your Google Cloud Console. 
                The app will use estimated values in the meantime.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Live Route Data
          </h3>
          <button 
            onClick={() => refetch()} 
            disabled={isFetching}
            className="text-sm text-red-600 hover:text-red-700 flex items-center disabled:opacity-50"
          >
            {isFetching ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <TrendingUp className="w-4 h-4 mr-1" />
            )}
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            <span className="ml-3 text-gray-600">Fetching live traffic data...</span>
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center text-gray-600 mb-1">
                <Route className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Distance</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{data.distance.km} km</p>
              <p className="text-sm text-gray-500">{data.distance.text}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Base Duration</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{data.duration.minutes} min</p>
              <p className="text-sm text-gray-500">{data.duration.text}</p>
            </div>

            <div className={`rounded-lg p-4 border ${trafficCondition?.bg || 'bg-gray-50'} border-gray-100`}>
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">With Current Traffic</span>
              </div>
              {data.durationInTraffic ? (
                <>
                  <p className="text-2xl font-bold text-gray-800">{data.durationInTraffic.minutes} min</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{data.durationInTraffic.text}</p>
                    {trafficCondition && (
                      <span className={`text-xs font-medium ${trafficCondition.color}`}>
                        {trafficCondition.label}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Not available</p>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            <strong>Live data:</strong> Travel times update based on current traffic conditions from Google Maps. 
            Border crossing wait times are not included—check the live cameras below for checkpoint queues.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
