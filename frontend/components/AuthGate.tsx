"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsInitialized } from "@/lib/redux/slices/authSlice";
import { isAuthorized } from "@/lib/permissions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { toast } from "sonner";
import Menu from "./Menu";
import Navbar from "./Navbar";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector(selectCurrentUser);
    const isInitialized = useSelector(selectIsInitialized);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!isInitialized) return;

        const isPublicRoute = pathname === "/login" || pathname === "/signup";

        // 1. If no user and not on a public route, redirect to /login
        if (!user && !isPublicRoute) {
            document.cookie = "schoolsync-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            toast.error("Session expired. Please log in again.");
            router.push("/login");
            return;
        }

        // 2. middleware handles RBAC redirection for the most part, 
        // but client-side check is good for RBAC within the app session
        if (user && !isAuthorized(user.role, pathname) && !isPublicRoute) {
            console.warn(`Unauthorized access attempt to ${pathname} by role ${user.role}. Redirecting to dashboard`);
            toast.warning(`Access denied. Redirecting to ${user.role} dashboard.`);
            router.push(`/${user.role.toLowerCase()}`);
        }
    }, [user, isInitialized, pathname, router]);

    // 1. For Public pages, render strictly children
    const isPublicRoute = pathname === "/login" || pathname === "/signup";
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // 2. If not initialized or no user and not on a public route, 
    // we show loading to avoid flashes or race condition redirects
    if (!isInitialized || (!user && !isPublicRoute)) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-muted-foreground animate-pulse font-medium">Authenticating...</span>
                </div>
            </div>
        );
    }



    // 3. Authenticated Dashboard Layout
    if (!user) return null; // Satisfy TypeScript: user is guaranteed here by redirects/loading above
    const homeHref = `/${user.role}`;

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <div className="w-[14%] md:w-[12%] lg:w-[20%] xl:w-[18%] p-4 overflow-y-auto hidden md:block bg-card shadow-lg z-10 border-r">
                <Link href={homeHref} className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <NotebookPen size={28} className="text-primary" />
                    </div>
                    <span className="hidden lg:block font-bold text-xl tracking-tight text-foreground">SchoolSync</span>
                </Link>
                <Menu />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-[88%] lg:w-[80%] xl:w-[82%] bg-background overflow-y-auto flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <div className="transition-all animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
