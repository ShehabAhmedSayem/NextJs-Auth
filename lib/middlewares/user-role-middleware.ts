import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stack-middlewares";
import { createClient } from "../supabase/server";
import { isPathPermissible } from "../utils";
import { User } from "../validations/user";


async function fetchUserData(sessionToken: string): Promise<User> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/current/`;
    const apiKey = `${process.env.NEXT_PUBLIC_API_KEY}`;

    const response = await fetch(url, {
        headers: {
            "x-api-key": apiKey,
            "Authorization": `Bearer ${sessionToken}`
        }
    });

    return await response.json();
}

export const userRoleMiddleware: MiddlewareFactory = (next) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser()
        const { data: { session } } = await supabase.auth.getSession()
        const res = await next(request, _next) as NextResponse;

        if (user && session?.access_token) {
            const userInfo: User = await fetchUserData(session?.access_token)
            const isPermissible = isPathPermissible(userInfo.role, request.nextUrl.pathname);

            if (!isPermissible) {
                //FIXED ME : Create and unauthorized page and show an (Has NO PERMISSION ) error message 
                return NextResponse.redirect(new URL('/unauthorized', request.url))
            } else if (userInfo.role === 'student' && !userInfo.profile?.isOnboardingCompleted) {
                if (request.nextUrl.pathname !== '/onboarding') {
                    return NextResponse.redirect(new URL('/onboarding', request.url));
                }
            }


        }

        return res;
    };
};

