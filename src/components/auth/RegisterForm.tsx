"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { createUser } from "@/lib/actions";
import FormField from "@/components/shared/FormField";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    const user = await createUser(formData);

    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-body bg-base-200 w-full space-y-2"
    >
      <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>

      <FormField
        label="Full Name"
        placeholder="Jane Doe"
        registration={register("name", { required: "Name is required" })}
        error={errors.name}
      />

      <FormField
        label="Email"
        type="email"
        placeholder="jane@example.com"
        registration={register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        error={errors.email}
      />

      <FormField
        label="Password"
        type="password"
        registration={register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
        })}
        error={errors.password}
      />

      <FormField
        label="Profile Image"
        type="file"
        className="px-0 file-input w-full"
        accept="image/*"
        registration={register("image", {
          required: "Image is required",
        })}
        error={errors.image}
      />

      <button
        disabled={isSubmitting}
        className={`btn btn-primary w-full ${
          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isSubmitting ? "Registering" : " Register"}
      </button>
    </form>
  );
}
