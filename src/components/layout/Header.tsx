"use client";

import Link from "next/link";
import { Menu, HeartHandshake, Users, HelpCircle, Phone } from "lucide-react";
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
      <NavLink href="/caretakers">
        <Users className="h-4 w-4" />
        Caretakers
      </NavLink>
    </li>
    <li>
      <NavLink href="/how-it-works">
        <HelpCircle className="h-4 w-4" />
        How it works
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
        <Link href="/login" className="btn btn-primary btn-outline">
          Login
        </Link>
        <Link href="/register" className="btn btn-primary rounded-xl">
          Get Care
        </Link>
      </div>
    </div>
  );
}
