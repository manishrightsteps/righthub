/**
 * Determines if an endpoint is healthy based on its response data
 * @param {Object} data - The response data from the endpoint
 * @param {string} path - The endpoint path
 * @returns {boolean} - Whether the endpoint is healthy
 */
export function isEndpointHealthy(data, path) {
  if (!data?.success) return false;

  // Special cases for different endpoint types
  if (path === '/health/ready') {
    return data.data?.status === 'ready';
  }

  if (path === '/health/live') {
    return data.data?.status === 'alive';
  }

  if (path === '/health/database') {
    return data.data?.postgresql && data.data?.mongodb && data.data?.redis;
  }

  // If there's a status field, check if it's "healthy"
  if (data.data?.status) {
    return data.data.status === 'healthy';
  }

  // For module endpoints that just return success: true
  return true;
}

/**
 * Categorizes response time into performance levels
 * @param {number} responseTime - Response time in milliseconds
 * @returns {'excellent'|'good'|'slow'} - Performance category
 */
export function categorizeResponseTime(responseTime) {
  if (responseTime < 100) return 'excellent';
  if (responseTime < 300) return 'good';
  return 'slow';
}

/**
 * Gets the appropriate color class for response time
 * @param {number} responseTime - Response time in milliseconds
 * @returns {string} - Tailwind color class
 */
export function getResponseTimeColor(responseTime) {
  const category = categorizeResponseTime(responseTime);
  return {
    excellent: 'text-chart-2',
    good: 'text-chart-1',
    slow: 'text-destructive',
  }[category];
}
