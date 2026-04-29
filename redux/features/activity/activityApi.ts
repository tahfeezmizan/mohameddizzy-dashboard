import { baseApi } from "../../api/baseApi";

export type ActivityType = "LOGIN" | "REGISTER" | "PRODUCT_CREATE" | "PRODUCT_UPDATE" | "ORDER_PLACED" | "ORDER_STATUS_UPDATE" | "PAYMENT_COMPLETED" | "WITHDRAWAL_REQUEST";

export type TActivity = {
    _id: string;
    type: ActivityType;
    message: string;
    user: {
        _id: string;
        name: string;
        email?: string;
        phone?: string;
        photo?: string;
    };
    details?: any;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt?: string;
};

export type TActivityResponse = {
    success: boolean;
    message: string;
    data: TActivity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
};

export type TActivityQueryParams = {
    page?: number;
    limit?: number;
    type?: string;
    userId?: string;
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
};

export const activityApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getActivities: builder.query<TActivityResponse, TActivityQueryParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", params.page.toString());
                if (params?.limit) queryParams.append("limit", params.limit.toString());
                if (params?.type && params.type !== "All") queryParams.append("type", params.type);
                if (params?.userId) queryParams.append("userId", params.userId);
                if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
                if (params?.startDate) queryParams.append("startDate", params.startDate);
                if (params?.endDate) queryParams.append("endDate", params.endDate);
                
                const queryString = queryParams.toString();
                return {
                    url: `/activity/all${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["Activity"],
        }),
    }),
});

export const { useGetActivitiesQuery } = activityApi;
