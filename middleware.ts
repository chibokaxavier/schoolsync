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

    // Default to student if no role is found (or whatever your guest/default role is)
    const currentRole = role || "student";

    // Redirect root to role-specific dashboard
    if (pathname === "/") {
        return NextResponse.redirect(new URL(`/${currentRole}`, request.url));
    }

    if (!isAuthorized(currentRole, pathname)) {
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
