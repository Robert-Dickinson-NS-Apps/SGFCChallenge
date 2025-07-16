import { Button } from "@/components/ui/button";
import { MapPin, Calculator } from "lucide-react";

export function CallToAction() {
  return (
    <div className="text-center mt-12 mb-8">
      <div className="bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready for Your Next Adventure?</h3>
        <p className="text-ocean-100 mb-6">While running on water isn't possible, you can still plan amazing running routes around the world!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-ocean-600 hover:bg-ocean-50"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explore Real Routes
          </Button>
          <Button 
            className="bg-ocean-700 text-white hover:bg-ocean-800"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Another Route
          </Button>
        </div>
      </div>
    </div>
  );
}
