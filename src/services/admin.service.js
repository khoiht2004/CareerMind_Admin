import { apiSlice } from "@/store/slice/apiSlice";

export const adminService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/admin/stats",
    }),
    getApplicationTrend: builder.query({
      query: ({ days = 7 } = {}) => `/admin/stats/applications-trend?days=${days}`,
    }),
    getJobsByType: builder.query({
      query: () => "/admin/stats/jobs-by-type",
    }),
    getRecentApplications: builder.query({
      query: () => "/admin/stats/recent-applications",
    }),
    getAdminUsers: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v));
        return `/admin/users?${search.toString()}`;
      },
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({ url: `/admin/users/${id}/role`, method: "PATCH", body: { role } }),
      invalidatesTags: ["User"],
    }),
    toggleUserActive: builder.mutation({
      query: (id) => ({ url: `/admin/users/${id}/toggle-active`, method: "PATCH" }),
      invalidatesTags: ["User"],
    }),
    getAdminJobs: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v));
        return `/admin/jobs?${search.toString()}`;
      },
      providesTags: ["Job"],
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/admin/jobs/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Job"],
    }),
    getAdminApplications: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v));
        return `/admin/applications?${search.toString()}`;
      },
      providesTags: ["Application"],
    }),
    updateAdminApplicationStatus: builder.mutation({
      query: ({ id, status, note }) => ({ url: `/admin/applications/${id}/status`, method: "PATCH", body: { status, note } }),
      invalidatesTags: ["Application"],
    }),
    getChatStats: builder.query({
      query: () => "/admin/chat-stats",
    }),
    getAdminChatSessions: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v));
        return `/admin/chat-sessions?${search.toString()}`;
      },
    }),
    getSystemStats: builder.query({
      query: () => "/admin/system-stats",
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetApplicationTrendQuery,
  useGetJobsByTypeQuery,
  useGetRecentApplicationsQuery,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
  useGetAdminApplicationsQuery,
  useUpdateAdminApplicationStatusMutation,
  useGetChatStatsQuery,
  useGetAdminChatSessionsQuery,
  useGetSystemStatsQuery,
} = adminService;
