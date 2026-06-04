"use client";

import AddNewPackModal from "@/components/dashboard/boost-packs/add-new-pack.modal";
import BoostPackCard from "@/components/dashboard/boost-packs/boost-pack-card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useGetAllBoostPacksQuery } from "@/redux/features/boostPack/boostPackApi";

export default function BoostPacks() {
    const [open, setOpen] = useState(false);

    const { data: productData, isLoading: productLoading, isError: productError } = useGetAllBoostPacksQuery("PRODUCT");
    const { data: shopData, isLoading: shopLoading, isError: shopError } = useGetAllBoostPacksQuery("SHOP");

    const productPacks = productData?.data || [];
    const shopPacks = shopData?.data || [];

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    {/* <h1 className="text-3xl font-bold text-slate-900 mb-2">Boost & Subscription Packs</h1>
                    <p className="text-slate-500">Manage seller promotion packages</p> */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Packs de Boost & Abonnement</h1>
                    <p className="text-slate-500">Gérer les packages de promotion des vendeurs</p>
                </div>
                {/* <Button onClick={() => setOpen(true)} className="px-6 py-5.5 text-base! bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add New Pack
                </Button> */}
                <Button onClick={() => setOpen(true)} className="px-6 py-5.5 text-base! bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-white">
                    <Plus className="mr-2 h-4 w-4" /> Ajouter un Pack
                </Button>
            </div>

            {/* Product Boost Packs */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                    {/* <h2 className="text-xl font-bold text-slate-800">Product Boost Packs</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">Seller Products</span> */}
                    <h2 className="text-xl font-bold text-slate-800">Packs de Boost Produit</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">Produits des Vendeurs</span>
                </div>

                {productLoading ? (
                    <div className="flex items-center justify-center min-h-50">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : productError ? (
                    // <div className="flex items-center justify-center min-h-50 text-red-500 font-medium text-sm">Failed to load product boost packs.</div>
                    <div className="flex items-center justify-center min-h-50 text-red-500 font-medium text-sm">Échec du chargement des packs de boost produit.</div>
                ) : productPacks.length > 0 ? (
                    <BoostPackCard data={productPacks} />
                ) : (
                    // <div className="flex items-center justify-center min-h-37.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">No product boost packs found.</div>
                    <div className="flex items-center justify-center min-h-37.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">Aucun pack de boost produit trouvé.</div>
                )}
            </div>

            {/* Shop Boost Packs */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <div className="h-8 w-1 bg-purple-600 rounded-full"></div>
                    {/* <h2 className="text-xl font-bold text-slate-800">Shop Boost Packs</h2>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">Seller Shops</span> */}
                    <h2 className="text-xl font-bold text-slate-800">Packs de Boost Boutique</h2>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">Boutiques des Vendeurs</span>
                </div>

                {shopLoading ? (
                    <div className="flex items-center justify-center min-h-50">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    </div>
                ) : shopError ? (
                    <div className="flex items-center justify-center min-h-50 text-red-500 font-medium text-sm">Échec du chargement des packs de boost boutique.</div>
                ) : // <div className="flex items-center justify-center min-h-50 text-red-500 font-medium text-sm">Failed to load shop boost packs.</div>
                shopPacks.length > 0 ? (
                    <BoostPackCard data={shopPacks} />
                ) : (
                    // <div className="flex items-center justify-center min-h-37.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">No shop boost packs found.</div>
                    <div className="flex items-center justify-center min-h-37.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-sm">Aucun pack de boost boutique trouvé.</div>
                )}
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
                <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                {/* <p>
                    <span className="font-semibold">Tip:</span> Boost your product to increase visibility and attract more buyers. Higher visibility levels result in better placement across the platform.
                </p> */}
                <p>
                    <span className="font-semibold">Astuce :</span> Boostez votre produit pour augmenter la visibilité et attirer plus d'acheteurs. Des niveaux de visibilité plus élevés entraînent un meilleur placement sur la plateforme.
                </p>
            </div>

            <AddNewPackModal open={open} setOpen={setOpen} />
        </div>
    );
}
