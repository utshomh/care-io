"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/actions";
import FormField from "@/components/shared/FormField";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  contact: string;
  nid: string;
  image: FileList;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();

  const onSubmit = async (data: RegisterInput) => {
    await createUser(data);

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
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
        })}
        error={errors.email}
      />

      <FormField
        label="Contact Number"
        placeholder="017XXXXXXXX"
        registration={register("contact", { required: "Contact is required" })}
        error={errors.contact}
      />

      <FormField
        label="NID Number"
        placeholder="1234567890"
        registration={register("nid", { required: "NID is required" })}
        error={errors.nid}
      />

      <FormField
        label="Password"
        type="password"
        registration={register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
          validate: {
            hasUpper: (v) =>
              /[A-Z]/.test(v) || "Must include an uppercase letter",
            hasLower: (v) =>
              /[a-z]/.test(v) || "Must include a lowercase letter",
          },
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
        className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
