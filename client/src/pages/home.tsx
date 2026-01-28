import { useState } from "react";
import { Header } from "@/components/header";
import { TripPlanner } from "@/components/trip-planner";
import { LiveRouteData } from "@/components/live-route-data";
import { BorderQueueTimes } from "@/components/border-queue-times";
import { RouteOverview } from "@/components/route-overview";
import { InteractiveMap } from "@/components/interactive-map";
import { FareCalculator } from "@/components/fare-calculator";
import { TransportComparison } from "@/components/transport-comparison";
import { DocumentsTab } from "@/components/documents-tab";
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
        <BorderQueueTimes selectedRoute={selectedRoute} />
        <RouteOverview 
          selectedRoute={selectedRoute} 
          onRouteChange={setSelectedRoute}
          startPoint={startPoint}
          destination={destination}
        />
        <InteractiveMap 
          selectedRoute={selectedRoute} 
          onRouteChange={setSelectedRoute}
          startPoint={startPoint}
          destination={destination}
          customStart={customStart}
          customDestination={customDestination}
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
        <DocumentsTab />
        <CheckpointResources selectedRoute={selectedRoute} />
        <InterestingFacts />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
