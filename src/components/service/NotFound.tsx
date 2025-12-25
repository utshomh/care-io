import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

import Page from "@/components/layout/Page";

export default function NotFound() {
  return (
    <Page centered className="mx-auto max-w-md w-full text-center space-y-6">
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-error/10 blur-3xl rounded-full scale-150" />
        <div className="relative bg-base-100 p-6 rounded-full border-2 border-dashed border-error/30 animate-pulse">
          <SearchX className="w-20 h-20 text-error/70" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Service Missing</h1>
        <p className="text-base-content/70">
          We couldn&apos;t find the specific care service you&apos;re looking
          for. It might have been moved or is currently unavailable.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mx-auto max-w-sm grid grid-cols-2 gap-2">
        <Link href="/" className="btn btn-primary btn-outline gap-2">
          <Home className="w-5 h-5" />
          Home
        </Link>
        <Link href="/services" className="btn btn-primary gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Services
        </Link>
      </div>
    </Page>
  );
}
