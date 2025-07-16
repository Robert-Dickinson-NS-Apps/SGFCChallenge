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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  {/* World continents */}
                  <g fill="#1e293b" fillOpacity="0.1">
                    <path d="M100 120 L200 100 L250 150 L200 200 L150 180 Z" />
                    <path d="M600 100 L750 120 L720 200 L650 180 Z" />
                    <path d="M650 250 L720 240 L700 280 L680 270 Z" />
                  </g>
                  
                  {/* Route line */}
                  <path 
                    d="M150 160 Q400 100 680 180" 
                    stroke="#0284c7" 
                    strokeWidth="3" 
                    fill="none" 
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                  
                  {/* Start point */}
                  <circle cx="150" cy="160" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x="150" y="145" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">SF</text>
                  
                  {/* End point */}
                  <circle cx="680" cy="180" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <text x="680" y="200" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Forest City</text>
                  
                  {/* Animated runner */}
                  <g transform={`translate(${150 + (530 * runnerPosition / 100)}, ${160 + (20 * Math.sin(runnerPosition / 10))})`}>
                    <circle r="4" fill="#f59e0b" />
                    <g stroke="#f59e0b" strokeWidth="2" fill="none">
                      <path d="M0 5 L5 15 M0 5 L-5 15 M0 10 L10 10" />
                    </g>
                  </g>
                </svg>
              </div>
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
                      {speed.days} days
                    </p>
                    <p className={cn("text-sm", selectedSpeed === index ? "opacity-90" : "text-ocean-600")}>
                      {speed.hours.toLocaleString()} hours
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
                  {runnerPosition}% Complete • {Math.round(routeData.distance * runnerPosition / 100).toLocaleString()} miles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
