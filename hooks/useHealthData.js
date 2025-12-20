import { useState, useEffect } from 'react';
import { API_BASE_URL, healthEndpoints } from '@/lib/endpoints';
import { isEndpointHealthy } from '@/lib/utils/healthCheck';

/**
 * Custom hook to fetch and manage health data for all endpoints
 * @param {number} refreshInterval - Interval in milliseconds to refresh data (default: 300000 = 5 min)
 * @returns {Object} Health data state and loading status
 */
export function useHealthData(refreshInterval = 300000) {
  const [healthData, setHealthData] = useState({});
  const [statusHistory, setStatusHistory] = useState([]);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    const fetchHealthData = async () => {
      setLoading(true);
      const results = {};

      // Fetch all health endpoints
      for (const endpoint of healthEndpoints) {
        const startTime = Date.now();
        try {
          const response = await fetch(`${API_BASE_URL}${endpoint.path}`);
          const responseTime = Date.now() - startTime;
          const data = await response.json();

          const healthy = isEndpointHealthy(data, endpoint.path);

          results[endpoint.path] = {
            status: healthy ? 'healthy' : 'unhealthy',
            data: data,
            responseTime: responseTime,
            success: data.success,
          };

          // Store detailed data from the detailed health endpoint
          if (endpoint.path === '/health/detailed') {
            setDetailedData(data.data);
          }
        } catch (error) {
          results[endpoint.path] = {
            status: 'error',
            error: error.message,
            responseTime: Date.now() - startTime,
            success: false,
          };
        }
      }

      // Fetch status history for graphs
      try {
        const statusResponse = await fetch(`${API_BASE_URL}/health/status?limit=20`);
        const statusData = await statusResponse.json();
        if (statusData.success && statusData.data?.records) {
          setStatusHistory(statusData.data.records.reverse());
        }
      } catch (error) {
        console.error('Failed to fetch status history:', error);
      }

      setHealthData(results);
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString());
    };

    fetchHealthData();
    const interval = setInterval(fetchHealthData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const healthyCount = Object.values(healthData).filter(
    (d) => d.status === 'healthy'
  ).length;

  const unhealthyCount = Object.values(healthData).filter(
    (d) => d.status !== 'healthy'
  ).length;

  return {
    healthData,
    statusHistory,
    detailedData,
    loading,
    lastUpdate,
    healthyCount,
    unhealthyCount,
  };
}
