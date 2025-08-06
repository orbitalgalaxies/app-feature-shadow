import React from "react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/StatusIndicator";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  Activity, 
  Network,
  Lock,
  Zap,
  Monitor,
  Clock,
  MapPin
} from "lucide-react";

interface WatcherEvent {
  id: string;
  timestamp: Date;
  type: "security" | "performance" | "user" | "system";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  source: string;
  location?: string;
}

interface WatcherStats {
  monitored: number;
  alerts: number;
  blocked: number;
  uptime: string;
}

const mockEvents: WatcherEvent[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: "security",
    severity: "high",
    title: "Suspicious Login Attempt",
    description: "Multiple failed login attempts from unknown IP",
    source: "Authentication System",
    location: "192.168.1.1"
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "performance",
    severity: "medium",
    title: "High Memory Usage",
    description: "Server memory usage exceeded 85% threshold",
    source: "Performance Monitor",
    location: "Server-01"
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: "user",
    severity: "low",
    title: "New User Registration",
    description: "User registered from new geographic location",
    source: "User Management",
    location: "New York, US"
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    type: "system",
    severity: "critical",
    title: "Database Connection Lost",
    description: "Primary database connection interrupted",
    source: "Database Monitor",
    location: "DB-Primary"
  }
];

const watcherStats: WatcherStats = {
  monitored: 1247,
  alerts: 23,
  blocked: 8,
  uptime: "99.97%"
};

export function SilentWatcher() {
  const [events, setEvents] = useState(mockEvents);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const getSeverityColor = (severity: WatcherEvent["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-destructive/80 text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-info text-info-foreground";
    }
  };

  const getTypeIcon = (type: WatcherEvent["type"]) => {
    switch (type) {
      case "security":
        return <Shield className="w-4 h-4" />;
      case "performance":
        return <Activity className="w-4 h-4" />;
      case "user":
        return <Eye className="w-4 h-4" />;
      case "system":
        return <Monitor className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  };

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.type === filter);

  // Simulate new events
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const eventTypes: WatcherEvent["type"][] = ["security", "performance", "user", "system"];
      const severities: WatcherEvent["severity"][] = ["low", "medium", "high", "critical"];
      
      const newEvent: WatcherEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        title: "New Alert Detected",
        description: "Automated surveillance detected anomaly",
        source: "Silent Watcher",
        location: "System"
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 20));
    }, 15000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card className="bg-card border-border shadow-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Silent Watcher
              </h2>
              <p className="text-muted-foreground text-sm">
                Advanced monitoring and threat detection system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusIndicator
                status={isMonitoring ? "online" : "offline"}
                label={isMonitoring ? "Active" : "Inactive"}
              />
              <Button
                variant={isMonitoring ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? "Stop" : "Start"} Monitoring
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gradient-accent">
              <div className="text-xl font-bold text-foreground">{watcherStats.monitored}</div>
              <div className="text-xs text-muted-foreground">Endpoints Monitored</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-accent">
              <div className="text-xl font-bold text-warning">{watcherStats.alerts}</div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-accent">
              <div className="text-xl font-bold text-destructive">{watcherStats.blocked}</div>
              <div className="text-xs text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-accent">
              <div className="text-xl font-bold text-success">{watcherStats.uptime}</div>
              <div className="text-xs text-muted-foreground">System Uptime</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Event Filters */}
      <Card className="bg-card border-border shadow-card">
        <div className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">Filter by type:</span>
            {["all", "security", "performance", "user", "system"].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Events List */}
      <Card className="bg-card border-border shadow-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Events ({filteredEvents.length})
            </h3>
            {isMonitoring && (
              <div className="flex items-center gap-2 text-success text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
                Live Monitoring
              </div>
            )}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
                  "bg-card/50 border-border hover:border-border/80"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-gradient-accent">
                      {getTypeIcon(event.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <Badge className={getSeverityColor(event.severity)} variant="secondary">
                          {event.severity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Network className="w-3 h-3" />
                          {event.source}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(event.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No events found for the selected filter.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}