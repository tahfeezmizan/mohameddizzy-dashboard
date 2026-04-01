import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Edit, MinusCircle } from "lucide-react";

export default function BoostPackCard({ data }: any) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item: any, index: number) => (
        <Card key={index} className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-none mb-2">
                  {item.title}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 pointer-events-none"
                >
                  {item.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Boost Duration:</span>
                <span className="font-bold text-slate-800">
                  {item.duration}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Listings Boosted:</span>
                <span className="font-bold text-slate-800">
                  {item.listings}
                </span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Visibility:</span>
                <span className={`font-bold ${item.visibilityColor}`}>
                  {item.visibility}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Price:</span>
                <span className="text-xl font-bold text-blue-600">
                  {item.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full text-slate-700 border-slate-200"
              >
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
      ))}
    </div>
  );
}
