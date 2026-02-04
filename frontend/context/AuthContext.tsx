"use client";

import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectIsInitialized,
    logout as reduxLogout
} from "@/lib/redux/slices/authSlice";
import { type Role } from "@/lib/permissions";
export { type Role };

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

interface AuthContextType {
    user: User | null;
    isInitialized: boolean;
    setRole: (role: Role | null) => void;
    logout: () => void;
}

// We still export AuthContext for components that use useContext(AuthContext)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const isInitialized = useSelector(selectIsInitialized);

    const logout = () => {
        dispatch(reduxLogout());
    };

    const setRole = (role: Role | string | null) => {
        // No-op - real auth only via login
    };


    return {
        user: user as User | null,
        isInitialized,
        logout,
        setRole
    };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};
