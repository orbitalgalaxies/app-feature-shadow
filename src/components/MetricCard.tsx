import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  subtitle?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  trend = "stable",
  subtitle 
}: MetricCardProps) {
  const getTrendColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && (
            <div className="p-2 bg-gradient-accent rounded-lg">
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {change && (
            <Badge variant="outline" className={cn("ml-2", getTrendColor())}>
              <span className="mr-1">{getTrendIcon()}</span>
              {change}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}