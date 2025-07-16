import { Card, CardContent } from "@/components/ui/card";

export function GlobeView() {
  const globeFacts = [
    {
      title: "Great Circle Route",
      description: "The shortest distance between two points on Earth's surface follows a great circle path"
    },
    {
      title: "Curvature Effect",
      description: "Earth's curvature makes the actual path curve north through the Pacific"
    },
    {
      title: "Fun Calculation",
      description: "This hypothetical run would burn approximately 1.2 million calories!"
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
