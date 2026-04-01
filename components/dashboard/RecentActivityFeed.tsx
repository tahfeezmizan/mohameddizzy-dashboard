import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const activities = [
  {
    title: "New seller registered",
    subtitle: "JohnDoe123 • 2 minutes ago",
    color: "bg-blue-500",
  },
  {
    title: "Order #1234 completed",
    subtitle: "AliceM • 15 minutes ago",
    color: "bg-emerald-500",
  },
  {
    title: "Dispute opened by buyer",
    subtitle: "BobSmith • 1 hour ago",
    color: "bg-orange-500",
  },
  {
    title: "Product reported",
    subtitle: "CarolW • 2 hours ago",
    color: "bg-rose-500",
  },
  {
    title: "New boost pack purchased",
    subtitle: "DavidK • 3 hours ago",
    color: "bg-emerald-500",
  },
];

export function RecentActivityFeed() {
  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200 flex flex-col h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold text-slate-800">
          Recent Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 shrink-0 transition-colors hover:bg-slate-100"
          >
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activity.color}`} />
            <div>
              <p className="text-sm font-medium text-slate-800">{activity.title}</p>
              <p className="text-xs text-slate-500">{activity.subtitle}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
