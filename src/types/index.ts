/**
 * Core data types for SentinelAI platform
 * Defines interfaces for traces, security analysis, and system monitoring
 */

/**
 * Risk levels for security assessment
 */
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Execution status of agent traces
 */
export type TraceStatus = 'COMPLETED' | 'BLOCKED' | 'PENDING' | 'PROCESSING' | 'FAILED';

/**
 * Security firewall results
 */
export type FirewallResult = 'SAFE' | 'BLOCKED' | 'SANITIZED';

/**
 * Action decisions from guardrails
 */
export type ActionDecision = 'ALLOW' | 'BLOCK' | 'PENDING';

/**
 * Trace list item for the explorer interface
 * Contains essential information for trace listing and filtering
 */
export interface TraceListItem {
  /** Unique identifier for the trace */
  id: string;
  /** Name of the AI agent (e.g., "TransactionGuard", "MarketTrend") */
  agent: string;
  /** Description of the task being performed */
  task: string;
  /** Summary of the agent's output */
  output: string;
  /** Risk score from 0-100 */
  risk_score: number;
  /** Categorized risk level */
  risk_level: RiskLevel;
  /** Current execution status */
  status: TraceStatus;
  /** ISO timestamp of trace creation */
  timestamp: string;
  /** Execution duration in seconds */
  duration: number;
  /** User who initiated the trace */
  user_id: string;
  /** Session identifier */
  session_id: string;
}

/**
 * User context information for a trace
 */
export interface UserContext {
  /** User who initiated the trace */
  user_id: string;
  /** Session identifier */
  session_id: string;
  /** Original user prompt or request */
  original_prompt: string;
}

/**
 * L1 Firewall security analysis results
 */
export interface L1Firewall {
  /** Overall security assessment result */
  result: FirewallResult;
  /** Confidence level in the assessment (0-100) */
  confidence: number;
  /** Time taken for security scan in milliseconds */
  scan_duration: number;
  /** Security patterns that were checked */
  patterns_checked: string[];
  /** List of threats that were detected */
  threats_detected: string[];
}

/**
 * Individual action evaluated by L2 guardrails
 */
export interface GuardrailAction {
  /** Type of action (e.g., "api_call", "file_access", "database_query") */
  type: string;
  /** Human-readable description of the action */
  description: string;
  /** Risk score for this specific action (0-100) */
  risk_score: number;
  /** Decision made by the guardrail */
  decision: ActionDecision;
  /** Explanation for the decision */
  reasoning: string;
}

/**
 * L2 Guardrail analysis results
 */
export interface L2Guardrail {
  /** Total number of actions evaluated */
  actions_evaluated: number;
  /** Number of actions that were allowed */
  actions_allowed: number;
  /** Number of actions that were blocked */
  actions_blocked: number;
  /** Detailed list of all evaluated actions */
  actions: GuardrailAction[];
}

/**
 * Performance metrics for L3 debugging
 */
export interface PerformanceMetrics {
  /** CPU usage percentage */
  cpu_usage: string;
  /** Memory usage in MB */
  memory_usage: string;
  /** Number of API calls made */
  api_calls: number;
}

/**
 * L3 Debug information
 */
export interface L3Debug {
  /** Total number of debug events logged */
  total_events: number;
  /** Execution path through the agent system */
  execution_path: string[];
  /** Performance metrics during execution */
  performance_metrics: PerformanceMetrics;
  /** Error messages encountered */
  errors: string[];
  /** Warning messages generated */
  warnings: string[];
}

/**
 * Complete trace details with full security analysis
 * Extends TraceListItem with comprehensive security and debug information
 */
export interface TraceDetails extends TraceListItem {
  /** User and session context information */
  user_context: UserContext;
  /** L1 firewall security analysis */
  l1_firewall: L1Firewall;
  /** L2 guardrail action analysis */
  l2_guardrail: L2Guardrail;
  /** L3 debug and performance information */
  l3_debug: L3Debug;
  /** Raw execution logs */
  raw_logs: string[];
}

/**
 * Filter options for trace exploration
 */
export interface FilterOptions {
  /** Search query string */
  search?: string;
  /** Filter by agent type */
  agent?: string;
  /** Filter by execution status */
  status?: TraceStatus;
  /** Filter by risk level */
  risk?: RiskLevel;
  /** Time range filter */
  timeRange?: string;
}

/**
 * Dashboard KPI metrics
 */
export interface DashboardMetrics {
  /** Total number of traces processed */
  total_traces: number;
  /** Number of blocked actions */
  blocked_actions: number;
  /** Distribution of traces by risk level */
  risk_distribution: Record<RiskLevel, number>;
  /** Average processing time in seconds */
  avg_processing_time: number;
  /** System uptime percentage */
  system_uptime: number;
}

/**
 * Security alert information
 */
export interface SecurityAlert {
  /** Unique alert identifier */
  id: string;
  /** Alert title */
  title: string;
  /** Detailed alert description */
  description: string;
  /** Alert severity level */
  severity: RiskLevel;
  /** Alert status */
  status: 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED' | 'INVESTIGATING';
  /** Associated trace ID if applicable */
  trace_id?: string;
  /** Affected agent name */
  agent_name?: string;
  /** Timestamp when alert was created */
  created_at: string;
  /** Timestamp when alert was last updated */
  updated_at: string;
  /** User assigned to handle the alert */
  assigned_to?: string;
}

/**
 * API response wrapper for consistent error handling
 */
export interface ApiResponse<T> {
  /** Response data */
  data?: T;
  /** Error message if request failed */
  error?: string;
  /** HTTP status code */
  status: number;
  /** Success indicator */
  success: boolean;
}
