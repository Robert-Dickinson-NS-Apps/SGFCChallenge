import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, AlertTriangle, TrendingUp, ExternalLink, RefreshCw } from "lucide-react";

interface BorderQueueTimesProps {
  selectedRoute: 'causeway' | 'secondLink';
}

interface QueueEstimate {
  checkpoint: string;
  country: string;
  estimatedWait: number;
  confidence: 'low' | 'medium' | 'high';
  trend: 'increasing' | 'stable' | 'decreasing';
  lastUpdated: Date;
}

function getTimeOfDay(): 'morning_rush' | 'midday' | 'evening_rush' | 'night' | 'weekend' {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  if (day === 0 || day === 6) return 'weekend';
  if (hour >= 7 && hour < 10) return 'morning_rush';
  if (hour >= 17 && hour < 20) return 'evening_rush';
  if (hour >= 22 || hour < 6) return 'night';
  return 'midday';
}

function estimateQueueTimes(route: 'causeway' | 'secondLink'): QueueEstimate[] {
  const timeOfDay = getTimeOfDay();
  const now = new Date();
  
  const baseWaits = {
    causeway: {
      woodlands: { morning_rush: 45, midday: 20, evening_rush: 60, night: 10, weekend: 75 },
      sultanIskandar: { morning_rush: 30, midday: 15, evening_rush: 45, night: 10, weekend: 60 }
    },
    secondLink: {
      tuas: { morning_rush: 25, midday: 10, evening_rush: 35, night: 5, weekend: 40 },
      sultanAbuBakar: { morning_rush: 20, midday: 10, evening_rush: 25, night: 5, weekend: 30 }
    }
  };

  const variance = Math.random() * 0.3 - 0.15;
  
  if (route === 'causeway') {
    const woodlandsBase = baseWaits.causeway.woodlands[timeOfDay];
    const sultanBase = baseWaits.causeway.sultanIskandar[timeOfDay];
    
    return [
      {
        checkpoint: "Woodlands Checkpoint",
        country: "Singapore",
        estimatedWait: Math.round(woodlandsBase * (1 + variance)),
        confidence: timeOfDay === 'weekend' ? 'low' : 'medium',
        trend: timeOfDay === 'morning_rush' || timeOfDay === 'evening_rush' ? 'increasing' : 'stable',
        lastUpdated: now
      },
      {
        checkpoint: "Sultan Iskandar CIQ",
        country: "Malaysia",
        estimatedWait: Math.round(sultanBase * (1 + variance)),
        confidence: 'medium',
        trend: 'stable',
        lastUpdated: now
      }
    ];
  } else {
    const tuasBase = baseWaits.secondLink.tuas[timeOfDay];
    const sultanBase = baseWaits.secondLink.sultanAbuBakar[timeOfDay];
    
    return [
      {
        checkpoint: "Tuas Checkpoint",
        country: "Singapore",
        estimatedWait: Math.round(tuasBase * (1 + variance)),
        confidence: 'medium',
        trend: timeOfDay === 'evening_rush' ? 'increasing' : 'stable',
        lastUpdated: now
      },
      {
        checkpoint: "Sultan Abu Bakar CIQ",
        country: "Malaysia",
        estimatedWait: Math.round(sultanBase * (1 + variance)),
        confidence: 'medium',
        trend: 'stable',
        lastUpdated: now
      }
    ];
  }
}

function getWaitColor(minutes: number): string {
  if (minutes <= 15) return 'text-green-600 bg-green-50 border-green-200';
  if (minutes <= 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  if (minutes <= 45) return 'text-orange-600 bg-orange-50 border-orange-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

function getWaitLabel(minutes: number): string {
  if (minutes <= 15) return 'Short';
  if (minutes <= 30) return 'Moderate';
  if (minutes <= 45) return 'Long';
  return 'Very Long';
}

export function BorderQueueTimes({ selectedRoute }: BorderQueueTimesProps) {
  const [queueData, setQueueData] = useState<QueueEstimate[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQueueData(estimateQueueTimes(selectedRoute));
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    setQueueData(estimateQueueTimes(selectedRoute));
  }, [selectedRoute]);

  const totalWait = queueData.reduce((sum, q) => sum + q.estimatedWait, 0);
  const timeOfDay = getTimeOfDay();
  
  const timeLabels: Record<string, { label: string; warning: boolean }> = {
    morning_rush: { label: "Morning Rush Hour", warning: true },
    midday: { label: "Off-Peak", warning: false },
    evening_rush: { label: "Evening Rush Hour", warning: true },
    night: { label: "Late Night", warning: false },
    weekend: { label: "Weekend Traffic", warning: true }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-white mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Border Queue Estimates
            </h3>
            <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              {timeLabels[timeOfDay].label}
            </span>
          </div>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center text-sm bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 rounded-full disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {timeLabels[timeOfDay].warning && (
          <div className="flex items-start mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Peak hours detected.</strong> Expect longer wait times. Consider traveling during off-peak hours for shorter queues.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {queueData.map((queue, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${getWaitColor(queue.estimatedWait)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{queue.checkpoint}</p>
                  <p className="text-xs text-gray-500">{queue.country} Immigration</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  queue.country === 'Singapore' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {queue.country === 'Singapore' ? '🇸🇬' : '🇲🇾'}
                </span>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{queue.estimatedWait}</p>
                  <p className="text-sm">minutes</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center text-xs font-medium ${
                    queue.trend === 'increasing' ? 'text-red-600' : 
                    queue.trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${
                      queue.trend === 'decreasing' ? 'rotate-180' : 
                      queue.trend === 'stable' ? 'rotate-90' : ''
                    }`} />
                    {queue.trend.charAt(0).toUpperCase() + queue.trend.slice(1)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{getWaitLabel(queue.estimatedWait)} wait</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <div>
              <p className="font-semibold text-gray-800">Total Estimated Wait</p>
              <p className="text-xs text-gray-500">Combined immigration time</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{totalWait} min</p>
            <p className="text-xs text-gray-500">Add to travel time</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://www.beatthejam.asia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-full"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Beat The Jam (Live)
          </a>
          <a
            href={selectedRoute === 'causeway' 
              ? "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras/woodlands.html"
              : "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras/tuas.html"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-full"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            LTA Traffic Camera
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * Estimates based on historical patterns and time of day. Actual wait times may vary. 
          Check live cameras and Beat The Jam for real-time conditions.
        </p>
      </CardContent>
    </Card>
  );
}
