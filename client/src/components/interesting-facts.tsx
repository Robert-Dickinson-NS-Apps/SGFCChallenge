import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Clock, Info, Route, Plane } from "lucide-react";
import { EDUCATIONAL_FACTS } from "@/lib/distance-calculator";

export function InterestingFacts() {
  const icons = [Building, Route, MapPin, Info, Plane, Clock];

  return (
    <Card className="border-gray-200 mb-8">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">About This Route</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATIONAL_FACTS.map((fact, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                  <IconComponent className="text-white w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{fact.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{fact.description}</p>
                {fact.source && (
                  <p className="text-xs text-gray-400">Source: {fact.source}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
