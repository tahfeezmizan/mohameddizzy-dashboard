import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function OrderDetailsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Order Details</h2>
            <p className="text-sm text-slate-500">#O1241</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Status */}
          <div className="bg-blue-100 rounded-lg p-4 flex items-center gap-3">
            <div className="text-blue-600 text-lg">🚚</div>
            <div>
              <p className="font-medium text-blue-800">Status: Shipped</p>
              <p className="text-sm text-blue-700">In Transit</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-slate-800">
              Product Information
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Product:</p>
                <p className="font-medium text-slate-900">
                  Samsung Galaxy Earbuds
                </p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Amount:</p>
                <p className="font-medium text-slate-900">5,200 FCFA</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Order Date:</p>
                <p className="font-medium text-slate-900">2026-03-23</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Tracking:</p>
                <p className="font-medium text-blue-600">TRK987654321</p>
              </div>
            </div>
          </div>

          {/* Buyer & Seller */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Buyer</p>
              <p className="font-medium text-slate-900">Sarah Lee</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Seller</p>
              <p className="font-medium text-slate-900">alexmarket</p>
            </div>
          </div>

          {/* Payment Protection */}
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4 flex items-center gap-3">
            <div className="text-orange-600 text-lg">🔒</div>
            <p className="text-sm text-orange-700">
              <span className="font-medium">Payment Protection:</span> Funds are
              held securely in escrow until delivery is confirmed.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
