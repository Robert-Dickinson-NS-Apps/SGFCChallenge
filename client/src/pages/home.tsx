import { useState } from "react";
import { Header } from "@/components/header";
import { TripPlanner } from "@/components/trip-planner";
import { LiveRouteData } from "@/components/live-route-data";
import { RouteOverview } from "@/components/route-overview";
import { MapVisualization } from "@/components/map-visualization";
import { FareCalculator } from "@/components/fare-calculator";
import { TransportComparison } from "@/components/transport-comparison";
import { CheckpointResources } from "@/components/checkpoint-resources";
import { InterestingFacts } from "@/components/interesting-facts";
import { CallToAction } from "@/components/call-to-action";
import { Footer } from "@/components/footer";

interface CustomLocation {
  name: string;
  lat: number;
  lng: number;
}

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<'causeway' | 'secondLink'>('secondLink');
  const [startPoint, setStartPoint] = useState('orchard');
  const [destination, setDestination] = useState('forestCity');
  const [customStart, setCustomStart] = useState<CustomLocation | null>(null);
  const [customDestination, setCustomDestination] = useState<CustomLocation | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TripPlanner 
          startPoint={startPoint}
          destination={destination}
          onStartPointChange={setStartPoint}
          onDestinationChange={setDestination}
          customStart={customStart}
          customDestination={customDestination}
          onCustomStartChange={setCustomStart}
          onCustomDestinationChange={setCustomDestination}
        />
        <LiveRouteData
          selectedRoute={selectedRoute}
          startPoint={startPoint}
          destination={destination}
          customStart={customStart}
          customDestination={customDestination}
        />
        <RouteOverview 
          selectedRoute={selectedRoute} 
          onRouteChange={setSelectedRoute}
          startPoint={startPoint}
          destination={destination}
        />
        <MapVisualization 
          selectedRoute={selectedRoute} 
          onRouteChange={setSelectedRoute}
          startPoint={startPoint}
          destination={destination}
        />
        <FareCalculator 
          selectedRoute={selectedRoute}
          startPoint={startPoint}
          destination={destination}
        />
        <TransportComparison
          selectedRoute={selectedRoute}
          startPoint={startPoint}
          destination={destination}
        />
        <CheckpointResources selectedRoute={selectedRoute} />
        <InterestingFacts />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
