import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Edit, MinusCircle, Trash2, Star, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import AddNewPackModal from "./add-new-pack.modal";
import { useDeleteBoostPackMutation, useToggleBoostPackStatusMutation, useSetBoostPackRecommendedMutation, TBoostPack } from "@/redux/features/boostPack/boostPackApi";
import { toast } from "sonner";

export default function BoostPackCard({ data }: { data: TBoostPack[] }) {
    const [editingPack, setEditingPack] = useState<TBoostPack | null>(null);
    const [deleteBoostPack, { isLoading: isDeleting }] = useDeleteBoostPackMutation();
    const [toggleStatus, { isLoading: isToggling }] = useToggleBoostPackStatusMutation();
    const [setRecommended, { isLoading: isSettingRecommended }] = useSetBoostPackRecommendedMutation();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteBoostPack(id).unwrap();
            if (res.success) {
                toast.success("Pack deleted successfully");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete pack");
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const res = await toggleStatus(id).unwrap();
            if (res.success) {
                toast.success(res.message || "Status updated");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handleSetRecommended = async (id: string) => {
        try {
            const res = await setRecommended(id).unwrap();
            if (res.success) {
                toast.success(res.message || "Recommended status updated");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to set recommended");
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item: TBoostPack) => (
                <Card key={item._id} className={`shadow-sm border-slate-200 relative overflow-hidden ${item.isRecommended ? "ring-2 ring-blue-500/50" : ""}`}>
                    {item.isRecommended && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                            <Star className="h-3 w-3 fill-white" /> Recommended
                        </div>
                    )}

                    <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2 pr-20">{item.name}</h3>
                                <div className="flex gap-2 items-center">
                                    <Badge variant="secondary" className={`${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"} hover:opacity-80 cursor-pointer`} onClick={() => handleToggleStatus(item._id)}>
                                        {item.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">Duration:</span>
                                <span className="font-bold text-slate-800">{item.duration} Days</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">Status:</span>
                                <span className={`font-bold ${item.isActive ? "text-emerald-600" : "text-amber-600"}`}>{item.isActive ? "Active" : "Inactive"}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">Type:</span>
                                <span className="font-bold text-slate-800">{item.type}</span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-slate-500">Price:</span>
                                <span className="text-xl font-bold text-blue-600">{item.price.toLocaleString()} FCFA</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={() => setEditingPack(item)} className="w-full py-5.5 text-base! text-slate-700 border-slate-200">
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button variant="secondary" onClick={() => handleToggleStatus(item._id)} disabled={isToggling} className={`w-full py-5.5 text-base! ${item.isActive ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
                                    {isToggling ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            {item.isActive ? <MinusCircle className="mr-2 h-4 w-4" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                            {item.isActive ? "Disable" : "Enable"}
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
                                            {item.isRecommended ? "Recommended" : "Recommend"}
                                        </>
                                    )}
                                </Button>
                                <Button variant="secondary" onClick={() => handleDelete(item._id)} disabled={isDeleting} className="w-full py-5.5 text-base! bg-red-50 text-red-600 hover:bg-red-100">
                                    {isDeleting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
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
