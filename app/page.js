'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Cpu, TrendingUp, FileStack, FileJson } from 'lucide-react';
import {
  Header,
  StatsOverview,
  EndpointsTable,
  ServicesOverview,
  SystemMetrics,
  StatusHistoryCharts,
  ApiDetails,
} from '@/components/dashboard';
import { healthEndpoints } from '@/lib/endpoints';
import { useHealthData } from '@/hooks/useHealthData';

import apiData from '@/lib/api.json';

// Calculate total endpoints recursively
const countEndpoints = (modules) => {
  let count = 0;
  if (!modules) return 0;
  modules.forEach(m => {
    if (m.endpoints) count += m.endpoints.length;
    if (m.subModules) count += countEndpoints(m.subModules);
  });
  return count;
};

export default function Home() {
  const {
    healthData,
    statusHistory,
    detailedData,
    loading,
    lastUpdate,
    healthyCount,
    unhealthyCount,
  } = useHealthData();
  
  const totalApiEndpoints = countEndpoints(apiData.modules);

  const responseTime =
    detailedData?.responseTime ||
    healthData['/health/detailed']?.responseTime ||
    0;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 font-mono">
      <Header detailedData={detailedData} lastUpdate={lastUpdate} />

      <div className="container mx-auto px-6 py-8 space-y-8">
        <StatsOverview
          totalEndpoints={totalApiEndpoints}
          monitoredEndpoints={healthEndpoints.length}
          healthyCount={healthyCount}
          unhealthyCount={unhealthyCount}
          responseTime={responseTime}
          healthData={healthData}
        />

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="bg-muted/50 p-1.5 h-auto gap-1">
            <TabsTrigger
              value="endpoints"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold"
            >
              <Terminal className="w-4 h-4 mr-2" />
              ENDPOINTS
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold"
            >
              <FileStack className="w-4 h-4 mr-2" />
              SERVICES
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold"
            >
              <FileJson className="w-4 h-4 mr-2" />
              API_DETAILS
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold"
            >
              <Cpu className="w-4 h-4 mr-2" />
              SYSTEM_METRICS
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-semibold"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              STATUS_HISTORY
            </TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4 mt-6">
            <EndpointsTable
              endpoints={healthEndpoints}
              healthData={healthData}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesOverview healthData={healthData} />
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <ApiDetails apiData={apiData} />
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <SystemMetrics detailedData={detailedData} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <StatusHistoryCharts statusHistory={statusHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
