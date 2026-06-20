import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Droplets, Wind, Sun, Gauge, Activity } from "lucide-react";
import { Button } from "./ui/button";

const environmentalData = [
  {
    name: "Soil Temperature",
    range: "18-26°C optimal",
    status: "Optimal",
    value: "22°C",
    change: "+1.2°C from yesterday",
    progress: 70,
    icon: <Thermometer className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: "Soil Moisture",
    range: "40-70% optimal",
    status: "Moderate",
    value: "45%",
    change: "-5% from yesterday",
    progress: 45,
    icon: <Droplets className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: "Air Humidity",
    range: "50-80% optimal",
    status: "Good",
    value: "68%",
    change: "+3% from yesterday",
    progress: 68,
    icon: <Activity className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: "Wind Speed",
    range: "5-25 km/h optimal",
    status: "Good",
    value: "12km/h",
    change: "Consistent light breeze",
    progress: 30,
    icon: <Wind className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: "UV Index",
    range: "4-6 moderate",
    status: "Moderate",
    value: "6.2",
    change: "Peak at 2 PM",
    progress: 80,
    icon: <Sun className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: "Atmospheric Pressure",
    range: "1000-1020 hPa normal",
    status: "Excellent",
    value: "1013hPa",
    change: "Stable conditions",
    progress: 65,
    icon: <Gauge className="w-6 h-6 text-muted-foreground" />,
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "optimal":
      return "success";
    case "good":
      return "success";
    case "moderate":
      return "warning";
    case "excellent":
        return "success";
    default:
      return "secondary";
  }
};

const EnvironmentalConditions = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Environmental Conditions</CardTitle>
        <Button variant="outline" size="sm">Live Sensors</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {environmentalData.map((metric) => (
          <div key={metric.name} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1">{metric.icon}</div>
            <div className="col-span-3">
              <p className="font-medium">{metric.name}</p>
              <p className="text-sm text-muted-foreground">{metric.range}</p>
            </div>
            <div className="col-span-2">
              <Badge variant={getStatusBadgeVariant(metric.status) as "destructive" | "secondary" | "default" | "outline"}>{metric.status}</Badge>
            </div>
            <div className="col-span-4">
              <Progress value={metric.progress} />
            </div>
            <div className="col-span-2 text-right">
              <p className="font-bold text-lg">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-12 gap-4 items-center pt-4 border-t">
            <div className="col-span-1"><Activity className="w-6 h-6 text-muted-foreground" /></div>
            <div className="col-span-3">
              <p className="font-medium">Overall Environmental Score</p>
              <p className="text-sm text-muted-foreground">Based on current sensor readings</p>
            </div>
            <div className="col-span-2">
              <Badge variant="default">Good</Badge>
            </div>
            <div className="col-span-4">
              <Progress value={82} />
            </div>
            <div className="col-span-2 text-right">
              <p className="font-bold text-lg">82/100</p>
              <p className="text-xs text-muted-foreground">Good conditions</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalConditions;