"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "admin" | "teacher" | "student" | "parent" | "moderator";

interface User {
    id: string | number;
    name: string;
    role: Role;
    avatar: string;
    class?: string;
    grade?: number;
    classes?: string[];
}

interface AuthContextType {
    user: User | null;
    setRole: (role: Role | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("schoolsync-role");
        document.cookie = "schoolsync-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    };

    const setRole = (role: Role | null) => {
        if (!role) {
            logout();
            return;
        }

        const defaultAdmin: User = {
            id: "admin-1",
            name: "John Admin",
            role: "admin",
            avatar: "/avatar.png",
        };

        let userData: User = { ...defaultAdmin, role };

        if (role === "teacher") {
            userData = {
                id: 1,
                name: "John Doe",
                role: "teacher",
                avatar: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
            };
        } else if (role === "student") {
            userData = {
                id: 1,
                name: "Alice Johnson",
                role: "student",
                avatar: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                class: "1B",
                grade: 7,
            };
        } else if (role === "parent") {
            userData = {
                id: 1,
                name: "Mark Wilson",
                role: "parent",
                avatar: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
            };
        } else if (role === "moderator") {
            userData = {
                id: "mod-1",
                name: "Sarah Moderator",
                role: "moderator",
                avatar: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
            };
        }

        setUser(userData);
        localStorage.setItem("schoolsync-role", role);
        document.cookie = `schoolsync-role=${role}; path=/; max-age=31536000; SameSite=Lax`;
    };

    // Load role from localStorage on mount
    useEffect(() => {
        const savedRole = localStorage.getItem("schoolsync-role") as Role;
        if (savedRole && ["admin", "teacher", "student", "parent", "moderator"].includes(savedRole)) {
            setRole(savedRole);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
