import { MetricCard } from "@/components/MetricCard";
import { LiveMonitor } from "@/components/LiveMonitor";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Server, AlertTriangle, Eye, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-accent rounded-lg shadow-glow">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Observer</h1>
                <p className="text-sm text-muted-foreground">Silent watcher monitoring system</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-success border-success/30">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow"></div>
                Active Monitoring
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Users"
            value="2,847"
            change="+12.5%"
            changeType="positive"
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
            subtitle="Last 24 hours"
          />
          <MetricCard
            title="Response Time"
            value="234ms"
            change="-8.2%"
            changeType="positive"
            trend="down"
            icon={<Zap className="h-5 w-5 text-warning" />}
            subtitle="Average"
          />
          <MetricCard
            title="Error Rate"
            value="0.12%"
            change="+0.03%"
            changeType="negative"
            trend="up"
            icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
            subtitle="Past hour"
          />
          <MetricCard
            title="Server Load"
            value="67%"
            change="Stable"
            changeType="neutral"
            trend="stable"
            icon={<Server className="h-5 w-5 text-info" />}
            subtitle="CPU Usage"
          />
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border shadow-card lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
              <div className="space-y-4">
                <StatusIndicator 
                  status="online" 
                  label="Web Application" 
                  description="All services operational"
                />
                <StatusIndicator 
                  status="online" 
                  label="Database" 
                  description="Connection stable"
                />
                <StatusIndicator 
                  status="warning" 
                  label="Cache Layer" 
                  description="High memory usage"
                />
                <StatusIndicator 
                  status="online" 
                  label="API Gateway" 
                  description="Processing requests"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium text-success">99.97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Requests/min</span>
                  <span className="text-sm font-medium text-foreground">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Data Transfer</span>
                  <span className="text-sm font-medium text-foreground">2.4 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Sessions</span>
                  <span className="text-sm font-medium text-foreground">847</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Activity Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LiveMonitor />
          
          <Card className="bg-card border-border shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trends</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">CPU Usage</span>
                    <span className="text-sm font-medium text-foreground">67%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: "67%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Memory Usage</span>
                    <span className="text-sm font-medium text-foreground">45%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Disk Usage</span>
                    <span className="text-sm font-medium text-foreground">23%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-info h-2 rounded-full" style={{ width: "23%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Network I/O</span>
                    <span className="text-sm font-medium text-foreground">89%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;