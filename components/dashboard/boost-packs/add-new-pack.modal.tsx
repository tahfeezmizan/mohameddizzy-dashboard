import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useCreateBoostPackMutation, useUpdateBoostPackMutation, TBoostPack } from "@/redux/features/boostPack/boostPackApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormValues = {
    name: string;
    description: string;
    type: "PRODUCT" | "SHOP";
    duration: number;
    price: number;
};

export default function AddNewPackModal({ open, setOpen, editData }: { open: boolean; setOpen: (open: boolean) => void; editData?: TBoostPack }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            type: "PRODUCT",
        },
    });

    const [createBoostPack, { isLoading: isCreating }] = useCreateBoostPackMutation();
    const [updateBoostPack, { isLoading: isUpdating }] = useUpdateBoostPackMutation();

    useEffect(() => {
        if (editData) {
            reset({
                name: editData.name,
                description: editData.description || "",
                type: editData.type,
                duration: editData.duration,
                price: editData.price,
            });
        } else {
            reset({
                name: "",
                description: "",
                type: "PRODUCT",
                duration: 0,
                price: 0,
            });
        }
    }, [editData, reset, open]);

    const onSubmit = async (data: FormValues) => {
        try {
            if (editData) {
                const res = await updateBoostPack({ id: editData._id, body: data }).unwrap();
                if (res.success) {
                    toast.success("Pack updated successfully");
                    setOpen(false);
                }
            } else {
                const res = await createBoostPack(data).unwrap();
                if (res.success) {
                    toast.success("Pack created successfully");
                    setOpen(false);
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    const packType = watch("type");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b py-2">
                    <DialogTitle className={"text-xl font-bold"}>{editData ? "Update Pack" : "Create New Pack"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                    <div>
                        <Label className="text-sm mb-2 block">Pack Name</Label>
                        <Input {...register("name", { required: true })} placeholder="Enter pack name" className="rounded-md text-base! h-12" />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Description</Label>
                        <Input {...register("description")} placeholder="Brief description" className="rounded-md text-base! h-12" />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Pack Type</Label>
                        <Select onValueChange={(value) => setValue("type", value as "PRODUCT" | "SHOP")} value={watch("type")}>
                            <SelectTrigger className="w-full h-12 text-base!">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                                <SelectItem value="SHOP">SHOP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm mb-2 block">Duration (days)</Label>
                            <Input {...register("duration", { required: true, valueAsNumber: true })} type="number" placeholder="e.g. 30" className="rounded-md text-base! h-12" />
                        </div>

                        <div>
                            <Label className="text-sm mb-2 block">Price</Label>
                            <Input {...register("price", { required: true, valueAsNumber: true })} type="number" placeholder="e.g. 5000" className="rounded-md text-base! h-12" />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-end gap-2 pt-4">
                        <Button type="button" className={"flex-1 w-full py-6 text-base! "} variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isCreating || isUpdating} className="flex-1 w-full py-6 text-base! bg-blue-600 hover:bg-blue-700">
                            {isCreating || isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : editData ? "Update Pack" : "Create Pack"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
