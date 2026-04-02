import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, Clock } from "lucide-react";

const iconMap: any = {
  TrendingUp,
  CheckCircle2,
  Clock,
};

export default function CommissionStats({ data }: any) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data.map((item: any, index: number) => {
        const Icon = iconMap[item.icon];

        return (
          <Card
            key={index}
            className={`${item.bgColor} text-white border-0 shadow-sm py-1`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-white/20">
                  {Icon && <Icon className="h-6 w-6 text-white" />}
                </div>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium p-3">
                  {item.badge}
                </Badge>
              </div>

              <div>
                <p className={`text-sm font-medium ${item.textColor} mb-1`}>
                  {item.title}
                </p>
                <h3 className="text-3xl font-bold mb-2">{item.value}</h3>
                <p className={`text-xs ${item.subTextColor}`}>
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
