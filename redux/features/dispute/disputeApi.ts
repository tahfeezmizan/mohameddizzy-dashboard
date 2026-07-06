import { baseApi } from "../../api/baseApi";

export type TDisputeStats = {
    total: number;
    pending: number;
    resolved: number;
    cancelled: number;
};

export type TDispute = {
    _id: string;
    status: "PENDING" | "RESOLVED" | "CANCELLED";
    reason: string;
    description: string;
    images?: string[];
    buyer: { name: string; phone: string };
    seller: { name: string; phone: string };
    order: {
        totalAmount?: number;
        productPrice?: number;
        shippingCost?: number;
    };
    payment: {
        totalAmount?: number;
        currency?: string;
        method?: string;
        status?: string;
    };
    adminNote?: string;
    refundAmount?: number;
    resolvedAt?: string;
    createdAt: string;
    updatedAt?: string;
};

export type TDisputeStatsResponse = {
    success: boolean;
    message: string;
    data: TDisputeStats;
};

export type TDisputesResponse = {
    success: boolean;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    data: TDispute[];
};

export type TDisputeDetailResponse = {
    success: boolean;
    message: string;
    data: TDispute;
};

export type TResolveDisputeRequest = {
    resolution: "RESOLVED" | "CANCELLED";
    adminNote: string;
    refundAmount: number;
};

const disputeApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getDisputeStats: builder.query<TDisputeStatsResponse, void>({
            query: () => ({
                url: "/dispute/stats",
                method: "GET",
            }),
            providesTags: ["Dispute"],
        }),
        getAllDisputes: builder.query<TDisputesResponse, Record<string, any> | void>({
            query: (args) => ({
                url: "/dispute/all",
                method: "GET",
                params: args ? args : undefined,
            }),
            providesTags: ["Dispute"],
        }),
        getDisputeById: builder.query<TDisputeDetailResponse, string>({
            query: (id) => ({
                url: `/dispute/${id}`,
                method: "GET",
            }),
            providesTags: ["Dispute"],
        }),
        resolveDispute: builder.mutation<any, { id: string; body: TResolveDisputeRequest }>({
            query: ({ id, body }) => ({
                url: `/dispute/${id}/resolve`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Dispute"],
        }),
    }),
});

export const { useGetDisputeStatsQuery, useGetAllDisputesQuery, useGetDisputeByIdQuery, useResolveDisputeMutation } = disputeApi;
