"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2, CheckCircle2, XCircle, Clock, Eye, MessageSquare, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetVerificationRequestsQuery, useUpdateVerificationStatusMutation } from "@/redux/features/identity-verification/identityVerificationApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function VerificationsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState<string>("");
    const [adminComment, setAdminComment] = useState("");

    const queryParams: any = { page, limit: 10 };
    if (statusFilter !== "ALL") queryParams.status = statusFilter;
    if (search) queryParams.searchTerm = search;

    const { data: response, isLoading, isFetching } = useGetVerificationRequestsQuery(queryParams);
    const [updateStatus, { isLoading: isUpdating }] = useUpdateVerificationStatusMutation();

    const requests = response?.data || [];
    const meta = response?.meta;

    const getImageUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const handleStatusUpdate = async (id: string, status: "APPROVED" | "REJECTED") => {
        try {
            await updateStatus({
                id,
                status,
                adminComment: adminComment || undefined,
            }).unwrap();
            // toast.success(`Request ${status.toLowerCase()} successfully`);
            toast.success(`Demande ${status.toLowerCase()} avec succès`);
            setIsDetailsOpen(false);
            setAdminComment("");
        } catch (error: any) {
            // toast.error(error?.data?.message || "Failed to update status");
            toast.error(error?.data?.message || "Échec de la mise à jour du statut");
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED":
                return (
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {/* Approved */}
                        Approuvé
                    </Badge>
                );
            case "REJECTED":
                return (
                    <Badge className="bg-red-50 text-red-600 border-red-100">
                        <XCircle className="mr-1 h-3 w-3" />
                        {/* Rejected */}
                        Rejeté
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-amber-50 text-amber-600 border-amber-100">
                        <Clock className="mr-1 h-3 w-3" />
                        {/* Pending */}
                        En attente
                    </Badge>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    {/* <h1 className="text-3xl font-bold text-slate-900 mb-1">Identity Verifications</h1> */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Vérifications d'Identité</h1>
                    {/* <p className="text-slate-500">Review and manage user identity verification requests</p> */}
                    <p className="text-slate-500">Examiner et gérer les demandes de vérification d'identité des utilisateurs</p>
                </div>
            </div>

            <Card className="p-4 border-slate-200 shadow-sm bg-white">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        {/* <Input placeholder="Search by user name or phone..." className="pl-10 h-11 border-slate-200" value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                        <Input placeholder="Rechercher par nom d'utilisateur ou téléphone..." className="pl-10 h-11 border-slate-200" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
                        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => {
                                    setStatusFilter(status);
                                    setPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                            >
                                {status === "ALL" ? "Tous" : status === "PENDING" ? "En attente" : status === "APPROVED" ? "Approuvé" : "Rejeté"}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white py-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                {/* <th className="px-6 py-4 uppercase text-xs tracking-wider">User</th> */}
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Utilisateur</th>
                                {/* <th className="px-6 py-4 uppercase text-xs tracking-wider">Document Type</th> */}
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Type de Document</th>
                                {/* <th className="px-6 py-4 uppercase text-xs tracking-wider">Submitted</th> */}
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Soumis</th>
                                {/* <th className="px-6 py-4 uppercase text-xs tracking-wider">Status</th> */}
                                <th className="px-6 py-4 uppercase text-xs tracking-wider">Statut</th>
                                {/* <th className="px-6 py-4 uppercase text-xs tracking-wider text-right">Action</th> */}
                                <th className="px-6 py-4 uppercase text-xs tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading || isFetching ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 text-center">
                                            <div className="h-4 bg-slate-100 rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        {/* No verification requests found */}
                                        Aucune demande de vérification trouvée
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{req.user.name}</div>
                                            <div className="text-xs text-slate-500">{req.user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px]">
                                                {req.documentType}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{new Date(req.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{getStatusBadge(req.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                onClick={() => {
                                                    setSelectedRequest(req);
                                                    setIsDetailsOpen(true);
                                                }}
                                                className="bg-transparent text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9"
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                {/* View Details */}
                                                Voir les Détails
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {meta && meta.totalPage > 1 && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            {/* Showing <span className="font-semibold text-slate-900">{(page - 1) * 10 + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(page * 10, meta.total)}</span> of <span className="font-semibold text-slate-900">{meta.total}</span> requests */}
                            Affichage de <span className="font-semibold text-slate-900">{(page - 1) * 10 + 1}</span> à <span className="font-semibold text-slate-900">{Math.min(page * 10, meta.total)}</span> sur <span className="font-semibold text-slate-900">{meta.total}</span> demandes
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1} className="h-9 w-9 p-0 rounded-lg border-slate-200">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: meta.totalPage }).map((_, i) => (
                                    <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" onClick={() => setPage(i + 1)} className={`h-9 w-9 p-0 rounded-lg ${page === i + 1 ? "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200" : "border-slate-200 text-slate-600"}`}>
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === meta.totalPage} className="h-9 w-9 p-0 rounded-lg border-slate-200">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                        {/* <DialogTitle className="text-2xl font-bold text-slate-900">Verification Request Details</DialogTitle> */}
                        <DialogTitle className="text-2xl font-bold text-slate-900">Détails de la Demande de Vérification</DialogTitle>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-8 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {/* <h3 className="font-bold text-slate-800 border-b pb-2">User Information</h3> */}
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Informations Utilisateur</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p> */}
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nom Complet</p>
                                            <p className="font-medium text-slate-900">{selectedRequest.user.name}</p>
                                        </div>
                                        <div>
                                            {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</p> */}
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Téléphone</p>
                                            <p className="font-medium text-slate-900">{selectedRequest.user.phone}</p>
                                        </div>
                                        <div>
                                            {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Document</p> */}
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Document</p>
                                            <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px]">
                                                {selectedRequest.documentType}
                                            </Badge>
                                        </div>
                                        <div>
                                            {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted On</p> */}
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Soumis Le</p>
                                            <p className="font-medium text-slate-900">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* <h3 className="font-bold text-slate-800 border-b pb-2">Current Status</h3> */}
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Statut Actuel</h3>
                                    <div>
                                        {getStatusBadge(selectedRequest.status)}
                                        {selectedRequest.adminComment && <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm italic text-slate-600">"{selectedRequest.adminComment}"</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* <h3 className="font-bold text-slate-800 border-b pb-2">Documents</h3> */}
                                <h3 className="font-bold text-slate-800 border-b pb-2">Documents</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        {/* <p className="text-sm font-semibold text-slate-700">Front Image</p> */}
                                        <p className="text-sm font-semibold text-slate-700">Image Recto</p>
                                        <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group relative">
                                            <Image src={getImageUrl(selectedRequest.frontImage)} alt="Front" fill className="object-cover transition-transform group-hover:scale-110" />
                                            <button
                                                onClick={() => {
                                                    setFullscreenImage(getImageUrl(selectedRequest.frontImage));
                                                    setIsFullscreenOpen(true);
                                                }}
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold z-10 w-full"
                                            >
                                                {/* Click to Expand */}
                                                Cliquez pour agrandir
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {/* <p className="text-sm font-semibold text-slate-700">Back Image</p> */}
                                        <p className="text-sm font-semibold text-slate-700">Image Verso</p>
                                        <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group relative">
                                            <Image src={getImageUrl(selectedRequest.backImage)} alt="Back" fill className="object-cover transition-transform group-hover:scale-110" />
                                            <button
                                                onClick={() => {
                                                    setFullscreenImage(getImageUrl(selectedRequest.backImage));
                                                    setIsFullscreenOpen(true);
                                                }}
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold z-10 w-full"
                                            >
                                                {/* Click to Expand */}
                                                Cliquez pour agrandir
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {/* <p className="text-sm font-semibold text-slate-700">Selfie Image</p> */}
                                        <p className="text-sm font-semibold text-slate-700">Image Selfie</p>
                                        <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group relative">
                                            <Image src={getImageUrl(selectedRequest.selfieImage)} alt="Selfie" fill className="object-cover transition-transform group-hover:scale-110" />
                                            <button
                                                onClick={() => {
                                                    setFullscreenImage(getImageUrl(selectedRequest.selfieImage));
                                                    setIsFullscreenOpen(true);
                                                }}
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold z-10 w-full"
                                            >
                                                {/* Click to Expand */}
                                                Cliquez pour agrandir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="h-4 w-4 text-slate-400" />
                                    {/* <h3 className="font-bold text-slate-800">Admin Decision</h3> */}
                                    <h3 className="font-bold text-slate-800">Décision Admin</h3>
                                </div>
                                {/* <Textarea placeholder="Add a comment for the user (optional, required if rejecting)..." className="min-h-25 border-slate-200 focus:ring-blue-500" value={adminComment} onChange={(e) => setAdminComment(e.target.value)} /> */}
                                <Textarea placeholder="Ajouter un commentaire pour l'utilisateur (facultatif, obligatoire si rejet)..." className="min-h-25 border-slate-200 focus:ring-blue-500" value={adminComment} onChange={(e) => setAdminComment(e.target.value)} />
                                <div className="flex justify-end gap-3 pt-2">
                                    {selectedRequest.status !== "REJECTED" && (
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                if (!adminComment) {
                                                    // toast.error("Please provide a reason for rejection");
                                                    toast.error("Veuillez fournir une raison pour le rejet");
                                                    return;
                                                }
                                                handleStatusUpdate(selectedRequest._id, "REJECTED");
                                            }}
                                            disabled={isUpdating}
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 px-6 h-11"
                                        >
                                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                                            {/* Reject Request */}
                                            Rejeter la Demande
                                        </Button>
                                    )}
                                    {selectedRequest.status !== "APPROVED" && (
                                        <Button onClick={() => handleStatusUpdate(selectedRequest._id, "APPROVED")} disabled={isUpdating} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 px-8 h-11">
                                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                            {/* Approve Verification */}
                                            Approuver la Vérification
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
                <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full p-0 overflow-hidden bg-black/95 border-none">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {fullscreenImage && <Image src={fullscreenImage} alt="Fullscreen preview" fill className="object-contain" priority />}
                        <Button variant="ghost" className="absolute top-4 right-4 text-white hover:bg-white/20 z-50" onClick={() => setIsFullscreenOpen(false)}>
                            <XCircle className="h-8 w-8" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
