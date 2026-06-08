import { apiSlice } from "@/store/slice/apiSlice";

export const companyService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCompanyProfile: builder.query({
      query: () => "/company/my/profile",
      providesTags: ["Company"],
    }),
    updateMyCompanyProfile: builder.mutation({
      query: (body) => ({ url: "/company/my/profile", method: "PUT", body }),
      invalidatesTags: ["Company"],
    }),
    getMyCompanyStats: builder.query({
      query: () => "/company/my/stats",
      providesTags: ["Company"],
    }),
    getMyCompanyJobs: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/company/my/jobs?${search.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getMyCompanyApplications: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/company/my/applications?${search.toString()}`;
      },
      providesTags: ["Application"],
    }),
    getMyCompanyPersonnel: builder.query({
      query: () => "/company/my/personnel",
      providesTags: ["Company"],
    }),
  }),
});

export const {
  useGetMyCompanyProfileQuery,
  useUpdateMyCompanyProfileMutation,
  useGetMyCompanyStatsQuery,
  useGetMyCompanyJobsQuery,
  useGetMyCompanyApplicationsQuery,
  useGetMyCompanyPersonnelQuery,
} = companyService;
