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
    getAdminPosts: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) =>
            v !== undefined && v !== "" && v !== "ALL" && search.set(k, v),
        );
        return `/admin/posts?${search.toString()}`;
      },
      providesTags: ["Post"],
    }),
    getAdminPostById: builder.query({
      query: (id) => `/admin/posts/${id}`,
      providesTags: (_, __, id) => [{ type: "Post", id }],
    }),
    createAdminPost: builder.mutation({
      query: (body) => ({ url: "/admin/posts", method: "POST", body }),
      invalidatesTags: ["Post"],
    }),
    updateAdminPost: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/admin/posts/${id}`, method: "PUT", body }),
      invalidatesTags: ["Post"],
    }),
    updateAdminPostPublished: builder.mutation({
      query: ({ id, isPublished }) => ({
        url: `/admin/posts/${id}/published`,
        method: "PATCH",
        body: { isPublished },
      }),
      invalidatesTags: ["Post"],
    }),
    deleteAdminPost: builder.mutation({
      query: (id) => ({ url: `/admin/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Post"],
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
    updatePermission: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/admin/permissions/${id}`, method: "PATCH", body }),
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
  useGetAdminPostsQuery,
  useGetAdminPostByIdQuery,
  useCreateAdminPostMutation,
  useUpdateAdminPostMutation,
  useUpdateAdminPostPublishedMutation,
  useDeleteAdminPostMutation,
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
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetUserPermissionDetailsQuery,
  useUpdateUserPermissionMutation,
} = adminService;
