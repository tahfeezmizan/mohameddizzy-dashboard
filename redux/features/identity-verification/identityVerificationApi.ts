import { baseApi } from "../../api/baseApi";

export type TVerificationRequest = {
    _id: string;
    user: {
        _id: string;
        name: string;
        phone: string;
        email?: string;
    };
    documentType: string;
    frontImage: string;
    backImage: string;
    selfieImage: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    adminComment?: string;
    createdAt: string;
    updatedAt: string;
};

export type TVerificationResponse = {
    success: boolean;
    message: string;
    data: TVerificationRequest[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

const identityVerificationApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getVerificationRequests: builder.query<TVerificationResponse, Record<string, any> | void>({
            query: (params) => ({
                url: "/identity-verification/requests",
                method: "GET",
                params: params || undefined,
            }),
            providesTags: ["IdentityVerification"],
        }),
        updateVerificationStatus: builder.mutation<any, { id: string; status: string; adminComment?: string }>({
            query: ({ id, ...data }) => ({
                url: `/identity-verification/${id}/status`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["IdentityVerification", "User"],
        }),
    }),
});

export const { useGetVerificationRequestsQuery, useUpdateVerificationStatusMutation } = identityVerificationApi;
