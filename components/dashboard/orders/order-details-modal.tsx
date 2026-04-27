import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetSingleOrderQuery } from "@/redux/features/order/orderApi";
import { Loader2, ShieldCheck, Truck, Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusIcons: Record<string, any> = {
  PENDING: Clock,
  SHIPPED: Truck,
  DELIVERED: Package,
  COMPLETED: CheckCircle2,
  CANCELLED: XCircle,
};

const statusColors: Record<string, string> = {
  PENDING: "bg-orange-50 text-orange-600 border-orange-100",
  SHIPPED: "bg-blue-50 text-blue-600 border-blue-100",
  DELIVERED: "bg-purple-50 text-purple-600 border-purple-100",
  COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-100",
  CANCELLED: "bg-red-50 text-red-600 border-red-100",
};

export default function OrderDetailsModal({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string | null;
}) {
  const { data: orderData, isLoading } = useGetSingleOrderQuery(id as string, {
    skip: !id,
  });

  const order = orderData?.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Order Details</h2>
            <p className="text-sm text-slate-500">#{order?._id?.toUpperCase() || "..."}</p>
          </div>
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-slate-500 font-medium">Loading order details...</p>
          </div>
        ) : order ? (
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Status */}
            <div className={`rounded-lg p-4 flex items-center gap-3 border ${statusColors[order.status]}`}>
              <div className="text-lg">
                {(() => {
                  const Icon = statusIcons[order.status] || Package;
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <div>
                <p className="font-bold uppercase tracking-tight">Status: {order.status}</p>
                <p className="text-sm opacity-90">
                  {order.status === "PENDING" && "Waiting for shipment"}
                  {order.status === "SHIPPED" && "In Transit"}
                  {order.status === "DELIVERED" && "Awaiting buyer confirmation"}
                  {order.status === "COMPLETED" && "Transaction finished"}
                  {order.status === "CANCELLED" && "Order cancelled"}
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-400" />
                Product Information
              </h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Product Title</p>
                  <p className="font-semibold text-slate-900">{order.product.title}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Total Amount</p>
                  <p className="font-bold text-slate-900 text-base">{order.totalAmount.toLocaleString()} FCFA</p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Order Date</p>
                  <p className="font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Payment Status</p>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {order.payment?.status || "SUCCESS"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Delivery Method</p>
                  <p className="font-semibold text-slate-900">{order.deliveryMethod?.replace(/_/g, " ") || "N/A"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-medium">Transaction ID</p>
                  <p className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                    {order.payment?.transactionId || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Buyer & Seller */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Buyer</p>
                  {order.buyer.verifiedBadge && <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />}
                </div>
                <p className="font-bold text-slate-900 mb-1">{order.buyer.name}</p>
                <p className="text-xs text-slate-500">{order.buyer.email || order.buyer.phone}</p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Seller</p>
                  {order.seller.verifiedBadge && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
                <p className="font-bold text-slate-900 mb-1">{order.seller.name}</p>
                <p className="text-xs text-slate-500">{order.seller.email || order.seller.phone}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-600 uppercase">Price Breakdown</p>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product Price</span>
                  <span className="font-medium">{order.productPrice.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Buyer Protection Fee</span>
                  <span className="font-medium">+{order.buyerProtectionFee?.toLocaleString() || 0} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping Cost</span>
                  <span className="font-medium">+{order.shippingCost?.toLocaleString() || 0} FCFA</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="font-bold text-blue-600 text-base">{order.totalAmount.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Payment Protection */}
            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-bold">Escrow Protection:</span> Funds are held securely in the platform's escrow wallet. 
                They will only be released to the seller after the buyer confirms receipt or the 72h dispute window passes.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-20 text-center text-slate-500">
            Order not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
