"use client";

import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectIsInitialized,
    logout as reduxLogout,
    setCredentials
} from "@/lib/redux/slices/authSlice";
import { Role } from "@/lib/permissions";

// Re-using the types for compatibility with existing components
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

export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const isInitialized = useSelector(selectIsInitialized);

    const logout = () => {
        dispatch(reduxLogout());
    };

    // setRole is kept for legacy/simulator support if needed, 
    // but now it just logs out or could be mapped to a dev login
    const setRole = (role: Role | null) => {
        if (!role) {
            logout();
        } else {
            console.warn("setRole is deprecated. Please use real login.");
            // We could implement a mock login here if needed
        }
    };

    return {
        user: user as User | null,
        isInitialized,
        logout,
        setRole
    };
};

// Mock AuthProvider for compatibility (does nothing now)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};
