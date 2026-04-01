"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bell,
  DollarSign,
  Globe,
  Lock,
  MapPin,
  Save,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}

// ─── Reusable Toggle ──────────────────────────────────────────────────────────

function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  title: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`h-9 w-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
      >
        <span className={iconColor}>{icon}</span>
      </div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
    </div>
  );
}

// ─── Currency options ─────────────────────────────────────────────────────────

const currencies = [
  { code: "XOF", label: "West African CFA" },
  { code: "EUR", label: "Euro" },
  { code: "USD", label: "US Dollar" },
  { code: "GBP", label: "British Pound" },
];

const defaultCountries = ["Senegal", "Ivory Coast", "Mali", "Burkina Faso", "Benin"];
const defaultCities = ["Dakar", "Abidjan", "Bamako", "Ouagadougou", "Cotonou"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // Payment
  const [commission, setCommission] = useState(8);
  const [escrow, setEscrow] = useState(72);

  // Currency
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  // Location
  const [countries] = useState<string[]>(defaultCountries);
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [newCity, setNewCity] = useState("");

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  function handleAddCity() {
    const trimmed = newCity.trim();
    if (trimmed && !cities.includes(trimmed)) {
      setCities((prev) => [...prev, trimmed]);
      setNewCity("");
    }
  }

  function handleRemoveCity(city: string) {
    setCities((prev) => prev.filter((c) => c !== city));
  }

  function handleSave() {
    // Placeholder – wire up to your API
    alert("Settings saved!");
  }

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
      <Card className="shadow-sm border-slate-200 py-0">
        <CardContent className="p-6">
          <SectionHeader
            icon={<DollarSign className="h-4.5 w-4.5" />}
            title="Payment Settings"
            iconBg="bg-blue-50"
            iconColor="text-blue-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Commission Rate */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-3">
                Commission Rate (%)
              </p>
              <div className="flex items-center gap-4">
                <input
                  id="commission-rate"
                  type="range"
                  min={1}
                  max={30}
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="flex-1 accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <span className="text-2xl font-bold text-blue-600 w-14 text-right">
                  {commission}%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Platform commission taken from each transaction
              </p>
            </div>

            {/* Escrow Duration */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-3">
                Escrow Duration (hours)
              </p>
              <div className="flex items-center gap-4">
                <input
                  id="escrow-duration"
                  type="range"
                  min={24}
                  max={168}
                  step={24}
                  value={escrow}
                  onChange={(e) => setEscrow(Number(e.target.value))}
                  className="flex-1 accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <span className="text-2xl font-bold text-blue-600 w-14 text-right">
                  {escrow}h
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Time funds are held after delivery confirmation
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 flex items-center gap-2 text-sm text-slate-600">
            <Lock className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              Commission becomes available after delivery confirmation +{" "}
              <span className="font-medium">{escrow}h</span> dispute window
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ── Currency Settings ── */}
      <Card className="shadow-sm border-slate-200 py-0">
        <CardContent className="p-6">
          <SectionHeader
            icon={<Globe className="h-4.5 w-4.5" />}
            title="Currency Settings"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
          />

          <p className="text-sm font-medium text-slate-600 mb-3">
            Primary Currency
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currencies.map((c) => (
              <button
                key={c.code}
                id={`currency-${c.code.toLowerCase()}`}
                onClick={() => setSelectedCurrency(c.code)}
                className={`rounded-lg border-2 px-4 py-3 text-center transition-all ${
                  selectedCurrency === c.code
                    ? "border-emerald-500 bg-white text-emerald-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <p className="font-semibold text-sm">{c.code}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.label}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Location Settings ── */}
      <Card className="shadow-sm border-slate-200 py-0">
        <CardContent className="p-6">
          <SectionHeader
            icon={<MapPin className="h-4.5 w-4.5" />}
            title="Location Settings"
            iconBg="bg-purple-50"
            iconColor="text-purple-500"
          />

          {/* Supported Countries */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-600 mb-3">
              Supported Countries
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {countries.map((country) => (
                <div
                  key={country}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700"
                >
                  {country}
                </div>
              ))}
            </div>
          </div>

          {/* Major Cities */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-600 mb-3">
              Major Cities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cities.map((city) => (
                <div
                  key={city}
                  className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700"
                >
                  <span>{city}</span>
                  <button
                    onClick={() => handleRemoveCity(city)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 ml-2"
                    aria-label={`Remove ${city}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New City */}
          <div>
            <p className="text-sm font-medium text-slate-600 mb-3">
              Add New City/Zone
            </p>
            <div className="flex gap-3">
              <Input
                id="new-city-input"
                placeholder="Enter city or zone name..."
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCity()}
                className="flex-1 h-11 bg-white border-slate-200"
              />
              <Button
                id="add-city-btn"
                onClick={handleAddCity}
                className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Notification Settings ── */}
      <Card className="shadow-sm border-slate-200 py-0">
        <CardContent className="p-6">
          <SectionHeader
            icon={<Bell className="h-4.5 w-4.5" />}
            title="Notification Settings"
            iconBg="bg-orange-50"
            iconColor="text-orange-500"
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Email Notifications
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send email alerts for important platform events
                </p>
              </div>
              <Toggle
                id="email-notif-toggle"
                checked={emailNotif}
                onChange={setEmailNotif}
              />
            </div>

            <div className="border-t border-slate-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Push Notifications
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
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

      {/* ── Save Button ── */}
      <div className="flex justify-end">
        <Button
          id="save-settings-btn"
          onClick={handleSave}
          className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
