import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, Edit, MinusCircle, Lightbulb } from "lucide-react";

export default function BoostPacks() {
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Boost & Subscription Packs
          </h1>
          <p className="text-slate-500">Manage seller promotion packages</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Pack
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Basic Boost */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2">
                  Basic Boost
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 pointer-events-none"
                >
                  Active
                </Badge>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Boost Duration:</span>
                <span className="font-bold text-slate-800">3 days</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Listings Boosted:</span>
                <span className="font-bold text-slate-800">1</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Visibility:</span>
                <span className="font-bold text-blue-600">Medium</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Price:</span>
                <span className="text-xl font-bold text-blue-600">1,500 FCFA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full text-slate-700 border-slate-200">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-red-50 text-red-600 hover:bg-red-100"
              >
                <MinusCircle className="mr-2 h-4 w-4" /> Disable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Boost */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2">
                  Premium Boost
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 pointer-events-none"
                >
                  Active
                </Badge>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Boost Duration:</span>
                <span className="font-bold text-slate-800">7 days</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Listings Boosted:</span>
                <span className="font-bold text-slate-800">3</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Visibility:</span>
                <span className="font-bold text-emerald-600">High</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Price:</span>
                <span className="text-xl font-bold text-blue-600">4,000 FCFA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full text-slate-700 border-slate-200">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-red-50 text-red-600 hover:bg-red-100"
              >
                <MinusCircle className="mr-2 h-4 w-4" /> Disable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Pack */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2">
                  Featured Pack
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 pointer-events-none"
                >
                  Active
                </Badge>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Boost Duration:</span>
                <span className="font-bold text-slate-800">5 days</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Listings Boosted:</span>
                <span className="font-bold text-slate-800">1</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Visibility:</span>
                <span className="font-bold text-emerald-600">High</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Price:</span>
                <span className="text-xl font-bold text-blue-600">6,500 FCFA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full text-slate-700 border-slate-200">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-red-50 text-red-600 hover:bg-red-100"
              >
                <MinusCircle className="mr-2 h-4 w-4" /> Disable
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
        <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Tip:</span> Boost your product to increase
          visibility and attract more buyers. Higher visibility levels result in better
          placement across the platform.
        </p>
      </div>
    </div>
  );
}
