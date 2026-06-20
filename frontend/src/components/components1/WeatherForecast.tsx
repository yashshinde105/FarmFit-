import React, { useState, useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherData {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface WeatherForecastProps {
  lat?: number;
  lon?: number;
  className?: string;
  city?: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  lat = 40.7128,
  lon = -74.0060,
  className = "",
  city = "New York",
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (selectedCity = city) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch weather forecast from WeatherAPI
      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=7f66d230ccd943fb8bd172317252009&q=${encodeURIComponent(
          selectedCity
        )}&days=7&aqi=no&alerts=no`
      );

      if (!weatherRes.ok) throw new Error(`Weather fetch failed: ${weatherRes.status}`);
      const data = await weatherRes.json();

      // Transform API response to match existing WeatherData interface
      const dailyData: WeatherData[] = data.forecast.forecastday.map((day: any) => ({
        dt: new Date(day.date).getTime() / 1000, // unix timestamp
        temp: {
          min: day.day.mintemp_c,
          max: day.day.maxtemp_c,
        },
        weather: [
          {
            description: day.day.condition.text,
            icon: `https:${day.day.condition.icon}`,
          },
        ],
      }));

      setWeatherData(dailyData);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const formatTemperature = (temp: number) => Math.round(temp);

  const getDayName = (timestamp: number) => {
    const today = new Date();
    const weatherDate = fromUnixTime(timestamp);
    const isToday = format(today, 'yyyy-MM-dd') === format(weatherDate, 'yyyy-MM-dd');
    return isToday ? 'Today' : format(weatherDate, 'EEE');
  };

  const isToday = (timestamp: number) => {
    const today = new Date();
    const weatherDate = fromUnixTime(timestamp);
    return format(today, 'yyyy-MM-dd') === format(weatherDate, 'yyyy-MM-dd');
  };

  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getFarmingAdvice = (weatherDesc: string, temp: { min: number; max: number }) => {
    const maxTemp = temp.max;
    const minTemp = temp.min;
    if (weatherDesc.toLowerCase().includes('rain')) return "💧 Good for irrigation";
    if (weatherDesc.toLowerCase().includes('clear') && maxTemp > 25) return "☀️ Perfect for harvesting";
    if (minTemp < 10) return "🌡️ Protect crops from cold";
    if (weatherDesc.toLowerCase().includes('cloud')) return "🌱 Ideal for planting";
    return "🌾 Good farming weather";
  };

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-agriculture-bg rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#00B140" }} />
            <p className="text-agriculture-muted font-medium">Loading farm weather forecast…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-agriculture-bg rounded-2xl p-8">
          <Card className="border-none shadow-agriculture bg-agriculture-card">
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <AlertCircle className="h-12 w-12" style={{ color: "#00B140" }} />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">Farm Weather Unavailable</h3>
                <p className="text-agriculture-muted text-sm max-w-md">{error}</p>
              </div>
              <Button
                onClick={() => fetchWeatherData(city)}
                variant="outline"
                size="sm"
                style={{
                  backgroundColor: "#00B140",
                  color: "#fff",
                  borderColor: "#00B140",
                }}
                className="mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-agriculture-bg rounded-2xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Farm Weather Forecast</h2>
          <p className="text-agriculture-muted">7-day agricultural weather outlook for optimal farming</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {weatherData.map((day, index) => (
            <Card
              key={day.dt}
              className={`border-none shadow-agriculture hover:shadow-agriculture-hover transition-all duration-300 cursor-pointer group ${
                isToday(day.dt) 
                  ? 'bg-agriculture-card ring-2 ring-primary shadow-lg scale-105' 
                  : 'bg-agriculture-card hover:bg-agriculture-card-hover'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 text-center space-y-3">
                {/* Day of week */}
                <div className="font-semibold text-foreground text-sm">{getDayName(day.dt)}</div>

                {/* Weather icon */}
                <div className="flex justify-center">
                  <img
                    src={day.weather[0].icon}
                    alt={day.weather[0].description}
                    className="w-12 h-12 group-hover:animate-weather-float transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    style={{ color: "#00B140" }}
                  />
                </div>

                {/* Weather condition & farming advice */}
                <div className="space-y-1">
                  <div className="text-xs text-agriculture-muted font-medium px-1">
                    {capitalizeFirst(day.weather[0].description)}
                  </div>
                  <div
                    className="text-xs font-medium px-1 rounded-full py-1"
                    style={{ color: "#00B140", backgroundColor: "#00B14020" }}
                  >
                    {getFarmingAdvice(day.weather[0].description, day.temp)}
                  </div>
                </div>

                {/* Temperature range */}
                <div className="space-y-1">
                  <div className="text-lg font-bold text-foreground">{formatTemperature(day.temp.max)}°</div>
                  <div className="text-sm text-agriculture-muted">{formatTemperature(day.temp.min)}°</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-agriculture-muted">
            Temperatures in Celsius • Optimized for agricultural planning • Updated hourly
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
