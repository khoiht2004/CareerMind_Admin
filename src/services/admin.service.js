import { apiSlice } from "@/store/slice/apiSlice";

export const adminService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/admin/stats",
    }),
    getApplicationTrend: builder.query({
      query: ({ days = 7 } = {}) =>
        `/admin/stats/applications-trend?days=${days}`,
    }),
    getJobsByType: builder.query({
      query: () => "/admin/stats/jobs-by-type",
    }),
    getRecentApplications: builder.query({
      query: ({ limit = 10 }) =>
        `/admin/stats/recent-applications?limit=${limit}`,
    }),
    getAdminUsers: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) =>
            v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/users?${search.toString()}`;
      },
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserActive: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    getAdminJobs: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) =>
            v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/jobs?${search.toString()}`;
      },
      providesTags: ["Job"],
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/jobs/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Job"],
    }),
    getAdminApplications: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) =>
            v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/applications?${search.toString()}`;
      },
      providesTags: ["Application"],
    }),
    updateAdminApplicationStatus: builder.mutation({
      query: ({ id, status, note }) => ({
        url: `/admin/applications/${id}/status`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Application"],
    }),
    getChatStats: builder.query({
      query: () => "/admin/chat-stats",
    }),
    getAdminChatSessions: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) =>
            v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/chat-sessions?${search.toString()}`;
      },
    }),
    getSystemStats: builder.query({
      query: () => "/admin/system-stats",
    }),
    getAdminCompanies: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/admin/companies?${search.toString()}`;
      },
      providesTags: ["Company"],
    }),
    createAdminCompany: builder.mutation({
      query: (body) => ({ url: "/admin/companies", method: "POST", body }),
      invalidatesTags: ["Company"],
    }),
    verifyCompany: builder.mutation({
      query: (id) => ({ url: `/admin/companies/${id}/verify`, method: "PUT" }),
      invalidatesTags: ["Company"],
    }),
    toggleCompanyActive: builder.mutation({
      query: (id) => ({ url: `/admin/companies/${id}/active`, method: "PUT" }),
      invalidatesTags: ["Company"],
    }),

    // ── Queue Management ──────────────────────────────────────────────────
    getAdminQueues: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/queues?${search.toString()}`;
      },
      providesTags: ["Queue"],
    }),

    // ── Permission Management ──────────────────────────────────────────────
    getAllPermissions: builder.query({
      query: () => "/admin/permissions",
      providesTags: ["Permission"],
    }),
    createPermission: builder.mutation({
      query: (body) => ({ url: "/admin/permissions", method: "POST", body }),
      invalidatesTags: ["Permission"],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({ url: `/admin/permissions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Permission"],
    }),
    getUserPermissionDetails: builder.query({
      query: (userId) => `/admin/users/${userId}/permissions`,
      providesTags: (_, __, userId) => [{ type: "UserPermission", id: userId }],
    }),
    updateUserPermission: builder.mutation({
      query: ({ userId, permissionId, isGranted }) => ({
        url: `/admin/users/${userId}/permissions`,
        method: "POST",
        body: { permissionId, isGranted },
      }),
      invalidatesTags: (_, __, { userId }) => [{ type: "UserPermission", id: userId }],
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
  useGetAdminQueuesQuery,
  useGetAdminCompaniesQuery,
  useCreateAdminCompanyMutation,
  useVerifyCompanyMutation,
  useToggleCompanyActiveMutation,
  useGetAllPermissionsQuery,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useGetUserPermissionDetailsQuery,
  useUpdateUserPermissionMutation,
} = adminService;
