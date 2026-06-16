import { baseApi } from "../../api/baseApi";

export type TCategory = {
    _id: string;
    name: string;
    icon?: string;
    isActive: boolean;
    parentCategory: string | { _id: string; name: string; level: number } | null;
    homePosition: number | null;
    homeVisibility: boolean;
    createdAt: string;
    updatedAt: string;
    subcategoryCount?: number;
    productCount?: number;
    level?: number;
};

export type TCategoryResponse = {
    success: boolean;
    message: string;
    data: TCategory[];
};

export type TSingleCategoryResponse = {
    success: boolean;
    message: string;
    data: TCategory;
};

const categoryApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAdminParents: builder.query<TCategoryResponse, void>({
            query: () => ({
                url: "/category/admin/parents",
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        getAdminSubcategories: builder.query<TCategoryResponse, void>({
            query: () => ({
                url: "/category/admin/subcategories",
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        getAdminCategoryTree: builder.query<TCategoryResponse, void>({
            query: () => ({
                url: "/category/admin/tree",
                method: "GET",
            }),
            providesTags: ["Category"],
        }),
        getSingleCategory: builder.query<TSingleCategoryResponse, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Category", id }],
        }),
        createCategory: builder.mutation<TSingleCategoryResponse, FormData>({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation<TSingleCategoryResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Category", { type: "Category", id }],
        }),
        deleteCategory: builder.mutation<any, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useGetAdminParentsQuery, useGetAdminSubcategoriesQuery, useGetAdminCategoryTreeQuery, useGetSingleCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;
