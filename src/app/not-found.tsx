"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, ArrowLeft } from "lucide-react";
import Page from "@/components/layout/Page";

export default function NotFound() {
  const router = useRouter();

  return (
    <Page centered>
      <div className="text-center space-y-4">
        <div className="relative inline-block animate-float-glow">
          <div className="absolute inset-0 bg-error/75 blur-2xl rounded-full animate-pulse" />
          <FileQuestion className="w-24 h-24 text-error relative z-10" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold">Page Not Found</h2>
          <p className="text-base-content/60 max-w-sm mx-auto">
            The link you followed might be broken,
            <br />
            or the page may have been removed.
          </p>
        </div>

        <div className="mx-auto max-w-sm grid grid-cols-1 md:grid-cols-2 gap-2">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <button
            onClick={() => router.back()}
            className="btn btn-primary btn-outline gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </Page>
  );
}
