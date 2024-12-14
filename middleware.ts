import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
    '/transformations',
    '/transformations/add/(.*)',
  ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};