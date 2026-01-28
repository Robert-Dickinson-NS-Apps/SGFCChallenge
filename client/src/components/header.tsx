import { Share, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SG to Forest City - Grab Car Route Planner',
        text: 'Plan your Grab ride from Singapore to Forest City Marina Hotel!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-ocean-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SG to Forest City</h1>
              <p className="text-sm text-gray-500">Grab Car Route Planner</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-gray-600 text-sm">Singapore → Forest City Marina Hotel</span>
            <Button 
              onClick={handleShare}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Share className="w-4 h-4 mr-2" />
              Share Route
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
