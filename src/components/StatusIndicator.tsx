import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "error";
  label: string;
  description?: string;
}

export function StatusIndicator({ status, label, description }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          color: "bg-success",
          textColor: "text-success",
          borderColor: "border-success/20"
        };
      case "warning":
        return {
          color: "bg-warning",
          textColor: "text-warning",
          borderColor: "border-warning/20"
        };
      case "error":
        return {
          color: "bg-destructive",
          textColor: "text-destructive",
          borderColor: "border-destructive/20"
        };
      default:
        return {
          color: "bg-muted-foreground",
          textColor: "text-muted-foreground",
          borderColor: "border-muted/20"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={cn(
      "flex items-center space-x-3 p-4 rounded-lg border bg-card/50",
      config.borderColor
    )}>
      <div className="flex items-center space-x-2">
        <div className={cn(
          "w-3 h-3 rounded-full",
          config.color,
          status === "online" ? "animate-pulse-glow" : ""
        )}></div>
        <span className={cn("font-medium", config.textColor)}>
          {label}
        </span>
      </div>
      
      {description && (
        <span className="text-sm text-muted-foreground">
          {description}
        </span>
      )}
    </div>
  );
}