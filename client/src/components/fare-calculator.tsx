import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Info, DollarSign } from "lucide-react";
import { calculateFareEstimates, DEFAULT_FARE_PARAMS, getAdjustedDistance, ROUTES } from "@/lib/distance-calculator";

interface FareCalculatorProps {
  selectedRoute: 'causeway' | 'secondLink';
  startPoint: string;
  destination: string;
}

export function FareCalculator({ selectedRoute, startPoint, destination }: FareCalculatorProps) {
  const [baseFare, setBaseFare] = useState(DEFAULT_FARE_PARAMS.baseFare);
  const [perKmRate, setPerKmRate] = useState(DEFAULT_FARE_PARAMS.perKmRate);
  const [perMinRate, setPerMinRate] = useState(DEFAULT_FARE_PARAMS.perMinRate);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { distanceKm, estimatedMinutes } = getAdjustedDistance(selectedRoute, startPoint, destination);
  const fareEstimates = calculateFareEstimates(distanceKm, estimatedMinutes, { baseFare, perKmRate, perMinRate });

  const resetToDefaults = () => {
    setBaseFare(DEFAULT_FARE_PARAMS.baseFare);
    setPerKmRate(DEFAULT_FARE_PARAMS.perKmRate);
    setPerMinRate(DEFAULT_FARE_PARAMS.perMinRate);
  };

  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-red-600" />
            Fare Calculator
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm"
          >
            {showAdvanced ? "Hide" : "Adjust"} Rates
          </Button>
        </div>

        {showAdvanced && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex items-start mb-3">
              <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                Adjust these rates based on current Grab pricing. Check the Grab app for the latest base fare and per-km rates for cross-border rides.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="baseFare" className="text-sm text-gray-700">Base Fare (SGD)</Label>
                <Input
                  id="baseFare"
                  type="number"
                  step="0.50"
                  min="0"
                  value={baseFare}
                  onChange={(e) => setBaseFare(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="perKmRate" className="text-sm text-gray-700">Per KM Rate (SGD)</Label>
                <Input
                  id="perKmRate"
                  type="number"
                  step="0.05"
                  min="0"
                  value={perKmRate}
                  onChange={(e) => setPerKmRate(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="perMinRate" className="text-sm text-gray-700">Per Min Rate (SGD)</Label>
                <Input
                  id="perMinRate"
                  type="number"
                  step="0.05"
                  min="0"
                  value={perMinRate}
                  onChange={(e) => setPerMinRate(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefaults}
              className="mt-3 text-gray-500"
            >
              Reset to defaults
            </Button>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Route: {ROUTES[selectedRoute].name}</span>
            <span className="font-medium text-gray-800">{distanceKm} km, ~{estimatedMinutes} min</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fareEstimates.map((fare) => (
            <div
              key={fare.service}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-red-300 transition-colors"
            >
              <p className="font-medium text-gray-800">{fare.service}</p>
              <p className="text-2xl font-bold text-red-600">
                <DollarSign className="w-5 h-5 inline -mt-1" />
                {fare.minFare} - ${fare.maxFare}
              </p>
              <p className="text-sm text-gray-500">{fare.currency}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>How fares are calculated:</strong> Base Fare (${baseFare}) + Distance ({distanceKm} km × ${perKmRate}/km) + Time ({estimatedMinutes} min × ${perMinRate}/min). 
            Actual fares vary based on demand, time of day, and traffic conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
