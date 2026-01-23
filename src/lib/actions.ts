"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { Booking, Service, ServiceUnit, User } from "@prisma/client";

import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import uploadImage from "@/lib/utils/uploadImage";
import { RegisterInput } from "@/components/auth/RegisterForm";
import { BookingInput } from "@/components/booking/BookingForm";
import { authOptions } from "@/lib/auth";

export async function createUser({
  name,
  email,
  contact,
  nid,
  password: rawPassword,
  image: imageFiles,
}: RegisterInput): Promise<User> {
  const image = await uploadImage(imageFiles[0]);
  const password = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      contact,
      nid,
      password,
      image,
    },
  });

  return JSON.parse(JSON.stringify(user));
}

export async function createBooking({
  duration,
  region,
  district,
  address,
  unitUsed,
  totalCost,
  serviceId,
  userId,
}: BookingInput & {
  unitUsed: ServiceUnit;
  totalCost: number;
  userId: string;
  serviceId: string;
}): Promise<Booking> {
  const booking = await prisma.booking.create({
    data: {
      duration,
      region,
      district,
      address,
      unitUsed,
      totalCost,
      userId,
      serviceId,
    },
  });
  const service = await prisma.service.findFirstOrThrow({
    where: { id: booking.serviceId },
  });
  const customer = await prisma.user.findFirstOrThrow({
    where: { id: booking.userId },
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: service.priceRate,
          product_data: {
            name: service.title,
            images: [service.image],
            description: `Ordered from CareIO`,
          },
        },
        quantity: booking.totalCost / service.priceRate,
      },
    ],
    mode: "payment",
    metadata: {
      bookingId: booking.id,
    },
    customer_email: customer.email,
    success_url: `${process.env.APP_URL!}/api/payment?session={CHECKOUT_SESSION_ID}&booking=${booking.id}`,
    cancel_url: `${process.env.APP_URL!}/bookings`,
    payment_intent_data: {
      description: "Order from CareIO",
    },
  });
  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: { paymentUrl: session.url },
  });
  return updatedBooking;
}

export async function getServices(): Promise<Array<Service>> {
  const services = await prisma.service.findMany({});
  return services;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const service = await prisma.service.findFirst({ where: { id } });
  return service;
}

export async function getBookingsByCurrentUser(): Promise<
  Array<Booking & { service: Service }>
> {
  const session = await getServerSession(authOptions);
  const bookings = await prisma.booking.findMany({
    where: { userId: session!.user.id },
    include: { service: {} },
  });
  return bookings;
}

export async function deleteBooking(id: string): Promise<void> {
  await prisma.booking.delete({ where: { id } });
}

export async function getCurrentUser(): Promise<
  User & {
    _count: {
      bookings: number;
    };
  }
> {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirstOrThrow({
    where: { id: session!.user.id },
    include: { _count: { select: { bookings: {} } } },
  });
  return user;
}
