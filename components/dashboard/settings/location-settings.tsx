"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/lib/settings-header-section";
import { MapPin, X } from "lucide-react";
import React, { useState } from "react";

const defaultCountries = [
  "Senegal",
  "Ivory Coast",
  "Mali",
  "Burkina Faso",
  "Benin",
];
const defaultCities = ["Dakar", "Abidjan", "Bamako", "Ouagadougou", "Cotonou"];

export default function LocationSettings() {
  const [newCity, setNewCity] = useState("");
  const [countries] = useState<string[]>(defaultCountries);
  const [cities, setCities] = useState<string[]>(defaultCities);

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

  return (
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
  );
}
