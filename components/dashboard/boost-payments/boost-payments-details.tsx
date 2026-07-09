"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Package, CreditCard, ExternalLink, Calendar, Zap, FileText, ShoppingBag, Loader2 } from "lucide-react";
import { TBoostPayment, useGetBoostPaymentByIdQuery } from "@/redux/features/boostPayment/boostPaymentApi";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BoostPaymentsDetailsProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    payment: TBoostPayment | null;
}

const statusStyles: Record<string, string> = {
    PENDING: "bg-orange-50 text-orange-600 border-orange-200/50",
    COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
    FAILED: "bg-red-50 text-red-600 border-red-200/50",
    REFUNDED: "bg-purple-50 text-purple-600 border-purple-200/50",
    CANCELLED: "bg-slate-50 text-slate-600 border-slate-200/50",
};

export default function BoostPaymentsDetails({ open, setOpen, payment }: BoostPaymentsDetailsProps) {
    const t = useTranslations("boostPayments.details");

    const { data: responseData, isLoading } = useGetBoostPaymentByIdQuery(payment?._id as string, {
        skip: !payment?._id || !open,
    });

    if (!payment) return null;

    // Use detailed single API response if loaded, otherwise fall back to row object from list API
    const detailedPayment = responseData?.data || payment;

    const getImageUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://djarna.apponislam.top";
        return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const isProduct = detailedPayment.type === "PRODUCT" && detailedPayment.productId;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0 bg-white border border-slate-200 rounded-xl shadow-lg relative">
                <div className="sr-only">
                    <DialogTitle>{t("title")} - {detailedPayment._id}</DialogTitle>
                    <DialogDescription>
                        {t("paymentInfo")}
                    </DialogDescription>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{t("title")}</h2>
                        <p className="text-sm text-slate-500 font-mono mt-0.5">#{detailedPayment._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoading && (
                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        )}
                        <Badge className={`${statusStyles[detailedPayment.status] || "bg-slate-50 text-slate-600"} border font-semibold px-3 py-1 text-sm`}>
                            {detailedPayment.status}
                        </Badge>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                    {/* Two Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Column 1: Payment and User Info */}
                        <div className="space-y-6">
                            
                            {/* Payment Info Box */}
                            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                    {t("paymentInfo")}
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("transactionId")}</p>
                                        <p className="font-semibold text-slate-800 font-mono text-sm">{detailedPayment._id}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("boostPackName")}</p>
                                            <p className="font-semibold text-slate-800">{detailedPayment.boostPackId?.name || t("notAvailable")}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("productPrice")}</p>
                                            <p className="text-lg font-bold text-blue-600">
                                                {detailedPayment.amount?.toLocaleString()} {detailedPayment.currency}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("createdAt")}</p>
                                            <p className="text-sm font-medium text-slate-700">
                                                {new Date(detailedPayment.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("paidAt")}</p>
                                            <p className="text-sm font-medium text-slate-700">
                                                {detailedPayment.paidAt ? new Date(detailedPayment.paidAt).toLocaleString() : t("notAvailable")}
                                            </p>
                                        </div>
                                    </div>
                                    {detailedPayment.paydunyaInvoiceToken && (
                                        <div className="border-t border-slate-100 pt-3 space-y-2">
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("invoiceToken")}</p>
                                                <p className="text-xs font-mono text-slate-600 bg-slate-100 p-1.5 rounded select-all truncate">{detailedPayment.paydunyaInvoiceToken}</p>
                                            </div>
                                            {detailedPayment.paydunyaReceiptUrl && (
                                                <div className="pt-1">
                                                    <a 
                                                        href={detailedPayment.paydunyaReceiptUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-center gap-2 hover:bg-slate-100 hover:text-slate-900 border-slate-200")}
                                                    >
                                                        <FileText className="h-4 w-4 text-slate-500" />
                                                        {t("viewReceipt")}
                                                        <ExternalLink className="h-3 w-3 text-slate-400 ml-0.5" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* User Info Box */}
                            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    {t("userInfo")}
                                </h3>
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12 border border-slate-200 shadow-sm">
                                        <AvatarImage src={getImageUrl(detailedPayment.userId?.photo)} alt={detailedPayment.userId?.name} />
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                                            {detailedPayment.userId?.name?.slice(0, 2).toUpperCase() || "US"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-800">{detailedPayment.userId?.name || t("notAvailable")}</p>
                                        <p className="text-sm text-slate-500 font-medium">{detailedPayment.userId?.email || t("notAvailable")}</p>
                                        <p className="text-sm text-slate-500 font-medium">{detailedPayment.userId?.phone || t("notAvailable")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Boost Pack and Product Info */}
                        <div className="space-y-6">
                            
                            {/* Boost Details Box */}
                            <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-orange-500 fill-orange-100" />
                                    {t("boostInfo")}
                                </h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("boostType")}</p>
                                            <Badge variant="secondary" className="mt-1 font-semibold capitalize bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-50">
                                                {detailedPayment.type?.toLowerCase()}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t("duration")}</p>
                                            <p className="font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                {t("durationDays", { days: detailedPayment.boostPackId?.duration || 0 })}
                                            </p>
                                        </div>
                                    </div>
                                    {detailedPayment.boostPackId?.features && detailedPayment.boostPackId.features.length > 0 && (
                                        <div className="border-t border-slate-100 pt-3">
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Pack Features</p>
                                            <ul className="space-y-1.5 text-xs text-slate-600">
                                                {detailedPayment.boostPackId.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Info Box (conditional) */}
                            {isProduct ? (
                                <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Package className="h-4 w-4 text-slate-400" />
                                        {t("productInfo")}
                                    </h3>
                                    <div className="flex gap-4">
                                        {detailedPayment.productId?.images && detailedPayment.productId.images.length > 0 && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0 shadow-sm">
                                                <img 
                                                    src={getImageUrl(detailedPayment.productId.images[0])} 
                                                    alt={detailedPayment.productId.title} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="space-y-1.5 overflow-hidden">
                                            <h4 className="font-bold text-slate-800 truncate" title={detailedPayment.productId?.title}>
                                                {detailedPayment.productId?.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium">
                                                {t("productCategory")}: <span className="text-slate-700 font-semibold">{detailedPayment.productId?.category}</span>
                                            </p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm font-bold text-slate-800">
                                                    {detailedPayment.amount?.toLocaleString()} {detailedPayment.currency}
                                                </span>
                                                {detailedPayment.productId?.originalPrice && detailedPayment.productId.originalPrice > detailedPayment.productId.price && (
                                                    <span className="text-xs text-slate-400 line-through">
                                                        {detailedPayment.productId.originalPrice.toLocaleString()} {detailedPayment.currency}
                                                    </span>
                                                )}
                                            </div>
                                            <Badge variant="outline" className="text-xs capitalize font-medium py-0 px-2 mt-1">
                                                {detailedPayment.productId?.status?.toLowerCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ) : detailedPayment.type === "SHOP" ? (
                                <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 flex flex-col justify-center items-center py-8 text-center text-slate-500 space-y-2">
                                    <ShoppingBag className="h-8 w-8 text-slate-400" />
                                    <div>
                                        <p className="font-semibold text-slate-700">{t("boostType")}: Shop Boost</p>
                                        <p className="text-xs text-slate-400 mt-1">This boost applies directly to the user's merchant storefront shop presence.</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-3">
                    <Button variant="outline" onClick={() => setOpen(false)} className="hover:bg-slate-100 hover:text-slate-900 border-slate-200">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
