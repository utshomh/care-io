import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authorizedPaths = ["/dashboard"];

export async function proxy(req: NextRequest) {
  const session = await getServerSession();

  const { pathname } = req.nextUrl;

  const isAuthorizedPath = authorizedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isAuthorizedPath && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/:path",
};
