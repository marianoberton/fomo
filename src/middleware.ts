import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get hostname (e.g. fomo.com.ar, www.fomo.com.ar, localhost:3000)
  const hostname = request.headers.get('host') || '';

  // Check if it's the root domain and root path
  if (hostname.includes('fomo.com.ar') && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/proximamente', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};