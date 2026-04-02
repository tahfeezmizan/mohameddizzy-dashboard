import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DisputeDetailsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dispute Details
            </h2>
            <p className="text-sm text-slate-500">#D1023</p>
          </div>

          {/* <button onClick={() => setOpen(false)}>
            <X className="h-5 w-5 text-slate-500" />
          </button> */}
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-slate-800">
              Product Information
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-slate-500 mb-1">Product:</p>
                <p className="font-medium">Nike Air Max Sneakers</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Order ID:</p>
                <p className="font-medium">#05678</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Amount:</p>
                <p className="font-medium">3,499 FCFA</p>
              </div>

              <div>
                <p className="text-slate-500 mb-1">Date:</p>
                <p className="font-medium">2026-03-23</p>
              </div>
            </div>
          </div>

          {/* Buyer Complaint */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-slate-800">
              Buyer Complaint
            </h3>

            <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex gap-4">
              <div className="h-9! w-9! rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                J
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-0.5">John Doe</p>
                <p className="text-sm text-slate-600">
                  Product received in damaged condition. Box was crushed and
                  shoes have visible scratches.
                </p>
              </div>
            </div>
          </div>

          {/* Seller Response */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-slate-800">
              Seller Response
            </h3>

            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex gap-3">
              <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                A
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-0.5">Alex Martin</p>
                <p className="text-sm text-slate-600">
                  Product was packaged carefully. Damage might have occurred
                  during shipping.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4 flex items-center gap-3">
            <div className="text-orange-600 text-lg">$</div>
            <div>
              <p className="font-medium text-slate-900">Payment Status</p>
              <p className="text-sm text-slate-600">Held in Escrow</p>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-slate-800">
              Resolution Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-red-100 text-red-600 hover:bg-red-200 py-6">
                ❌ Refund Buyer
              </Button>

              <Button className="bg-green-100 text-green-700 hover:bg-green-200 py-6">
                ✅ Release to Seller
              </Button>

              <Button className="bg-orange-100 text-orange-700 hover:bg-orange-200 py-6">
                💲 Partial Refund
              </Button>

              <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-6">
                ℹ️ Request More Info
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
