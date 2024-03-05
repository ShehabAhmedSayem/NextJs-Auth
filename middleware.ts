
import { type NextRequest } from 'next/server';
import { authCheckUpdateSession } from './lib/supabase/auth-check-middleware';



export async function middleware(request: NextRequest) {
    return await authCheckUpdateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - signin/*
         * - auth
         * - unauthorized
         */
        "/((?!_next/static|_next/image|favicon.ico|signin|auth|unauthorized|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}