import { TrendingUp } from "lucide-react";
import { useGetCommissionDataQuery } from "../../redux/features/dashboard/dashboardApi";
import { useTranslations } from "next-intl";

export function FinancialOverview() {
    const t = useTranslations("dashboard");
    const tc = useTranslations("commission");
    const { data: commissionData, isLoading, error } = useGetCommissionDataQuery();

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h2 className="text-xl font-bold text-slate-800">{t("financialOverview")}</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="rounded-xl p-5 bg-slate-50 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between min-h-[140px]">
                            <div>
                                <div className="h-3 bg-slate-200 rounded mb-3 w-3/4"></div>
                                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                                <div className="h-2 bg-slate-200 rounded w-1/3 mb-1.5"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h2 className="text-xl font-bold text-slate-800">{t("financialOverview")}</h2>
                </div>
                <p className="text-red-500">{t("failedLoadCommission")}</p>
            </div>
        );
    }

    const financialData = [
        {
            title: tc("stats.totalRevenue"),
            value: `${Math.round(commissionData?.data.totalRevenue || 0).toLocaleString()} CFA`,
            subValue: `${Math.round(commissionData?.data.thisMonthRevenue || 0).toLocaleString()} CFA`,
            subLabel: tc("stats.thisMonthRevenue"),
            textColor: "text-indigo-600",
            valueColor: "text-indigo-700",
            bgColor: "bg-indigo-50/50",
            borderColor: "border-indigo-100/50",
        },
        {
            title: tc("stats.totalCommission"),
            value: `${Math.round(commissionData?.data.totalCommission || 0).toLocaleString()} CFA`,
            subValue: `${Math.round(commissionData?.data.thisMonthCommission || 0).toLocaleString()} CFA`,
            subLabel: tc("stats.thisMonthCommission"),
            textColor: "text-emerald-600",
            valueColor: "text-emerald-700",
            bgColor: "bg-emerald-50/50",
            borderColor: "border-emerald-100/50",
        },
        {
            title: tc("stats.totalBoost"),
            value: `${Math.round(commissionData?.data.totalBoost || 0).toLocaleString()} CFA`,
            subValue: `${Math.round(commissionData?.data.thisMonthBoost || 0).toLocaleString()} CFA`,
            subLabel: tc("stats.thisMonthBoost"),
            textColor: "text-rose-600",
            valueColor: "text-rose-700",
            bgColor: "bg-rose-50/50",
            borderColor: "border-rose-100/50",
        },
        {
            title: tc("stats.totalBuyerProtection"),
            value: `${Math.round(commissionData?.data.totalBuyerProtectionFee || 0).toLocaleString()} CFA`,
            subValue: `${Math.round(commissionData?.data.thisMonthBuyerProtectionFee || 0).toLocaleString()} CFA`,
            subLabel: tc("stats.thisMonthBuyerProtection"),
            textColor: "text-cyan-600",
            valueColor: "text-cyan-700",
            bgColor: "bg-cyan-50/50",
            borderColor: "border-cyan-100/50",
        },
        {
            title: tc("stats.pendingEscrow"),
            value: `${Math.round(commissionData?.data.pendingEscrow || 0).toLocaleString()} CFA`,
            subValue: tc("stats.waiting"),
            subLabel: tc("stats.escrowDesc"),
            textColor: "text-amber-600",
            valueColor: "text-amber-700",
            bgColor: "bg-amber-50/50",
            borderColor: "border-amber-100/50",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-bold text-slate-800">{t("financialOverview")}</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {financialData.map((item, index) => (
                    <div 
                        key={index} 
                        className={`rounded-xl p-5 ${item.bgColor} border ${item.borderColor} shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow`}
                    >
                        <div>
                            <p className={`text-xs font-semibold uppercase tracking-wider ${item.textColor} mb-2`}>{item.title}</p>
                            <h3 className={`text-2xl font-black ${item.valueColor} tracking-tight`}>{item.value}</h3>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200/40 flex flex-col gap-0.5">
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">{item.subLabel}</span>
                            <span className={`text-xs font-bold ${item.textColor}`}>{item.subValue}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
