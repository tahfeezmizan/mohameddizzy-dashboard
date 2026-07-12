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

export type TChartData = {
    week: string;
    orders: number;
    completed: number;
};

export type TRevenueData = {
    date: string;
    revenue: number;
};

export type TChartResponse = {
    success: boolean;
    message: string;
    data: TChartData[];
};

export type TRevenueResponse = {
    success: boolean;
    message: string;
    data: TRevenueData[];
};

export type TCategoryPerformanceData = {
    name: string;
    value: number;
    color: string;
};

export type TCategoryPerformanceResponse = {
    success: boolean;
    message: string;
    data: TCategoryPerformanceData[];
};

export type TCommissionData = {
    totalRevenue: number;
    thisMonthRevenue: number;
    totalCommission: number;
    thisMonthCommission: number;
    totalBoost: number;
    thisMonthBoost: number;
    totalBuyerProtectionFee: number;
    thisMonthBuyerProtectionFee: number;
    pendingEscrow: number;
};

export type TCommissionResponse = {
    success: boolean;
    message: string;
    data: TCommissionData;
};

export type TThisMonthData = {
    totalOrders: number;
    commissionEarned: number;
    averagePerOrder: number;
    growthVsLastMonth: number;
};

export type TThisMonthResponse = {
    success: boolean;
    message: string;
    data: TThisMonthData;
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
        getDashboardChart: builder.query<TChartResponse, void>({
            query: () => ({
                url: "/dashboard/chart",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        getRevenueChart: builder.query<TRevenueResponse, void>({
            query: () => ({
                url: "/dashboard/revenue",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        getCategoryPerformance: builder.query<TCategoryPerformanceResponse, void>({
            query: () => ({
                url: "/dashboard/category-performance",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        getCommissionData: builder.query<TCommissionResponse, void>({
            query: () => ({
                url: "/dashboard/commission",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
        getThisMonthStats: builder.query<TThisMonthResponse, void>({
            query: () => ({
                url: "/dashboard/this-month",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useGetDashboardStatsQuery, useGetDashboardChartQuery, useGetRevenueChartQuery, useGetCategoryPerformanceQuery, useGetCommissionDataQuery, useGetThisMonthStatsQuery } = dashboardApi;
