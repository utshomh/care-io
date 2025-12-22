"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!theme) return <div className="btn btn-ghost w-12 opacity-0" />;

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-ghost swap swap-rotate ${
        theme === "dark" ? "swap-active" : ""
      }`}
      aria-label="Toggle theme"
    >
      <Sun className="swap-off h-5 w-5" />
      <Moon className="swap-on h-5 w-5" />
    </button>
  );
}
