import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const session = searchParams.get("session");
  const booking = searchParams.get("booking");

  if (!session || !booking) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const retrievedSession = await stripe.checkout.sessions.retrieve(session);

    if (retrievedSession.payment_status === "paid") {
      await prisma.booking.update({
        where: { id: booking },
        data: { status: "CONFIRMED" },
      });
    }

    return NextResponse.redirect(new URL("/bookings", request.url));
  } catch (error) {
    console.error("Stripe verification failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
