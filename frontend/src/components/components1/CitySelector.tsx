import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import axios from "axios";

export interface CityInfo {
  name: string;
  country?: string;
  lat?: number;
  lon?: number;
}

interface CitySelectorProps {
  onCitySelect: (cityInfo: CityInfo) => void;
}

const GEO_KEY = "1e0d2ca63c504b1b95b7ba77eb331b6e"; // Replace with your real Geoapify key

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [suggestions, setSuggestions] = useState<CityInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&apiKey=${GEO_KEY}`
      );

      const cities: CityInfo[] =
        res.data.features?.map((item: any) => ({
          name: item.properties.city || item.properties.formatted,
          country: item.properties.country,
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
        })) || [];

      setSuggestions(cities);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Geoapify API error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    setSelectedCity(null); // Reset selected city
    if (value.trim().length > 1) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city: CityInfo) => {
    setCityInput(city.name); // Update input box
    setSelectedCity(city);   // Save selected city for submit
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    // Use selectedCity if available, else fallback to plain text
    onCitySelect(
      selectedCity || {
        name: cityInput.trim(),
        country: "",
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4 mt-[-13vh]">
      <Card className="border-none shadow-xl p-10 w-full max-w-3xl rounded-2xl bg-white relative">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
            style={{ backgroundColor: "#00B14020" }}
          >
            <MapPin className="w-10 h-10" style={{ color: "#00B140" }} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Select Your Farm Location
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enter your city name to access tailored weather forecasts for
            smarter farming decisions.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3 relative">
            {/* Input */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter city name (e.g., New York, London)"
                value={cityInput}
                onChange={handleInputChange}
                className="w-full border-green-500 focus-visible:ring-green-600 focus-visible:ring-2"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer text-foreground"
                      onClick={() => handleSelect(city)}
                    >
                      {city.name}
                      {city.country ? `, ${city.country}` : ""}
                    </li>
                  ))}
                </ul>
              )}

              {/* Loading State */}
              {loading && (
                <p className="absolute mt-2 text-sm text-gray-500">
                  Loading...
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="h-12 px-6 text-lg font-semibold flex items-center justify-center gap-2 rounded-lg shadow-md hover:scale-[1.02] transition-transform whitespace-nowrap"
              style={{
                backgroundColor: "#00B140",
                color: "#fff",
                borderColor: "#00B140",
              }}
              disabled={!cityInput.trim()}
            >
              <MapPin className="w-5 h-5" />
              Get Forecast
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CitySelector;
