import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a simple token - in production, use a more secure method
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'your-secret-token'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip auth for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('admin_token')?.value

    // If no token, redirect to login
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 