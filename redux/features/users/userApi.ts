import { baseApi } from "../../api/baseApi";

export type TUserStats = {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    verifiedUsers: number;
};

export type TUser = {
    _id: string;
    name: string;
    email?: string;
    phone: string;
    role: string;
    isActive: boolean;
    verifiedBadge: boolean;
    publishedProductCount: number;
    balance?: number;
    createdAt: string;
    updatedAt: string;
};

export type TMeta = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};

export type TUsersResponse = {
    success: boolean;
    message: string;
    meta: TMeta;
    data: TUser[];
};

export type TUserDetailResponse = {
    success: boolean;
    message: string;
    data: TUser;
};

export type TUserStatsResponse = {
    success: boolean;
    message: string;
    data: TUserStats;
};

const userApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getUserStats: builder.query<TUserStatsResponse, void>({
            query: () => ({
                url: "/user/stats",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getAllUsers: builder.query<TUsersResponse, Record<string, any> | void>({
            query: (params) => ({
                url: "/user",
                method: "GET",
                params,
            }),
            providesTags: ["User"],
        }),
        getSingleUser: builder.query<TUserDetailResponse, string>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
    }),
});

export const { useGetUserStatsQuery, useGetAllUsersQuery, useGetSingleUserQuery } = userApi;
