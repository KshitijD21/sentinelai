import {
  TraceListItem,
  TraceDetails,
  DashboardMetrics,
  SecurityAlert,
  RiskLevel,
  TraceStatus
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
