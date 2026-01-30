"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

type Role = "admin" | "teacher" | "student" | "parent";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles: Role[];
    fallback?: React.ReactNode;
}

/**
 * A wrapper component that only renders its children if the current user role 
 * is included in the allowedRoles array.
 */
export const RoleGate = ({
    children,
    allowedRoles,
    fallback = null
}: RoleGateProps) => {
    const { user } = useAuth();

    if (!allowedRoles.includes(user.role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
