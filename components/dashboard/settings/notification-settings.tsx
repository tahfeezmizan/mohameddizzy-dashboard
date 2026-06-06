"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { Toggle } from "@/lib/toggle";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

interface NotificationSettingsProps {
    data: {
        email: boolean;
        push: boolean;
    };
    onChange: (val: Partial<{ email: boolean; push: boolean }>) => void;
}

export default function NotificationSettings({ data, onChange }: NotificationSettingsProps) {
    const t = useTranslations("settings.notification");

    return (
        <Card className="shadow-sm border-slate-200 py-0">
            <CardContent className="p-6">
                <SectionHeader icon={<Bell className="h-4.5 w-4.5" />} title={t("title")} iconBg="bg-orange-50" iconColor="text-orange-500" />

                <div className="space-y-3.5">
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                        <div>
                            <p className="text-base font-semibold text-slate-800">{t("email.title")}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{t("email.description")}</p>
                        </div>
                        <Toggle id="email-notif-toggle" checked={data.email} onChange={(checked) => onChange({ email: checked })} />
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                        <div>
                            <p className="text-base font-semibold text-slate-800">{t("push.title")}</p>
                            <p className="text-sm text-slate-500 mt-0.5">{t("push.description")}</p>
                        </div>
                        <Toggle id="push-notif-toggle" checked={data.push} onChange={(checked) => onChange({ push: checked })} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
