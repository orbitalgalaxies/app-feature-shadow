import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Settings, Users, Zap } from "lucide-react";

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  environment: "development" | "staging" | "production";
  category: "core" | "experimental" | "deprecated";
  lastModified: string;
}

const mockFeatures: Feature[] = [
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Enable dark theme across the application",
    enabled: true,
    rolloutPercentage: 100,
    environment: "production",
    category: "core",
    lastModified: "2 hours ago"
  },
  {
    id: "ai-insights",
    name: "AI Insights",
    description: "Advanced AI-powered analytics and predictions",
    enabled: true,
    rolloutPercentage: 45,
    environment: "staging",
    category: "experimental",
    lastModified: "1 day ago"
  },
  {
    id: "realtime-sync",
    name: "Real-time Sync",
    description: "Live data synchronization across sessions",
    enabled: false,
    rolloutPercentage: 0,
    environment: "development",
    category: "experimental",
    lastModified: "3 days ago"
  },
  {
    id: "legacy-dashboard",
    name: "Legacy Dashboard",
    description: "Old dashboard interface (being deprecated)",
    enabled: false,
    rolloutPercentage: 5,
    environment: "production",
    category: "deprecated",
    lastModified: "1 week ago"
  }
];

export function FeatureToggle() {
  const [features, setFeatures] = useState(mockFeatures);

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === id 
        ? { ...feature, enabled: !feature.enabled, lastModified: "just now" }
        : feature
    ));
  };

  const getCategoryColor = (category: Feature["category"]) => {
    switch (category) {
      case "core":
        return "bg-success text-success-foreground";
      case "experimental":
        return "bg-warning text-warning-foreground";
      case "deprecated":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getEnvironmentColor = (environment: Feature["environment"]) => {
    switch (environment) {
      case "production":
        return "text-success";
      case "staging":
        return "text-warning";
      case "development":
        return "text-info";
    }
  };

  return (
    <Card className="bg-card border-border shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Feature Management
            </h2>
            <p className="text-muted-foreground text-sm">
              Control feature rollouts and A/B testing
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>

        <div className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "p-4 rounded-lg border bg-card/50 transition-all duration-200",
                feature.enabled ? "border-success/20 bg-success/5" : "border-border"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{feature.name}</h3>
                    <Badge className={getCategoryColor(feature.category)} variant="secondary">
                      {feature.category}
                    </Badge>
                    <Badge variant="outline" className={getEnvironmentColor(feature.environment)}>
                      {feature.environment}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Rollout: {feature.rolloutPercentage}%
                    </div>
                    <div>Last modified: {feature.lastModified}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-2">
                    {feature.enabled ? (
                      <Eye className="w-4 h-4 text-success" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                </div>
              </div>
              
              {feature.enabled && feature.rolloutPercentage < 100 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Rollout Progress</span>
                    <span>{feature.rolloutPercentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className="bg-success h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${feature.rolloutPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}