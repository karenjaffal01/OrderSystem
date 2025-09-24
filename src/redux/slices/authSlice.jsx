import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    role: null,
    token: null,
    isAuthenticated: false,
    refreshToken: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.role = null;
            state.isAuthenticated = false;
        }
    },
});
export const {loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;