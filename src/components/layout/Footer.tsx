"use client";

import Logo from "@/components/shared/Logo";

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-300 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="text-center text-sm text-base-content/70 md:text-right space-y-1">
          <p>&copy; {new Date().getFullYear()} CareIO</p>
          <p>Created and Maintained by Utsho MH</p>
        </div>
      </div>
    </footer>
  );
}
