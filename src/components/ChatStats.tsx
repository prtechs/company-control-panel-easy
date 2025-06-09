
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp
} from "lucide-react";

export function ChatStats() {
  const stats = [
    {
      title: "Active Chats",
      value: "3",
      change: "+1 from yesterday",
      changeType: "positive" as const,
      icon: MessageCircle,
      color: "text-green-600"
    },
    {
      title: "Waiting Visitors",
      value: "5",
      change: "+2 in queue",
      changeType: "neutral" as const,
      icon: Users,
      color: "text-yellow-600"
    },
    {
      title: "Avg Response Time",
      value: "2.3m",
      change: "-30s faster",
      changeType: "positive" as const,
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Resolved Today",
      value: "12",
      change: "+4 from yesterday",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <Badge 
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <p className="text-xs text-muted-foreground">
                Live statistics
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
