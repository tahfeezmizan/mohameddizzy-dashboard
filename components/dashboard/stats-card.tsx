import { Card, CardContent } from "../ui/card";

export type StatItem = {
  title: string;
  value: number | string;
  icon?: any;
  iconBg?: string;
  iconColor?: string;
};

export default function StatsCard({ stats }: { stats: StatItem[] }) {
  return (
    <div
      className={`grid gap-6 ${
        stats.length === 3
          ? "grid-cols-3"
          : stats.length >= 4
            ? "grid-cols-4"
            : "grid-cols-1"
      }`}
    >
      {stats?.map((item: any, index: number) => {
        const Icon = item.icon;

        return (
          <Card key={index} className="shadow-sm border-slate-200 py-0">
            <CardContent className="p-6 flex items-center gap-4">
              {Icon && (
                <div
                  className={`h-12 w-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  {item.title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 leading-none">
                  {item.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
