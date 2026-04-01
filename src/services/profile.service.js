import { apiSlice } from "@/store/slice/apiSlice";

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/profile", method: "PUT", body }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileService;
