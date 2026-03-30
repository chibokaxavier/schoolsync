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
import { Skeleton } from "./ui/skeleton";

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
    // we show skeletons to avoid flashes or race condition redirects
    if (!isInitialized || (!user && !isPublicRoute)) {
        return (
            <div className="flex h-screen overflow-hidden bg-background">
                {/* Sidebar Skeleton */}
                <div className="w-[14%] md:w-[12%] lg:w-[20%] xl:w-[18%] p-4 overflow-y-auto hidden md:block bg-card shadow-lg z-10 border-r space-y-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="size-10 rounded-lg" />
                        <Skeleton className="h-6 w-24 hidden lg:block" />
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-xl" />
                        ))}
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="w-full md:w-[88%] lg:w-[80%] xl:w-[82%] bg-background overflow-y-auto flex flex-col">
                    {/* Navbar Skeleton */}
                    <div className="flex items-center justify-between p-4 md:p-6 w-full border-b border-border bg-card/50">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-center gap-4">
                           <Skeleton className="size-9 rounded-full" />
                           <Skeleton className="size-9 rounded-full" />
                           <Skeleton className="h-10 w-32 rounded-full" />
                        </div>
                    </div>
                    {/* Body Skeleton */}
                    <main className="p-4 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Skeleton className="h-32 rounded-2xl md:col-span-1" />
                            <Skeleton className="h-32 rounded-2xl md:col-span-1" />
                            <Skeleton className="h-32 rounded-2xl md:col-span-1" />
                        </div>
                        <Skeleton className="h-[400px] w-full rounded-2xl" />
                    </main>
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
