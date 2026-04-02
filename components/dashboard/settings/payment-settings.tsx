"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { CircleAlert, DollarSign, Lock } from "lucide-react";
import React, { useState } from "react";

export default function PaymentSettings() {
  const [commission, setCommission] = useState(8);
  const [escrow, setEscrow] = useState(72);

  return (
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
        <div className="rounded-lg bg-[#EFF6FF] border border-[#BEDBFF] px-4 py-3.5 flex items-center gap-2 text-sm text-[#193CB8]">
          <CircleAlert className="h-4 w-4 text-slate-400 shrink-0" />
          <span>
            Commission becomes available after delivery confirmation +{" "}
            <span className="font-medium">{escrow}h</span> dispute window
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
