import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Play } from "lucide-react";
import { getRouteData, calculateRunningTimes } from "@/lib/distance-calculator";
import { cn } from "@/lib/utils";

export function MapVisualization() {
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('map');
  const [selectedSpeed, setSelectedSpeed] = useState(1); // Default to Average Run
  const [runnerPosition, setRunnerPosition] = useState(25);
  
  const routeData = getRouteData();
  const runningTimes = calculateRunningTimes(routeData.distance);

  useEffect(() => {
    const interval = setInterval(() => {
      setRunnerPosition(prev => prev >= 100 ? 0 : prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-ocean-800">Route Visualization</h3>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className={cn(
                    viewMode === 'map' 
                      ? 'bg-ocean-500 text-white hover:bg-ocean-600' 
                      : 'bg-ocean-200 text-ocean-700 hover:bg-ocean-300'
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
                      ? 'bg-ocean-500 text-white hover:bg-ocean-600' 
                      : 'bg-ocean-200 text-ocean-700 hover:bg-ocean-300'
                  )}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Globe
                </Button>
              </div>
            </div>
            
            <div className="relative bg-ocean-50 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              {viewMode === 'map' ? (
                <div className="w-full h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d127646.5!2d103.7!3d1.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x31da19a8df1c3f31%3A0x3baa355cd9b9a299!2sOrchard%20Road%2C%20Singapore!3m2!1d1.3048035!2d103.8318358!4m5!1s0x31da0e1c4f3d4f3d%3A0x1c4f3d4f3d4f3d4f!2sForest%20City%2C%20Johor%2C%20Malaysia!3m2!1d1.3268!2d103.6319!5e0!3m2!1sen!2s!4v1642071234567!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-sm font-medium text-gray-800">
                      🚶‍♂️ Walking Route
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Orchard Road → Forest City
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
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
                    
                    {/* Johor Strait */}
                    <path 
                      d="M280 280 L520 260" 
                      stroke="#1e40af" 
                      strokeWidth="8" 
                      fill="none" 
                      opacity="0.7"
                    />
                    
                    {/* Route line */}
                    <path 
                      d="M330 290 Q420 280 550 270" 
                      stroke="#dc2626" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                    
                    {/* Start point - Orchard Road area */}
                    <circle cx="330" cy="290" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                    <text x="330" y="305" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">Orchard Road</text>
                    
                    {/* End point - Forest City */}
                    <circle cx="550" cy="270" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    <text x="550" y="255" textAnchor="middle" fill="#1f2937" fontSize="11" fontWeight="bold">Forest City</text>
                    
                    {/* Geographic labels */}
                    <text x="340" y="250" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Singapore</text>
                    <text x="450" y="230" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Johor, Malaysia</text>
                    
                    {/* Animated runner */}
                    <g transform={`translate(${330 + (220 * runnerPosition / 100)}, ${290 + (-20 * runnerPosition / 100)})`}>
                      <circle r="3" fill="#f59e0b" />
                      <g stroke="#f59e0b" strokeWidth="1.5" fill="none">
                        <path d="M0 4 L3 10 M0 4 L-3 10 M0 7 L6 7" />
                      </g>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {/* Speed Selector */}
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-ocean-800 mb-4">Running Speed</h3>
            <div className="space-y-3">
              {runningTimes.map((speed, index) => (
                <div 
                  key={speed.name}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                    selectedSpeed === index 
                      ? "bg-ocean-500 text-white border-ocean-500" 
                      : "bg-ocean-50 border-ocean-200 hover:bg-ocean-100"
                  )}
                  onClick={() => setSelectedSpeed(index)}
                >
                  <div>
                    <p className={cn("font-medium", selectedSpeed === index ? "text-white" : "text-ocean-800")}>
                      {speed.name}
                    </p>
                    <p className={cn("text-sm", selectedSpeed === index ? "opacity-90" : "text-ocean-600")}>
                      {speed.mph} mph
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-semibold", selectedSpeed === index ? "text-white" : "text-ocean-800")}>
                      {speed.days} min
                    </p>
                    <p className={cn("text-sm", selectedSpeed === index ? "opacity-90" : "text-ocean-600")}>
                      {speed.hours} hours
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Running Progress */}
        <Card className="border-ocean-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-ocean-800 mb-4">Running Progress</h3>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Running person silhouette" 
                className="rounded-lg shadow-md w-full h-32 object-cover mb-4"
              />
              <div className="bg-ocean-100 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Play className="text-ocean-500 w-5 h-5 animate-pulse" />
                  <span className="text-ocean-700 font-medium">Currently Running</span>
                </div>
                <div className="w-full bg-ocean-200 rounded-full h-2">
                  <div 
                    className="bg-ocean-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${runnerPosition}%` }}
                  />
                </div>
                <p className="text-sm text-ocean-600 mt-2">
                  {runnerPosition}% Complete • {Math.round(routeData.distance * runnerPosition / 100)} miles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
