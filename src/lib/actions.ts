"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import uploadImage from "@/lib/utils/uploadImage";

export async function createUser(formData: FormData): Promise<User> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const rawPassword = formData.get("password") as string;
  const imageFile = formData.get("image") as File;

  const image = await uploadImage(imageFile);
  const password = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      image,
    },
  });

  return JSON.parse(JSON.stringify(user));
}
