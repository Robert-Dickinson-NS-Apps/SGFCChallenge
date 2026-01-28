import { useState } from "react";
import { Header } from "@/components/header";
import { RouteOverview } from "@/components/route-overview";
import { MapVisualization } from "@/components/map-visualization";
import { InterestingFacts } from "@/components/interesting-facts";
import { GlobeView } from "@/components/globe-view";
import { CallToAction } from "@/components/call-to-action";
import { Footer } from "@/components/footer";

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<'causeway' | 'secondLink'>('secondLink');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RouteOverview selectedRoute={selectedRoute} onRouteChange={setSelectedRoute} />
        <MapVisualization selectedRoute={selectedRoute} onRouteChange={setSelectedRoute} />
        <InterestingFacts />
        <GlobeView selectedRoute={selectedRoute} />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
