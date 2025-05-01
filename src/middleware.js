import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/verify'];

// Define authentication routes where redirect to home if already authenticated
const authRoutes = ['/login', '/signup', '/verify'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Await cookies() as required in Next.js 15+
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("sessionid");
  const isAuthenticated = !!sessionCookie;

  const csrfToken = cookieStore.get("csrftoken");
  if (csrfToken) {
    requestHeaders.set("X-CSRFToken", csrfToken.value);
  }

  requestHeaders.set("Referer", process.env.NEXT_PUBLIC_REFERER || '');

  // Redirect to home if user is already authenticated and on auth route
  if (authRoutes.some(route => path.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to login if trying to access protected routes unauthenticated
  if (!publicRoutes.some(route => path.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};


// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// // Define public routes that don't require authentication
// const publicRoutes = ['/login', '/signup', '/verify'];

// // Define authentication routes where redirect to home if already authenticated
// const authRoutes = ['/login', '/signup', '/verify'];

// export async function middleware(request) {
//   // Get the path from the request
//   const path = request.nextUrl.pathname;
  
//   // Clone the request headers
//   const requestHeaders = new Headers(request.headers);
//   const cookieStore = cookies();
  
//   // Check if the session cookie exists
//   const sessionCookie = cookieStore.get("sessionid");
//   const isAuthenticated = !!sessionCookie;
  
//   // Add CSRF token from cookies if available
//   const csrfToken = cookieStore.get("csrftoken");
//   if (csrfToken) {
//     requestHeaders.set("X-CSRFToken", csrfToken.value);
//   }
  
//   // Add referer header
//   requestHeaders.set("Referer", process.env.NEXT_PUBLIC_REFERER);
  
//   // Route protection logic
  
//   // If the user is on an auth route and is authenticated, redirect to home
//   if (authRoutes.some(route => path.startsWith(route)) && isAuthenticated) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
  
//   // If the route is not public and the user is not authenticated, redirect to login
//   if (!publicRoutes.some(route => path.startsWith(route)) && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   // For all other cases, continue with the modified headers
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

// export const config = {
//   matcher: [
//     // Apply this middleware to all routes except API routes, _next, and static files
//     '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
//   ],
// };