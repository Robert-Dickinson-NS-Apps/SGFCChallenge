import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, ExternalLink, Loader2, Layers, MapPin } from "lucide-react";
import { ROUTES, START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";

interface InteractiveMapProps {
  selectedRoute: 'causeway' | 'secondLink';
  onRouteChange: (route: 'causeway' | 'secondLink') => void;
  startPoint: string;
  destination: string;
  customStart?: { name: string; lat: number; lng: number } | null;
  customDestination?: { name: string; lat: number; lng: number } | null;
}

const CHECKPOINT_COORDS = {
  woodlands: { lat: 1.4469, lng: 103.7696, name: "Woodlands Checkpoint" },
  tuas: { lat: 1.3225, lng: 103.6365, name: "Tuas Checkpoint" },
  sultanIskandar: { lat: 1.4655, lng: 103.7613, name: "Sultan Iskandar CIQ" },
  sultanAbuBakar: { lat: 1.3807, lng: 103.6316, name: "Sultan Abu Bakar CIQ" }
};

export function InteractiveMap({ 
  selectedRoute, 
  onRouteChange, 
  startPoint, 
  destination,
  customStart,
  customDestination 
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const trafficLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);

  const start = customStart || START_POINTS[startPoint] || START_POINTS.orchard;
  const dest = customDestination || DESTINATIONS[destination] || DESTINATIONS.forestCity;

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  useEffect(() => {
    fetch('/api/maps-key')
      .then(res => res.json())
      .then(data => {
        setApiKey(data.key);
        setIsLoadingKey(false);
      })
      .catch(() => setIsLoadingKey(false));
  }, []);

  const getDirectionsUrl = () => {
    const waypoint = selectedRoute === 'causeway' ? 'Woodlands+Checkpoint+Singapore' : 'Tuas+Checkpoint+Singapore';
    const origin = customStart ? `${start.lat},${start.lng}` : encodeURIComponent(start.name + ', Singapore');
    const destStr = customDestination ? `${dest.lat},${dest.lng}` : encodeURIComponent(dest.name + ', Malaysia');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destStr}&waypoints=${waypoint}&travelmode=driving`;
  };

  useEffect(() => {
    if (!apiKey || isMapLoaded) return;

    const loadGoogleMaps = () => {
      if ((window as any).google?.maps) {
        initializeMap();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        (existingScript as HTMLScriptElement).addEventListener('load', initializeMap);
        return;
      }

      (window as any).initMap = initializeMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !(window as any).google?.maps) return;

      const google = (window as any).google;
      const centerLat = (start.lat + dest.lat) / 2;
      const centerLng = (start.lng + dest.lng) / 2;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 11,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
        ]
      });

      const renderer = new google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: selectedRoute === 'secondLink' ? '#dc2626' : '#2563eb',
          strokeWeight: 5,
          strokeOpacity: 0.8
        }
      });

      const traffic = new google.maps.TrafficLayer();
      traffic.setMap(mapInstance);

      mapInstanceRef.current = mapInstance;
      directionsRendererRef.current = renderer;
      trafficLayerRef.current = traffic;
      setIsMapLoaded(true);
    };

    loadGoogleMaps();
  }, [apiKey]);

  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current || !directionsRendererRef.current) return;

    const google = (window as any).google;
    if (!google?.maps) return;

    const directionsService = new google.maps.DirectionsService();
    
    const waypoint = selectedRoute === 'causeway' 
      ? CHECKPOINT_COORDS.woodlands 
      : CHECKPOINT_COORDS.tuas;

    const request = {
      origin: { lat: start.lat, lng: start.lng },
      destination: { lat: dest.lat, lng: dest.lng },
      waypoints: [{ location: { lat: waypoint.lat, lng: waypoint.lng }, stopover: true }],
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.BEST_GUESS
      }
    };

    directionsService.route(request, (result: any, status: string) => {
      if (status === 'OK' && result) {
        directionsRendererRef.current?.setDirections(result);
        directionsRendererRef.current?.setOptions({
          polylineOptions: {
            strokeColor: selectedRoute === 'secondLink' ? '#dc2626' : '#2563eb',
            strokeWeight: 5,
            strokeOpacity: 0.8
          }
        });

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        const startMarker = new google.maps.Marker({
          position: { lat: start.lat, lng: start.lng },
          map: mapInstanceRef.current,
          title: start.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#22c55e',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
          }
        });
        markersRef.current.push(startMarker);

        const checkpointSG = selectedRoute === 'causeway' ? CHECKPOINT_COORDS.woodlands : CHECKPOINT_COORDS.tuas;
        const sgMarker = new google.maps.Marker({
          position: { lat: checkpointSG.lat, lng: checkpointSG.lng },
          map: mapInstanceRef.current,
          title: checkpointSG.name + " (SG Immigration)",
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: '#ef4444',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
          }
        });
        markersRef.current.push(sgMarker);

        const checkpointMY = selectedRoute === 'causeway' ? CHECKPOINT_COORDS.sultanIskandar : CHECKPOINT_COORDS.sultanAbuBakar;
        const myMarker = new google.maps.Marker({
          position: { lat: checkpointMY.lat, lng: checkpointMY.lng },
          map: mapInstanceRef.current,
          title: checkpointMY.name + " (MY Immigration)",
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
          }
        });
        markersRef.current.push(myMarker);

        const destMarker = new google.maps.Marker({
          position: { lat: dest.lat, lng: dest.lng },
          map: mapInstanceRef.current,
          title: dest.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#dc2626',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
          }
        });
        markersRef.current.push(destMarker);
      }
    });
  }, [isMapLoaded, selectedRoute, startPoint, destination, customStart, customDestination, start, dest]);

  useEffect(() => {
    if (trafficLayerRef.current && mapInstanceRef.current) {
      trafficLayerRef.current.setMap(showTraffic ? mapInstanceRef.current : null);
    }
  }, [showTraffic]);

  const toggleTraffic = () => setShowTraffic(!showTraffic);

  const isLoading = isLoadingKey || !isMapLoaded;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-800">Live Interactive Map</h3>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium animate-pulse">
                  LIVE Traffic
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTraffic}
                  className={`flex items-center text-sm px-3 py-1 rounded-full font-medium transition-colors ${
                    showTraffic 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Layers className="w-4 h-4 mr-1" />
                  Traffic
                </button>
                <a 
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-full font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Navigate
                </a>
              </div>
            </div>
            
            <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                  <span className="ml-3 text-gray-600">Loading map...</span>
                </div>
              )}
              <div ref={mapRef} className="w-full h-full rounded-xl" />
              
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                <div className="text-sm font-medium text-gray-800 flex items-center">
                  <Navigation className="w-4 h-4 mr-2 text-red-600" />
                  {ROUTES[selectedRoute].name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {start.name} → {dest.name}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                    <span>Start</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                    <span>SG</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                    <span>MY</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-600 mr-1" />
                    <span>End</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h3>
            <div className="space-y-3">
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRoute === 'secondLink' 
                    ? "bg-red-600 text-white border-red-600" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => onRouteChange('secondLink')}
              >
                <div>
                  <p className={`font-medium ${selectedRoute === 'secondLink' ? "text-white" : "text-gray-800"}`}>
                    Second Link
                  </p>
                  <p className={`text-sm ${selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600"}`}>
                    via Tuas (Faster)
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${selectedRoute === 'secondLink' ? "text-white" : "text-gray-800"}`}>
                    {ROUTES.secondLink.distanceKm} km
                  </p>
                  <p className={`text-sm ${selectedRoute === 'secondLink' ? "opacity-90" : "text-gray-600"}`}>
                    ~{ROUTES.secondLink.estimatedMinutes} min
                  </p>
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedRoute === 'causeway' 
                    ? "bg-red-600 text-white border-red-600" 
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => onRouteChange('causeway')}
              >
                <div>
                  <p className={`font-medium ${selectedRoute === 'causeway' ? "text-white" : "text-gray-800"}`}>
                    Causeway
                  </p>
                  <p className={`text-sm ${selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600"}`}>
                    via Woodlands
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${selectedRoute === 'causeway' ? "text-white" : "text-gray-800"}`}>
                    {ROUTES.causeway.distanceKm} km
                  </p>
                  <p className={`text-sm ${selectedRoute === 'causeway' ? "opacity-90" : "text-gray-600"}`}>
                    ~{ROUTES.causeway.estimatedMinutes} min
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              Checkpoint Markers
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Starting Point</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  {selectedRoute === 'causeway' ? 'Woodlands Checkpoint' : 'Tuas Checkpoint'} (SG)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">
                  {selectedRoute === 'causeway' ? 'Sultan Iskandar CIQ' : 'Sultan Abu Bakar CIQ'} (MY)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">Destination</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
