import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewPackModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b py-2">
          <DialogTitle className={"text-xl font-bold"}>
            Create New Pack
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm mb-2">Pack Name</Label>
            <Input
              placeholder="Enter pack name"
              className="rounded-md text-base! h-12"
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Duration (days)</Label>
            <Input
              type="number"
              placeholder="e.g. 30"
              className="rounded-md text-base! h-12"
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Number of Listings</Label>
            <Input
              type="number"
              placeholder="e.g. 10"
              className="rounded-md text-base! h-12"
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Visibility Level</Label>
            <Input
              placeholder="e.g. Premium"
              className="rounded-md text-base! h-12"
            />
          </div>

          <div>
            <Label className="text-sm mb-2">Price (FCFA)</Label>
            <Input
              type="number"
              placeholder="e.g. 5000"
              className="rounded-md text-base! h-12"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-end gap-2">
          <Button
            className={"flex-1 w-full py-6 text-base! "}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="flex-1 w-full py-6 text-base! bg-blue-600 hover:bg-blue-700">
            Create Pack
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
