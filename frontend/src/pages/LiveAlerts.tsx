import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    severity: 'high',
    title: 'High Temperature Alert',
    description: 'The temperature in Greenhouse 1 has exceeded the optimal range. Please check the ventilation system.',
    time: '2 minutes ago',
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Low Humidity Alert',
    description: 'Humidity levels in the main field are dropping. Consider activating the irrigation system.',
    time: '15 minutes ago',
  },
  {
    id: 3,
    severity: 'low',
    title: 'Equipment Maintenance',
    description: 'Tractor 2 is due for routine maintenance in 3 days.',
    time: '1 hour ago',
  },
];

const getAlertIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case 'medium':
      return <Bell className="h-5 w-5 text-warning" />;
    default:
      return <Info className="h-5 w-5 text-info" />;
  }
};

const getAlertVariant = (severity: string): "default" | "destructive" | "outline" | null | undefined => {
  switch (severity) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    default:
      return 'outline';
  }
};

const LiveAlerts = () => {
  return (
    <Card className="card-gradient border-0 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Live Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={getAlertVariant(alert.severity) as "destructive" | "default"} className="flex items-start gap-4">
              <div className="pt-0.5">
                {getAlertIcon(alert.severity)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
                  <Badge variant={getAlertVariant(alert.severity)} className="capitalize">
                    {alert.severity}
                  </Badge>
                </div>
                <AlertDescription className="text-muted-foreground">
                  {alert.description}
                </AlertDescription>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveAlerts;