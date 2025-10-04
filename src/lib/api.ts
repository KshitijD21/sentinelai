import {
  TraceListItem,
  TraceDetails,
  DashboardMetrics,
  SecurityAlert,
  FilterOptions,
  ApiResponse,
  Execution,
  Case,
  AlertOperationResponse
} from '@/types';
import {
  mockTraceList,
  mockTraceDetails,
  mockDashboardMetrics,
  mockSecurityAlerts,
  mockExecutions
} from '@/data/mock-data';

/**
 * API client for SentinelAI platform
 * Provides REST endpoints for data fetching with manual refresh capability
 * Currently uses mock data - replace with actual API calls in production
 */

/**
 * Base API configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Generic API request wrapper with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    console.log(`🔄 API Request: ${API_BASE_URL}${endpoint}`);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, success: true, status: response.status };

  } catch (error) {
    console.error(`❌ API Error for ${endpoint}:`, error);

    // Fallback to mock data in case of network error
    let mockData: unknown;

    switch (endpoint) {
      case '/api/executions':
        mockData = mockExecutions;
        break;
      case '/api/dashboard/stats':
        mockData = mockDashboardMetrics;
        break;
      case '/alerts':
        mockData = mockSecurityAlerts;
        break;
      default:
        if (endpoint.startsWith('/api/executions/')) {
          const executionId = endpoint.split('/')[3];
          mockData = mockExecutions.find(exec => exec.execution_id === executionId) || null;
        } else if (endpoint.includes('/search?q=')) {
          const query = endpoint.split('q=')[1]?.toLowerCase() || '';
          mockData = mockExecutions.filter(exec =>
            exec.user_prompt.toLowerCase().includes(decodeURIComponent(query)) ||
            exec.agents.some(agent =>
              agent.agent_name.toLowerCase().includes(decodeURIComponent(query)) ||
              agent.task.toLowerCase().includes(decodeURIComponent(query))
            )
          );
        } else {
          mockData = null;
        }
    }

    // Return mock data as successful response, but include warning
    console.warn(`Using mock data for ${endpoint} due to API error:`, error);

    return {
      data: mockData as T,
      error: error instanceof Error ? error.message : 'Unknown error',
      success: mockData !== null, // Success if we have mock data
      status: mockData !== null ? 200 : 500
    };
  }
}

/**
 * Traces API endpoints
 */
export const tracesApi = {
  /**
   * Get list of traces with optional filtering
   * @param filters - Filter options for traces
   * @returns Promise with trace list
   */
  getTraces: async (filters?: FilterOptions): Promise<ApiResponse<TraceListItem[]>> => {
    console.log('🔍 Fetching traces with filters:', filters);

    let endpoint = '/traces';

    // Add query parameters if filters are provided
    if (filters) {
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.agent) params.append('agent', filters.agent);
      if (filters.status) params.append('status', filters.status);
      if (filters.risk) params.append('risk', filters.risk);
      if (filters.timeRange) params.append('timeRange', filters.timeRange);

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
    }

    return apiRequest<TraceListItem[]>(endpoint);
  },

  /**
   * Get detailed information for a specific trace
   * @param traceId - Unique trace identifier
   * @returns Promise with trace details
   */
  getTraceDetails: async (traceId: string): Promise<ApiResponse<TraceDetails>> => {
    console.log('📊 Fetching trace details for:', traceId);
    return apiRequest<TraceDetails>(`/traces/${traceId}`);
  },

  /**
   * Retry a failed trace execution
   * @param traceId - Trace to retry
   * @returns Promise with new trace details
   */
  retryTrace: async (traceId: string): Promise<ApiResponse<TraceDetails>> => {
    console.log('🔄 Retrying trace:', traceId);
    // TODO: Implement actual retry logic
    return apiRequest<TraceDetails>(`/traces/${traceId}/retry`, {
      method: 'POST'
    });
  },

  /**
   * Create investigation case from trace
   * @param traceId - Trace to create case for
   * @returns Promise with case details
   */
  createCase: async (traceId: string): Promise<ApiResponse<Case>> => {
    console.log('📝 Creating case for trace:', traceId);
    // TODO: Implement actual case creation
    return apiRequest<Case>(`/traces/${traceId}/case`, {
      method: 'POST'
    });
  }
};

/**
 * Dashboard API endpoints
 */
export const dashboardApi = {
  /**
   * Get dashboard metrics and KPIs
   * @returns Promise with dashboard metrics
   */
  getMetrics: async (): Promise<ApiResponse<DashboardMetrics>> => {
    console.log('📊 Fetching dashboard metrics');
    return apiRequest<DashboardMetrics>('/dashboard/metrics');
  },

  /**
   * Get recent activity for dashboard
   * @param limit - Number of recent items to fetch
   * @returns Promise with recent traces
   */
  getRecentActivity: async (limit: number = 10): Promise<ApiResponse<TraceListItem[]>> => {
    console.log('📈 Fetching recent activity, limit:', limit);
    return apiRequest<TraceListItem[]>(`/dashboard/activity?limit=${limit}`);
  }
};

/**
 * Alerts API endpoints
 */
export const alertsApi = {
  /**
   * Get list of security alerts with optional filtering
   * @param filters - Filter options for alerts
   * @returns Promise with alerts list
   */
  getAlerts: async (filters?: {
    severity?: string;
    status?: string;
    timeRange?: string;
  }): Promise<ApiResponse<SecurityAlert[]>> => {
    console.log('🚨 Fetching alerts with filters:', filters);

    let endpoint = '/alerts';

    if (filters) {
      const params = new URLSearchParams();

      if (filters.severity) params.append('severity', filters.severity);
      if (filters.status) params.append('status', filters.status);
      if (filters.timeRange) params.append('timeRange', filters.timeRange);

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
    }

    return apiRequest<SecurityAlert[]>(endpoint);
  },

  /**
   * Acknowledge security alerts
   * @param alertIds - Array of alert IDs to acknowledge
   * @returns Promise with operation result
   */
  acknowledgeAlerts: async (alertIds: string[]): Promise<ApiResponse<AlertOperationResponse>> => {
    console.log('✅ Acknowledging alerts:', alertIds);
    // TODO: Implement actual acknowledgment
    return apiRequest<AlertOperationResponse>('/alerts/acknowledge', {
      method: 'POST',
      body: JSON.stringify({ alertIds })
    });
  },

  /**
   * Resolve security alerts
   * @param alertIds - Array of alert IDs to resolve
   * @returns Promise with operation result
   */
  resolveAlerts: async (alertIds: string[]): Promise<ApiResponse<AlertOperationResponse>> => {
    console.log('✅ Resolving alerts:', alertIds);
    // TODO: Implement actual resolution
    return apiRequest<AlertOperationResponse>('/alerts/resolve', {
      method: 'POST',
      body: JSON.stringify({ alertIds })
    });
  },

  /**
   * Assign alerts to a user
   * @param alertIds - Array of alert IDs to assign
   * @param assignee - User to assign alerts to
   * @returns Promise with operation result
   */
  assignAlerts: async (alertIds: string[], assignee: string): Promise<ApiResponse<AlertOperationResponse>> => {
    console.log('👤 Assigning alerts to:', assignee, alertIds);
    // TODO: Implement actual assignment
    return apiRequest<AlertOperationResponse>('/alerts/assign', {
      method: 'POST',
      body: JSON.stringify({ alertIds, assignee })
    });
  }
};

/**
 * Agent API endpoints
 */
export const agentsApi = {
  /**
   * Get list of available agent types for filtering
   * @returns Promise with agent types
   */
  getAgentTypes: async (): Promise<ApiResponse<string[]>> => {
    console.log('🤖 Fetching agent types');
    // TODO: Implement actual agent types endpoint
    const agentTypes = [
      'TransactionGuard',
      'MarketTrend',
      'CustomerSupport',
      'FinanceAgent',
      'DataMiner',
      'SecurityScanner',
      'ComplianceBot',
      'AIAssistant',
      'DocumentProcessor',
      'RiskAnalyzer',
      'TradingBot'
    ];

    return {
      data: agentTypes,
      success: true,
      status: 200
    };
  }
};

/**
 * System API endpoints
 */
export const systemApi = {
  /**
   * Get system health status
   * @returns Promise with system status
   */
  getHealth: async (): Promise<ApiResponse<{ status: string; uptime: number }>> => {
    console.log('💚 Checking system health');
    return apiRequest<{ status: string; uptime: number }>('/health');
  },

  /**
   * Ping API to check connectivity
   * @returns Promise with ping result
   */
  ping: async (): Promise<ApiResponse<{ message: string; timestamp: string }>> => {
    console.log('🏓 Pinging API');
    return apiRequest<{ message: string; timestamp: string }>('/ping');
  }
};

/**
 * Executions API endpoints
 */
export const executionsApi = {
  /**
   * Get list of executions
   * @returns Promise with executions list
   */
  getExecutions: async (): Promise<ApiResponse<Execution[]>> => {
    console.log('🔍 Fetching executions');
    return apiRequest<Execution[]>('/api/executions');
  },

  /**
   * Get detailed information for a specific execution
   * @param executionId - Unique execution identifier
   * @returns Promise with execution details
   */
  getExecutionDetails: async (executionId: string): Promise<ApiResponse<Execution>> => {
    console.log('📊 Fetching execution details for:', executionId);
    return apiRequest<Execution>(`/api/executions/${executionId}`);
  },

  /**
   * Search executions by query
   * @param query - Search query string
   * @returns Promise with matching executions
   */
  searchExecutions: async (query: string): Promise<ApiResponse<Execution[]>> => {
    console.log('🔍 Searching executions with query:', query);
    const encodedQuery = encodeURIComponent(query);
    return apiRequest<Execution[]>(`/api/executions/search?q=${encodedQuery}`);
  },

  /**
   * Filter executions with advanced criteria
   * @param filters - Filter criteria object
   * @returns Promise with filtered executions
   */
  filterExecutions: async (filters: {
    status?: string;
    risk?: string;
    timeRange?: string;
  }): Promise<ApiResponse<Execution[]>> => {
    console.log('🔍 Filtering executions with:', filters);
    return apiRequest<Execution[]>('/api/executions/filter', {
      method: 'POST',
      body: JSON.stringify(filters)
    });
  },

  /**
   * Submit security override for execution
   * @param executionId - Unique execution identifier
   * @param overrideData - Override request data
   * @returns Promise with override response
   */
  submitSecurityOverride: async (
    executionId: string,
    overrideData: {
      layer: "L1" | "L2" | "L3" | "llama_guard";
      agent_name: string;
      action: "accept" | "reject";
      reason: string;
      user_id: string;
    }
  ): Promise<ApiResponse<{
    status: string;
    action: string;
    execution_id: string;
  }>> => {
    console.log('🔐 Submitting security override for:', executionId, overrideData);
    return apiRequest<{
      status: string;
      action: string;
      execution_id: string;
    }>(`/api/executions/${executionId}/security/override`, {
      method: 'POST',
      body: JSON.stringify(overrideData)
    });
  },

  /**
   * Get dashboard statistics
   * @returns Promise with dashboard stats
   */
  getDashboardStats: async (): Promise<ApiResponse<DashboardMetrics>> => {
    console.log('📊 Fetching dashboard stats');
    return apiRequest<DashboardMetrics>('/api/dashboard/stats');
  }
};

/**
 * Main API client export
 */
export const api = {
  traces: tracesApi,
  dashboard: dashboardApi,
  alerts: alertsApi,
  agents: agentsApi,
  system: systemApi,
  executions: executionsApi
};

/**
 * Default export for convenience
 */
export default api;
