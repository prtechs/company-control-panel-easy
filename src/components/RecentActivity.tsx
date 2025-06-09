
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "created a new user account",
    time: "2 minutes ago",
    type: "user",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "updated content page",
    time: "15 minutes ago",
    type: "content",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "changed system settings",
    time: "1 hour ago",
    type: "system",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "published new article",
    time: "2 hours ago",
    type: "content",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    user: "System",
    action: "performed backup",
    time: "6 hours ago",
    type: "system",
    avatar: "/placeholder.svg"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "user": return "bg-blue-100 text-blue-700";
    case "content": return "bg-green-100 text-green-700";
    case "system": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src={activity.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {activity.user.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-foreground">{activity.user}</span>
              <Badge variant="secondary" className={`text-xs ${getTypeColor(activity.type)}`}>
                {activity.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <span className="text-xs text-muted-foreground">{activity.time}</span>
        </div>
      ))}
    </div>
  );
}
