import { baseApi } from "../../api/baseApi";

export type TOrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

export type TOrder = {
    _id: string;
    product: {
        title: string;
        images: string[];
        price: number;
        description?: string;
    };
    buyer: {
        name: string;
        photo?: string;
        email?: string;
        phone?: string;
        verifiedBadge: boolean;
    };
    seller: {
        name: string;
        photo?: string;
        email?: string;
        phone?: string;
        verifiedBadge: boolean;
    };
    status: TOrderStatus;
    totalAmount: number;
    productPrice: number;
    buyerProtectionFee?: number;
    shippingCost?: number;
    payment?: {
        _id?: string;
        transactionId?: string;
        status: string;
        currency?: string;
        method?: string;
        metadata?: any;
        paydunyaInvoiceToken?: string;
        paydunyaReceiptUrl?: string;
        paidAt?: string;
    };
    deliveryMethod?: string;
    createdAt: string;
    updatedAt: string;
};

export type TMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TOrdersResponse = {
    success: boolean;
    message: string;
    data: TOrder[];
    meta: TMeta;
};

export type TOrderStats = {
    pending: number;
    shipped: number;
    delivered: number;
    completed: number;
};

export type TOrderStatsResponse = {
    success: boolean;
    message: string;
    data: TOrderStats;
};

export type TSingleOrderResponse = {
    success: boolean;
    message: string;
    data: TOrder;
};

const orderApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllOrders: builder.query<TOrdersResponse, { page?: number; limit?: number; status?: string; searchTerm?: string } | void>({
            query: (args) => ({
                url: "/order/admin/all-orders",
                method: "GET",
                params: args ? args : undefined,
            }),
            providesTags: ["Order"],
        }),
        getOrderStats: builder.query<TOrderStatsResponse, void>({
            query: () => ({
                url: "/order/admin/order-stats",
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
        getSingleOrder: builder.query<TSingleOrderResponse, string>({
            query: (id) => ({
                url: `/order/admin/single-order/${id}`,
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetOrderStatsQuery, useGetSingleOrderQuery } = orderApi;
