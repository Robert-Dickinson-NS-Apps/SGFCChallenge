import { Card, CardContent } from "@/components/ui/card";
import { Bus, Car, Clock, DollarSign, Info, ExternalLink, CarTaxiFront } from "lucide-react";
import { PUBLIC_TRANSPORT_OPTIONS, TAXI_OPTIONS, ROUTES, getAdjustedDistance, calculateFareEstimates } from "@/lib/distance-calculator";

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
          Compare All Transport Options
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Compare ride-hailing, taxis, and public buses for crossing the Singapore-Malaysia border. Click any option to book or check schedules.
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Car className="w-4 h-4 mr-2 text-green-600" />
            Ride-Hailing & Taxis (Door-to-Door)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TAXI_OPTIONS.map((option, index) => (
              <a
                key={index}
                href={option.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{option.name}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-lg font-bold text-green-600 mb-1">{option.cost}</div>
                <div className="text-sm text-gray-500 mb-2">{option.duration}</div>
                <div className="text-xs text-gray-400">{option.notes}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Bus className="w-4 h-4 mr-2 text-blue-600" />
            Public Buses (Budget Option)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Cost</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 hidden md:table-cell">Frequency</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-700">Book</th>
                </tr>
              </thead>
              <tbody>
                {PUBLIC_TRANSPORT_OPTIONS.map((option, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-blue-50">
                    <td className="py-3 px-3">
                      <div>
                        <span className="font-medium block text-gray-800">{option.name}</span>
                        <span className="text-xs text-gray-500">{option.route}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-blue-600 font-medium">{option.cost}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{option.duration}</td>
                    <td className="py-3 px-3 text-gray-500 hidden md:table-cell">{option.frequency}</td>
                    <td className="py-3 px-3 text-center">
                      <a
                        href={option.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Book
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start">
              <Car className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Best for Convenience</p>
                <p className="text-xs text-gray-600 mt-1">
                  Grab/Gojek - Door-to-door, no transfers, AC comfort
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Bus className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Best for Budget</p>
                <p className="text-xs text-gray-600 mt-1">
                  SBS 170 - Under S$3, but longer journey
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <CarTaxiFront className="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 text-sm">Best for Forest City</p>
                <p className="text-xs text-gray-600 mt-1">
                  KKKL Express - Direct bus to Forest City
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <Info className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              <strong>Tip:</strong> Most public buses only go to JB Sentral. For Forest City, consider KKKL Express (direct) or Grab/taxi from JB.
              Prices may vary during peak periods and holidays.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
