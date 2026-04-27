import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export type MetricItem = {
    title: string;
    value: string;
    // subValue: string;
    // subValueColor?: string;
    // subValueIcon?: LucideIcon;
    icon: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
};

interface MetricCardProps {
    item: MetricItem;
}

export function MetricCard({ item }: MetricCardProps) {
    const {
        title,
        value,
        // subValue,
        // subValueColor = "text-slate-500",
        // subValueIcon: SubValueIcon,
        icon: Icon,
        iconBgColor = "bg-blue-100",
        iconColor = "text-blue-600",
    } = item;

    return (
        <Card className="shadow-sm border-slate-200 py-0">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                        {/* <div className={`flex items-center text-sm font-medium ${subValueColor}`}>
                            {SubValueIcon && <SubValueIcon className="mr-1 h-3.5 w-3.5" />}
              {subValue}
                        </div> */}
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor}`}>
                        <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
