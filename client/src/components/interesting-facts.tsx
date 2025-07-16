import { Card, CardContent } from "@/components/ui/card";
import { Globe, Clock, Thermometer } from "lucide-react";

export function InterestingFacts() {
  const facts = [
    {
      icon: Globe,
      title: "Cross-Border Run",
      description: "Your route connects two neighboring countries, Singapore and Malaysia, across the Johor Strait",
      color: "bg-ocean-500"
    },
    {
      icon: Clock,
      title: "Same Time Zone",
      description: "Both Singapore and Malaysia are in the same time zone (UTC+8), making timing simple",
      color: "bg-green-500"
    },
    {
      icon: Thermometer,
      title: "Tropical Climate",
      description: "Expect warm temperatures around 27-32°C year-round in this equatorial region",
      color: "bg-blue-500"
    }
  ];

  return (
    <Card className="border-ocean-200 mb-8">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-ocean-800 mb-6 text-center">Fascinating Route Facts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <div key={index} className="text-center p-4 bg-ocean-50 rounded-lg">
                <div className={`${fact.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="text-white w-6 h-6" />
                </div>
                <h4 className="font-semibold text-ocean-800 mb-2">{fact.title}</h4>
                <p className="text-ocean-600 text-sm">{fact.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
