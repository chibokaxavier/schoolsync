import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@/lib/permissions";

export interface User {
    id: string | number;
    email: string;
    role: Role;
    name?: string;
    avatar?: string;
    class?: string;
    grade?: number;
    classes?: string[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload;
            state.user = {
                ...user,
                role: user.role.toLowerCase() as Role
            };
            state.token = token;
            state.isInitialized = true;

            // Side effects for persistence
            localStorage.setItem("schoolsync-token", token);
            localStorage.setItem("schoolsync-user", JSON.stringify(state.user));
            document.cookie = `schoolsync-role=${state.user.role}; path=/; max-age=31536000; SameSite=Lax`;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isInitialized = true;
            localStorage.removeItem("schoolsync-token");
            localStorage.removeItem("schoolsync-user");
            localStorage.removeItem("schoolsync-role");
            document.cookie = "schoolsync-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem("schoolsync-token");
            const userJson = localStorage.getItem("schoolsync-user");

            if (token && userJson) {
                try {
                    state.token = token;
                    state.user = JSON.parse(userJson);
                } catch (e) {
                    console.error("Failed to parse user from localStorage", e);
                }
            }
            state.isInitialized = true;
        },
    },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsInitialized = (state: { auth: AuthState }) => state.auth.isInitialized;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
