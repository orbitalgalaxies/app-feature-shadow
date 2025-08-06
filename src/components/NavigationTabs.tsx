import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Zap, Eye, Activity } from "lucide-react";

interface NavigationTabsProps {
  children: {
    overview: React.ReactNode;
    analytics: React.ReactNode;
    features: React.ReactNode;
    watcher: React.ReactNode;
  };
}

export function NavigationTabs({ children }: NavigationTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="features" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Features
        </TabsTrigger>
        <TabsTrigger value="watcher" className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Silent Watcher
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {children.overview}
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        {children.analytics}
      </TabsContent>

      <TabsContent value="features" className="space-y-6">
        {children.features}
      </TabsContent>

      <TabsContent value="watcher" className="space-y-6">
        {children.watcher}
      </TabsContent>
    </Tabs>
  );
}