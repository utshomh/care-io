import { Loader2 } from "lucide-react";
import Page from "@/components/layout/Page";

export default function Loading() {
  return (
    <Page centered>
      <div role="status" aria-live="polite" className="space-y-6">
        <Loader2 className="mx-auto w-24 h-24 text-primary stroke-2 animate-spin" />

        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loading...
          </h2>
          <p className="text-base-content/60 text-lg">
            Please wait while we fetch your content.
          </p>
        </div>
      </div>
    </Page>
  );
}
