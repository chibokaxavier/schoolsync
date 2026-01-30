"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "admin" | "teacher" | "student" | "parent";

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
    user: User;
    setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
    id: "admin-1",
    name: "John Admin",
    role: "admin",
    avatar: "/avatar.png",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(defaultUser);

    const setRole = (role: Role) => {
        let userData: User = { ...defaultUser, role };

        if (role === "teacher") {
            userData = {
                id: 1, // Matches some supervisor IDs in data.ts potentially
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
        }

        setUser(userData);
        localStorage.setItem("schoolsync-role", role);
    };

    // Load role from localStorage on mount
    useEffect(() => {
        const savedRole = localStorage.getItem("schoolsync-role") as Role;
        if (savedRole && ["admin", "teacher", "student", "parent"].includes(savedRole)) {
            setRole(savedRole);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setRole }}>
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
