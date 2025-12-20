import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield, Users, CreditCard, Upload, Settings, AlertCircle,
  Network, Activity, CheckCircle2, FileStack
} from 'lucide-react';
import apiInventory from '@/lib/api.json';

const moduleIcons = {
  'Auth Module': Shield,
  'Profile Module': Users,
  'Subscription Module': CreditCard,
  'Upload Module': Upload,
  'Admin Module': Settings,
  'Notification Module': AlertCircle,
  'Community Module': Network,
  'Health Module': Activity,
};

function getModuleIcon(moduleName) {
  const Icon = moduleIcons[moduleName] || FileStack;
  return Icon;
}

function getStatusColor(status) {
  const colors = {
    completed: 'bg-chart-2/10 text-chart-2 border-chart-2/30',
    'in-progress': 'bg-chart-1/10 text-chart-1 border-chart-1/30',
    pending: 'bg-muted text-muted-foreground border-border',
  };
  return colors[status] || colors.pending;
}

export function ServicesOverview({ healthData }) {
  const modules = apiInventory.modules || [];

  return (
    <div className="space-y-6">
      {/* Project Info */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="border-b bg-linear-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{apiInventory.project.name}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {apiInventory.project.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-xs">
                v{apiInventory.project.version}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {modules.length} Modules
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = getModuleIcon(module.name);
          const modulePath = module.path;
          const healthPath = `${modulePath}/health`;
          const healthStatus = healthData[healthPath];

          // Count total endpoints
          let endpointCount = 0;
          if (module.endpoints) {
            endpointCount = module.endpoints.length;
          } else if (module.subModules) {
            endpointCount = module.subModules.reduce(
              (sum, sub) => sum + (sub.endpoints?.length || 0),
              0
            );
          }

          return (
            <Card
              key={module.name}
              className="border-border/50 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge
                      className={`font-mono text-xs ${getStatusColor(module.status)}`}
                    >
                      {module.status?.toUpperCase() || 'UNKNOWN'}
                    </Badge>
                    {healthStatus && (
                      <Badge
                        className={`text-xs ${
                          healthStatus.status === 'healthy'
                            ? 'bg-chart-2/10 text-chart-2 border-chart-2/30'
                            : 'bg-destructive/10 text-destructive border-destructive/30'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {healthStatus.status === 'healthy' ? 'ONLINE' : 'OFFLINE'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <CardTitle className="text-base font-bold">{module.name}</CardTitle>
                  <CardDescription className="text-xs mt-1.5 line-clamp-2">
                    {module.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Endpoints</span>
                  <span className="font-mono font-semibold">{endpointCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted-foreground">Path</span>
                  <span className="font-mono text-xs">{module.path}</span>
                </div>
                {healthStatus?.responseTime && (
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">Response</span>
                    <span className="font-mono font-semibold text-chart-2">
                      {healthStatus.responseTime}ms
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tech Stack */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-base">Technology Stack</CardTitle>
          <CardDescription className="text-xs">
            Production architecture and infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                DATABASE
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  PostgreSQL
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  MongoDB
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  Prisma ORM
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                CACHING & QUEUE
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  Redis
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  BullMQ
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                REAL-TIME
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  Socket.io
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                VALIDATION & LOGGING
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  Zod
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  Winston
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                STORAGE
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  AWS S3
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  ImageKit
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">
                PAYMENTS
              </h4>
              <div className="space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  Stripe
                </Badge>
                <Badge variant="outline" className="font-mono text-xs ml-2">
                  PayPal
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
