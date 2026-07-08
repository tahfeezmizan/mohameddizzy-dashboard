"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Edit, MinusCircle, Trash2, Star, Loader2, CheckCircle2, Check } from "lucide-react";
import { useState } from "react";
import AddNewPackModal from "./add-new-pack.modal";
import { useDeleteBoostPackMutation, useToggleBoostPackStatusMutation, useSetBoostPackRecommendedMutation, TBoostPack } from "@/redux/features/boostPack/boostPackApi";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function BoostPackCard({ data }: { data: TBoostPack[] }) {
    const [editingPack, setEditingPack] = useState<TBoostPack | null>(null);
    const [deleteBoostPack, { isLoading: isDeleting }] = useDeleteBoostPackMutation();
    const [toggleStatus, { isLoading: isToggling }] = useToggleBoostPackStatusMutation();
    const [setRecommended, { isLoading: isSettingRecommended }] = useSetBoostPackRecommendedMutation();
    const t = useTranslations("boostPacks");

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteBoostPack(id).unwrap();
            if (res.success) {
                toast.success(res.message || t("card.toast.deleteSuccess"));
            }
        } catch (error: any) {
            toast.error(error?.data?.message || t("card.toast.deleteError"));
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const res = await toggleStatus(id).unwrap();
            if (res.success) {
                toast.success(res.message || t("card.toast.statusUpdated"));
            }
        } catch (error: any) {
            toast.error(error?.data?.message || t("card.toast.statusUpdateError"));
        }
    };

    const handleSetRecommended = async (id: string) => {
        try {
            const res = await setRecommended(id).unwrap();
            if (res.success) {
                toast.success(res.message || t("card.toast.recommendedUpdated"));
            }
        } catch (error: any) {
            toast.error(error?.data?.message || t("card.toast.recommendedUpdateError"));
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item: TBoostPack) => (
                <Card key={item._id} className={`shadow-sm border-slate-200 relative overflow-hidden flex flex-col h-full ${item.isRecommended ? "ring-2 ring-blue-500/50" : ""}`}>
                    {item.isRecommended && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                            <Star className="h-3 w-3 fill-white" />
                            {t("card.recommended")}
                        </div>
                    )}

                    <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2 pr-20">{item.name}</h3>
                                <div className="flex gap-2 items-center">
                                    <Badge variant="secondary" className={`${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"} hover:opacity-80 cursor-pointer`} onClick={() => handleToggleStatus(item._id)}>
                                        {item.isActive ? t("card.status.active") : t("card.status.inactive")}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">{t("card.details.duration")}</span>
                                <span className="font-bold text-slate-800">
                                    {item.duration} {t("card.details.days")}
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">{t("card.details.status")}</span>
                                <span className={`font-bold ${item.isActive ? "text-emerald-600" : "text-amber-600"}`}>{item.isActive ? t("card.status.active") : t("card.status.inactive")}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">{t("card.details.type")}</span>
                                <span className="font-bold text-slate-800">{item.type}</span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-slate-500">{t("card.details.price")}</span>
                                <span className="text-xl font-bold text-blue-600">{item.price.toLocaleString()} CFA</span>
                            </div>
                        </div>

                        {item.features && item.features.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100 mb-6">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">{t("card.details.features")}</span>
                                <ul className="space-y-2">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 mt-auto">
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => setEditingPack(item)} className="w-full py-5.5 text-base! text-slate-700 border-slate-200">
                                    <Edit className="mr-2 h-4 w-4" />
                                    {t("card.actions.edit")}
                                </Button>
                                <Button variant="secondary" onClick={() => handleToggleStatus(item._id)} disabled={isToggling} className={`w-full py-5.5 text-base! ${item.isActive ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
                                    {isToggling ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            {item.isActive ? <MinusCircle className="mr-2 h-4 w-4" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                            {item.isActive ? t("card.actions.disable") : t("card.actions.enable")}
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => handleSetRecommended(item._id)} disabled={isSettingRecommended || item.isRecommended} className={`w-full py-5.5 text-base! ${item.isRecommended ? "border-blue-200 bg-blue-50 text-blue-600" : "text-slate-700 border-slate-200"}`}>
                                    {isSettingRecommended ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Star className={`mr-2 h-4 w-4 ${item.isRecommended ? "fill-blue-600" : ""}`} />
                                            {item.isRecommended ? t("card.recommended") : t("card.actions.recommend")}
                                        </>
                                    )}
                                </Button>
                                <Button variant="secondary" onClick={() => handleDelete(item._id)} disabled={isDeleting} className="w-full py-5.5 text-base! bg-red-50 text-red-600 hover:bg-red-100">
                                    {isDeleting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            {t("card.actions.delete")}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <AddNewPackModal open={!!editingPack} setOpen={(open) => !open && setEditingPack(null)} editData={editingPack || undefined} />
        </div>
    );
}
