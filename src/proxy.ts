import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

interface AuthorizedPath {
  pathname: string;
  role: Role;
}

const authorizedPaths: AuthorizedPath[] = [
  { pathname: "/dashboard", role: "ADMIN" },
];

export async function proxy(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const { pathname } = req.nextUrl;

  const requiredRoleForPath = authorizedPaths.find((path) =>
    pathname.startsWith(path.pathname)
  );

  if (requiredRoleForPath) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?error=AuthenticationRequired`, req.url)
      );
    }

    if (session.user.role !== requiredRoleForPath.role) {
      return NextResponse.redirect(
        new URL(`/login?error=UnauthorizedAccess`, req.url)
      );
    }
  }
}

export const config = {
  matcher: "/:path",
};
