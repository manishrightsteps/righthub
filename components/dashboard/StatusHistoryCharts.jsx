import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { MemoryStick, Cpu, Clock, Zap, BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import { chartConfig } from '@/lib/endpoints';
import { getResponseTimeColor } from '@/lib/utils/healthCheck';

function ChartCard({ title, description, icon: Icon, iconColor, gradientColor, data, dataKey, gradientId, name, unit = '' }) {
  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className={`border-b bg-linear-to-r from-${gradientColor}/5 to-transparent`}>
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg bg-${gradientColor}/10 flex items-center justify-center`}>
            <Icon className={`w-5 h-5 text-${iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-72">
            <AreaChart data={data} margin={{ left: 12, right: 12, top: 12 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`hsl(var(--${gradientColor}))`} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={`hsl(var(--${gradientColor}))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={11}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey={dataKey}
                type="monotone"
                fill={`url(#${gradientId})`}
                stroke={`hsl(var(--${gradientColor}))`}
                strokeWidth={2.5}
                name={`${name} ${unit}`}
                dot={{ fill: `hsl(var(--${gradientColor}))`, r: 3 }}
                activeDot={{ r: 5, fill: `hsl(var(--${gradientColor}))` }}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-72 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatusHistoryCharts({ statusHistory }) {
  return (
    <div className="space-y-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="$ monitor --memory"
          description="Memory usage trends over time"
          icon={MemoryStick}
          iconColor="chart-1"
          gradientColor="chart-1"
          data={statusHistory}
          dataKey="memory.used"
          gradientId="memoryGradient"
          name="Memory"
          unit="(MB)"
        />

        <ChartCard
          title="$ monitor --cpu"
          description="CPU time consumption trends"
          icon={Cpu}
          iconColor="chart-2"
          gradientColor="chart-2"
          data={statusHistory}
          dataKey="cpu.user"
          gradientId="cpuUserGradient"
          name="CPU User"
        />

        <ChartCard
          title="$ monitor --uptime"
          description="System uptime progression"
          icon={Clock}
          iconColor="chart-3"
          gradientColor="chart-3"
          data={statusHistory}
          dataKey="uptime"
          gradientId="uptimeGradient"
          name="Uptime"
          unit="(s)"
        />

        <ChartCard
          title="$ monitor --response-time"
          description="API response time trends"
          icon={Zap}
          iconColor="chart-1"
          gradientColor="chart-1"
          data={statusHistory}
          dataKey="responseTime"
          gradientId="responseGradient"
          name="Response Time"
          unit="(ms)"
        />
      </div>

      {/* Historical Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-base">Status Records</CardTitle>
              <CardDescription className="text-xs">
                Recent system health snapshots
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">TIMESTAMP</TableHead>
                <TableHead className="font-semibold">STATUS</TableHead>
                <TableHead className="text-right font-semibold">UPTIME</TableHead>
                <TableHead className="text-right font-semibold">MEMORY</TableHead>
                <TableHead className="text-right font-semibold">RESPONSE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statusHistory.slice(0, 10).map((record, idx) => (
                <TableRow
                  key={record._id || idx}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-mono text-xs">
                    {new Date(record.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {record.status === 'healthy' ? (
                      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30 font-mono text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1.5" />
                        HEALTHY
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs">
                        <XCircle className="w-3 h-3 mr-1.5" />
                        UNHEALTHY
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold">
                    <span className="text-chart-3">{Math.floor(record.uptime / 60)}m</span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold">
                    <span className="text-chart-1">
                      {record.memory?.used?.toFixed(2)} MB
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-semibold">
                    <span className={getResponseTimeColor(record.responseTime || 0)}>
                      {record.responseTime}ms
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
