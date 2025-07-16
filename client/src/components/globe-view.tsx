import { Card, CardContent } from "@/components/ui/card";

export function GlobeView() {
  const globeFacts = [
    {
      title: "Short Distance Route",
      description: "The direct distance between Singapore and Forest City is much shorter than cross-ocean routes"
    },
    {
      title: "Strait Crossing",
      description: "The route crosses the Johor Strait, which separates Singapore from mainland Malaysia"
    },
    {
      title: "Calorie Burn",
      description: "This run would burn approximately 500-1000 calories depending on your pace!"
    }
  ];

  return (
    <Card className="border-ocean-200">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-ocean-800 mb-6 text-center">Regional Map View</h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="relative">
            <div className="w-80 h-80 rounded-lg shadow-2xl overflow-hidden bg-blue-100">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Sea background */}
                <rect x="0" y="0" width="400" height="400" fill="#3b82f6" />
                
                {/* Malaysia mainland */}
                <path 
                  d="M50 150 L350 120 L380 180 L370 220 L350 260 L300 280 L250 290 L200 285 L150 275 L100 250 L80 200 Z" 
                  fill="#22c55e" 
                  stroke="#16a34a" 
                  strokeWidth="2"
                />
                
                {/* Singapore island */}
                <path 
                  d="M180 300 L220 295 L230 310 L225 320 L215 325 L200 330 L185 325 L175 315 Z" 
                  fill="#10b981" 
                  stroke="#065f46" 
                  strokeWidth="2"
                />
                
                {/* Johor Strait */}
                <path 
                  d="M180 300 L220 295 L230 280 L200 285 L180 290 Z" 
                  fill="#1e40af" 
                  opacity="0.7"
                />
                
                {/* Forest City location */}
                <circle cx="240" cy="270" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="240" y="255" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Forest City</text>
                
                {/* Singapore location */}
                <circle cx="200" cy="315" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x="200" y="340" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">Singapore</text>
                
                {/* Route line */}
                <path 
                  d="M200 315 Q220 290 240 270" 
                  stroke="#dc2626" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="5,3"
                  className="animate-pulse"
                />
                
                {/* Country labels */}
                <text x="220" y="200" textAnchor="middle" fill="#1f2937" fontSize="14" fontWeight="bold">MALAYSIA</text>
                <text x="200" y="300" textAnchor="middle" fill="#1f2937" fontSize="12" fontWeight="bold">SINGAPORE</text>
                
                {/* Compass */}
                <g transform="translate(340, 60)">
                  <circle r="25" fill="#ffffff" stroke="#374151" strokeWidth="2" opacity="0.9" />
                  <text x="0" y="-15" textAnchor="middle" fill="#374151" fontSize="10" fontWeight="bold">N</text>
                  <text x="15" y="5" textAnchor="middle" fill="#374151" fontSize="10">E</text>
                  <text x="0" y="20" textAnchor="middle" fill="#374151" fontSize="10">S</text>
                  <text x="-15" y="5" textAnchor="middle" fill="#374151" fontSize="10">W</text>
                  <path d="M0 -20 L5 0 L0 20 L-5 0 Z" fill="#dc2626" />
                </g>
                
                {/* Scale indicator */}
                <g transform="translate(30, 350)">
                  <line x1="0" y1="0" x2="50" y2="0" stroke="#374151" strokeWidth="2" />
                  <line x1="0" y1="-3" x2="0" y2="3" stroke="#374151" strokeWidth="2" />
                  <line x1="50" y1="-3" x2="50" y2="3" stroke="#374151" strokeWidth="2" />
                  <text x="25" y="15" textAnchor="middle" fill="#374151" fontSize="10">~30 km</text>
                </g>
              </svg>
            </div>
          </div>
          
          <div className="text-center lg:text-left space-y-4">
            {globeFacts.map((fact, index) => (
              <div key={index} className="bg-ocean-50 rounded-lg p-4">
                <h4 className="font-semibold text-ocean-800 mb-2">{fact.title}</h4>
                <p className="text-ocean-600">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
