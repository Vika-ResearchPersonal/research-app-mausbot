import { NextResponse, type NextRequest } from "next/server";
import { isLmsEnabled, isLmsPath } from "@/lms/flag";

// With LMS_ENABLED off, every LMS page and API answers 404.
export function proxy(request: NextRequest) {
  if (isLmsPath(request.nextUrl.pathname) && !isLmsEnabled()) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/learn/:path*", "/teach/:path*", "/admin/lms/:path*", "/api/lms/:path*", "/api/webhooks/:path*"],
};
