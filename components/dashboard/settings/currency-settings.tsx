"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { Globe } from "lucide-react";
import React, { useState } from "react";

export default function CurrencySettings() {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  const currencies = [
    { code: "XOF", label: "West African CFA" },
    { code: "EUR", label: "Euro" },
    { code: "USD", label: "US Dollar" },
    { code: "GBP", label: "British Pound" },
  ];

  return (
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
  );
}
