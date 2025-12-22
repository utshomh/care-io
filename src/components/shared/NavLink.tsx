"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; children: React.ReactNode };

export default function NavLink({ href, children }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 ${
        pathname === href ? "bg-primary" : "bg-inherit"
      } hover:bg-primary/25`}
    >
      {children}
    </Link>
  );
}
