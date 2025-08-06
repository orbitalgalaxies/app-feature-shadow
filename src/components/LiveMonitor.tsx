import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
  source?: string;
}

export function LiveMonitor() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Simulate real-time log entries
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        level: ["info", "warning", "error", "success"][Math.floor(Math.random() * 4)] as any,
        message: [
          "User authentication successful",
          "Database connection established",
          "API response time: 234ms",
          "Memory usage: 67%",
          "New user registration",
          "Payment processed successfully",
          "Cache invalidated",
          "Background job completed"
        ][Math.floor(Math.random() * 8)],
        source: ["Auth", "DB", "API", "System", "Payment"][Math.floor(Math.random() * 5)]
      };

      setLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "error":
        return "text-destructive border-destructive";
      case "warning":
        return "text-warning border-warning";
      case "success":
        return "text-success border-success";
      default:
        return "text-info border-info";
    }
  };

  return (
    <Card className="bg-card border-border shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Live Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-success">Live</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <div 
              key={log.id}
              className="flex items-start space-x-3 p-3 bg-accent/50 rounded-lg border border-border/50 animate-slide-up"
            >
              <Badge 
                variant="outline" 
                className={`${getLevelColor(log.level)} text-xs`}
              >
                {log.level.toUpperCase()}
              </Badge>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground font-medium">
                    {log.message}
                  </p>
                  <span className="text-xs text-muted-foreground ml-2">
                    {log.timestamp}
                  </span>
                </div>
                {log.source && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Source: {log.source}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {logs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Waiting for activity...</p>
          </div>
        )}
      </div>
    </Card>
  );
}