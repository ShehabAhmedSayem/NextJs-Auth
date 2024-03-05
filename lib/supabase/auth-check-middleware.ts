import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { User } from '../validations/user';
import { isPathPermissible } from '../utils';



export const createClient = (request: NextRequest) => {
    let response = NextResponse.next({
        request: {
            headers: request.headers
        }
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers
                        }
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers
                        }
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options
                    });
                }
            }
        }
    );

    return { supabase, response };
};

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

export const authCheckUpdateSession = async (request: NextRequest) => {
    try {
        const { supabase, response } = createClient(request);
        const { data: { user }, error } = await supabase.auth.getUser()
        const { data: { session } } = await supabase.auth.getSession()

        if (error || !user) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
        if (user && session?.access_token) {
            const userInfo: User = await fetchUserData(session?.access_token)
            const isPermissible = isPathPermissible(userInfo.role, request.nextUrl.pathname);

            if (!isPermissible) {
                return NextResponse.redirect(new URL('/unauthorized', request.url))
            } else if (userInfo.role === 'student' && !userInfo.profile?.isOnboardingCompleted) {
                if (request.nextUrl.pathname !== '/onboarding') {
                    return NextResponse.redirect(new URL('/onboarding', request.url));
                }
            }
        }
        return response;

    } catch (e) {
        return NextResponse.next({
            request: {
                headers: request.headers
            }
        });
    }

};

