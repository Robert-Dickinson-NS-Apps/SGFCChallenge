import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, ExternalLink, Smartphone } from "lucide-react";

export function CallToAction() {
  return (
    <Card className="border-gray-200 bg-gradient-to-r from-red-600 to-red-700 text-white mb-8">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Car className="w-10 h-10" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3">Ready to Book Your Ride?</h3>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Cross-border Grab rides from Singapore to Malaysia require booking through the Grab app. 
          Make sure you have your passport ready for immigration checkpoints.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-red-600 hover:bg-gray-100"
            onClick={() => window.open('https://www.grab.com/sg/', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Grab Website
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => window.open('https://grab.onelink.me/2695613898', '_blank')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Download Grab App
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="font-semibold mb-2">Travel Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
            <div className="flex items-center justify-center">
              <span className="mr-2">🛂</span>
              <span>Bring valid passport</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">📱</span>
              <span>Book via Grab app</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">⏰</span>
              <span>Allow extra time for borders</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
