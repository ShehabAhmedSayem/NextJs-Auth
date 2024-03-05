import { stackMiddlewares } from './lib/middlewares/stack-middlewares';
import { authCheckUpdateSession } from './lib/middlewares/auth-check-middleware';
import { userRoleMiddleware } from './lib/middlewares/user-role-middleware';

export default stackMiddlewares([authCheckUpdateSession, userRoleMiddleware]);


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|signin|auth|unauthorized|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}