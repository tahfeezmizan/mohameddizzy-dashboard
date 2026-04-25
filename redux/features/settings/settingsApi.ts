import { baseApi } from "../../api/baseApi";

export type TPaymentSettings = {
    commissionRate: number;
    escrowDuration: number;
};

export type TNotificationSettings = {
    email: boolean;
    push: boolean;
};

export type TSettings = {
    payment: TPaymentSettings;
    notifications: TNotificationSettings;
};

export type TSettingsResponse = {
    success: boolean;
    message: string;
    data: TSettings;
};

const settingsApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getSettings: builder.query<TSettingsResponse, void>({
            query: () => ({
                url: "/settings",
                method: "GET",
            }),
            providesTags: ["Settings"],
        }),
        updateSettings: builder.mutation<TSettingsResponse, Partial<TSettings>>({
            query: (data) => ({
                url: "/settings",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
    }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
