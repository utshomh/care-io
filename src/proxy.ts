import { getServerSession } from "next-auth";

export async function proxy(req: Request) {
  const session = await getServerSession();

  console.log(`session: ${JSON.stringify(session)}`);
}

export const config = {
  matcher: "/:path",
};
