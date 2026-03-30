import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Info,
  DollarSign,
  Lightbulb,
} from "lucide-react";

export default function Commission() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Commission & Earnings
        </h1>
        <p className="text-slate-500">Track platform earnings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {/* Total Earned Commission */}
        <Card className="bg-[#2f6bf8] text-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium">
                Total
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-100 mb-1">
                Total Earned Commission
              </p>
              <h3 className="text-3xl font-bold mb-2">2,387 FCFA</h3>
              <p className="text-xs text-blue-200">7% from all orders</p>
            </div>
          </CardContent>
        </Card>

        {/* Available Balance */}
        <Card className="bg-[#12b362] text-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium">
                Ready
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-100 mb-1">
                Available Balance
              </p>
              <h3 className="text-3xl font-bold mb-2">1,204 FCFA</h3>
              <p className="text-xs text-emerald-200">Ready to withdraw</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Escrow */}
        <Card className="bg-[#fb610c] text-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium">
                Waiting
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-orange-100 mb-1">
                Pending (Escrow)
              </p>
              <h3 className="text-3xl font-bold mb-2">560 FCFA</h3>
              <p className="text-xs text-orange-200">In dispute window</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start mb-8">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 fill-blue-100" />
        <div>
          <span className="font-semibold block mb-0.5">
            Commission Release Policy
          </span>
          <p className="text-blue-700">
            👉 Commission becomes available after delivery confirmation + 72h dispute
            window. This ensures fair resolution of any potential disputes.
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200 mb-8 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Commission History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Order ID</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Seller</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">
                  Order Value
                </th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">
                  Commission (7%)
                </th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Date</th>
                <th className="px-6 py-4 uppercase text-xs tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">#O1234</td>
                <td className="px-6 py-4 text-slate-600">pavona1977</td>
                <td className="px-6 py-4 text-slate-700">3,499 FCFA</td>
                <td className="px-6 py-4 font-bold text-emerald-600">245 FCFA</td>
                <td className="px-6 py-4 text-slate-500">2026-03-23</td>
                <td className="px-6 py-4">
                  <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-0 font-medium whitespace-nowrap">
                    Pending
                  </Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">#O1235</td>
                <td className="px-6 py-4 text-slate-600">alexmarket</td>
                <td className="px-6 py-4 text-slate-700">5,200 FCFA</td>
                <td className="px-6 py-4 font-bold text-emerald-600">364 FCFA</td>
                <td className="px-6 py-4 text-slate-500">2026-03-20</td>
                <td className="px-6 py-4">
                  <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-0 font-medium whitespace-nowrap">
                    Available
                  </Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">#O1236</td>
                <td className="px-6 py-4 text-slate-600">sarahshop</td>
                <td className="px-6 py-4 text-slate-700">8,900 FCFA</td>
                <td className="px-6 py-4 font-bold text-emerald-600">623 FCFA</td>
                <td className="px-6 py-4 text-slate-500">2026-03-18</td>
                <td className="px-6 py-4">
                  <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-0 font-medium whitespace-nowrap">
                    Released
                  </Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">#O1237</td>
                <td className="px-6 py-4 text-slate-600">bobstyle</td>
                <td className="px-6 py-4 text-slate-700">12,000 FCFA</td>
                <td className="px-6 py-4 font-bold text-emerald-600">840 FCFA</td>
                <td className="px-6 py-4 text-slate-500">2026-03-21</td>
                <td className="px-6 py-4">
                  <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-0 font-medium whitespace-nowrap">
                    Available
                  </Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">#O1238</td>
                <td className="px-6 py-4 text-slate-600">emmafashion</td>
                <td className="px-6 py-4 text-slate-700">4,500 FCFA</td>
                <td className="px-6 py-4 font-bold text-emerald-600">315 FCFA</td>
                <td className="px-6 py-4 text-slate-500">2026-03-24</td>
                <td className="px-6 py-4">
                  <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-0 font-medium whitespace-nowrap">
                    Pending
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Commission Rate</h2>
            <div className="bg-slate-50/50 rounded-xl p-6 flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Current Rate
                </p>
                <div className="text-4xl font-black text-slate-800">7%</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
            <div className="text-sm">
              <p className="text-slate-500 mb-3">
                Applied to all completed transactions:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Product sales
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Service transactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Digital goods
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">This Month</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">Total Orders</span>
                <span className="font-bold text-slate-900 text-lg">156</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">
                  Commission Earned
                </span>
                <span className="font-bold text-emerald-600 text-lg">2,387 FCFA</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">
                  Average per Order
                </span>
                <span className="font-bold text-orange-600 text-lg">15 FCFA</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                <span className="text-sm font-medium text-slate-600">
                  Growth vs Last Month
                </span>
                <span className="font-bold text-purple-600 text-lg">+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
