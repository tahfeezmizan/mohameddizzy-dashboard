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

export default function AddCategoryModal({
    open,
    setOpen,
    editingCategory,
    parents,
    subcategories = []
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    editingCategory?: TCategory | null;
    parents: TCategory[];
    subcategories?: TCategory[];
}) {
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const t = useTranslations("categories.modal");
    const tc = useTranslations("common");
    const tCategories = useTranslations("categories");

    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [selectedLevel1, setSelectedLevel1] = useState<string>("none");
    const [selectedLevel2, setSelectedLevel2] = useState<string>("none");
    const [selectedLevel3, setSelectedLevel3] = useState<string>("none");
    const [homePosition, setHomePosition] = useState<string>("");
    const [homeVisibility, setHomeVisibility] = useState(true);
    const [icon, setIcon] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const allCats = [...parents, ...subcategories];

    const getParentId = (category: TCategory): string | null => {
        if (!category || !category.parentCategory) return null;
        if (typeof category.parentCategory === "object") {
            return (category.parentCategory as any)._id || null;
        }
        return category.parentCategory;
    };

    const getDescendantIds = (catId: string, allCatsList: TCategory[]): string[] => {
        const children = allCatsList.filter((c) => getParentId(c) === catId);
        let ids = children.map((c) => c._id);
        for (const child of children) {
            ids = [...ids, ...getDescendantIds(child._id, allCatsList)];
        }
        return ids;
    };

    const buildTreeList = (
        nodes: TCategory[],
        parentId: string | null = null,
        depth: number = 0
    ): { category: TCategory; label: string }[] => {
        const list: { category: TCategory; label: string }[] = [];

        const levelNodes = nodes.filter((node) => {
            const pId = getParentId(node);
            return (parentId === null && !pId) || (parentId !== null && pId === parentId);
        });

        for (const node of levelNodes) {
            const prefix = "— ".repeat(depth);
            list.push({
                category: node,
                label: `${prefix}${node.name} (Lvl ${node.level || depth + 1})`,
            });
            list.push(...buildTreeList(nodes, node._id, depth + 1));
        }

        return list;
    };

    const excludedIds = editingCategory
        ? [editingCategory._id, ...getDescendantIds(editingCategory._id, allCats)]
        : [];

    const level1Options = allCats.filter(
        (c) => (c.level === 1 || !getParentId(c)) && !excludedIds.includes(c._id)
    );

    const level2Options = allCats.filter(
        (c) => c.level === 2 && getParentId(c) === selectedLevel1 && !excludedIds.includes(c._id)
    );

    const level3Options = allCats.filter(
        (c) => c.level === 3 && getParentId(c) === selectedLevel2 && !excludedIds.includes(c._id)
    );

    const getAncestors = (catId: string, allCatsList: TCategory[]): TCategory[] => {
        const ancestors: TCategory[] = [];
        let current = allCatsList.find((c) => c._id === catId);
        while (current) {
            const parentId = typeof current.parentCategory === "object" && current.parentCategory !== null
                ? (current.parentCategory as any)._id
                : current.parentCategory;
            if (!parentId) break;
            const parent = allCatsList.find((c) => c._id === parentId);
            if (parent) {
                ancestors.unshift(parent);
                current = parent;
            } else {
                break;
            }
        }
        return ancestors;
    };

    const handleLevel1Change = (val: string | null) => {
        setSelectedLevel1(val || "none");
        setSelectedLevel2("none");
        setSelectedLevel3("none");
    };

    const handleLevel2Change = (val: string | null) => {
        setSelectedLevel2(val || "none");
        setSelectedLevel3("none");
    };

    const handleLevel3Change = (val: string | null) => {
        setSelectedLevel3(val || "none");
    };

    useEffect(() => {
        if (editingCategory) {
            setName(editingCategory.name);
            setIsActive(editingCategory.isActive);

            // Handle parentCategory being either a string ID or a populated object
            const pId = typeof editingCategory.parentCategory === "object" && editingCategory.parentCategory !== null ? (editingCategory.parentCategory as any)._id : editingCategory.parentCategory;

            if (pId) {
                const ancestors = getAncestors(pId, allCats);
                const parentCat = allCats.find((c) => c._id === pId);
                const fullPath = parentCat ? [...ancestors, parentCat] : ancestors;

                const lvl1 = fullPath.find((c) => c.level === 1)?._id || "none";
                const lvl2 = fullPath.find((c) => c.level === 2)?._id || "none";
                const lvl3 = fullPath.find((c) => c.level === 3)?._id || "none";

                setSelectedLevel1(lvl1);
                setSelectedLevel2(lvl2);
                setSelectedLevel3(lvl3);
            } else {
                setSelectedLevel1("none");
                setSelectedLevel2("none");
                setSelectedLevel3("none");
            }
            setHomePosition(editingCategory.homePosition?.toString() || "");
            setHomeVisibility(editingCategory.homeVisibility);
            setIconPreview(editingCategory.icon ? (editingCategory.icon.startsWith("http") ? editingCategory.icon : `${process.env.NEXT_PUBLIC_API_URL}${editingCategory.icon.startsWith("/") ? "" : "/"}${editingCategory.icon}`) : "");
            setIcon(null);
        } else {
            setName("");
            setIsActive(true);
            setSelectedLevel1("none");
            setSelectedLevel2("none");
            setSelectedLevel3("none");
            setHomePosition("");
            setHomeVisibility(true);
            setIcon(null);
            setIconPreview("");
        }
    }, [editingCategory, open]);

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

        let finalParentId: string | null = null;
        if (selectedLevel3 !== "none") {
            finalParentId = selectedLevel3;
        } else if (selectedLevel2 !== "none") {
            finalParentId = selectedLevel2;
        } else if (selectedLevel1 !== "none") {
            finalParentId = selectedLevel1;
        }

        const dataObj = {
            name,
            isActive,
            parentCategory: finalParentId,
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
                        <div className="space-y-4">
                            {/* Dropdown 1: Main Category */}
                            <div className="space-y-2">
                                <Label>Main Category (Level 1)</Label>
                                <Select value={selectedLevel1} onValueChange={handleLevel1Change}>
                                    <SelectTrigger className="h-11 w-full bg-white border border-slate-200">
                                        <SelectValue placeholder="Select Main Category">
                                            {selectedLevel1 === "none"
                                                ? tCategories("parentCategory.main")
                                                : allCats.find((p) => p._id === selectedLevel1)?.name || selectedLevel1}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-60 overflow-y-auto">
                                        <SelectItem value="none">{tCategories("parentCategory.main")}</SelectItem>
                                        {level1Options.map((opt) => (
                                            <SelectItem key={opt._id} value={opt._id}>
                                                {opt.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Dropdown 2: Subcategory */}
                            {selectedLevel1 !== "none" && level2Options.length > 0 && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <Label>Subcategory (Level 2)</Label>
                                    <Select value={selectedLevel2} onValueChange={handleLevel2Change}>
                                        <SelectTrigger className="h-11 w-full bg-white border border-slate-200">
                                            <SelectValue placeholder="Select Subcategory">
                                                {selectedLevel2 === "none"
                                                    ? "None (Keep Level 1 as parent)"
                                                    : allCats.find((p) => p._id === selectedLevel2)?.name || selectedLevel2}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white max-h-60 overflow-y-auto">
                                            <SelectItem value="none">None (Keep Level 1 as parent)</SelectItem>
                                            {level2Options.map((opt) => (
                                                <SelectItem key={opt._id} value={opt._id}>
                                                    {opt.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Dropdown 3: Sub-Subcategory */}
                            {selectedLevel2 !== "none" && level3Options.length > 0 && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <Label>Sub-Subcategory (Level 3)</Label>
                                    <Select value={selectedLevel3} onValueChange={handleLevel3Change}>
                                        <SelectTrigger className="h-11 w-full bg-white border border-slate-200">
                                            <SelectValue placeholder="Select Sub-Subcategory">
                                                {selectedLevel3 === "none"
                                                    ? "None (Keep Level 2 as parent)"
                                                    : allCats.find((p) => p._id === selectedLevel3)?.name || selectedLevel3}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white max-h-60 overflow-y-auto">
                                            <SelectItem value="none">None (Keep Level 2 as parent)</SelectItem>
                                            {level3Options.map((opt) => (
                                                <SelectItem key={opt._id} value={opt._id}>
                                                    {opt.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            <p className="text-[11px] text-slate-500">{t("parentHelp")}</p>
                        </div>

                        {selectedLevel1 === "none" && (
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
