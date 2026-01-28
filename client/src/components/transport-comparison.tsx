import { Card, CardContent } from "@/components/ui/card";
import { Bus, Car, Clock, DollarSign, Info } from "lucide-react";
import { PUBLIC_TRANSPORT_OPTIONS, ROUTES, getAdjustedDistance, calculateFareEstimates } from "@/lib/distance-calculator";

interface TransportComparisonProps {
  selectedRoute: 'causeway' | 'secondLink';
  startPoint: string;
  destination: string;
}

export function TransportComparison({ selectedRoute, startPoint, destination }: TransportComparisonProps) {
  const { distanceKm, estimatedMinutes } = getAdjustedDistance(selectedRoute, startPoint, destination);
  const fareEstimates = calculateFareEstimates(distanceKm, estimatedMinutes);
  const grabFare = fareEstimates[0];

  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bus className="w-5 h-5 mr-2 text-blue-600" />
          Compare Transport Options
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Compare Grab with public transport options for crossing the Singapore-Malaysia border.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Transport</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Cost</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-700 hidden md:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 bg-red-50">
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <Car className="w-4 h-4 mr-2 text-red-600" />
                    <span className="font-medium">GrabCar</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-red-600 font-semibold">S${grabFare.minFare}-${grabFare.maxFare}</span>
                </td>
                <td className="py-3 px-2">~{estimatedMinutes} min</td>
                <td className="py-3 px-2 text-gray-500 hidden md:table-cell">Door-to-door, most convenient</td>
              </tr>
              
              {PUBLIC_TRANSPORT_OPTIONS.map((option, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <Bus className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <span className="font-medium block">{option.name}</span>
                        <span className="text-xs text-gray-500">{option.route}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-green-600 font-medium">{option.cost}</span>
                  </td>
                  <td className="py-3 px-2">{option.duration}</td>
                  <td className="py-3 px-2 text-gray-500 hidden md:table-cell">{option.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-start">
              <Car className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Choose Grab if:</p>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  <li>• You value convenience and comfort</li>
                  <li>• Traveling with luggage or in a group</li>
                  <li>• Need door-to-door service</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Bus className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Choose Bus if:</p>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  <li>• You're on a tight budget</li>
                  <li>• Traveling light and flexible on time</li>
                  <li>• Going to JB city center only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <Info className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Note: Public bus options are primarily for reaching JB city center. For Forest City, you may need additional transport from JB.
              Grab offers direct door-to-door service including to Forest City.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
