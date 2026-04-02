"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { Toggle } from "@/lib/toggle";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <Card className="shadow-sm border-slate-200 py-0">
      <CardContent className="p-6">
        <SectionHeader
          icon={<Bell className="h-4.5 w-4.5" />}
          title="Notification Settings"
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-base font-semibold text-slate-800">
                Email Notifications
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                Send email alerts for important platform events
              </p>
            </div>
            <Toggle
              id="email-notif-toggle"
              checked={emailNotif}
              onChange={setEmailNotif}
            />
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-base font-semibold text-slate-800">
                Push Notifications
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                Enable browser push notifications for real-time updates
              </p>
            </div>
            <Toggle
              id="push-notif-toggle"
              checked={pushNotif}
              onChange={setPushNotif}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
