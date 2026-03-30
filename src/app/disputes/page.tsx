import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  AlertCircle,
  Scale,
  CheckCircle2,
  Lock,
  Eye,
} from "lucide-react";

export default function Disputes() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Disputes Center</h1>
        <p className="text-slate-500">Resolve buyer-seller conflicts</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by Dispute ID, Order ID, or User..."
            className="pl-10 h-11 bg-white border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-11 px-3 border-slate-200 bg-white">
            <Filter className="h-4 w-4 text-slate-500" />
          </Button>
          <div className="h-11 w-24 rounded-md border border-slate-200 bg-white" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Open Disputes</p>
              <h3 className="text-2xl font-bold text-slate-900 leading-none">1</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Scale className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Pending Review</p>
              <h3 className="text-2xl font-bold text-slate-900 leading-none">1</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Resolved</p>
              <h3 className="text-2xl font-bold text-slate-900 leading-none">1</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200 mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">DISPUTE ID</th>
                <th className="px-6 py-4">ORDER ID</th>
                <th className="px-6 py-4">BUYER</th>
                <th className="px-6 py-4">SELLER</th>
                <th className="px-6 py-4">AMOUNT</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#D1023</td>
                <td className="px-6 py-4 text-slate-500">#05678</td>
                <td className="px-6 py-4 text-slate-700">John Doe</td>
                <td className="px-6 py-4 text-slate-700">Alex Martin</td>
                <td className="px-6 py-4 font-medium text-slate-900">3,499 FCFA</td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-50 font-medium">
                    Open
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700">
                    <Eye className="h-4 w-4" /> View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#D1024</td>
                <td className="px-6 py-4 text-slate-500">#05679</td>
                <td className="px-6 py-4 text-slate-700">Sarah Lee</td>
                <td className="px-6 py-4 text-slate-700">Bob Wilson</td>
                <td className="px-6 py-4 font-medium text-slate-900">5,200 FCFA</td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-50 font-medium">
                    Pending
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700">
                    <Eye className="h-4 w-4" /> View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">#D1025</td>
                <td className="px-6 py-4 text-slate-500">#05680</td>
                <td className="px-6 py-4 text-slate-700">Mike Chen</td>
                <td className="px-6 py-4 text-slate-700">Emma Davis</td>
                <td className="px-6 py-4 font-medium text-slate-900">8,900 FCFA</td>
                <td className="px-6 py-4">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 font-medium">
                    Resolved
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700">
                    <Eye className="h-4 w-4" /> View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
        <Lock className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800">Secure:</span> Funds are held
          securely in escrow until delivery is confirmed. Commission is released after
          dispute window closes.
        </p>
      </div>
    </div>
  );
}
