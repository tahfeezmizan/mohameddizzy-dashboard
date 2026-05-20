import { baseApi } from "../../api/baseApi";

export type TPaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED" | "DISPUTED";
export type TPaymentMethod = "PAYDUNYA" | "CARD" | "MOBILE_MONEY" | "WALLET" | "APPLE_PAY" | "GOOGLE_PAY";

export type TPaymentUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
};

export type TPaymentProduct = {
    _id: string;
    title: string;
    price: number;
    images: string[];
};

export type TPayment = {
    _id: string;
    userId: TPaymentUser;
    sellerId: TPaymentUser;
    productId: TPaymentProduct;
    productPrice: number;
    buyerProtectionFee: number;
    shippingCost: number;
    totalAmount: number;
    siteFee: number;
    buyerFee: number;
    status: TPaymentStatus;
    method: TPaymentMethod;
    currency: string;
    createdAt: string;
    updatedAt: string;
};

export type TMeta = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};

export type TPaymentsResponse = {
    success: boolean;
    message: string;
    data: TPayment[];
    meta: TMeta;
};

export type TPaymentQueryParams = {
    page?: number;
    limit?: number;
    userId?: string;
    status?: TPaymentStatus;
    method?: TPaymentMethod;
    startDate?: string;
    endDate?: string;
};

const paymentApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllPayments: builder.query<TPaymentsResponse, TPaymentQueryParams | void>({
            query: (args) => ({
                url: "/payment",
                method: "GET",
                params: args ? args : undefined,
            }),
            providesTags: ["Payment"],
        }),
    }),
});

export const { useGetAllPaymentsQuery } = paymentApi;
