import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-primary text-primary-content grid place-items-center">
        <HeartHandshake className="h-5 w-5" />
      </div>
      <span className="text-2xl font-semibold tracking-tight">
        Care<span className="text-primary italic">IO</span>
      </span>
    </Link>
  );
}
