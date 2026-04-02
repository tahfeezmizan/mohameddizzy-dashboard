import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UserDetailsModal({
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
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              P
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  pavona1977
                </h2>
                <span className="text-blue-500 text-sm">✔</span>
              </div>
              <p className="text-sm text-slate-500">pavona@example.com</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">User ID</p>
              <p className="font-medium text-slate-900">#U102</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">Role</p>
              <p className="font-medium text-slate-900">Seller</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">Location</p>
              <p className="font-medium text-slate-900">New York</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">Join Date</p>
              <p className="font-medium text-slate-900">2025-11-15</p>
            </div>
          </div>

          {/* Activity */}
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Activity
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">Listings</p>
                <p className="text-xl font-semibold text-slate-900">12</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-1">Orders</p>
                <p className="text-xl font-semibold text-slate-900">45</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 mb-1">Wallet</p>
                <p className="text-xl font-semibold text-slate-900">15,000</p>
              </div>
            </div>
          </div>

          {/* Verification */}
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Verification Status
            </h3>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-green-700">✔ Verified User</p>
              <p className="text-sm text-green-600">
                User has completed verification process
              </p>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3">
              Account Actions
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <Button className="bg-orange-100 text-orange-700 hover:bg-orange-200 py-5">
                🚫 Suspend
              </Button>

              <Button className="bg-red-100 text-red-600 hover:bg-red-200 py-5">
                ⛔ Ban User
              </Button>

              <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-5">
                🔄 Reset Account
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
