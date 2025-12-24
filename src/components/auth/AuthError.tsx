"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const error = searchParams.get("error");
  const [isVisible, setIsVisible] = useState(!!error);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (error) setIsVisible(true);
  }, [error]);

  const handleClose = () => {
    setIsVisible(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!error || !isVisible) return null;

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    UnauthorizedAccess: "You do not have permission to access this page.",
    AuthenticationRequired: "Please sign in to access this page.",
    Default: "An unexpected error occurred.",
  };

  const message = errorMessages[error] || errorMessages.Default;

  return (
    <div className="mb-6 alert alert-error flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="close error"
      >
        <X className="w-5" />
      </button>
    </div>
  );
}
