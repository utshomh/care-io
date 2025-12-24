"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import uploadImage from "@/lib/utils/uploadImage";
import { RegisterInput } from "@/components/auth/RegisterForm";

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
