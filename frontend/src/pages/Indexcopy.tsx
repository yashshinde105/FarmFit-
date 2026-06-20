import { useState } from "react";
import WeatherForecast from "@/components/components1/WeatherForecast";
import CitySelector from "@/components/components1/CitySelector";
import { CityInfo } from "@/components/components1/CitySelector";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Indexcopy = () => {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);

  const handleCitySelect = (cityInfo: CityInfo) => {
    setSelectedCity(cityInfo);
  };

  const handleBackToSelection = () => {
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <div className="container mx-auto px-6 py-12">
        {/* 🌾 Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-green-800 mb-4 tracking-tight drop-shadow-sm">
            🌾 Agricultural Weather Hub
          </h1>
          <p className="text-xl text-gray-600">
            Smart farming starts with{" "}
            <span className="font-semibold text-green-700">
              accurate weather insights
            </span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {!selectedCity ? (
            <div className="animate-fade-in">
              <CitySelector onCitySelect={handleCitySelect} />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* 🔙 Back Button & City Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <Button
                  variant="outline"
                  onClick={handleBackToSelection}
                  className="flex items-center gap-2 hover:bg-green-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Location
                </Button>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-green-900">
                    {selectedCity.name}
                    {selectedCity.country ? `, ${selectedCity.country}` : ""}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Agricultural Weather Forecast
                  </p>
                </div>
              </div>

              {/* 🌤 Forecast Section - WIDE Dashboard Style */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
                <WeatherForecast
                  city={selectedCity.name}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Indexcopy;
