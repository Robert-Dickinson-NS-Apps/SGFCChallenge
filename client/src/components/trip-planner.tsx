import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, X, Loader2 } from "lucide-react";
import { START_POINTS, DESTINATIONS } from "@/lib/distance-calculator";

interface TripPlannerProps {
  startPoint: string;
  destination: string;
  onStartPointChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  customStart?: { name: string; lat: number; lng: number } | null;
  customDestination?: { name: string; lat: number; lng: number } | null;
  onCustomStartChange?: (location: { name: string; lat: number; lng: number } | null) => void;
  onCustomDestinationChange?: (location: { name: string; lat: number; lng: number } | null) => void;
}

interface PlacePrediction {
  place_id: string;
  description: string;
}

function AddressAutocomplete({ 
  placeholder, 
  country, 
  onSelect,
  onClear,
  value 
}: { 
  placeholder: string;
  country: string;
  onSelect: (place: { name: string; lat: number; lng: number }) => void;
  onClear: () => void;
  value?: string;
}) {
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setInput(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchPlaces = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(query)}&types=geocode&components=country:${country}`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions.slice(0, 5));
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Autocomplete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchPlaces(value), 300);
  };

  const handleSelect = async (prediction: PlacePrediction) => {
    setInput(prediction.description);
    setShowSuggestions(false);
    setSuggestions([]);

    try {
      const response = await fetch(`/api/places/details?place_id=${prediction.place_id}`);
      const data = await response.json();
      if (data.result?.geometry?.location) {
        onSelect({
          name: prediction.description,
          lat: data.result.geometry.location.lat,
          lng: data.result.geometry.location.lng
        });
      }
    } catch (error) {
      console.error("Place details error:", error);
    }
  };

  const handleClear = () => {
    setInput("");
    setSuggestions([]);
    onClear();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-9 pr-8"
        />
        {isLoading && (
          <Loader2 className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        )}
        {input && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <MapPin className="w-4 h-4 inline mr-2 text-gray-400" />
              {suggestion.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TripPlanner({ 
  startPoint, 
  destination, 
  onStartPointChange, 
  onDestinationChange,
  customStart,
  customDestination,
  onCustomStartChange,
  onCustomDestinationChange
}: TripPlannerProps) {
  const [useCustomStart, setUseCustomStart] = useState(false);
  const [useCustomDest, setUseCustomDest] = useState(false);

  const handleCustomStartSelect = (location: { name: string; lat: number; lng: number }) => {
    onCustomStartChange?.(location);
  };

  const handleCustomDestSelect = (location: { name: string; lat: number; lng: number }) => {
    onCustomDestinationChange?.(location);
  };

  const clearCustomStart = () => {
    onCustomStartChange?.(null);
    setUseCustomStart(false);
  };

  const clearCustomDest = () => {
    onCustomDestinationChange?.(null);
    setUseCustomDest(false);
  };

  const displayStartName = useCustomStart && customStart 
    ? customStart.name 
    : START_POINTS[startPoint]?.name || 'Select start';
  
  const displayDestName = useCustomDest && customDestination 
    ? customDestination.name 
    : DESTINATIONS[destination]?.name || 'Select destination';

  return (
    <Card className="border-red-200 mb-6 bg-gradient-to-r from-red-50 to-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-red-600" />
            Plan Your Trip
          </h3>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            Enter any address
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
                Starting Point (Singapore)
              </label>
              <Button
                variant={useCustomStart ? "default" : "outline"}
                size="sm"
                onClick={() => setUseCustomStart(!useCustomStart)}
                className={`text-xs h-6 px-2 ${useCustomStart ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {useCustomStart ? "✓ Custom" : "Enter custom address"}
              </Button>
            </div>
            {useCustomStart ? (
              <AddressAutocomplete
                placeholder="Type any Singapore address..."
                country="sg"
                onSelect={handleCustomStartSelect}
                onClear={clearCustomStart}
                value={customStart?.name}
              />
            ) : (
              <Select value={startPoint} onValueChange={onStartPointChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select starting point" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(START_POINTS).map(([key, point]) => (
                    <SelectItem key={key} value={key}>
                      {point.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 inline mr-1 text-blue-500" />
                Destination (Malaysia)
              </label>
              <Button
                variant={useCustomDest ? "default" : "outline"}
                size="sm"
                onClick={() => setUseCustomDest(!useCustomDest)}
                className={`text-xs h-6 px-2 ${useCustomDest ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              >
                {useCustomDest ? "✓ Custom" : "Enter custom address"}
              </Button>
            </div>
            {useCustomDest ? (
              <AddressAutocomplete
                placeholder="Type any Malaysia address..."
                country="my"
                onSelect={handleCustomDestSelect}
                onClear={clearCustomDest}
                value={customDestination?.name}
              />
            ) : (
              <Select value={destination} onValueChange={onDestinationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DESTINATIONS).map(([key, dest]) => (
                    <SelectItem key={key} value={key}>
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 truncate max-w-[45%]">
              <MapPin className="w-4 h-4 inline mr-1 text-red-500" />
              {displayStartName}
            </span>
            <span className="text-gray-400 mx-2">→</span>
            <span className="text-gray-600 truncate max-w-[45%] text-right">
              <MapPin className="w-4 h-4 inline mr-1 text-blue-500" />
              {displayDestName}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
