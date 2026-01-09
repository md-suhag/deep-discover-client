
import {
  authRoutes,
  getRouteOwner,
  isValidRedirectForRole,
  UserRole,
  getDefaultDashboardRoute,
} from "./auth-utils";
import { type NextRequest, NextResponse } from "next/server";

export const middlewareProxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  // 1. Check if the current route is an Auth route (login, register, etc.)
  if (authRoutes.includes(pathname)) {
    if (accessToken) {
      // User is already logged in, redirect to dashboard or appropriate page
      
      const role = getRoleFromToken(accessToken);
      if (role) {
         const redirectPath = getDefaultDashboardRoute(role);
         return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }
    // Allow access to auth routes if not logged in
    return NextResponse.next();
  }

  // 2. Identify the owner of the requested route
  const routeOwner = getRouteOwner(pathname);

  // If the route is public (not matched by any protected pattern)
  if (!routeOwner) {
     return NextResponse.next();
  }

  // 3. For protected routes, check authentication
  if (!accessToken) {
    // Redirect to login preserving the return url
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Verify Role Access
  const userRole = getRoleFromToken(accessToken);

  if (!userRole) {
      // Token seems invalid or role missing, force logout/login
      return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if role matches route owner
  // "COMMON" routes are accessible by any authenticated user
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  if (routeOwner !== userRole) {
     // Allow SUPER_ADMIN to access ADMIN routes
     if (userRole === "SUPER_ADMIN" && routeOwner === "ADMIN") {
        return NextResponse.next();
     }

     // User is authenticated but doesn't have permission for this role-specific route
     // Redirect to their own dashboard
     return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
  }

  return NextResponse.next();
};



function getRoleFromToken(token: string): UserRole | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const parsed = JSON.parse(jsonPayload);
    return parsed.role as UserRole;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
}
