import { NextRequest, NextResponse } from "next/server";
import { getSubdomainPaths } from "./lib/site-db";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    //'/((?!api|_next/static|_next/image|favicon.ico).*)',
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  console.log("---middleware---");
  console.log(hostname);

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.multi-tenant-next-sage.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");

  console.log(currentHost);

  const subDomains = await getSubdomainPaths();
  const pathNameStart = url.pathname.split("/")[0];

  // Prevent security issues – users should not be able to canonically access
  if (subDomains.includes(pathNameStart)) {
    url.pathname = `/404`;
  } else {
    url.pathname = `/${currentHost}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
