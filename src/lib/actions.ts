"use server";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { Booking, Service, ServiceUnit, User } from "@prisma/client";

import prisma from "@/lib/prisma";
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
  return booking;
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
