import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Server, CheckCircle2, Layers, Zap } from 'lucide-react';
import apiInventory from '@/lib/api.json';

export function StatsOverview({
  totalEndpoints,
  healthyCount,
  unhealthyCount,
  responseTime,
  healthData
}) {
  const totalModules = apiInventory.modules?.length || 0;

  // Calculate healthy modules (modules where health endpoint is healthy)
  const healthyModules = apiInventory.modules.filter(module => {
    const healthPath = `${module.path}/health`;
    return healthData[healthPath]?.status === 'healthy';
  }).length;

  const healthRate = totalEndpoints > 0
    ? Math.round((healthyCount / totalEndpoints) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Modules */}
      <Card className="relative overflow-hidden border-border/50 bg-linear-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs font-semibold tracking-wider">
              TOTAL_MODULES
            </CardDescription>
            <Layers className="w-5 h-5 text-primary/60" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight">
            {totalModules}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {healthyModules} online
          </p>
        </CardHeader>
      </Card>

      {/* Total Endpoints */}
      <Card className="relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/5 to-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs font-semibold tracking-wider">
              TOTAL_ENDPOINTS
            </CardDescription>
            <Server className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-primary">
            {totalEndpoints}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {healthyCount} healthy, {unhealthyCount} down
          </p>
        </CardHeader>
      </Card>

      {/* Health Rate */}
      <Card className="relative overflow-hidden border-chart-2/30 bg-linear-to-br from-chart-2/5 to-card hover:shadow-lg hover:shadow-chart-2/10 transition-all duration-300 hover:-translate-y-0.5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/10 rounded-full -mr-16 -mt-16" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs font-semibold tracking-wider">
              HEALTH_RATE
            </CardDescription>
            <CheckCircle2 className="w-5 h-5 text-chart-2" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-chart-2">
            {healthRate}
            <span className="text-lg ml-1.5 text-muted-foreground font-normal">%</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            System uptime
          </p>
        </CardHeader>
      </Card>

      {/* Average Response Time */}
      <Card className="relative overflow-hidden border-chart-1/30 bg-linear-to-br from-chart-1/5 to-card hover:shadow-lg hover:shadow-chart-1/10 transition-all duration-300 hover:-translate-y-0.5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-chart-1/10 rounded-full -mr-16 -mt-16" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs font-semibold tracking-wider">
              AVG_RESPONSE
            </CardDescription>
            <Zap className="w-5 h-5 text-chart-1" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-chart-1">
            {responseTime}
            <span className="text-lg ml-1.5 text-muted-foreground font-normal">ms</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {responseTime < 100 ? 'Excellent' : responseTime < 300 ? 'Good' : 'Slow'}
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}
