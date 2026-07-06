import { TrendingUp } from "lucide-react";
import { useGetCommissionDataQuery } from "../../redux/features/dashboard/dashboardApi";
import { useTranslations } from "next-intl";

export function FinancialOverview() {
    const t = useTranslations("dashboard");
    const { data: commissionData, isLoading, error } = useGetCommissionDataQuery();

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h2 className="text-xl font-bold text-slate-800">{t("financialOverview")}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-xl p-6 bg-slate-100 border border-slate-200 shadow-sm animate-pulse">
                            <div className="h-4 bg-slate-300 rounded mb-2 w-3/4"></div>
                            <div className="h-8 bg-slate-300 rounded w-1/2"></div>
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
            title: t("totalRevenueCommission"),
            value: `${commissionData?.data.totalRevenue.toLocaleString()} CFA`,
            textColor: "text-blue-600",
            valueColor: "text-blue-700",
            bgColor: "bg-[#eef2ff]",
            borderColor: "border-blue-100",
        },
        {
            title: t("thisMonthCommission"),
            value: `${commissionData?.data.thisMonthCommission.toLocaleString()} CFA`,
            textColor: "text-emerald-600",
            valueColor: "text-emerald-700",
            bgColor: "bg-[#ecfdf5]",
            borderColor: "border-emerald-100",
        },
        {
            title: t("pendingEscrow"),
            value: `${commissionData?.data.pendingEscrow.toLocaleString()} CFA`,
            textColor: "text-orange-600",
            valueColor: "text-orange-700",
            bgColor: "bg-[#fff7ed]",
            borderColor: "border-orange-100",
        },
    ];

    return (
        <div className=" bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-bold text-slate-800">{t("financialOverview")}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {financialData.map((item, index) => (
                    <div key={index} className={`rounded-xl p-6 ${item.bgColor} border ${item.borderColor} shadow-sm`}>
                        <p className={`text-sm font-medium ${item.textColor} mb-2`}>{item.title}</p>
                        <h3 className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
