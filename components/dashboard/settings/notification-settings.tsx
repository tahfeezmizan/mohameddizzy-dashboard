"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { Toggle } from "@/lib/toggle";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
    data: {
        email: boolean;
        push: boolean;
    };
    onChange: (val: Partial<{ email: boolean; push: boolean }>) => void;
}

export default function NotificationSettings({ data, onChange }: NotificationSettingsProps) {
    return (
        <Card className="shadow-sm border-slate-200 py-0">
            <CardContent className="p-6">
                {/* <SectionHeader icon={<Bell className="h-4.5 w-4.5" />} title="Notification Settings" iconBg="bg-orange-50" iconColor="text-orange-500" /> */}
                <SectionHeader icon={<Bell className="h-4.5 w-4.5" />} title="Paramètres de Notifications" iconBg="bg-orange-50" iconColor="text-orange-500" />

                <div className="space-y-3.5">
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                        <div>
                            {/* <p className="text-base font-semibold text-slate-800">Email Notifications</p> */}
                            <p className="text-base font-semibold text-slate-800">Notifications par Email</p>
                            {/* <p className="text-sm text-slate-500 mt-0.5">Send email alerts for important platform events</p> */}
                            <p className="text-sm text-slate-500 mt-0.5">Envoyer des alertes par email pour les événements importants de la plateforme</p>
                        </div>
                        <Toggle id="email-notif-toggle" checked={data.email} onChange={(checked) => onChange({ email: checked })} />
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                        <div>
                            {/* <p className="text-base font-semibold text-slate-800">Push Notifications</p> */}
                            <p className="text-base font-semibold text-slate-800">Notifications Push</p>
                            {/* <p className="text-sm text-slate-500 mt-0.5">Enable browser push notifications for real-time updates</p> */}
                            <p className="text-sm text-slate-500 mt-0.5">Activer les notifications push du navigateur pour les mises à jour en temps réel</p>
                        </div>
                        <Toggle id="push-notif-toggle" checked={data.push} onChange={(checked) => onChange({ push: checked })} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
