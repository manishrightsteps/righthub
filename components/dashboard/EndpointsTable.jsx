import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { getResponseTimeColor } from '@/lib/utils/healthCheck';

function getStatusBadge(status) {
  if (status === 'healthy') {
    return (
      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs font-semibold">
        <CheckCircle2 className="w-3 h-3 mr-1.5" />
        HEALTHY
      </Badge>
    );
  }

  if (status === 'error') {
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs font-semibold">
        <XCircle className="w-3 h-3 mr-1.5" />
        ERROR
      </Badge>
    );
  }

  return (
    <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/30 font-mono text-xs font-semibold">
      <AlertCircle className="w-3 h-3 mr-1.5" />
      UNHEALTHY
    </Badge>
  );
}

export function EndpointsTable({ endpoints, healthData, loading }) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">$ health-endpoints --all</CardTitle>
        </div>
        <CardDescription>
          Monitoring {endpoints.length} health check endpoints across all modules
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-14"></TableHead>
              <TableHead className="w-32">MODULE</TableHead>
              <TableHead>ENDPOINT</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead className="text-right w-28">RESPONSE</TableHead>
              <TableHead className="text-right w-32">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-5 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              endpoints.map((endpoint) => {
                const data = healthData[endpoint.path];
                const Icon = endpoint.icon;
                return (
                  <TableRow
                    key={endpoint.path}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          data?.status === 'healthy'
                            ? 'bg-chart-2/10 text-chart-2'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs font-semibold">
                        {endpoint.module.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-foreground/90">
                      {endpoint.path}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {endpoint.description}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      <span
                        className={`${getResponseTimeColor(
                          data?.responseTime || 0
                        )} font-semibold`}
                      >
                        {data?.responseTime || 0}ms
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {data && getStatusBadge(data.status)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
