import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddCategoryModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-slate-900">Add New Category</h2>

          {/* <button onClick={() => setOpen(false)}>
            <span className="text-xl text-slate-500">&times;</span>
          </button> */}
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Category Name */}
          <div>
            <Label className="text-sm mb-2">Category Name</Label>
            <Input
              placeholder="e.g., Sports Equipment"
              className="rounded-md h-12 text-base!"
            />
          </div>

          {/* Icon */}
          <div>
            <Label className="text-sm mb-2">Icon (Emoji)</Label>
            <Input placeholder="⚽" className="rounded-md h-12 text-base!" />
            <p className="text-xs text-slate-500 mt-1">
              Use any emoji to represent this category
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 w-full py-6 text-base!"
            >
              Cancel
            </Button>

            <Button className="flex-1 w-full py-6 text-base! bg-blue-600 hover:bg-blue-700">
              Create Category
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
