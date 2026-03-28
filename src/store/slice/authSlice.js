import { createSlice } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isChecked: false,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    setChecked: (state) => {
      state.isChecked = true;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(authService.endpoints.getMe.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authService.endpoints.getMe.matchFulfilled,
        (state, action) => {
          state.user = action.payload?.data ?? action.payload;
          state.isLoading = false;
          state.isChecked = true;
        },
      )
      .addMatcher(authService.endpoints.getMe.matchRejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isChecked = true;
      });
  },
});

export const { setUser, clearUser, setChecked } = authSlice.actions;
export default authSlice.reducer;
