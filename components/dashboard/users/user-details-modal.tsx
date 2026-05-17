import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetSingleUserQuery, useToggleUserActiveMutation, useRemoveVerifiedBadgeMutation } from "@/redux/features/users/userApi";
import { Loader2, CheckCircle2, ShieldAlert, Ban, UserX, ShieldMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UserDetailsModal({ open, setOpen, userId }: { open: boolean; setOpen: (open: boolean) => void; userId: string | null }) {
    const {
        data: userResponse,
        isLoading,
        isError,
    } = useGetSingleUserQuery(userId as string, {
        skip: !userId || !open,
    });

    const [toggleActive, { isLoading: isToggling }] = useToggleUserActiveMutation();
    const [removeBadge, { isLoading: isRemovingBadge }] = useRemoveVerifiedBadgeMutation();

    const user = userResponse?.data;

    const handleToggleActive = async () => {
        if (!userId) return;
        try {
            await toggleActive(userId).unwrap();
        } catch (error) {
            console.error("Failed to toggle user active status", error);
        }
    };

    const handleRemoveBadge = async () => {
        if (!userId) return;
        try {
            await removeBadge(userId).unwrap();
        } catch (error) {
            console.error("Failed to remove verified badge", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0 bg-white">
                {isLoading ? (
                    <div className="h-125 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="text-slate-500 font-medium">Loading user details...</p>
                    </div>
                ) : isError || !user ? (
                    <div className="h-100 flex flex-col items-center justify-center gap-3">
                        <ShieldAlert className="h-12 w-12 text-red-500" />
                        <p className="text-slate-500 font-medium">Failed to load user details</p>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-6 border-b bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-600/20">{user.name.charAt(0).toUpperCase()}</div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                        {user.verifiedBadge && <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50" />}
                                    </div>
                                    <p className="text-sm text-slate-500">{user.email || "No email provided"}</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className={`${user.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"} px-3 py-1`}>
                                {user.isActive ? "Active Account" : "Suspended"}
                            </Badge>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">User ID</p>
                                    <p className="font-mono text-sm text-slate-900">{user._id}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                                    <p className="font-medium text-slate-900">{user.phone}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role</p>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px]">
                                        {user.role}
                                    </Badge>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                                    <p className="font-medium text-slate-900">{new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                                </div>
                            </div>

                            {/* Activity Stats */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-1 w-4 bg-blue-600 rounded-full"></div>
                                    Activity Overview
                                </h3>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">Listings</p>
                                        <p className="text-2xl font-bold text-slate-900">{user.publishedProductCount}</p>
                                    </div>

                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">Wallet Balance</p>
                                        <p className="text-2xl font-bold text-blue-600">{user.balance?.toLocaleString() || 0}</p>
                                    </div>

                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">Verification</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            {user.verifiedBadge ? (
                                                <Badge className="bg-blue-600 hover:bg-blue-600">Verified</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-slate-400">
                                                    Standard
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-1 w-4 bg-red-600 rounded-full"></div>
                                    Administrative Actions
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" onClick={handleToggleActive} disabled={isToggling} className={`flex flex-col h-auto py-3 gap-1 ${user?.isActive ? "border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"}`}>
                                        {isToggling ? <Loader2 className="h-5 w-5 animate-spin" /> : <UserX className="h-5 w-5" />}
                                        <span className="text-[10px] font-bold uppercase">{user?.isActive ? "Suspend" : "Activate"}</span>
                                    </Button>

                                    {user?.verifiedBadge && (
                                        <Button variant="outline" onClick={handleRemoveBadge} disabled={isRemovingBadge} className="flex flex-col h-auto py-3 gap-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                                            {isRemovingBadge ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldMinus className="h-5 w-5" />}
                                            <span className="text-[10px] font-bold uppercase">Remove Badge</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
