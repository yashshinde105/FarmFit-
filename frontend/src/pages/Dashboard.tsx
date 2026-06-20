import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  Droplets, 
  Thermometer, 
  Wind, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Map,
  Calendar,
  Download,
  Settings,
  RefreshCw
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import LiveAlerts from "../pages/LiveAlerts";
import WeatherStatus from "../components/WeatherStatus";
import EnvironmentalConditions from "@/components/EnvironmentalConditions";

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  
  // Sample data for charts
  const vegetationData = [
    { date: "2024-01-01", ndvi: 0.65, moisture: 45 },
    { date: "2024-01-02", ndvi: 0.67, moisture: 42 },
    { date: "2024-01-03", ndvi: 0.69, moisture: 38 },
    { date: "2024-01-04", ndvi: 0.71, moisture: 35 },
    { date: "2024-01-05", ndvi: 0.68, moisture: 40 },
    { date: "2024-01-06", ndvi: 0.72, moisture: 33 },
    { date: "2024-01-07", ndvi: 0.74, moisture: 30 }
  ];

  const temperatureData = [
    { date: "2024-01-01", temp: 22, humidity: 65 },
    { date: "2024-01-02", temp: 24, humidity: 62 },
    { date: "2024-01-03", temp: 26, humidity: 58 },
    { date: "2024-01-04", temp: 25, humidity: 60 },
    { date: "2024-01-05", temp: 23, humidity: 64 },
    { date: "2024-01-06", temp: 27, humidity: 55 },
    { date: "2024-01-07", temp: 28, humidity: 52 }
  ];



  const soilMetrics = [
    { label: "Soil Moisture", value: 32, unit: "%", status: "low", icon: Droplets },
    { label: "Air Temperature", value: 28, unit: "°C", status: "normal", icon: Thermometer },
    { label: "Humidity", value: 52, unit: "%", status: "normal", icon: Wind },
    { label: "Leaf Wetness", value: 15, unit: "%", status: "low", icon: Activity }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-success";
    }
  };

  const getAlertVariant = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-4 md:p-6 mt-[10vh]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Agricultural Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time insights for your precision agriculture operations
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border rounded-lg bg-background">
              {["24h", "7d"].map((range) => (
                <Button
                  key={range}
                  variant={selectedTimeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range)}
                  className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soilMetrics.map((metric, index) => (
            <Card key={index} className="card-gradient hover-lift border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                  <Badge variant={metric.status === "low" ? "destructive" : "secondary"}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}{metric.unit}
                  </p>
                </div>
                <Progress 
                  value={metric.value} 
                  className="mt-3" 
                  // Add color based on status
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveAlerts />
          <WeatherStatus />
        </div>

        <EnvironmentalConditions />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vegetation Trends */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Vegetation Stress Trends
              </CardTitle>
              <CardDescription>
                NDVI and moisture levels over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vegetationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--card-foreground))"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ndvi" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      name="NDVI"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="moisture" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Moisture %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Trends */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-warning" />
                Temperature & Humidity
              </CardTitle>
              <CardDescription>
                Environmental conditions monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--card-foreground))"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="hsl(var(--warning))" 
                      fill="hsl(var(--warning) / 0.2)"
                      name="Temperature (°C)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent) / 0.2)"
                      name="Humidity (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Risk Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Section */}
          <div className="lg:col-span-2">
            <Card className="card-gradient border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Active Alerts
                    </CardTitle>
                    <CardDescription>
                      Current risks and notifications
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Low Soil Moisture",
                      severity: "high",
                      description: "Sector 3 moisture levels critical",
                      time: "2 hours ago"
                    },
                    {
                      id: 2,
                      title: "Temperature Warning",
                      severity: "medium", 
                      description: "Above average temperatures detected",
                      time: "4 hours ago"
                    }
                  ].map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg bg-background/50">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${getStatusColor(alert.severity)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{alert.title}</p>
                          <Badge variant={getAlertVariant(alert.severity)} className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Zones */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-destructive" />
                Risk Zones
              </CardTitle>
              <CardDescription>
                Predicted high-risk areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <p className="font-medium text-foreground">Sector 3</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    High pest activity risk
                  </p>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% risk level</p>
                </div>

                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <p className="font-medium text-foreground">Sector 7</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drought stress potential
                  </p>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">65% risk level</p>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <p className="font-medium text-foreground">Sector 1-2</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Optimal conditions
                  </p>
                  <Progress value={15} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">15% risk level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;