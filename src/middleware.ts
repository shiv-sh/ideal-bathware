export { auth as middleware } from "@/lib/auth";

export const config = {
  // Protect all /admin routes except /admin/login
  matcher: ["/admin/((?!login$).*)"],
};
