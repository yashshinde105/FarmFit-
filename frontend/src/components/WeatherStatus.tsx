import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";

const weatherData = {
  current: {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 68,
    wind: 12,
  },
  forecast: [
    { day: "Mon", temp: 25, condition: "Sunny" },
    { day: "Tue", temp: 22, condition: "Rainy" },
    { day: "Wed", temp: 26, condition: "Sunny" },
    { day: "Thu", temp: 24, condition: "Cloudy" },
    { day: "Fri", temp: 27, condition: "Sunny" },
  ],
};

const WeatherIcon = ({ condition, className }: { condition: string, className?: string }) => {
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Status</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex flex-col items-center justify-center text-center col-span-1">
          <WeatherIcon condition={weatherData.current.condition} className="w-16 h-16 mb-2" />
          <p className="text-5xl font-bold">{weatherData.current.temp}°C</p>
          <p className="text-muted-foreground">{weatherData.current.condition}</p>
          <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
            <span>Humidity: {weatherData.current.humidity}%</span>
            <span>Wind: {weatherData.current.wind} km/h</span>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-5 gap-2">
          {weatherData.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center p-2 rounded-lg bg-accent/50">
              <p className="font-semibold">{day.day}</p>
              <WeatherIcon condition={day.condition} className="w-8 h-8 my-2" />
              <p>{day.temp}°</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherStatus;