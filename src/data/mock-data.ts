import {
  TraceListItem,
  TraceDetails,
  DashboardMetrics,
  DashboardStats,
  SecurityAlert,
  RiskLevel,
  TraceStatus,
  Execution
} from '@/types';

/**
 * Mock data for SentinelAI platform
 * Provides realistic sample data for development and testing
 */

/**
 * Generate a random timestamp within the last 24 hours
 */
function generateRecentTimestamp(): string {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  const timestamp = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
  return timestamp.toISOString();
}

/**
 * Generate a random duration in seconds
 */
function generateDuration(): number {
  return Math.floor(Math.random() * 300) + 5; // 5-305 seconds
}

/**
 * Mock trace list data with diverse scenarios
 */
export const mockTraceList: TraceListItem[] = [
  {
    id: 'trace_001',
    agent: 'TransactionGuard',
    task: 'Validate high-value cryptocurrency transaction',
    output: 'Transaction approved after multi-factor verification. Risk factors: high amount, new recipient wallet.',
    risk_score: 75,
    risk_level: 'HIGH',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_crypto_trader',
    session_id: 'session_001_crypto'
  },
  {
    id: 'trace_002',
    agent: 'MarketTrend',
    task: 'Analyze stock market trends for portfolio optimization',
    output: 'Identified bullish pattern in tech stocks. Recommended 15% portfolio rebalancing towards FAANG stocks.',
    risk_score: 25,
    risk_level: 'LOW',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_investor_pro',
    session_id: 'session_002_market'
  },
  {
    id: 'trace_003',
    agent: 'CustomerSupport',
    task: 'Process customer refund request with sensitive data access',
    output: 'BLOCKED: Attempted to access PII without proper authorization. Customer data protection protocols activated.',
    risk_score: 95,
    risk_level: 'CRITICAL',
    status: 'BLOCKED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_support_agent',
    session_id: 'session_003_support'
  },
  {
    id: 'trace_004',
    agent: 'FinanceAgent',
    task: 'Generate quarterly financial report with regulatory compliance check',
    output: 'Report generated successfully. All regulatory requirements verified. Data exported to secure vault.',
    risk_score: 35,
    risk_level: 'MEDIUM',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_cfo_office',
    session_id: 'session_004_finance'
  },
  {
    id: 'trace_005',
    agent: 'DataMiner',
    task: 'Extract customer insights from database for marketing campaign',
    output: 'PROCESSING: Large dataset analysis in progress. Estimated completion: 2 minutes.',
    risk_score: 45,
    risk_level: 'MEDIUM',
    status: 'PROCESSING',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_marketing_head',
    session_id: 'session_005_mining'
  },
  {
    id: 'trace_006',
    agent: 'SecurityScanner',
    task: 'Perform automated penetration testing on API endpoints',
    output: 'Vulnerability detected in authentication endpoint. Immediate patch required for CVE-2024-1337.',
    risk_score: 85,
    risk_level: 'HIGH',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_security_team',
    session_id: 'session_006_security'
  },
  {
    id: 'trace_007',
    agent: 'ComplianceBot',
    task: 'Review contract terms for GDPR compliance violations',
    output: 'Contract analysis complete. Found 3 potential GDPR violations. Legal review recommended.',
    risk_score: 65,
    risk_level: 'HIGH',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_legal_counsel',
    session_id: 'session_007_compliance'
  },
  {
    id: 'trace_008',
    agent: 'TransactionGuard',
    task: 'Monitor suspicious payment patterns in real-time',
    output: 'FAILED: Database connection timeout during fraud detection analysis. Retry required.',
    risk_score: 50,
    risk_level: 'MEDIUM',
    status: 'FAILED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_fraud_analyst',
    session_id: 'session_008_fraud'
  },
  {
    id: 'trace_009',
    agent: 'AIAssistant',
    task: 'Generate personalized investment advice based on user profile',
    output: 'Investment strategy created: Conservative portfolio with 60% bonds, 40% equities. Expected annual return: 7.2%.',
    risk_score: 20,
    risk_level: 'LOW',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_retirement_planner',
    session_id: 'session_009_advice'
  },
  {
    id: 'trace_010',
    agent: 'DocumentProcessor',
    task: 'Extract and classify sensitive information from uploaded contracts',
    output: 'PENDING: Document contains encrypted sections requiring manual review by legal team.',
    risk_score: 70,
    risk_level: 'HIGH',
    status: 'PENDING',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_contract_manager',
    session_id: 'session_010_documents'
  },
  {
    id: 'trace_011',
    agent: 'RiskAnalyzer',
    task: 'Assess credit risk for loan application processing',
    output: 'Credit score: 720. Debt-to-income ratio: 28%. Loan approval recommended with standard terms.',
    risk_score: 30,
    risk_level: 'LOW',
    status: 'COMPLETED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_loan_officer',
    session_id: 'session_011_credit'
  },
  {
    id: 'trace_012',
    agent: 'TradingBot',
    task: 'Execute automated forex trading strategy with risk limits',
    output: 'BLOCKED: Trade volume exceeded daily risk limits. Position sizing reduced by 50% per risk management rules.',
    risk_score: 80,
    risk_level: 'HIGH',
    status: 'BLOCKED',
    timestamp: generateRecentTimestamp(),
    duration: generateDuration(),
    user_id: 'user_hedge_fund',
    session_id: 'session_012_trading'
  }
];

/**
 * Detailed trace information for selected traces
 */
export const mockTraceDetails: Record<string, TraceDetails> = {
  'trace_001': {
    ...mockTraceList[0],
    user_context: {
      user_id: 'user_crypto_trader',
      session_id: 'session_001_crypto',
      original_prompt: 'I want to send 50 BTC to wallet address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa. Please validate this transaction for security.'
    },
    l1_firewall: {
      result: 'SAFE',
      confidence: 92,
      scan_duration: 150,
      patterns_checked: ['malicious_addresses', 'phishing_patterns', 'suspicious_amounts'],
      threats_detected: []
    },
    l2_guardrail: {
      actions_evaluated: 5,
      actions_allowed: 4,
      actions_blocked: 1,
      actions: [
        {
          type: 'wallet_validation',
          description: 'Verify recipient wallet address',
          risk_score: 15,
          decision: 'ALLOW',
          reasoning: 'Valid Bitcoin address format with established transaction history'
        },
        {
          type: 'amount_verification',
          description: 'Check transaction amount against limits',
          risk_score: 85,
          decision: 'ALLOW',
          reasoning: 'Amount is high but within user\'s verified limits and account balance'
        },
        {
          type: 'rate_limiting',
          description: 'Apply daily transaction limits',
          risk_score: 60,
          decision: 'ALLOW',
          reasoning: 'User has not exceeded daily transaction limits'
        },
        {
          type: 'compliance_check',
          description: 'Verify AML/KYC requirements',
          risk_score: 40,
          decision: 'ALLOW',
          reasoning: 'User KYC status verified, transaction within compliance thresholds'
        },
        {
          type: 'auto_execute',
          description: 'Automatically execute transaction',
          risk_score: 95,
          decision: 'BLOCK',
          reasoning: 'High-value transaction requires manual approval per security policy'
        }
      ]
    },
    l3_debug: {
      total_events: 23,
      execution_path: [
        'input_validation',
        'security_scanning',
        'wallet_lookup',
        'balance_verification',
        'risk_assessment',
        'compliance_check',
        'approval_workflow'
      ],
      performance_metrics: {
        cpu_usage: '15%',
        memory_usage: '256 MB',
        api_calls: 8
      },
      errors: [],
      warnings: ['High transaction amount detected', 'Manual approval required']
    },
    raw_logs: [
      '[2024-10-02T10:15:23Z] INFO: Transaction validation initiated for 50 BTC',
      '[2024-10-02T10:15:24Z] INFO: Wallet address validation successful',
      '[2024-10-02T10:15:25Z] INFO: Balance verification: sufficient funds available',
      '[2024-10-02T10:15:26Z] WARN: High-value transaction detected, requiring additional verification',
      '[2024-10-02T10:15:27Z] INFO: AML/KYC compliance check passed',
      '[2024-10-02T10:15:28Z] INFO: Risk assessment score: 75/100',
      '[2024-10-02T10:15:29Z] INFO: Transaction queued for manual approval'
    ]
  }
};

/**
 * Dashboard metrics mock data
 */
export const mockDashboardMetrics: DashboardMetrics = {
  total_traces: 1247,
  blocked_actions: 89,
  risk_distribution: {
    LOW: 623,
    MEDIUM: 421,
    HIGH: 156,
    CRITICAL: 47
  },
  avg_processing_time: 12.4,
  system_uptime: 99.7
};

/**
 * Mock dashboard stats for Flask API format
 */
export const mockDashboardStats: DashboardStats = {
  total_executions: 1247,
  blocked: 89,
  allowed: 1158,
  critical: 47,
  risk_distribution: {
    LOW: 623,
    MEDIUM: 421,
    HIGH: 156,
    CRITICAL: 47
  },
  layer_effectiveness: {
    L1: 45,
    L2: 30,
    L3: 10,
    LlamaGuard: 4
  }
};

/**
 * Security alerts mock data
 */
export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: 'alert_001',
    title: 'Critical: Unauthorized PII Access Attempt',
    description: 'CustomerSupport agent attempted to access customer PII without proper authorization. Action was blocked by L2 guardrails.',
    severity: 'CRITICAL',
    status: 'OPEN',
    trace_id: 'trace_003',
    agent_name: 'CustomerSupport',
    created_at: generateRecentTimestamp(),
    updated_at: generateRecentTimestamp(),
    assigned_to: 'security_team'
  },
  {
    id: 'alert_002',
    title: 'High: Trading Risk Limits Exceeded',
    description: 'TradingBot attempted to execute trades beyond configured risk limits. Transaction was automatically blocked.',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    trace_id: 'trace_012',
    agent_name: 'TradingBot',
    created_at: generateRecentTimestamp(),
    updated_at: generateRecentTimestamp(),
    assigned_to: 'risk_management'
  },
  {
    id: 'alert_003',
    title: 'High: Security Vulnerability Detected',
    description: 'SecurityScanner identified critical vulnerability in API authentication endpoint requiring immediate patch.',
    severity: 'HIGH',
    status: 'ACKNOWLEDGED',
    trace_id: 'trace_006',
    agent_name: 'SecurityScanner',
    created_at: generateRecentTimestamp(),
    updated_at: generateRecentTimestamp(),
    assigned_to: 'security_team'
  },
  {
    id: 'alert_004',
    title: 'Medium: System Performance Degradation',
    description: 'DataMiner agent experiencing longer than normal processing times. Performance monitoring triggered.',
    severity: 'MEDIUM',
    status: 'OPEN',
    trace_id: 'trace_005',
    agent_name: 'DataMiner',
    created_at: generateRecentTimestamp(),
    updated_at: generateRecentTimestamp()
  },
  {
    id: 'alert_005',
    title: 'High: GDPR Compliance Violations Found',
    description: 'ComplianceBot detected potential GDPR violations in contract terms requiring legal review.',
    severity: 'HIGH',
    status: 'RESOLVED',
    trace_id: 'trace_007',
    agent_name: 'ComplianceBot',
    created_at: generateRecentTimestamp(),
    updated_at: generateRecentTimestamp(),
    assigned_to: 'legal_team'
  }
];

/**
 * Available agent types for filtering
 */
export const agentTypes = [
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

/**
 * Time range options for filtering
 */
export const timeRangeOptions = [
  { value: '1h', label: 'Last Hour' },
  { value: '6h', label: 'Last 6 Hours' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' }
];

/**
 * Status options for filtering
 */
export const statusOptions: { value: TraceStatus, label: string }[] = [
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'BLOCKED', label: 'Blocked' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'FAILED', label: 'Failed' }
];

/**
 * Risk level options for filtering
 */
export const riskLevelOptions: { value: RiskLevel, label: string }[] = [
  { value: 'LOW', label: 'Low Risk' },
  { value: 'MEDIUM', label: 'Medium Risk' },
  { value: 'HIGH', label: 'High Risk' },
  { value: 'CRITICAL', label: 'Critical Risk' }
];

/**
 * Mock execution data for testing the new explorer
 */
export const mockExecutions: Execution[] = [
  {
    _id: "672ff123456789abcdef0001",
    execution_id: "exec-abc123",
    user_prompt: "Write a Python function to calculate fibonacci numbers efficiently using memoization",
    status: "COMPLETED" as const,
    overall_risk: "LOW" as const,
    overall_action: "allowed" as const,
    created_at: "2025-10-04T15:30:00Z",
    updated_at: "2025-10-04T15:32:30Z",
    agents: [
      {
        agent_name: "planner",
        task: "Create implementation plan for fibonacci function",
        output: {
          plan: "1. Use memoization for optimization\n2. Handle edge cases (n=0, n=1)\n3. Return iterative solution for better performance",
          approach: "dynamic_programming"
        },
        timestamp: "2025-10-04T15:30:15Z",
        sentinel_result: {
          L1: { flagged: false, reason: "Safe code planning request", category: "code_generation" },
          llama_guard: { flagged: false, reason: "No harmful content detected", category: "safe" },
          L2: { flagged: false, reason: "Planning task is low risk", category: "development" },
          L3: { flagged: false, reason: "Compliant with coding standards", category: "approved" }
        },
        action: "allowed" as const
      },
      {
        agent_name: "coder",
        task: "Generate optimized fibonacci function code",
        output: {
          code: "def fibonacci(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)\n    return memo[n]",
          language: "python",
          complexity: "O(n)"
        },
        timestamp: "2025-10-04T15:31:45Z",
        sentinel_result: {
          L1: { flagged: false, reason: "Safe Python code", category: "code_generation" },
          llama_guard: { flagged: false, reason: "No security risks in code", category: "safe" },
          L2: { flagged: false, reason: "Code follows best practices", category: "development" },
          L3: { flagged: false, reason: "No compliance issues", category: "approved" }
        },
        action: "allowed" as const
      }
    ],
    prompt_security: {
      L1: { flagged: false, reason: "Legitimate coding request", category: "educational" },
      llama_guard: { flagged: false, reason: "Safe programming query", category: "safe" },
      L2: { flagged: false, reason: "Standard development request", category: "development" },
      L3: { flagged: false, reason: "Compliant request", category: "approved" }
    }
  },
  {
    _id: "672ff123456789abcdef0002",
    execution_id: "exec-def456",
    user_prompt: "How can I bypass the authentication system in our web application for testing purposes?",
    status: "BLOCKED" as const,
    overall_risk: "HIGH" as const,
    overall_action: "blocked" as const,
    blocked_by: "L2" as const,
    created_at: "2025-10-04T14:15:00Z",
    updated_at: "2025-10-04T14:15:30Z",
    agents: [
      {
        agent_name: "security_analyzer",
        task: "Analyze request for security implications",
        output: {
          analysis: "Request involves authentication bypass - potential security risk",
          threat_level: "high",
          recommendation: "blocked"
        },
        timestamp: "2025-10-04T14:15:20Z",
        sentinel_result: {
          L1: { flagged: false, reason: "Request pattern seems legitimate for testing", category: "testing" },
          llama_guard: { flagged: true, reason: "Authentication bypass request detected", category: "security_risk" },
          L2: { flagged: true, reason: "Potential security vulnerability exploitation", category: "security_breach" },
          L3: { flagged: false, reason: "Could be legitimate testing request", category: "testing" }
        },
        action: "blocked" as const
      }
    ],
    prompt_security: {
      L1: { flagged: false, reason: "Could be legitimate testing question", category: "testing" },
      llama_guard: { flagged: true, reason: "Authentication bypass language detected", category: "security_risk" },
      L2: { flagged: true, reason: "Potential security threat", category: "security_breach" },
      L3: { flagged: false, reason: "Might be for legitimate testing", category: "testing" }
    }
  },
  {
    _id: "672ff123456789abcdef0003",
    execution_id: "exec-ghi789",
    user_prompt: "Create a data visualization dashboard for our sales metrics using React and Chart.js",
    status: "PROCESSING" as const,
    overall_risk: "LOW" as const,
    overall_action: "allowed" as const,
    created_at: "2025-10-04T16:00:00Z",
    updated_at: "2025-10-04T16:02:00Z",
    agents: [
      {
        agent_name: "ui_designer",
        task: "Design dashboard layout and components",
        output: {
          wireframe: "Dashboard with header, sidebar, and main chart area",
          components: ["Header", "Sidebar", "ChartContainer", "MetricsCards"],
          design_system: "Material Design"
        },
        timestamp: "2025-10-04T16:01:00Z",
        sentinel_result: {
          L1: { flagged: false, reason: "UI design request is safe", category: "design" },
          llama_guard: { flagged: false, reason: "No harmful content", category: "safe" },
          L2: { flagged: false, reason: "Standard development task", category: "development" },
          L3: { flagged: false, reason: "Approved development work", category: "approved" }
        },
        action: "allowed" as const
      }
    ],
    prompt_security: {
      L1: { flagged: false, reason: "Standard development request", category: "development" },
      llama_guard: { flagged: false, reason: "Safe technical request", category: "safe" },
      L2: { flagged: false, reason: "Legitimate development task", category: "development" },
      L3: { flagged: false, reason: "Approved project work", category: "approved" }
    }
  }
];
