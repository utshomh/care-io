"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import alert from "@/lib/alert";
import FormField from "@/components/shared/FormField";

export interface LoginInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    try {
      const { email, password } = data;
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profile",
      });
      alert.success("Logged in!", "You have successfully Logged in.");
    } catch (err) {
      alert.error(
        "Login Failed!",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-body bg-base-200 w-full space-y-2"
    >
      <h2 className="text-2xl font-bold tracking-tight">Welcome Back!</h2>

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

      <button
        disabled={isSubmitting}
        className={`btn btn-primary w-full ${
          isSubmitting ? "loading loading-bars" : ""
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
