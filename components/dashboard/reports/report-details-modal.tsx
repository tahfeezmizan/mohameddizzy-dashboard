"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, XCircle, CheckCircle2, ShieldAlert, User, Package, Calendar } from "lucide-react";
import { useGetReportByIdQuery, useUpdateReportStatusMutation, type TReportStatus } from "@/redux/features/report/reportApi";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function ReportDetailsModal({
    open,
    setOpen,
    reportId
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    reportId: string | null;
}) {
    const t = useTranslations("reports.modal");
    const { data, isLoading, isError } = useGetReportByIdQuery(reportId as string, {
        skip: !reportId || !open,
    });
    const [updateStatus, { isLoading: isUpdating }] = useUpdateReportStatusMutation();

    const report = data?.data;

    const getImageUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const handleUpdateStatus = async (newStatus: TReportStatus) => {
        if (!reportId) return;
        try {
            await updateStatus({ id: reportId, status: newStatus }).unwrap();
            toast.success(t("actions.successMessage"));
            setOpen(false);
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error(t("actions.errorMessage"));
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "OPEN":
                return "bg-red-50 text-red-600 border border-red-100";
            case "IN_REVIEW":
                return "bg-orange-50 text-orange-600 border border-orange-100";
            case "RESOLVED":
                return "bg-emerald-50 text-emerald-600 border border-emerald-100";
            default:
                return "bg-slate-50 text-slate-600 border border-slate-100";
        }
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-white">
                    <div className="h-64 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="text-slate-500 font-medium">{t("loading")}</p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (isError || !report) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-white">
                    <div className="h-64 flex flex-col items-center justify-center gap-3">
                        <XCircle className="h-12 w-12 text-red-500" />
                        <p className="text-slate-500 font-medium">{t("error")}</p>
                        <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                            {t("close")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                            {t("title")}
                        </h2>
                        <p className="text-sm text-slate-500 font-mono">
                            {report.reportId || `#${report._id.slice(-6).toUpperCase()}`}
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Basic Info */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                            {t("info.title")}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    {t("info.status")}
                                </p>
                                <Badge variant="outline" className={`${getStatusStyle(report.status)} font-medium`}>
                                    {report.status}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    {t("info.createdAt")}
                                </p>
                                <p className="font-medium text-slate-950 flex items-center gap-1.5 text-sm">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    {new Date(report.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    {t("info.reason")}
                                </p>
                                <p className="font-semibold text-slate-950 text-sm">
                                    {report.reason}
                                </p>
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                    {t("info.details")}
                                </p>
                                <p className="text-slate-700 bg-white border rounded-lg p-3 text-sm whitespace-pre-wrap leading-relaxed shadow-sm">
                                    {report.details}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reported Target Section */}
                    {report.type === "LISTING" && report.reportedItem ? (
                        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                {t("reportedTargetInfo.title")}
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                {report.reportedItem.images && report.reportedItem.images.length > 0 && (
                                    <div className="w-24 h-24 relative rounded-lg overflow-hidden border border-amber-200 shrink-0 bg-white shadow-sm">
                                        <img
                                            src={getImageUrl(report.reportedItem.images[0])}
                                            alt={report.reportedItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="space-y-1.5 flex-1">
                                    <h4 className="text-base font-bold text-slate-900">
                                        {report.reportedItem.title}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600">
                                        <p>
                                            <span className="font-medium text-slate-400">{t("reportedTargetInfo.listingPrice")}:</span>{" "}
                                            <span className="font-semibold text-amber-700">
                                                {report.reportedItem.price.toLocaleString()} CFA
                                            </span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-slate-400">{t("reportedTargetInfo.listingOwner")}:</span>{" "}
                                            <span className="font-semibold text-slate-800">
                                                {report.reportedUser.name}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* User Profiles details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Reporter info */}
                        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <User className="h-4 w-4 text-slate-400" />
                                {t("reporterInfo.title")}
                            </h3>
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                                    <AvatarImage src={getImageUrl(report.reporter.photo)} alt={report.reporter.name} />
                                    <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-sm">
                                        {report.reporter.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                                        {report.reporter.name}
                                        {report.reporter.verifiedBadge && (
                                            <Badge className="bg-blue-500 text-white border-none py-0.5 px-1.5 text-[10px] font-semibold">
                                                {t("reporterInfo.verified")}
                                            </Badge>
                                        )}
                                    </h4>
                                    <p className="text-xs text-slate-400">{report.reporter.verifiedBadge ? t("reporterInfo.verified") : t("reporterInfo.standard")}</p>
                                </div>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                                <p><span className="font-medium text-slate-400">{t("reporterInfo.email")}:</span> {report.reporter.email || "-"}</p>
                                <p><span className="font-medium text-slate-400">{t("reporterInfo.phone")}:</span> {report.reporter.phone || "-"}</p>
                            </div>
                        </div>

                        {/* Reported User info */}
                        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <User className="h-4 w-4 text-slate-400" />
                                {report.type === "LISTING" ? t("reportedTargetInfo.listingOwner") : t("reportedTargetInfo.title")}
                            </h3>
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                                    <AvatarImage src={getImageUrl(report.reportedUser.photo)} alt={report.reportedUser.name} />
                                    <AvatarFallback className="bg-red-50 text-red-600 font-bold text-sm">
                                        {report.reportedUser.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                                        {report.reportedUser.name}
                                        {report.reportedUser.verifiedBadge && (
                                            <Badge className="bg-blue-500 text-white border-none py-0.5 px-1.5 text-[10px] font-semibold">
                                                {t("reportedTargetInfo.verified")}
                                            </Badge>
                                        )}
                                    </h4>
                                    <p className="text-xs text-slate-400">{report.reportedUser.verifiedBadge ? t("reportedTargetInfo.verified") : t("reportedTargetInfo.standard")}</p>
                                </div>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                                <p><span className="font-medium text-slate-400">{t("reportedTargetInfo.email")}:</span> {report.reportedUser.email || "-"}</p>
                                <p><span className="font-medium text-slate-400">{t("reportedTargetInfo.phone")}:</span> {report.reportedUser.phone || "-"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Controls */}
                    {report.status !== "RESOLVED" && (
                        <div className="pt-4 border-t space-y-3">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {t("actions.title")}
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {report.status === "OPEN" && (
                                    <Button
                                        onClick={() => handleUpdateStatus("IN_REVIEW")}
                                        disabled={isUpdating}
                                        variant="outline"
                                        className="flex-1 py-5 border-orange-200 text-orange-700 hover:bg-orange-50 cursor-pointer text-sm font-semibold"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                {t("actions.updating")}
                                            </>
                                        ) : (
                                            t("actions.markInReview")
                                        )}
                                    </Button>
                                )}
                                <Button
                                    onClick={() => handleUpdateStatus("RESOLVED")}
                                    disabled={isUpdating}
                                    className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer text-sm font-semibold"
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {t("actions.updating")}
                                        </>
                                    ) : (
                                        t("actions.markResolved")
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
