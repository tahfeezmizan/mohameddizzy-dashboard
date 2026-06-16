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
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const t = useTranslations("categories");
    const tc = useTranslations("common");

    const { data: parentsResponse, isLoading: isParentsLoading } = useGetAdminParentsQuery();
    const { data: subResponse, isLoading: isSubLoading } = useGetAdminSubcategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const parents = parentsResponse?.data || [];
    const subcategories = subResponse?.data || [];
    const allCategories = [...parents, ...subcategories];

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
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

    const getParentId = (category: any): string | null => {
        if (!category || !category.parentCategory) return null;
        if (typeof category.parentCategory === "object") {
            return category.parentCategory._id || null;
        }
        return category.parentCategory;
    };

    const renderCategoryRow = (category: any, depth: number = 0) => {
        const children = allCategories.filter((sub) => getParentId(sub) === category._id);
        const isExpanded = expandedCategories.includes(category._id);
        const hasChildren = children.length > 0 || (category.subcategoryCount ?? 0) > 0;

        return (
            <React.Fragment key={category._id}>
                <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3" style={{ paddingLeft: `${depth * 24}px` }}>
                            <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                {hasChildren ? (
                                    <button onClick={() => toggleCategory(category._id)} className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                                        {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                                    </button>
                                ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 block" />
                                )}
                            </div>
                            <div className="h-10 w-10 relative rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                {category.icon ? (
                                    <Image src={getImageUrl(category.icon)} alt={category.name} fill className="object-cover p-1.5" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Plus className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{category.name}</div>
                                <div className="text-[10px] text-slate-500">
                                    {depth > 0 ? (
                                        <span>Level {category.level || depth + 1}</span>
                                    ) : (
                                        <span>{category.subcategoryCount ?? children.length} {t("subcategories")}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-medium text-slate-600">{category.homePosition ?? "-"}</td>
                    <td className="px-6 py-4">
                        <Badge className={`${category.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"} font-medium`}>{category.isActive ? t("status.active") : t("status.inactive")}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                onClick={() => {
                                    setEditingCategory(category);
                                    setIsModalOpen(true);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button onClick={() => setCategoryToDelete(category._id)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </td>
                </tr>
                {isExpanded && children.map((child) => renderCategoryRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    const isPageLoading = isParentsLoading || isSubLoading;

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
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">{t("table.category")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider text-center">{t("table.homePos")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">{t("table.status")}</th>
                                <th className="px-6 py-4 uppercase text-xs tracking-wider text-right">{t("table.action")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isPageLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-6 py-8">
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : parents.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        {t("noCategories")}
                                    </td>
                                </tr>
                            ) : (
                                parents.map((parent) => renderCategoryRow(parent, 0))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <AddCategoryModal open={isModalOpen} setOpen={setIsModalOpen} editingCategory={editingCategory} parents={parents} subcategories={subcategories} />

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
