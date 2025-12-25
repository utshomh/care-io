"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu, HeartHandshake, HelpCircle, Phone } from "lucide-react";

import Logo from "@/components/shared/Logo";
import NavLink from "@/components/shared/NavLink";
import ThemeToggle from "@/components/theme/ThemToggle";

const links = (
  <>
    <li>
      <NavLink href="/services">
        <HeartHandshake className="h-4 w-4" />
        Services
      </NavLink>
    </li>
    <li>
      <NavLink href="/about">
        <HelpCircle className="h-4 w-4" />
        About Us
      </NavLink>
    </li>
    <li>
      <NavLink href="/contact">
        <Phone className="h-4 w-4" />
        Contact
      </NavLink>
    </li>
  </>
);

export default function Header() {
  const { status, data } = useSession();

  return (
    <div className="navbar backdrop-blur border-b border-base-300 sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Logo />
      </div>

      {/* Desktop Menu (Centered) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        <ThemeToggle />
        {status === "authenticated" ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar rounded-full border-3 border-primary/50 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  src={data.user!.image!}
                  alt="user avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-200 rounded-xl z-1 w-52 gap-2"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-primary btn-outline">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary rounded-xl">
              Get Care
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
