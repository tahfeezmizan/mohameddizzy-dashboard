"use client";

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
import { useTranslations } from "next-intl";

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
    const t = useTranslations("boostPacks.modal");

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
                    toast.success(t("toast.updateSuccess"));
                    setOpen(false);
                }
            } else {
                const res = await createBoostPack(data).unwrap();
                if (res.success) {
                    toast.success(t("toast.createSuccess"));
                    setOpen(false);
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || t("toast.error"));
        }
    };

    const packType = watch("type");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b py-2">
                    <DialogTitle className={"text-xl font-bold"}>{editData ? t("titleUpdate") : t("titleCreate")}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                    <div>
                        <Label className="text-sm mb-2 block">{t("packName")}</Label>
                        <Input {...register("name", { required: true })} placeholder={t("packNamePlaceholder")} className="rounded-md text-base! h-12" />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">{t("description")}</Label>
                        <Input {...register("description")} placeholder={t("descriptionPlaceholder")} className="rounded-md text-base! h-12" />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">{t("packType")}</Label>
                        <Select onValueChange={(value) => setValue("type", value as "PRODUCT" | "SHOP")} value={watch("type")}>
                            <SelectTrigger className="w-full h-12 text-base!">
                                <SelectValue placeholder={t("packTypePlaceholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                                <SelectItem value="SHOP">SHOP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm mb-2 block">{t("duration")}</Label>
                            <Input {...register("duration", { required: true, valueAsNumber: true })} type="number" placeholder={t("durationPlaceholder")} className="rounded-md text-base! h-12" />
                        </div>

                        <div>
                            <Label className="text-sm mb-2 block">{t("price")}</Label>
                            <Input {...register("price", { required: true, valueAsNumber: true })} type="number" placeholder={t("pricePlaceholder")} className="rounded-md text-base! h-12" />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-end gap-2 pt-4">
                        <Button type="button" className={"flex-1 w-full py-6 text-base! "} variant="outline" onClick={() => setOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button type="submit" disabled={isCreating || isUpdating} className="flex-1 w-full py-6 text-base! bg-blue-600 hover:bg-blue-700">
                            {isCreating || isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : editData ? t("updatePack") : t("createPack")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
