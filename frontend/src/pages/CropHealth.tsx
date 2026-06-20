import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sprout, 
  Droplets, 
  Bug, 
  Sun, 
  Thermometer,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const CropHealth = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedCrop, setSelectedCrop] = useState("all");
  
  // Sample data for charts
  const ndviData = [
    { date: "2024-01-01", ndvi: 0.65 },
    { date: "2024-01-02", ndvi: 0.67 },
    { date: "2024-01-03", ndvi: 0.69 },
    { date: "2024-01-04", ndvi: 0.71 },
    { date: "2024-01-05", ndvi: 0.68 },
    { date: "2024-01-06", ndvi: 0.72 },
    { date: "2024-01-07", ndvi: 0.74 }
  ];

  const healthScoreData = [
    { name: 'Excellent', value: 45 },
    { name: 'Good', value: 30 },
    { name: 'Fair', value: 15 },
    { name: 'Poor', value: 10 },
  ];

  const COLORS = ['#4ade80', '#22c55e', '#f59e0b', '#ef4444'];

  const cropTypes = [
    { name: "All Crops", value: "all" },
    { name: "Corn", value: "corn" },
    { name: "Soybeans", value: "soybeans" },
    { name: "Wheat", value: "wheat" },
  ];

  const healthMetrics = [
    { label: "NDVI Score", value: 0.72, maxValue: 1, status: "good", icon: Sprout },
    { label: "Soil Moisture", value: 32, maxValue: 100, unit: "%", status: "warning", icon: Droplets },
    { label: "Pest Risk", value: 15, maxValue: 100, unit: "%", status: "good", icon: Bug },
    { label: "Sunlight", value: 85, maxValue: 100, unit: "%", status: "good", icon: Sun },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-destructive";
      case "warning": return "text-warning";
      case "good": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "warning";
      case "good": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Crop Health Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Detailed analysis and health metrics for your crops
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex border rounded-lg bg-background">
            {["24h", "7d", "30d"].map((range) => (
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
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Crop Type Selector */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {cropTypes.map((crop) => (
              <Button
                key={crop.value}
                variant={selectedCrop === crop.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCrop(crop.value)}
              >
                {crop.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="card-gradient hover-lift border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                <Badge variant={getBadgeVariant(metric.status) as 'default' | 'outline' | 'destructive' | 'secondary'}>
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}{metric.unit || ''}
                </p>
              </div>
              <Progress 
                value={(metric.value / metric.maxValue) * 100} 
                className="mt-3" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NDVI Trend Chart */}
      <Card className="card-gradient border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                NDVI Trend Analysis
              </CardTitle>
              <CardDescription>
                Normalized Difference Vegetation Index over time
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ndviData} key={'line-chart'}>
                <defs>
                  <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#ndviGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Distribution and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Distribution */}
        <Card className="card-gradient border-0 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Health Distribution
            </CardTitle>
            <CardDescription>
              Overall crop health status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthScoreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(props) => {
                      const total = healthScoreData.reduce((acc, curr) => acc + curr.value, 0);
                      const percentage = Number(props.value) / total * 100;
                      return `${props.name} ${percentage.toFixed(0)}%`;
                    }}
                  >
                    {healthScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="card-gradient border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Actionable insights based on current crop health data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="irrigation">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                <TabsTrigger value="pest">Pest Control</TabsTrigger>
              </TabsList>
              <TabsContent value="irrigation" className="space-y-4 mt-4">
                <div className="p-4 border rounded-lg bg-background/50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    Irrigation Schedule
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on soil moisture levels and weather forecast:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Increase irrigation in Sector 3 by 15% to address low moisture levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Maintain current irrigation schedule for Sectors 1, 2, and 4</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Next scheduled irrigation: Tomorrow at 6:00 AM</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="fertilizer" className="space-y-4 mt-4">
                <div className="p-4 border rounded-lg bg-background/50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-primary" />
                    Fertilizer Recommendations
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on soil nutrient analysis:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Apply nitrogen-rich fertilizer to Sectors 1 and 2 within the next 5 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Phosphorus levels are optimal across all sectors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Consider potassium supplement for Sector 4 in two weeks</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="pest" className="space-y-4 mt-4">
                <div className="p-4 border rounded-lg bg-background/50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Bug className="h-4 w-4 text-primary" />
                    Pest Control Actions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on pest detection analysis:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Monitor for aphid activity in northern fields (Sector 3)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>No immediate action required for other sectors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">•</span>
                      <span>Schedule preventative treatment for Sector 3 within 7 days</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropHealth;