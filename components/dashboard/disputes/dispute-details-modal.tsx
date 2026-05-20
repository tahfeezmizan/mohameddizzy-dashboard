"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle, CheckCircle2, Package, CreditCard } from "lucide-react";
import { useGetDisputeByIdQuery, useResolveDisputeMutation } from "@/redux/features/dispute/disputeApi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DisputeDetailsModal({ open, setOpen, disputeId }: { open: boolean; setOpen: (open: boolean) => void; disputeId: string | null }) {
    const { data, isLoading, isError } = useGetDisputeByIdQuery(disputeId as string, {
        skip: !disputeId || !open,
    });
    const [resolveDispute, { isLoading: isResolving }] = useResolveDisputeMutation();
    const [resolution, setResolution] = useState<"RESOLVED" | "CANCELLED">("RESOLVED");
    const [adminNote, setAdminNote] = useState("");
    const [refundAmount, setRefundAmount] = useState("");

    const dispute = data?.data;

    const handleResolve = async () => {
        if (!disputeId) return;
        try {
            await resolveDispute({
                id: disputeId,
                body: {
                    resolution,
                    adminNote,
                    refundAmount: parseFloat(refundAmount) || 0,
                },
            }).unwrap();
            setOpen(false);
        } catch (error) {
            console.error("Failed to resolve dispute", error);
        }
    };

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
                    <div className="h-100 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        {/* <p className="text-slate-500 font-medium">Loading dispute details...</p> */}
                        <p className="text-slate-500 font-medium">Chargement des détails du litige...</p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (isError || !dispute) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
                    <div className="h-100 flex flex-col items-center justify-center gap-3">
                        <XCircle className="h-12 w-12 text-red-500" />
                        {/* <p className="text-slate-500 font-medium">Failed to load dispute details</p> */}
                        <p className="text-slate-500 font-medium">Échec du chargement des détails du litige</p>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            {/* Close */}
                            Fermer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50/50">
                    <div>
                        {/* <h2 className="text-xl font-bold text-slate-900">Dispute Details</h2> */}
                        <h2 className="text-xl font-bold text-slate-900">Détails du Litige</h2>
                        <p className="text-sm text-slate-500">#{dispute._id.slice(-6).toUpperCase()}</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Dispute Info */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        {/* <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Dispute Information</h3> */}
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Informations sur le Litige</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p> */}
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Statut</p>
                                <p className="font-medium text-slate-900">{dispute.status}</p>
                            </div>
                            <div>
                                {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reason</p> */}
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Raison</p>
                                <p className="font-medium text-slate-900">{dispute.reason}</p>
                            </div>
                            <div>
                                {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Created At</p> */}
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Créé le</p>
                                <p className="font-medium text-slate-900">{new Date(dispute.createdAt).toLocaleDateString()}</p>
                            </div>
                            {dispute.resolvedAt && (
                                <div>
                                    {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Resolved At</p> */}
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Résolu le</p>
                                    <p className="font-medium text-slate-900">{new Date(dispute.resolvedAt).toLocaleDateString()}</p>
                                </div>
                            )}
                            {dispute.refundAmount !== undefined && (
                                <div>
                                    {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Refund Amount</p> */}
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Montant du Remboursement</p>
                                    <p className="font-medium text-slate-900">
                                        {dispute.refundAmount} {dispute.payment?.currency || "FCFA"}
                                    </p>
                                </div>
                            )}
                            {dispute.adminNote && (
                                <div className="col-span-2">
                                    {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Admin Note</p> */}
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Note Admin</p>
                                    <p className="font-medium text-slate-900">{dispute.adminNote}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Details */}
                    {dispute.order && (
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            {/* <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2"> */}
                            <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                {/* Order Details */}
                                Détails de la Commande
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    {/* <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Product Price</p> */}
                                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Prix du Produit</p>
                                    <p className="font-medium text-slate-900">
                                        {dispute.order.productPrice || "-"} {dispute.payment?.currency || "FCFA"}
                                    </p>
                                </div>
                                <div>
                                    {/* <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Shipping Cost</p> */}
                                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Frais de Livraison</p>
                                    <p className="font-medium text-slate-900">
                                        {dispute.order.shippingCost || "-"} {dispute.payment?.currency || "FCFA"}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    {/* <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Total Amount</p> */}
                                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Montant Total</p>
                                    <p className="text-xl font-bold text-blue-700">
                                        {dispute.order.totalAmount || dispute.payment?.totalAmount || "-"} {dispute.payment?.currency || "FCFA"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Details */}
                    {dispute.payment && (
                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                            {/* <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2"> */}
                            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                {/* Payment Details */}
                                Détails du Paiement
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    {/* <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Method</p> */}
                                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Méthode</p>
                                    <p className="font-medium text-slate-900">{dispute.payment.method || "-"}</p>
                                </div>
                                <div>
                                    {/* <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Status</p> */}
                                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Statut</p>
                                    <p className="font-medium text-slate-900">{dispute?.payment?.status || "-"}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buyer Complaint */}
                    <div>
                        {/* <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-3"> */}
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-3">
                            <div className="h-1 w-4 bg-red-600 rounded-full"></div>
                            {/* Buyer Complaint */}
                            Plainte de l'Acheteur
                        </h3>
                        <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                            <p className="font-medium text-slate-900 mb-0.5">{dispute.buyer.name}</p>
                            <p className="text-sm text-slate-600 mb-4">{dispute.description}</p>
                            {dispute.images && dispute.images.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {dispute.images.map((image, index) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden border border-red-200">
                                            <img src={`${process.env.NEXT_PUBLIC_API_URL}${image}`} alt={`Litige image ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resolution Actions */}
                    {dispute.status === "PENDING" && (
                        <div className="space-y-4 pt-4 border-t">
                            {/* <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2"> */}
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                <div className="h-1 w-4 bg-blue-600 rounded-full"></div>
                                {/* Resolve Dispute */}
                                Résoudre le Litige
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <Button onClick={() => setResolution("RESOLVED")} variant={resolution === "RESOLVED" ? "default" : "outline"} className={`py-6 ${resolution === "RESOLVED" ? "bg-red-600 hover:bg-red-700" : "border-red-200 text-red-700 hover:bg-red-50"}`}>
                                        <XCircle className="w-5 h-5 mr-2" />
                                        {/* Refund Buyer */}
                                        Rembourser l'Acheteur
                                    </Button>
                                    <Button onClick={() => setResolution("CANCELLED")} variant={resolution === "CANCELLED" ? "default" : "outline"} className={`py-6 ${resolution === "CANCELLED" ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}>
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        {/* Release to Seller */}
                                        Libérer au Vendeur
                                    </Button>
                                </div>

                                {resolution === "RESOLVED" && (
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                            {/* <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Order Summary</p> */}
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Résumé de la Commande</p>
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-sm">
                                                    {/* <span className="text-slate-600">Product Price</span> */}
                                                    <span className="text-slate-600">Prix du Produit</span>
                                                    <span className="font-medium">
                                                        {dispute.order?.productPrice || "-"} {dispute.payment?.currency || "FCFA"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    {/* <span className="text-slate-600">Shipping Cost</span> */}
                                                    <span className="text-slate-600">Frais de Livraison</span>
                                                    <span className="font-medium">
                                                        {dispute.order?.shippingCost || "-"} {dispute.payment?.currency || "FCFA"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm border-t border-slate-200 pt-1.5 mt-1.5">
                                                    {/* <span className="font-semibold text-slate-900">Total</span> */}
                                                    <span className="font-semibold text-slate-900">Total</span>
                                                    <span className="font-bold text-blue-700">
                                                        {dispute.order?.totalAmount || dispute.payment?.totalAmount || "-"} {dispute.payment?.currency || "FCFA"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {/* <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Refund Amount</label> */}
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Montant du Remboursement</label>
                                            {/* <Input type="number" placeholder="Enter refund amount" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} /> */}
                                            <Input type="number" placeholder="Entrez le montant du remboursement" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    {/* <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Admin Note</label> */}
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note Admin</label>
                                    {/* <Textarea placeholder="Enter admin note..." value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={3} /> */}
                                    <Textarea placeholder="Entrez la note admin..." value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={3} />
                                </div>

                                <Button onClick={handleResolve} disabled={isResolving} className="w-full bg-blue-600 hover:bg-blue-700">
                                    {isResolving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {/* Resolving... */}
                                            Résolution en cours...
                                        </>
                                    ) : (
                                        // "Resolve Dispute"
                                        "Résoudre le Litige"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
