import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/MetricCard";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer, 
  Clock, 
  Target,
  Download,
  Filter
} from "lucide-react";

const analyticsData = {
  userEngagement: {
    totalUsers: "12,847",
    activeUsers: "8,234",
    bounceRate: "23.5%",
    sessionDuration: "4m 32s"
  },
  conversionFunnels: [
    { stage: "Landing Page", visitors: 10000, conversion: 100 },
    { stage: "Product View", visitors: 6500, conversion: 65 },
    { stage: "Add to Cart", visitors: 2800, conversion: 28 },
    { stage: "Checkout", visitors: 1200, conversion: 12 },
    { stage: "Purchase", visitors: 850, conversion: 8.5 }
  ],
  topPages: [
    { page: "/dashboard", views: 15420, time: "3m 45s" },
    { page: "/analytics", views: 8930, time: "2m 18s" },
    { page: "/features", views: 6540, time: "4m 12s" },
    { page: "/monitor", views: 4320, time: "5m 33s" }
  ],
  realtimeData: {
    currentVisitors: 234,
    pageViews: 1847,
    events: 592,
    conversions: 23
  }
};

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-card border-border shadow-card">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics Insights
              </h2>
              <p className="text-muted-foreground text-sm">
                Comprehensive user behavior and performance analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Visitors"
          value={analyticsData.realtimeData.currentVisitors}
          change="+12%"
          changeType="positive"
          trend="up"
          icon={<Users className="w-4 h-4 text-success" />}
        />
        <MetricCard
          title="Page Views"
          value={analyticsData.realtimeData.pageViews}
          change="+5.2%"
          changeType="positive"
          trend="up"
          icon={<MousePointer className="w-4 h-4 text-info" />}
        />
        <MetricCard
          title="Events Tracked"
          value={analyticsData.realtimeData.events}
          change="+8.7%"
          changeType="positive"
          trend="up"
          icon={<Target className="w-4 h-4 text-warning" />}
        />
        <MetricCard
          title="Conversions"
          value={analyticsData.realtimeData.conversions}
          change="-2.1%"
          changeType="negative"
          trend="down"
          icon={<TrendingUp className="w-4 h-4 text-success" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="bg-card border-border shadow-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Conversion Funnel
            </h3>
            <div className="space-y-4">
              {analyticsData.conversionFunnels.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {stage.visitors.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {stage.conversion}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={stage.conversion} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="bg-card border-border shadow-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Top Pages
            </h3>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <div className="font-medium text-foreground">{page.page}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Avg. time: {page.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {page.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* User Engagement Summary */}
      <Card className="bg-card border-border shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            User Engagement Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {analyticsData.userEngagement.totalUsers}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {analyticsData.userEngagement.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {analyticsData.userEngagement.bounceRate}
              </div>
              <div className="text-sm text-muted-foreground">Bounce Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info mb-1">
                {analyticsData.userEngagement.sessionDuration}
              </div>
              <div className="text-sm text-muted-foreground">Session Duration</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}