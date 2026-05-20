"use client";

import DisputesTable from "@/components/dashboard/disputes/disputes-table";
import StatsCard from "@/components/dashboard/stats-card";
import { AlertCircle, CheckCircle2, Scale, Loader2 } from "lucide-react";
import { useGetDisputeStatsQuery } from "@/redux/features/dispute/disputeApi";

export default function Disputes() {
    const { data: statsData, isLoading: isStatsLoading } = useGetDisputeStatsQuery();

    const stats = [
        {
            // title: "Total Disputes",
            title: "Total des Litiges",
            value: isStatsLoading ? "..." : statsData?.data?.total || 0,
            icon: Scale,
            iconBg: "bg-slate-50",
            iconColor: "text-slate-500",
        },
        {
            // title: "Pending Disputes",
            title: "Litiges en Attente",
            value: isStatsLoading ? "..." : statsData?.data?.pending || 0,
            icon: AlertCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            // title: "Resolved",
            title: "Résolus",
            value: isStatsLoading ? "..." : statsData?.data?.resolved || 0,
            icon: CheckCircle2,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="mb-8">
                {/* <h1 className="text-3xl font-bold text-slate-900 mb-2">Disputes Center</h1> */}
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Centre des Litiges</h1>
                {/* <p className="text-slate-500">Resolve buyer-seller conflicts</p> */}
                <p className="text-slate-500">Résoudre les conflits acheteur-vendeur</p>
            </div>

            {isStatsLoading ? (
                <div className="flex items-center justify-center min-h-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <StatsCard stats={stats} />
            )}

            <DisputesTable />

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
                <svg className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p>
                    {/* <span className="font-semibold text-slate-800">Secure:</span> Funds are held securely in escrow until delivery is confirmed. Commission is released after dispute window closes. */}
                    <span className="font-semibold text-slate-800">Sécurisé :</span> Les fonds sont détenus en sécurité en séquestre jusqu'à confirmation de la livraison. La commission est versée après fermeture de la fenêtre de litige.
                </p>
            </div>
        </div>
    );
}
