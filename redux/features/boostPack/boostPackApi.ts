import { baseApi } from "../../api/baseApi";

export type TBoostPack = {
    _id: string;
    name: string;
    description?: string;
    type: "PRODUCT" | "SHOP";
    price: number;
    duration: number;
    isActive: boolean;
    isRecommended: boolean;
    isDeleted: boolean;
    features?: string[];
    createdAt: string;
    updatedAt: string;
};

const boostPackApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAllBoostPacks: builder.query<{ success: boolean; data: TBoostPack[] }, string | void>({
            query: (type) => ({
                url: "/boost-pack/admin",
                method: "GET",
                params: type ? { type } : {},
            }),
            providesTags: ["BoostPack"],
        }),
        createBoostPack: builder.mutation<{ success: boolean; data: TBoostPack }, Partial<TBoostPack>>({
            query: (body) => ({
                url: "/boost-pack",
                method: "POST",
                body,
            }),
            invalidatesTags: ["BoostPack"],
        }),
        updateBoostPack: builder.mutation<{ success: boolean; data: TBoostPack }, { id: string; body: Partial<TBoostPack> }>({
            query: ({ id, body }) => ({
                url: `/boost-pack/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["BoostPack"],
        }),
        toggleBoostPackStatus: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/boost-pack/${id}/toggle-status`,
                method: "PATCH",
            }),
            invalidatesTags: ["BoostPack"],
        }),
        setBoostPackRecommended: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/boost-pack/${id}/set-recommended`,
                method: "PATCH",
            }),
            invalidatesTags: ["BoostPack"],
        }),
        deleteBoostPack: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/boost-pack/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BoostPack"],
        }),
    }),
});

export const { useGetAllBoostPacksQuery, useCreateBoostPackMutation, useUpdateBoostPackMutation, useToggleBoostPackStatusMutation, useSetBoostPackRecommendedMutation, useDeleteBoostPackMutation } = boostPackApi;
