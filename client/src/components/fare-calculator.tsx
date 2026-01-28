import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Info, DollarSign, Clock, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { calculateFareEstimates, DEFAULT_FARE_PARAMS, getAdjustedDistance, ROUTES, START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";

interface FareCalculatorProps {
  selectedRoute: 'causeway' | 'secondLink';
  startPoint: string;
  destination: string;
}

function getCurrentPricingCondition(): { multiplier: number; label: string; isPeak: boolean } {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  
  if (isWeekend) {
    return { multiplier: 1.3, label: "Weekend (higher demand)", isPeak: true };
  }
  if (hour >= 7 && hour < 9) {
    return { multiplier: 1.5, label: "Morning rush hour", isPeak: true };
  }
  if (hour >= 17 && hour < 20) {
    return { multiplier: 1.4, label: "Evening rush hour", isPeak: true };
  }
  if (hour >= 22 || hour < 6) {
    return { multiplier: 1.2, label: "Late night surcharge", isPeak: true };
  }
  return { multiplier: 1.0, label: "Off-peak pricing", isPeak: false };
}

export function FareCalculator({ selectedRoute, startPoint, destination }: FareCalculatorProps) {
  const [baseFare, setBaseFare] = useState(DEFAULT_FARE_PARAMS.baseFare);
  const [perKmRate, setPerKmRate] = useState(DEFAULT_FARE_PARAMS.perKmRate);
  const [perMinRate, setPerMinRate] = useState(DEFAULT_FARE_PARAMS.perMinRate);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const pricingCondition = getCurrentPricingCondition();
  const { distanceKm, estimatedMinutes } = getAdjustedDistance(selectedRoute, startPoint, destination);
  const fareEstimates = calculateFareEstimates(distanceKm, estimatedMinutes, { baseFare, perKmRate, perMinRate });
  
  const start = START_POINTS[startPoint] || START_POINTS.orchard;
  const dest = DESTINATIONS[destination] || DESTINATIONS.forestCity;
  const grabDeepLink = `https://grab.onelink.me/2695613898?pid=inappshare&c=ridebooking&pickup=${start.lat},${start.lng}&dropoff=${dest.lat},${dest.lng}`;

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

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Route: {ROUTES[selectedRoute].name}</span>
              <span className="font-medium text-gray-800">{distanceKm} km, ~{estimatedMinutes} min</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${pricingCondition.isPeak ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
            {pricingCondition.isPeak ? (
              <TrendingUp className="w-4 h-4 text-orange-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-600" />
            )}
            <div className="text-sm">
              <span className={pricingCondition.isPeak ? 'text-orange-700 font-medium' : 'text-green-700 font-medium'}>
                {pricingCondition.label}
              </span>
              {pricingCondition.isPeak && (
                <span className="text-orange-600 text-xs ml-1">(+{Math.round((pricingCondition.multiplier - 1) * 100)}%)</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fareEstimates.map((fare) => {
            const peakMin = Math.round(fare.minFare * pricingCondition.multiplier);
            const peakMax = Math.round(fare.maxFare * pricingCondition.multiplier);
            return (
              <div
                key={fare.service}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-red-300 transition-colors"
              >
                <p className="font-medium text-gray-800">{fare.service}</p>
                <p className="text-2xl font-bold text-red-600">
                  <DollarSign className="w-5 h-5 inline -mt-1" />
                  {peakMin} - ${peakMax}
                </p>
                <p className="text-sm text-gray-500">{fare.currency}</p>
                {pricingCondition.isPeak && (
                  <p className="text-xs text-gray-400 line-through mt-1">
                    Base: ${fare.minFare} - ${fare.maxFare}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={grabDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Book with Grab
          </a>
          <a
            href="https://www.grab.com/sg/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Get Grab App
          </a>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>How fares are calculated:</strong> Base Fare (${baseFare}) + Distance ({distanceKm} km × ${perKmRate}/km) + Time ({estimatedMinutes} min × ${perMinRate}/min). 
            Prices shown include current time-of-day adjustment. Actual fares may vary based on real-time demand.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
