import { baseApi } from "../../api/baseApi";
import { TMeta } from "../payment/paymentApi";

export type TBoostPaymentUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
};

export type TBoostPaymentProduct = {
    _id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    category: string;
    subcategory?: string;
    images: string[];
    status: string;
    isBoosted: boolean;
    boostPack?: string | null;
    boostStartTime?: string | null;
    boostEndTime?: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TBoostPaymentPack = {
    _id: string;
    name: string;
    description?: string;
    type: "PRODUCT" | "SHOP";
    duration: number;
    price: number;
    currency: string;
    isActive: boolean;
    isRecommended: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    features?: string[];
};

export type TBoostPayment = {
    _id: string;
    userId: TBoostPaymentUser;
    productId?: TBoostPaymentProduct;
    boostPackId: TBoostPaymentPack;
    type: "PRODUCT" | "SHOP";
    amount: number;
    currency: string;
    status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
    createdAt: string;
    updatedAt: string;
    paydunyaInvoiceToken?: string;
    paydunyaReceiptUrl?: string;
    paidAt?: string;
};

export type TBoostPaymentsResponse = {
    success: boolean;
    message: string;
    data: TBoostPayment[];
    meta: TMeta;
};

export type TBoostPaymentResponse = {
    success: boolean;
    message: string;
    data: TBoostPayment;
};

export type TBoostPaymentQueryParams = {
    page?: number;
    limit?: number;
    userId?: string;
    status?: string;
    type?: "PRODUCT" | "SHOP";
};

const boostPaymentApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllBoostPayments: builder.query<TBoostPaymentsResponse, TBoostPaymentQueryParams | void>({
            query: (args) => ({
                url: "/boost-payment",
                method: "GET",
                params: args ? args : undefined,
            }),
            providesTags: ["Payment"],
        }),
        getBoostPaymentById: builder.query<TBoostPaymentResponse, string>({
            query: (id) => ({
                url: `/boost-payment/${id}`,
                method: "GET",
            }),
            providesTags: ["Payment"],
        }),
    }),
});

export const { useGetAllBoostPaymentsQuery, useGetBoostPaymentByIdQuery } = boostPaymentApi;
