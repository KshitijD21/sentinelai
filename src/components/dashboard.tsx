"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Shield,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import {
  mockDashboardMetrics,
  mockSecurityAlerts,
  mockTraceList,
} from "@/data/mock-data";
import { useDashboardStore } from "@/store";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

/**
 * KPI Card component for displaying key metrics
 */
interface KPICardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down" | "stable";
}

function KPICard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          {trend && (
            <TrendingUp
              className={`h-3 w-3 mr-1 ${
                trend === "up"
                  ? "text-green-500"
                  : trend === "down"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            />
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

/**
 * Recent activity card component
 */
function RecentActivityCard() {
  // Get the 5 most recent traces
  const recentTraces = mockTraceList
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest agent executions and security events
            </CardDescription>
          </div>
          <Link href="/explorer">
            <Button variant="outline" size="sm">
              View All
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTraces.map((trace) => (
            <div key={trace.id} className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {trace.agent}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {trace.task}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    trace.risk_level === "CRITICAL"
                      ? "destructive"
                      : trace.risk_level === "HIGH"
                      ? "secondary"
                      : trace.risk_level === "MEDIUM"
                      ? "outline"
                      : "default"
                  }
                >
                  {trace.risk_level}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(trace.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Security alerts overview card
 */
function SecurityAlertsCard() {
  const openAlerts = mockSecurityAlerts.filter(
    (alert) => alert.status === "OPEN"
  );
  const criticalAlerts = mockSecurityAlerts.filter(
    (alert) => alert.severity === "CRITICAL"
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Active security notifications</CardDescription>
          </div>
          <Link href="/alerts">
            <Button variant="outline" size="sm">
              Manage
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Open Alerts</span>
            <span className="text-lg font-semibold">{openAlerts.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Critical</span>
            <span className="text-lg font-semibold text-destructive">
              {criticalAlerts.length}
            </span>
          </div>
          {criticalAlerts.slice(0, 2).map((alert) => (
            <div key={alert.id} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">{alert.title}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(alert.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * System health overview component
 */
function SystemHealthCard() {
  const { lastRefresh, setLastRefresh } = useDashboardStore();

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In a real app, this would trigger data refetch
    console.log("🔄 Dashboard data refreshed");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">System Uptime</span>
            <span className="text-lg font-semibold text-green-600">
              {mockDashboardMetrics.system_uptime}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Avg Processing
            </span>
            <span className="text-lg font-semibold">
              {mockDashboardMetrics.avg_processing_time}s
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Agents</span>
            <span className="text-lg font-semibold">12</span>
          </div>
          {lastRefresh && (
            <p className="text-xs text-muted-foreground">
              Last updated:{" "}
              {formatDistanceToNow(lastRefresh, { addSuffix: true })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Main dashboard page component
 * Displays overview of SentinelAI platform with KPIs, recent activity, and system health
 */
export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="h-3 w-3 mr-1" />
            All Systems Online
          </Badge>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Traces"
          value={mockDashboardMetrics.total_traces.toLocaleString()}
          description="Agent executions monitored"
          icon={Activity}
          trend="up"
        />
        <KPICard
          title="Blocked Actions"
          value={mockDashboardMetrics.blocked_actions}
          description="Security threats prevented"
          icon={Shield}
          trend="stable"
        />
        <KPICard
          title="Critical Risks"
          value={mockDashboardMetrics.risk_distribution.CRITICAL}
          description="High-priority security events"
          icon={AlertTriangle}
          trend="down"
        />
        <KPICard
          title="Active Users"
          value="47"
          description="Currently using platform"
          icon={Users}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Activity - spans 2 columns */}
        <RecentActivityCard />

        {/* Security Alerts */}
        <SecurityAlertsCard />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* System Health */}
        <SystemHealthCard />

        {/* Risk Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Security risk levels across traces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(mockDashboardMetrics.risk_distribution).map(
                ([level, count]) => (
                  <div
                    key={level}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          level === "CRITICAL"
                            ? "bg-red-500"
                            : level === "HIGH"
                            ? "bg-orange-500"
                            : level === "MEDIUM"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{level}</span>
                    </div>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common platform operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/explorer" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  View Live Traces
                </Button>
              </Link>
              <Link href="/alerts" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Manage Alerts
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
