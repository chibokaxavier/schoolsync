import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthorized, Role } from "@/lib/permissions";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Static assets and internal next paths should be ignored
    if (
        pathname.startsWith("/_next") ||
        pathname.includes("/favicon.ico") ||
        pathname.startsWith("/public")
    ) {
        return NextResponse.next();
    }

    // Get the role from cookies
    const role = request.cookies.get("schoolsync-role")?.value as Role | undefined;

    // 1. If no role and not on /login, redirect to /login
    if (!role && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. If role exists and on /login, redirect to their dashboard
    if (role && pathname === "/login") {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
    }

    // 3. If role exists and on root /, redirect to dashboard
    if (role && pathname === "/") {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
    }

    // 4. Default Guest handling if somehow role is still missing (safety)
    const currentRole = role || "student"; // Should not reach here for protected pages if #1 is active

    if (!isAuthorized(currentRole, pathname) && pathname !== "/login") {
        console.warn(`Middleware: Unauthorized access attempt to ${pathname} by role ${currentRole}. Redirecting to /`);
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Map only pages to the middleware for performance
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
