import { Card, CardContent } from "@/components/ui/card";
import { Camera, ExternalLink, Clock, AlertTriangle } from "lucide-react";
import { CHECKPOINT_RESOURCES } from "@/lib/distance-calculator";

interface CheckpointResourcesProps {
  selectedRoute: 'causeway' | 'secondLink';
}

export function CheckpointResources({ selectedRoute }: CheckpointResourcesProps) {
  const relevantCameras = selectedRoute === 'causeway' 
    ? CHECKPOINT_RESOURCES.filter(r => r.name.includes('Woodlands') || r.type !== 'camera')
    : CHECKPOINT_RESOURCES.filter(r => r.name.includes('Tuas') || r.type !== 'camera');

  return (
    <Card className="border-gray-200 mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-purple-600" />
          Live Traffic & Border Wait Times
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Check real-time conditions before you travel. Border wait times can range from 15 minutes to over 2 hours during peak periods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {relevantCameras.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-3">
                {resource.type === 'camera' ? (
                  <Camera className="w-5 h-5 text-purple-600" />
                ) : resource.type === 'crowdsourced' ? (
                  <Clock className="w-5 h-5 text-orange-500" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">{resource.name}</p>
                <p className="text-xs text-gray-500 truncate">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
            </a>
          ))}
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800 text-sm mb-1">Peak Hours Warning</p>
              <p className="text-xs text-gray-600">
                Avoid traveling during these busy times:
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li><strong>Weekday mornings:</strong> 7:00 AM - 9:00 AM (workers commuting)</li>
                <li><strong>Weekday evenings:</strong> 5:00 PM - 8:00 PM (return traffic)</li>
                <li><strong>Weekends & holidays:</strong> Expect heavy traffic throughout the day</li>
                <li><strong>School holidays:</strong> Significantly longer wait times</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-800">
            <strong>Pro tip:</strong> The Second Link (Tuas) is typically 30-50% faster than the Causeway during peak hours. 
            Early morning (before 7 AM) or late evening (after 9 PM) crossings have minimal wait times.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
