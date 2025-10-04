"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionBadge } from "@/components/ui/execution-badges";
import { Agent, SecurityResult, Execution } from "@/types";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Shield,
  Code,
  Brain,
  Bot,
  MessageSquare,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

/**
 * Props for SecurityResultDisplay component
 */
interface SecurityResultDisplayProps {
  result: SecurityResult;
  className?: string;
  executionId?: string;
  agentName?: string;
  isPromptSecurity?: boolean;
}

/**
 * Component to display security check results for all layers
 */
function SecurityResultDisplay({
  result,
  className,
  executionId,
  agentName,
  isPromptSecurity = false,
}: SecurityResultDisplayProps) {
  const layers = [
    { key: "L1", label: "L1 Firewall", result: result.L1 },
    { key: "llama_guard", label: "Llama Guard", result: result.llama_guard },
    { key: "L2", label: "L2 Guardrails", result: result.L2 },
    { key: "L3", label: "L3 Compliance", result: result.L3 },
  ];

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [successStates, setSuccessStates] = useState<Record<string, boolean>>(
    {}
  );
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});

  const handleSecurityOverride = async (
    layerKey: string,
    action: "accept" | "reject"
  ) => {
    if (!executionId) {
      console.error("No execution ID available for security override");
      return;
    }

    const stateKey = `${layerKey}-${action}`;
    setLoadingStates((prev) => ({ ...prev, [stateKey]: true }));
    setErrorStates((prev) => ({ ...prev, [stateKey]: "" }));

    try {
      const overrideData = {
        layer: layerKey as "L1" | "L2" | "L3" | "llama_guard",
        agent_name: isPromptSecurity ? "Prompt" : agentName || "Unknown",
        action,
        reason: `User ${action}ed the flagged security result for ${layerKey}`,
        user_id: "current-user", // TODO: Replace with actual user ID from auth context
      };

      const response = await api.executions.submitSecurityOverride(
        executionId,
        overrideData
      );

      if (response.success) {
        setSuccessStates((prev) => ({ ...prev, [stateKey]: true }));
        console.log(
          `Successfully ${action}ed ${layerKey} security override:`,
          response.data
        );

        // Reset success state after 3 seconds
        setTimeout(() => {
          setSuccessStates((prev) => ({ ...prev, [stateKey]: false }));
        }, 3000);
      } else {
        throw new Error(
          response.error || `Failed to ${action} security override`
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to ${action} security override`;
      setErrorStates((prev) => ({ ...prev, [stateKey]: errorMessage }));
      console.error(`Error ${action}ing security override:`, error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [stateKey]: false }));
    }
  };

  const handleAccept = (layerKey: string) => {
    handleSecurityOverride(layerKey, "accept");
  };

  const handleReject = (layerKey: string) => {
    handleSecurityOverride(layerKey, "reject");
  };

  const getLlamaGuardColors = () => {
    return {
      background:
        "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-400",
      icon: "text-blue-600 dark:text-blue-400",
    };
  };

  return (
    <div className={cn("space-y-3", className)}>
      {layers.map((layer) => {
        const isLlamaGuard = layer.key === "llama_guard";
        const metaColors = isLlamaGuard ? getLlamaGuardColors() : null;

        return (
          <div
            key={layer.key}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              isLlamaGuard && metaColors
                ? `${metaColors.background} ${metaColors.border}`
                : "bg-muted/50 border-transparent"
            )}
          >
            <span
              className={cn(
                "font-medium text-sm",
                isLlamaGuard && metaColors ? metaColors.text : ""
              )}
            >
              {layer.label}
            </span>
            <div className="flex items-center space-x-2">
              {layer.result.flagged ? (
                <XCircle
                  className={cn(
                    "h-4 w-4",
                    isLlamaGuard && metaColors
                      ? metaColors.icon
                      : "text-red-500"
                  )}
                />
              ) : (
                <CheckCircle
                  className={cn(
                    "h-4 w-4",
                    isLlamaGuard && metaColors
                      ? metaColors.icon
                      : "text-green-500"
                  )}
                />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  layer.result.flagged
                    ? isLlamaGuard && metaColors
                      ? metaColors.text
                      : "text-red-600"
                    : isLlamaGuard && metaColors
                    ? metaColors.text
                    : "text-green-600"
                )}
              >
                {layer.result.flagged ? "Flagged" : "Safe"}
              </span>
              {layer.result.flagged && (
                <>
                  <Badge
                    variant="destructive"
                    className={cn(
                      "text-xs",
                      isLlamaGuard
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : ""
                    )}
                  >
                    {layer.result.category}
                  </Badge>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAccept(layer.key)}
                      disabled={
                        loadingStates[`${layer.key}-accept`] ||
                        loadingStates[`${layer.key}-reject`]
                      }
                      className={cn(
                        "h-6 px-2 text-xs",
                        successStates[`${layer.key}-accept`]
                          ? "bg-green-200 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-200"
                          : "bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:hover:bg-green-900 dark:text-green-300 dark:border-green-800"
                      )}
                    >
                      {loadingStates[`${layer.key}-accept`] ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : successStates[`${layer.key}-accept`] ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {successStates[`${layer.key}-accept`]
                        ? "Accepted"
                        : "Accept"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(layer.key)}
                      disabled={
                        loadingStates[`${layer.key}-accept`] ||
                        loadingStates[`${layer.key}-reject`]
                      }
                      className={cn(
                        "h-6 px-2 text-xs",
                        successStates[`${layer.key}-reject`]
                          ? "bg-red-200 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-200"
                          : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-300 dark:border-red-800"
                      )}
                    >
                      {loadingStates[`${layer.key}-reject`] ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : successStates[`${layer.key}-reject`] ? (
                        <XCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <X className="h-3 w-3 mr-1" />
                      )}
                      {successStates[`${layer.key}-reject`]
                        ? "Rejected"
                        : "Reject"}
                    </Button>
                  </div>
                  {/* Error feedback */}
                  {(errorStates[`${layer.key}-accept`] ||
                    errorStates[`${layer.key}-reject`]) && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errorStates[`${layer.key}-accept`] ||
                        errorStates[`${layer.key}-reject`]}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Show flagged reasons */}
      {layers.some((layer) => layer.result.flagged) && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <strong className="text-red-700 dark:text-red-400">
                Issues Detected:
              </strong>
              <ul className="mt-1 space-y-1">
                {layers
                  .filter((layer) => layer.result.flagged)
                  .map((layer) => (
                    <li
                      key={layer.key}
                      className="text-red-600 dark:text-red-400 text-xs"
                    >
                      • <strong>{layer.label}:</strong> {layer.result.reason}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Props for AgentDetails component
 */
interface AgentDetailsProps {
  execution: Execution | null;
  selectedAgent: Agent | null;
  className?: string;
}

/**
 * Component showing detailed information about a selected agent
 */
export function AgentDetails({
  execution,
  selectedAgent,
  className,
}: AgentDetailsProps) {
  const getAgentIcon = (agentName: string) => {
    if (agentName.toLowerCase().includes("planner"))
      return <Brain className="h-5 w-5" />;
    if (agentName.toLowerCase().includes("coder"))
      return <Code className="h-5 w-5" />;
    if (agentName.toLowerCase().includes("security"))
      return <Shield className="h-5 w-5" />;
    return <Bot className="h-5 w-5" />;
  };

  // Show execution overview when no agent is selected
  if (!selectedAgent && execution) {
    return (
      <div className={cn("p-6 h-full overflow-auto", className)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Execution Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                User Prompt
              </h4>
              <p className="text-sm leading-relaxed p-3 bg-muted rounded-lg">
                {execution.user_prompt}
              </p>
            </div>

            {/* Execution details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Execution ID:</span>
                <p className="font-mono text-xs mt-1">
                  {execution.execution_id}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="mt-1">
                  {format(new Date(execution.created_at), "PPP p")}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <ActionBadge action={execution.overall_action} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Agents:</span>
                <p className="mt-1">{execution.agents.length} total</p>
              </div>
            </div>

            {/* Prompt Security Summary */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-3">
                Prompt Security Check
              </h4>
              <SecurityResultDisplay
                result={execution.prompt_security}
                executionId={execution.execution_id}
                isPromptSecurity={true}
              />
            </div>

            {/* Instructions */}
            <div className="text-center py-4 text-muted-foreground">
              <Bot className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">
                Select an agent from the list to view detailed execution
                information
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show agent details when selected
  if (selectedAgent) {
    return (
      <div className={cn("p-6 h-full overflow-auto", className)}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                {getAgentIcon(selectedAgent.agent_name)}
                <span>Agent: {selectedAgent.agent_name}</span>
              </CardTitle>
              <ActionBadge action={selectedAgent.action} />
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(selectedAgent.timestamp), {
                addSuffix: true,
              })}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Task description */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Task
              </h4>
              <p className="text-sm leading-relaxed p-3 bg-muted rounded-lg">
                {selectedAgent.task}
              </p>
            </div>

            {/* Agent output */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Output
              </h4>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-auto max-h-64">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(selectedAgent.output, null, 2)}
                </pre>
              </div>
            </div>

            {/* Security results */}
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-3">
                Security Analysis
              </h4>
              <SecurityResultDisplay
                result={selectedAgent.sentinel_result}
                executionId={execution?.execution_id}
                agentName={selectedAgent.agent_name}
              />
            </div>

            {/* Execution timestamp */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Executed at{" "}
                  {format(new Date(selectedAgent.timestamp), "PPP p")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default empty state
  return (
    <div
      className={cn("p-6 h-full flex items-center justify-center", className)}
    >
      <div className="text-center text-muted-foreground">
        <Bot className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Execution Selected</h3>
        <p className="text-sm">
          Select an execution from the left panel to view agent details
        </p>
      </div>
    </div>
  );
}
