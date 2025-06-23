import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",                    // Exact match for root
  "/app/pricing",
  "/auth/signin",        // Exact match for login
  "/register",           // Exact match for register
  "/api/auth/*",         // All routes under /api/auth
  "/api/webhook/*",      // All routes under /api/webhook
  "/_next/*",            // All routes under /_next
  "/favicon.ico",        // Exact match for favicon
  "/images/*",           // All routes under /images
  "/public/*",           // All routes under /public
  "/api/summarize",      // Exact match for summarize API
  "/coming-soon",        // Exact match for coming soon page
]

export default auth(async (req) => {
  const { nextUrl } = req

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    // Remove trailing slash and wildcard for comparison
    const cleanRoute = route.replace(/\/\*$/, "").replace(/\/$/, "")
    const cleanPath = nextUrl.pathname.replace(/\/$/, "")

    // If route ends with /*, check if path starts with the base route
    if (route.endsWith("/*")) {
      return cleanPath.startsWith(cleanRoute)
    }

    // For exact matches, compare the full paths
    return cleanPath === cleanRoute
  })

  // If the route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // // If the user is not logged in and trying to access a private route,
  // // redirect them to the login page
  // if (!isLoggedIn) {
  //   const loginUrl = new URL("/auth/signin", nextUrl.origin)
  //   loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)
  //   return Response.redirect(loginUrl)
  // }

  // Allow access to private routes for authenticated users
  return NextResponse.next()
})

// Configure which routes to run middleware on
export const config = {
  matcher: ["/((?!api/webhook|_next/static|_next/image|favicon.ico).*)"],
}