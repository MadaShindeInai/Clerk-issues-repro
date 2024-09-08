import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const QUESTION_CREATE_ROUTE = "/question/create";
const EXPERT_CREATE_ROUTE = "/expert/create";
const REVIEWS_ROUTE = "/reviews";

const isProtectedRoute = createRouteMatcher([
  QUESTION_CREATE_ROUTE,
  EXPERT_CREATE_ROUTE,
  REVIEWS_ROUTE,
  "/question(.*)/edit",
  "/expert(.*)/edit",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)", // Run middleware on API routes
  ],
};
