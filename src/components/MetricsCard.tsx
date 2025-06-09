
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
}

export function MetricsCard({ title, value, change, changeType, icon: Icon }: MetricsCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <Badge 
            variant={changeType === "positive" ? "default" : "destructive"}
            className="text-xs"
          >
            {change}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          from last month
        </p>
      </CardContent>
    </Card>
  );
}
