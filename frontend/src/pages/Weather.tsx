import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";
import axios from "axios";

// Use the same API key for both Geocoding and Weather APIs
const GEO_KEY = "AIzaSyCPDHU-JH3wl8XZpWlE9Qu2rYEUSqXGVlQ";
const WEATHER_KEY = "AIzaSyCPDHU-JH3wl8XZpWlE9Qu2rYEUSqXGVlQ";

const WeatherIcon = ({ condition, className }: { condition: string; className?: string }) => {
  switch (condition) {
    case "Sunny":
      return <Sun className={className} />;
    case "Partly Cloudy":
      return <Cloud className={className} />;
    case "Cloudy":
      return <Cloud className={className} />;
    case "Rainy":
      return <CloudRain className={className} />;
    case "Snowy":
      return <CloudSnow className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

const WeatherStatus = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!location) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      // 1️⃣ Get latitude & longitude from Geocoding API
      const geocodeRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${GEO_KEY}`
      );

      const results = geocodeRes.data.results;
      if (!results || results.length === 0) {
        setError("Location not found");
        setLoading(false);
        return;
      }

      const lat = results[0].geometry.location.lat;
      const lng = results[0].geometry.location.lng;

      // 2️⃣ Fetch weather using Google Weather API
      const weatherRes = await axios.get(
        `https://weather.googleapis.com/v1/currentConditions:lookup?key=${WEATHER_KEY}&location.latitude=${lat}&location.longitude=${lng}`
      );

      if (!weatherRes.data || !weatherRes.data.currentConditions) {
        setError("Weather data not found");
      } else {
        // Map Google API response to match your card structure
        const current = {
          temp: weatherRes.data.currentConditions.temperature,
          condition: weatherRes.data.currentConditions.weather,
          humidity: weatherRes.data.currentConditions.humidity ?? 0,
          wind: weatherRes.data.currentConditions.wind ?? 0,
        };

        // Optional: For demo, mock a 5-day forecast
        const forecast = [
          { day: "Mon", temp: current.temp + 1, condition: "Sunny" },
          { day: "Tue", temp: current.temp - 2, condition: "Rainy" },
          { day: "Wed", temp: current.temp + 2, condition: "Sunny" },
          { day: "Thu", temp: current.temp, condition: "Cloudy" },
          { day: "Fri", temp: current.temp + 3, condition: "Sunny" },
        ];

        setWeatherData({ current, forecast });
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Location input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Show Weather
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Weather Card */}
      {weatherData && (
        <Card>
          <CardHeader>
            <CardTitle>Weather in {location}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex flex-col items-center justify-center text-center col-span-1">
              <WeatherIcon
                condition={weatherData.current.condition}
                className="w-16 h-16 mb-2"
              />
              <p className="text-5xl font-bold">{weatherData.current.temp}°C</p>
              <p className="text-muted-foreground">{weatherData.current.condition}</p>
              <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                <span>Humidity: {weatherData.current.humidity}%</span>
                <span>Wind: {weatherData.current.wind} km/h</span>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-5 gap-2">
              {weatherData.forecast.map((day: any) => (
                <div
                  key={day.day}
                  className="flex flex-col items-center p-2 rounded-lg bg-accent/50"
                >
                  <p className="font-semibold">{day.day}</p>
                  <WeatherIcon condition={day.condition} className="w-8 h-8 my-2" />
                  <p>{day.temp}°</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherStatus;
