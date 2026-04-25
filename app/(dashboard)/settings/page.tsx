import CurrencySettings from "@/components/dashboard/settings/currency-settings";
import LocationSettings from "@/components/dashboard/settings/location-settings";
import NotificationSettings from "@/components/dashboard/settings/notification-settings";
import PaymentSettings from "@/components/dashboard/settings/payment-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Platform Settings
        </h1>
        <p className="text-slate-500">Configure system rules and preferences</p>
      </div>

      {/* ── Payment Settings ── */}
      <PaymentSettings />

      {/* ── Currency Settings ── */}
      <CurrencySettings />

      {/* ── Location Settings ── */}
      <LocationSettings />

      {/* ── Notification Settings ── */}
      <NotificationSettings />

      {/* ── Save Button ── */}
      {/* <div className="flex justify-end">
        <Button
          id="save-settings-btn"
          onClick={handleSave}
          className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div> */}
    </div>
  );
}
