"use client";

import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/redux/slices/authSlice";

import { Role } from "@/lib/permissions";

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
    const user = useSelector(selectCurrentUser);

    if (!user || !allowedRoles.includes(user.role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
