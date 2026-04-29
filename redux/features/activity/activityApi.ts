import { baseApi } from "../../api/baseApi";

export type TActivity = {
    _id: string;
    type: string;
    message: string;
    user: {
        _id: string;
        name: string;
        email?: string;
        phone?: string;
        photo?: string;
    };
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

export const activityApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getActivities: builder.query<TActivityResponse, { page?: number; limit?: number }>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", params.page.toString());
                if (params?.limit) queryParams.append("limit", params.limit.toString());
                
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
