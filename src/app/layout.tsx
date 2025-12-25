import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";

import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";

const anek = Anek_Bangla({
  variable: "--font-anek",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care IO",
  description: "Baby Sitting and Elderly Care Service Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${anek.variable} antialiased min-h-screen w-full max-w-7xl mx-auto flex flex-col justify-between gap-6`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
