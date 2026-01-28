import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Navigation } from "lucide-react";
import { ROUTES } from "@/lib/distance-calculator";
import { cn } from "@/lib/utils";

interface MapVisualizationProps {
  selectedRoute: 'causeway' | 'secondLink';
  onRouteChange: (route: 'causeway' | 'secondLink') => void;
}

export function MapVisualization({ selectedRoute, onRouteChange }: MapVisualizationProps) {
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');

  const getMapUrl = () => {
    if (selectedRoute === 'causeway') {
      return "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d127646.5!2d103.75!3d1.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x31da19a8df1c3f31%3A0x3baa355cd9b9a299!2sOrchard%20Road%2C%20Singapore!3m2!1d1.3048035!2d103.8318358!4m5!1s0x31da6d80d2b1c14f%3A0x4bf50f7a4b8e6d0e!2sForest%20City%20Marina%20Hotel%2C%20Johor%2C%20Malaysia!3m2!1d1.4259!2d103.6319!5e0!3m2!1sen!2s!4v1642071234567!5m2!1sen!2s";
    } else {
      return "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d127646.5!2d103.65!3d1.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x31da19a8df1c3f31%3A0x3baa355cd9b9a299!2sOrchard%20Road%2C%20Singapore!3m2!1d1.3048035!2d103.8318358!4m5!1s0x31da6d80d2b1c14f%3A0x4bf50f7a4b8e6d0e!2sForest%20City%20Marina%20Hotel%2C%20Johor%2C%20Malaysia!3m2!1d1.4259!2d103.6319!5e0!3m2!1sen!2s!4v1642071234567!5m2!1sen!2s";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Route Visualization</h3>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={cn(
                    viewMode === 'map' 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  )}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Map
                </Button>
                <Button
                  variant={viewMode === 'globe' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('globe')}
                  className={cn(
                    viewMode === 'globe' 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  )}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Globe
                </Button>
              </div>
            </div>
            
            <div className="relative bg-gray-50 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              {viewMode === 'map' ? (
                <div className="w-full h-full">
                  <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <Navigation className="w-4 h-4 mr-2 text-green-500" />
                      Driving Route
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {ROUTES[selectedRoute].name}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Click map for detailed directions
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    {/* Water bodies - Johor Strait and surrounding waters */}
                    <rect x="0" y="0" width="800" height="400" fill="#3b82f6" />
                    
                    {/* Singapore island */}
                    <path 
                      d="M280 280 L380 270 L390 290 L385 310 L375 320 L350 325 L320 320 L295 310 L280 295 Z" 
                      fill="#10b981" 
                      stroke="#065f46" 
                      strokeWidth="2"
                    />
                    
                    {/* Johor (Malaysia mainland) */}
                    <path 
                      d="M200 200 L600 180 L650 200 L680 220 L700 240 L720 260 L650 280 L600 290 L550 295 L450 300 L400 290 L350 280 L300 270 L250 260 L200 240 Z" 
                      fill="#16a34a" 
                      stroke="#15803d" 
                      strokeWidth="2"
                    />
                    
                    {/* Forest City development area */}
                    <path 
                      d="M520 260 L580 255 L590 270 L585 285 L570 290 L540 285 L525 275 Z" 
                      fill="#22c55e" 
                      stroke="#16a34a" 
                      strokeWidth="2"
                    />
                    
                    {/* Johor Strait label */}
                    <text x="400" y="255" textAnchor="middle" fill="#1e40af" fontSize="10" fontStyle="italic">Johor Strait</text>
                    
                    {/* Causeway */}
                    <line x1="340" y1="275" x2="360" y2="260" stroke="#6b7280" strokeWidth="4" />
                    <text x="350" y="250" textAnchor="middle" fill="#374151" fontSize="8">Causeway</text>
                    
                    {/* Second Link */}
                    <line x1="290" y1="300" x2="280" y2="280" stroke="#6b7280" strokeWidth="3" />
                    <text x="260" y="295" textAnchor="middle" fill="#374151" fontSize="8">2nd Link</text>
                    
                    {/* Route lines based on selection */}
                    {selectedRoute === 'causeway' ? (
                      <path 
                        d="M330 290 Q340 275 360 260 Q420 240 550 270" 
                        stroke="#ef4444" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeDasharray="6,3"
                        className="animate-pulse"
                      />
                    ) : (
                      <path 
                        d="M330 290 Q290 300 280 280 Q350 260 550 270" 
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeDasharray="6,3"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Start point - Orchard Road area */}
                    <circle cx="330" cy="290" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                    <text x="330" y="305" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Orchard Road</text>
                    
                    {/* End point - Forest City Marina Hotel */}
                    <circle cx="550" cy="270" r="6" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                    <text x="550" y="255" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Forest City</text>
                    
                    {/* Geographic labels */}
                    <text x="340" y="320" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">Singapore</text>
                    <text x="450" y="215" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">Johor, Malaysia</text>
                    
                    {/* Car icon at starting point */}
                    <g transform="translate(315, 285)">
                      <rect x="0" y="0" width="12" height="6" rx="2" fill="#22c55e" />
                      <circle cx="3" cy="7" r="2" fill="#1f2937" />
                      <circle cx="9" cy="7" r="2" fill="#1f2937" />
                    </g>
                    
                    {/* Legend */}
                    <g transform="translate(620, 20)">
                      <rect x="0" y="0" width="120" height="55" fill="white" opacity="0.9" rx="4" />
                      <text x="10" y="18" fill="#374151" fontSize="10" fontWeight="bold">Selected Route:</text>
                      <line x1="10" y1="35" x2="30" y2="35" stroke={selectedRoute === 'causeway' ? "#ef4444" : "#22c55e"} strokeWidth="2" strokeDasharray="3,2" />
                      <text x="35" y="38" fill="#374151" fontSize="9">{selectedRoute === 'causeway' ? 'Causeway' : 'Second Link'}</text>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {/* Route Selector */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h3>
            <div className="space-y-3">
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedRoute === 'secondLink' 
                    ? "bg-green-500 text-white border-green-500" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                )}
                onClick={() => onRouteChange('secondLink')}
              >
                <div>
                  <p className={cn("font-medium", selectedRoute === 'secondLink' ? "text-white" : "text-gray-800")}>
                    Second Link
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600")}>
                    via Tuas (Faster)
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", selectedRoute === 'secondLink' ? "text-white" : "text-gray-800")}>
                    {ROUTES.secondLink.distanceKm} km
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600")}>
                    ~{ROUTES.secondLink.estimatedMinutes} min
                  </p>
                </div>
              </div>
              
              <div 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedRoute === 'causeway' 
                    ? "bg-green-500 text-white border-green-500" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                )}
                onClick={() => onRouteChange('causeway')}
              >
                <div>
                  <p className={cn("font-medium", selectedRoute === 'causeway' ? "text-white" : "text-gray-800")}>
                    Causeway
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600")}>
                    via Woodlands
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", selectedRoute === 'causeway' ? "text-white" : "text-gray-800")}>
                    {ROUTES.causeway.distanceKm} km
                  </p>
                  <p className={cn("text-sm", selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600")}>
                    ~{ROUTES.causeway.estimatedMinutes} min
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Route Info */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                {ROUTES[selectedRoute].description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <span className="text-gray-600">Singapore Immigration</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-gray-600">Malaysia Immigration</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
