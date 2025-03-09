import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simply pass through all requests without any redirection
  return NextResponse.next();
}

// Disable the matcher completely to prevent any middleware processing
export const config = {
  matcher: [], // Empty array means middleware won't run on any paths
};