"use client";

import AddNewPackModal from "@/components/dashboard/boost-packs/add-new-pack.modal";
import BoostPackCard from "@/components/dashboard/boost-packs/boost-pack-card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus } from "lucide-react";
import { useState } from "react";

const boostPacks = [
  {
    title: "Basic Boost",
    status: "Active",
    duration: "3 days",
    listings: 1,
    visibility: "Medium",
    visibilityColor: "text-blue-600",
    price: "1,500 FCFA",
  },
  {
    title: "Premium Boost",
    status: "Active",
    duration: "7 days",
    listings: 3,
    visibility: "High",
    visibilityColor: "text-emerald-600",
    price: "4,000 FCFA",
  },
  {
    title: "Featured Pack",
    status: "Active",
    duration: "5 days",
    listings: 1,
    visibility: "High",
    visibilityColor: "text-emerald-600",
    price: "6,500 FCFA",
  },
];

export default function BoostPacks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Boost & Subscription Packs
          </h1>
          <p className="text-slate-500">Manage seller promotion packages</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="px-6 py-5.5 text-base! bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Pack
        </Button>
      </div>

      <BoostPackCard data={boostPacks} />

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
        <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Tip:</span> Boost your product to
          increase visibility and attract more buyers. Higher visibility levels
          result in better placement across the platform.
        </p>
      </div>

      <AddNewPackModal open={open} setOpen={setOpen} />
    </div>
  );
}
