import { baseApi } from "../../api/baseApi";

export type TDashboardStats = {
    totalUsers: number;
    activeListings: number;
    ordersInProgress: number;
    productBoosted: number;
};

export type TDashboardStatsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: TDashboardStats;
};

const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getDashboardStats: builder.query<TDashboardStatsResponse, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
