import { baseApi } from "../../api/baseApi";

export type TReportStatus = "OPEN" | "IN_REVIEW" | "RESOLVED";
export type TReportType = "LISTING" | "USER";

export type TReportedItem = {
    _id: string;
    title: string;
    price: number;
    images: string[];
};

export type TReportUser = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    verifiedBadge: boolean;
};

export type TReport = {
    _id: string;
    reportId: string;
    type: TReportType;
    reportedItem?: TReportedItem;
    reporter: TReportUser;
    reportedUser: TReportUser;
    reason: string;
    details: string;
    status: TReportStatus;
    createdAt: string;
    updatedAt: string;
};

export type TReportStats = {
    total: number;
    status: {
        open: number;
        inReview: number;
        resolved: number;
    };
    type: {
        listing: number;
        user: number;
    };
};

export type TReportStatsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: TReportStats;
};

export type TReportsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    data: TReport[];
};

export type TReportDetailResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: TReport;
};

const reportApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getReportStats: builder.query<TReportStatsResponse, void>({
            query: () => ({
                url: "/report/stats",
                method: "GET",
            }),
            providesTags: ["Report" as any],
        }),
        getAllReports: builder.query<TReportsResponse, { page?: number; limit?: number; searchTerm?: string; type?: string; status?: string } | void>({
            query: (args) => ({
                url: "/report",
                method: "GET",
                params: args ? args : undefined,
            }),
            providesTags: ["Report" as any],
        }),
        getReportById: builder.query<TReportDetailResponse, string>({
            query: (id) => ({
                url: `/report/${id}`,
                method: "GET",
            }),
            providesTags: ["Report" as any],
        }),
        updateReportStatus: builder.mutation<any, { id: string; status: TReportStatus }>({
            query: ({ id, status }) => ({
                url: `/report/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Report" as any],
        }),
    }),
});

export const { useGetReportStatsQuery, useGetAllReportsQuery, useGetReportByIdQuery, useUpdateReportStatusMutation } = reportApi;
