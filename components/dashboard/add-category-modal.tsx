"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useRef } from "react";
import { TCategory, useCreateCategoryMutation, useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GENDER_OPTIONS = ["MEN", "WOMEN", "KID"] as const;

export default function AddCategoryModal({ open, setOpen, editingCategory, parents }: { open: boolean; setOpen: (open: boolean) => void; editingCategory?: TCategory | null; parents: TCategory[] }) {
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const t = useTranslations("categories.modal");
    const tc = useTranslations("common");

    const [name, setName] = useState("");
    const [gender, setGender] = useState<string[]>([]);
    const [isActive, setIsActive] = useState(true);
    const [parentCategory, setParentCategory] = useState<string>("none");
    const [homePosition, setHomePosition] = useState<string>("");
    const [homeVisibility, setHomeVisibility] = useState(true);
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setGender(editingCategory.gender);
            setIsActive(editingCategory.isActive);

            // Handle parentCategory being either a string ID or a populated object
            const pId = typeof editingCategory.parentCategory === "object" && editingCategory.parentCategory !== null ? (editingCategory.parentCategory as any)._id : editingCategory.parentCategory;

            setParentCategory(pId || "none");
            setHomePosition(editingCategory.homePosition?.toString() || "");
            setHomeVisibility(editingCategory.homeVisibility);
            setIconPreview(editingCategory.icon ? (editingCategory.icon.startsWith("http") ? editingCategory.icon : `${process.env.NEXT_PUBLIC_API_URL}${editingCategory.icon.startsWith("/") ? "" : "/"}${editingCategory.icon}`) : "");
            setIcon(null);
        } else {
            setName("");
            setGender([]);
            setIsActive(true);
            setParentCategory("none");
            setHomePosition("");
            setHomeVisibility(true);
            setIcon(null);
            setIconPreview("");
        }
    }, [editingCategory, open]);

    const handleGenderChange = (value: string) => {
        setGender((prev) => (prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIcon(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!name || name.length < 2) {
            toast.error(t("nameError"));
            return;
        }

        const formData = new FormData();

        const dataObj = {
            name,
            gender,
            isActive,
            parentCategory: parentCategory === "none" ? null : parentCategory,
            homePosition: homePosition ? Number(homePosition) : null,
            homeVisibility,
        };

        formData.append("data", JSON.stringify(dataObj));

        if (icon) {
            formData.append("icon", icon);
        }

        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, data: formData }).unwrap();
                toast.success(t("updatedSuccess"));
            } else {
                await createCategory(formData).unwrap();
                toast.success(t("createdSuccess"));
            }
            setOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || t("generalError"));
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-125 p-0 overflow-hidden bg-white">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-xl font-bold text-slate-900">{editingCategory ? t("titleEdit") : t("titleAdd")}</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Icon Upload */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="relative h-24 w-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                            {iconPreview ? (
                                <>
                                    <Image src={iconPreview} alt={t("uploadIcon")} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="h-6 w-6 text-white" />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-slate-400">
                                    <Upload className="h-8 w-8 mb-1" />
                                    <span className="text-xs">{t("uploadIcon")}</span>
                                </div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        {iconPreview && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 h-8 hover:text-red-600 hover:bg-red-50"
                                onClick={() => {
                                    setIcon(null);
                                    setIconPreview("");
                                }}
                            >
                                <X className="h-4 w-4 mr-1" />
                                {t("remove")}
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Category Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("categoryName")}</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("placeholderCategory")} className="h-11" />
                        </div>

                        {/* Parent Category */}
                        <div className="space-y-2">
                            <Label>{t("parentCategoryLabel")}</Label>
                            <Select value={parentCategory} onValueChange={(value) => setParentCategory(value || "none")}>
                                <SelectTrigger className="h-11 w-full">
                                    <SelectValue placeholder={t("parentCategory.select")}>{parentCategory === "none" ? t("parentCategory.main") : parents.find((p) => p._id === parentCategory)?.name || parentCategory}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="none">{t("parentCategory.main")}</SelectItem>
                                    {parents
                                        .filter((p) => p._id !== editingCategory?._id)
                                        .map((parent) => (
                                            <SelectItem key={parent._id} value={parent._id}>
                                                {parent.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <p className="text-[11px] text-slate-500">{t("parentHelp")}</p>
                        </div>

                        {/* Gender Selection */}
                        <div className="space-y-3">
                            <Label>{t("targetGender")}</Label>
                            <div className="flex flex-wrap gap-4">
                                {GENDER_OPTIONS.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <Checkbox id={`gender-${option}`} checked={gender.includes(option)} onCheckedChange={() => handleGenderChange(option)} />
                                        <label htmlFor={`gender-${option}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {parentCategory === "none" && (
                            <div className="pt-2">
                                {/* Home Position */}
                                <div className="space-y-2 max-w-50">
                                    <Label htmlFor="homePosition">{t("homePosition")}</Label>
                                    <Input id="homePosition" type="number" value={homePosition} onChange={(e) => setHomePosition(e.target.value)} placeholder={t("placeholderHomePos")} className="h-11" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 h-12" disabled={isLoading}>
                            {tc("cancel")}
                        </Button>

                        <Button onClick={handleSubmit} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : editingCategory ? t("updateCategory") : t("createCategory")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
