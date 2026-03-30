import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const categories = [
  {
    icon: "👕",
    name: "Vêtements",
    subcategories: ["Men", "Women", "Kids"],
    listings: "1,200",
    status: "Active",
  },
  {
    icon: "📱",
    name: "Électronique",
    subcategories: ["Phones", "Laptops", "Accessories"],
    listings: "850",
    status: "Active",
  },
  {
    icon: "🏠",
    name: "Maison",
    subcategories: ["Furniture", "Decor", "Kitchen"],
    listings: "620",
    status: "Active",
  },
  {
    icon: "💄",
    name: "Beauté",
    subcategories: ["Skincare", "Makeup", "Fragrance"],
    listings: "540",
    status: "Active",
  },
];

export default function Categories() {
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Categories & Attributes
          </h1>
          <p className="text-slate-500">Manage product structure</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Category</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider border-l border-slate-100">Subcategories</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Active Listings</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Status</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr
                  key={category.name}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                    <span className="text-xl leading-none">{category.icon}</span>
                    {category.name}
                  </td>
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {category.listings}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 font-medium whitespace-nowrap"
                    >
                      {category.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 font-medium">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        Disable
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
