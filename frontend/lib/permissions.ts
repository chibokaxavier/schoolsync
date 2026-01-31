export type Role = "admin" | "teacher" | "student" | "parent" | "moderator";

export const RoutePermissions: Record<string, Role[]> = {
    "/": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/teachers": ["admin", "teacher", "moderator"],
    "/list/students": ["admin", "teacher", "moderator"],
    "/list/parents": ["admin", "teacher", "moderator"],
    "/list/subjects": ["admin", "moderator"],
    "/list/classes": ["admin", "teacher", "moderator"],
    "/list/lessons": ["admin", "teacher", "moderator"],
    "/list/exams": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/assignments": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/results": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/attendance": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/messages": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/announcements": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/events": ["admin", "teacher", "student", "parent", "moderator"],
    "/list/moderators": ["admin"],
    "/admin/events": ["admin", "teacher", "student", "parent", "moderator"],
    "/admin/cycle": ["admin", "moderator"],
    "/admin": ["admin", "moderator"],
    "/teacher": ["teacher"],
    "/student": ["student"],
    "/parent": ["parent"],
    "/admin/payments": ["admin", "moderator"],
    "/profile": ["admin", "teacher", "student", "parent", "moderator"],
    "/settings": ["admin", "teacher", "student", "parent", "moderator"],
};

export const isAuthorized = (role: Role, path: string): boolean => {
    // Check exact match first
    if (RoutePermissions[path]) {
        return RoutePermissions[path].includes(role);
    }

    // Check prefix for recursive routes (e.g., /list/teachers/1)
    const matchingPath = Object.keys(RoutePermissions).find(p =>
        path.startsWith(p) && p !== "/"
    );

    if (matchingPath) {
        return RoutePermissions[matchingPath].includes(role);
    }

    // Default to home access for all roles if not specifically denied
    return true;
};
