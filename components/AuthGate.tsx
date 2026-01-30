"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { isAuthorized } from "@/lib/permissions";
import { usePathname, useRouter } from "next/navigation";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthorized(user.role, pathname)) {
            console.warn(`Unauthorized access attempt to ${pathname} by role ${user.role}. Redirecting to /`);
            router.push("/");
        }
    }, [user.role, pathname, router]);

    // If not authorized, we still render children but the transition will happen via useEffect.
    // For a more strict approach, we could return null here, but that might cause flicker 
    // until the useEffect reaches the router.push.
    return <>{children}</>;
};
