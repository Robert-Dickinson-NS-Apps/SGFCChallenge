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
        <h3 className="text-2xl font-bold text-ocean-800 mb-6 text-center">3D Globe Visualization</h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
              alt="Earth globe view" 
              className="rounded-full shadow-2xl w-64 h-64 object-cover animate-spin"
              style={{ animationDuration: '20s' }}
            />
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
