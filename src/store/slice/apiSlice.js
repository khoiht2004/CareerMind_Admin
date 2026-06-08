import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Job", "Post", "Application", "Profile", "Chat", "Company", "Permission", "UserPermission", "Queue", "Notification"],
  endpoints: () => ({}),
});
