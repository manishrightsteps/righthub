import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Cpu, MemoryStick, Server, Database, HardDrive, Circle, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SystemMetrics({ detailedData }) {
  if (!detailedData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Memory & CPU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory Usage */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-chart-1/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <MemoryStick className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <CardTitle className="text-base">$ system-info --memory</CardTitle>
                <CardDescription className="text-xs">
                  Memory allocation and usage
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {detailedData.memory ? (
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted-foreground font-medium">HEAP_USED</span>
                    <span className="font-bold text-chart-1">
                      {detailedData.memory.used.toFixed(2)} MB
                    </span>
                  </div>
                  <Progress
                    value={(detailedData.memory.used / detailedData.memory.total) * 100}
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{detailedData.memory.used.toFixed(2)} MB used</span>
                    <span>{detailedData.memory.total.toFixed(2)} MB total</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-5 border-t">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">RSS</p>
                    <p className="text-base font-bold">
                      {detailedData.memory.rss?.toFixed(2)}{' '}
                      <span className="text-xs text-muted-foreground">MB</span>
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                      EXTERNAL
                    </p>
                    <p className="text-base font-bold">
                      {detailedData.memory.external?.toFixed(2)}{' '}
                      <span className="text-xs text-muted-foreground">MB</span>
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-chart-1/10 border border-chart-1/20">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">TOTAL</p>
                    <p className="text-base font-bold text-chart-1">
                      {detailedData.memory.total.toFixed(2)}{' '}
                      <span className="text-xs text-muted-foreground">MB</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Skeleton className="h-48 w-full" />
            )}
          </CardContent>
        </Card>

        {/* CPU Usage */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="border-b bg-linear-to-r from-chart-2/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <CardTitle className="text-base">$ system-info --cpu</CardTitle>
                <CardDescription className="text-xs">
                  Process CPU time consumption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {detailedData.cpu ? (
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted-foreground font-medium">USER_TIME</span>
                    <span className="font-bold text-chart-2">
                      {(detailedData.cpu.usage.user / 1000000).toFixed(2)}s
                    </span>
                  </div>
                  <Progress value={60} className="h-3 [&>div]:bg-chart-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted-foreground font-medium">SYSTEM_TIME</span>
                    <span className="font-bold text-chart-3">
                      {(detailedData.cpu.usage.system / 1000000).toFixed(2)}s
                    </span>
                  </div>
                  <Progress value={40} className="h-3 [&>div]:bg-chart-3" />
                </div>

                <div className="pt-5 border-t text-center p-4 rounded-lg bg-linear-to-br from-chart-2/10 to-chart-3/10 border border-chart-2/20">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    TOTAL_CPU_TIME
                  </p>
                  <p className="text-3xl font-bold text-chart-2">
                    {((detailedData.cpu.usage.user + detailedData.cpu.usage.system) / 1000000).toFixed(2)}
                    <span className="text-base ml-1 text-muted-foreground font-normal">s</span>
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-48 w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Node Info */}
      {detailedData.nodeInfo && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b bg-linear-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">$ node --version</CardTitle>
                <CardDescription className="text-xs">Node.js runtime information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
                  <Circle className="w-3 h-3 fill-primary text-primary" />
                  NODE_VERSION
                </p>
                <p className="text-sm font-mono font-semibold">
                  {detailedData.nodeInfo.nodeVersion}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
                  <Circle className="w-3 h-3 fill-chart-2 text-chart-2" />
                  PLATFORM
                </p>
                <p className="text-sm font-mono font-semibold">
                  {detailedData.nodeInfo.platform}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
                  <Circle className="w-3 h-3 fill-chart-1 text-chart-1" />
                  ARCHITECTURE
                </p>
                <p className="text-sm font-mono font-semibold">{detailedData.nodeInfo.arch}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
                  <Circle className="w-3 h-3 fill-chart-3 text-chart-3" />
                  PROCESS_ID
                </p>
                <p className="text-sm font-mono font-semibold">{detailedData.nodeInfo.pid}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database Connections */}
      {detailedData.databases && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b bg-linear-to-r from-chart-2/5 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <CardTitle className="text-base">$ database-status --all</CardTitle>
                <CardDescription className="text-xs">
                  Database connections & latency metrics
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* PostgreSQL */}
              {detailedData.databases.postgresql && (
                <div className="border border-border/50 rounded-xl p-5 bg-linear-to-br from-card to-muted/20 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-chart-2" />
                      <h4 className="font-bold">PostgreSQL</h4>
                    </div>
                    {detailedData.databases.postgresql.read &&
                    detailedData.databases.postgresql.write ? (
                      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-chart-2 mr-1.5 animate-pulse" />
                        ONLINE
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-destructive mr-1.5" />
                        OFFLINE
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center p-3 bg-muted/60 rounded-lg border border-border/30">
                      <span className="text-xs text-muted-foreground font-medium">READ</span>
                      <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                        {detailedData.databases.postgresql.read ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}
                        <span className="text-chart-2">
                          {detailedData.databases.postgresql.readLatency}ms
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/60 rounded-lg border border-border/30">
                      <span className="text-xs text-muted-foreground font-medium">WRITE</span>
                      <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                        {detailedData.databases.postgresql.write ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}
                        <span className="text-chart-2">
                          {detailedData.databases.postgresql.writeLatency}ms
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MongoDB */}
              {detailedData.databases.mongodb && (
                <div className="border border-border/50 rounded-xl p-5 bg-linear-to-br from-card to-muted/20 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-chart-2" />
                      <h4 className="font-bold">MongoDB</h4>
                    </div>
                    {detailedData.databases.mongodb.connected ? (
                      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-chart-2 mr-1.5 animate-pulse" />
                        ONLINE
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-destructive mr-1.5" />
                        OFFLINE
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center p-3 bg-muted/60 rounded-lg border border-border/30">
                      <span className="text-xs text-muted-foreground font-medium">STATUS</span>
                      <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                        {detailedData.databases.mongodb.connected ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}
                        {detailedData.databases.mongodb.connected ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>
                    <div className="p-4 bg-linear-to-br from-chart-2/10 to-chart-2/5 rounded-lg border border-chart-2/20 text-center">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">LATENCY</p>
                      <p className="text-2xl font-mono font-bold text-chart-2">
                        {detailedData.databases.mongodb.latency}
                        <span className="text-sm ml-1 text-muted-foreground">ms</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Redis */}
              {detailedData.databases.redis && (
                <div className="border border-border/50 rounded-xl p-5 bg-linear-to-br from-card to-muted/20 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-chart-2" />
                      <h4 className="font-bold">Redis</h4>
                    </div>
                    {detailedData.databases.redis.connected ? (
                      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-chart-2 mr-1.5 animate-pulse" />
                        ONLINE
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs">
                        <Circle className="w-2 h-2 fill-destructive mr-1.5" />
                        OFFLINE
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center p-3 bg-muted/60 rounded-lg border border-border/30">
                      <span className="text-xs text-muted-foreground font-medium">STATUS</span>
                      <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                        {detailedData.databases.redis.connected ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}
                        {detailedData.databases.redis.connected ? 'CONNECTED' : 'DISCONNECTED'}
                      </span>
                    </div>
                    <div className="p-4 bg-linear-to-br from-chart-2/10 to-chart-2/5 rounded-lg border border-chart-2/20 text-center">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">LATENCY</p>
                      <p className="text-2xl font-mono font-bold text-chart-2">
                        {detailedData.databases.redis.latency}
                        <span className="text-sm ml-1 text-muted-foreground">ms</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
