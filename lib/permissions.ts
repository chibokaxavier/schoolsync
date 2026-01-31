export type Role = "admin" | "teacher" | "student" | "parent";

export const RoutePermissions: Record<string, Role[]> = {
    "/": ["admin", "teacher", "student", "parent"],
    "/list/teachers": ["admin", "teacher"],
    "/list/students": ["admin", "teacher"],
    "/list/parents": ["admin", "teacher"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/lessons": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student", "parent"],
    "/list/assignments": ["admin", "teacher", "student", "parent"],
    "/list/results": ["admin", "teacher", "student", "parent"],
    "/list/attendance": ["admin", "teacher", "student", "parent"],
    "/list/messages": ["admin", "teacher", "student", "parent"],
    "/list/announcements": ["admin", "teacher", "student", "parent"],
    "/list/events": ["admin", "teacher", "student", "parent"],
    "/admin/events": ["admin", "teacher", "student", "parent"],
    "/admin/cycle": ["admin"],
    "/admin": ["admin"],
    "/teacher": ["teacher"],
    "/student": ["student"],
    "/parent": ["parent"],
    "/admin/payments": ["admin"],
    "/profile": ["admin", "teacher", "student", "parent"],
    "/settings": ["admin", "teacher", "student", "parent"],
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
