import Link from "next/link";
import { AlertCircle } from "lucide-react";
import Page from "@/components/layout/Page";

export default function NotFound() {
  return (
    <Page centered>
      <AlertCircle className="w-32 h-32 text-error animate-bounce mx-auto" />

      <div className="text-center space-y-4">
        <h1 className="text-9xl font-bold">404</h1>

        <h2 className="text-2xl md:text-4xl font-semibold">
          Oops! Page not found
        </h2>

        <p className="text-base-content/70">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link href="/" className="btn btn-lg btn-error">
          Go Back Home
        </Link>
      </div>
    </Page>
  );
}
