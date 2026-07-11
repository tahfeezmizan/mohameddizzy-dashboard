"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetSingleUserQuery, useToggleUserActiveMutation, useRemoveVerifiedBadgeMutation } from "@/redux/features/users/userApi";
import { useSetUserPasswordByAdminMutation } from "@/redux/features/auth/authApi";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, ShieldAlert, Ban, UserX, ShieldMinus, Eye, EyeOff, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

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
    const [setUserPassword, { isLoading: isUpdatingPassword }] = useSetUserPasswordByAdminMutation();

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const t = useTranslations("users.modal");
    const tCommon = useTranslations("common");

    const user = userResponse?.data;

    useEffect(() => {
        if (!open) {
            setIsChangingPassword(false);
            setNewPassword("");
            setShowPassword(false);
        }
    }, [open]);

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

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;
        if (newPassword.length < 6) {
            toast.error(t("changePasswordForm.validationError"));
            return;
        }
        try {
            await setUserPassword({ userId, password: newPassword }).unwrap();
            toast.success(t("changePasswordForm.successToast"));
            setIsChangingPassword(false);
            setNewPassword("");
        } catch (error: any) {
            console.error("Failed to change user password", error);
            toast.error(error?.data?.message || t("changePasswordForm.errorToast"));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0 bg-white">
                {isLoading ? (
                    <div className="h-125 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="text-slate-500 font-medium">{t("loading")}</p>
                    </div>
                ) : isError || !user ? (
                    <div className="h-100 flex flex-col items-center justify-center gap-3">
                        <ShieldAlert className="h-12 w-12 text-red-500" />
                        <p className="text-slate-500 font-medium">{t("error")}</p>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            {tCommon("close")}
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
                                    <p className="text-sm text-slate-500">{user.email || t("noEmail")}</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className={`${user.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"} px-3 py-1`}>
                                {user.isActive ? t("status.activeAccount") : t("status.suspended")}
                            </Badge>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{t("info.userId")}</p>
                                    <p className="font-mono text-sm text-slate-900">{user._id}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{t("info.phoneNumber")}</p>
                                    <p className="font-medium text-slate-900">{user.phone}</p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{t("info.role")}</p>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px]">
                                        {user.role}
                                    </Badge>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{t("info.memberSince")}</p>
                                    <p className="font-medium text-slate-900">{new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
                                </div>
                            </div>

                            {/* Activity Stats */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-1 w-4 bg-blue-600 rounded-full"></div>
                                    {t("activity.title")}
                                </h3>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">{t("activity.listings")}</p>
                                        <p className="text-2xl font-bold text-slate-900">{user.publishedProductCount}</p>
                                    </div>

                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">{t("activity.walletBalance")}</p>
                                        <p className="text-2xl font-bold text-blue-600">{user.balance?.toLocaleString() || 0}</p>
                                    </div>

                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                                        <p className="text-xs font-medium text-slate-500 mb-1">{t("activity.verification")}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            {user.verifiedBadge ? (
                                                <Badge className="bg-blue-600 hover:bg-blue-600">{t("activity.verified")}</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-slate-400">
                                                    {t("activity.standard")}
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
                                    {t("actions.title")}
                                </h3>

                                <div className={`grid ${user?.verifiedBadge ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                                    <Button variant="outline" onClick={handleToggleActive} disabled={isToggling} className={`flex flex-col h-auto py-3 gap-1 ${user?.isActive ? "border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"}`}>
                                        {isToggling ? <Loader2 className="h-5 w-5 animate-spin" /> : <UserX className="h-5 w-5" />}
                                        <span className="text-[10px] font-bold uppercase">{user?.isActive ? t("actions.suspend") : t("actions.activate")}</span>
                                    </Button>

                                    {user?.verifiedBadge && (
                                        <Button variant="outline" onClick={handleRemoveBadge} disabled={isRemovingBadge} className="flex flex-col h-auto py-3 gap-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                                            {isRemovingBadge ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldMinus className="h-5 w-5" />}
                                            <span className="text-[10px] font-bold uppercase">{t("actions.removeBadge")}</span>
                                        </Button>
                                    )}

                                    <Button variant="outline" onClick={() => setIsChangingPassword(prev => !prev)} className={`flex flex-col h-auto py-3 gap-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800 ${isChangingPassword ? "bg-slate-100 border-slate-300" : ""}`}>
                                        <KeyRound className="h-5 w-5" />
                                        <span className="text-[10px] font-bold uppercase">{t("actions.changePassword")}</span>
                                    </Button>
                                </div>

                                {isChangingPassword && (
                                    <form onSubmit={handleSetPassword} className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                {t("changePasswordForm.title")}
                                            </label>
                                            <div className="relative flex items-center">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder={t("changePasswordForm.placeholder")}
                                                    className="pr-10 h-10 border-slate-200 focus:border-blue-500 bg-white"
                                                    required
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setIsChangingPassword(false);
                                                    setNewPassword("");
                                                }}
                                                className="text-xs font-semibold text-slate-500 hover:bg-slate-100"
                                            >
                                                {t("changePasswordForm.cancel")}
                                            </Button>
                                            <Button
                                                type="submit"
                                                size="sm"
                                                disabled={isUpdatingPassword}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4"
                                            >
                                                {isUpdatingPassword ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5 inline" /> : null}
                                                {t("changePasswordForm.submit")}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
