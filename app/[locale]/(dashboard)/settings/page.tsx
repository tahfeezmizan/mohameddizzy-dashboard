"use client";

import NotificationSettings from "@/components/dashboard/settings/notification-settings";
import PaymentSettings from "@/components/dashboard/settings/payment-settings";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/features/settings/settingsApi";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const { data: settingsData, isLoading } = useGetSettingsQuery();
    const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

    const [payment, setPayment] = useState({
        commissionRate: 10,
        escrowDuration: 72,
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
    });

    useEffect(() => {
        if (settingsData?.data) {
            setPayment(settingsData.data.payment);
            setNotifications(settingsData.data.notifications);
        }
    }, [settingsData]);

    const handleSave = async (updatedData?: any) => {
        try {
            const payload = updatedData || {
                payment,
                notifications,
            };
            await updateSettings(payload).unwrap();
            // toast.success("Settings updated successfully");
            toast.success("Paramètres mis à jour avec succès");
        } catch (error: any) {
            // toast.error(error?.data?.message || "Failed to update settings");
            toast.error(error?.data?.message || "Échec de la mise à jour des paramètres");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-100 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    {/* <h1 className="text-3xl font-bold text-slate-900 mb-1">Platform Settings</h1> */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Paramètres de la Plateforme</h1>
                    {/* <p className="text-slate-500">Configure system rules and preferences</p> */}
                    <p className="text-slate-500">Configurer les règles et préférences du système</p>
                </div>
                <Button onClick={() => handleSave()} disabled={isUpdating} className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {/* Save Changes */}
                    Enregistrer les Modifications
                </Button>
            </div>

            {/* ── Payment Settings ── */}
            <PaymentSettings data={payment} onChange={(val) => setPayment({ ...payment, ...val })} />

            {/* ── Notification Settings ── */}
            <NotificationSettings
                data={notifications}
                onChange={(val) => {
                    const newNotifications = { ...notifications, ...val };
                    setNotifications(newNotifications);
                    handleSave({ payment, notifications: newNotifications });
                }}
            />
        </div>
    );
}
