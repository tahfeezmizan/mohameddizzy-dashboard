"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Loader2, ChevronRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import AddCategoryModal from "@/components/dashboard/add-category-modal";
import { useGetAdminParentsQuery, useGetAdminSubcategoriesQuery, useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import Image from "next/image";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export default function Categories() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [expandedParents, setExpandedParents] = useState<string[]>([]);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const t = useTranslations("categories");
    const tc = useTranslations("common");

    const { data: parentsResponse, isLoading: isParentsLoading } = useGetAdminParentsQuery();
    const { data: subResponse, isLoading: isSubLoading } = useGetAdminSubcategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const parents = parentsResponse?.data || [];
    console.log(parents);
    const subcategories = subResponse?.data || [];

    const toggleParent = (parentId: string) => {
        setExpandedParents((prev) => (prev.includes(parentId) ? prev.filter((id) => id !== parentId) : [...prev, parentId]));
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await deleteCategory(categoryToDelete).unwrap();
            toast.success(t("delete.success"));
            setCategoryToDelete(null);
        } catch (error: any) {
            toast.error(error?.data?.message || t("delete.error"));
        }
    };

    const getImageUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">{t("title")}</h1>
                    <p className="text-slate-500">{t("description")}</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingCategory(null);
                        setIsModalOpen(true);
                    }}
                    className="px-6 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    {t("addCategory")}
                </Button>
            </div>

            <Card className="shadow-sm border-slate-200 overflow-hidden bg-white p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider w-10"></th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">{t("table.category")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">{t("table.genders")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider text-center">{t("table.homePos")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">{t("table.status")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider text-right">{t("table.action")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isParentsLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-8">
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : parents.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        {t("noCategories")}
                                    </td>
                                </tr>
                            ) : (
                                parents.map((parent) => {
                                    const isExpanded = expandedParents.includes(parent._id);
                                    const parentSubs = subcategories.filter((sub) => {
                                        const pId = typeof sub.parentCategory === "object" && sub.parentCategory !== null ? (sub.parentCategory as any)._id : sub.parentCategory;
                                        return pId === parent._id;
                                    });

                                    return (
                                        <React.Fragment key={parent._id}>
                                            <tr className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    {(parentSubs.length > 0 || (parent.subcategoryCount ?? 0) > 0) && (
                                                        <button onClick={() => toggleParent(parent._id)} className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                                                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 relative rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                                            {parent.icon ? (
                                                                <Image src={getImageUrl(parent.icon)} alt={parent.name} fill className="object-cover p-1.5" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                    <Plus className="h-5 w-5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{parent.name}</div>
                                                            <div className="text-xs text-slate-500">
                                                                {parent.subcategoryCount ?? parentSubs.length} {t("subcategories")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {parent.gender.map((g) => (
                                                            <Badge key={g} variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-50 text-blue-600 border-blue-100 uppercase">
                                                                {g}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center font-mono font-medium text-slate-600">{parent.homePosition ?? "-"}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={`${parent.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"} font-medium`}>{parent.isActive ? t("status.active") : t("status.inactive")}</Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            onClick={() => {
                                                                setEditingCategory(parent);
                                                                setIsModalOpen(true);
                                                            }}
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button onClick={() => setCategoryToDelete(parent._id)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {isExpanded &&
                                                parentSubs.map((sub) => (
                                                    <tr key={sub._id} className="bg-slate-50/30 hover:bg-slate-50/80 transition-colors">
                                                        <td className="px-6 py-3"></td>
                                                        <td className="px-6 py-3 pl-12">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-8 w-8 relative rounded-md bg-white border border-slate-200 overflow-hidden shrink-0">
                                                                    {sub.icon ? (
                                                                        <Image src={getImageUrl(sub.icon)} alt={sub.name} fill className="object-cover p-1" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                                            <ChevronRight className="h-3 w-3" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-slate-700">{sub.name}</div>
                                                                    <div className="text-[10px] text-slate-400">Parent: {parent.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            <div className="flex flex-wrap gap-1">
                                                                {sub.gender.map((g) => (
                                                                    <Badge key={g} variant="outline" className="text-[10px] px-1.5 py-0 bg-slate-100 text-slate-600 border-slate-200 uppercase">
                                                                        {g}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-3 text-center text-slate-400">-</td>
                                                        <td className="px-6 py-3">
                                                            <Badge variant="outline" className={`${sub.isActive ? "bg-white text-emerald-600 border-emerald-100" : "bg-white text-red-500 border-red-100"} text-[10px]`}>
                                                                {sub.isActive ? t("status.active") : t("status.inactive")}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-3 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    onClick={() => {
                                                                        setEditingCategory(sub);
                                                                        setIsModalOpen(true);
                                                                    }}
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                                                                >
                                                                    <Edit2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                                <Button onClick={() => setCategoryToDelete(sub._id)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <AddCategoryModal open={isModalOpen} setOpen={setIsModalOpen} editingCategory={editingCategory} parents={parents} />

            <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("delete.confirmTitle")}</AlertDialogTitle>
                        <AlertDialogDescription>{t("delete.confirmMessage")}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>{tc("cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : t("delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
