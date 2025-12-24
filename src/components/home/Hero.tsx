"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?q=80&w=1121&auto=format&fit=crop",
    title: "Reliable Care for Your Loved Ones",
    description:
      "Trusted babysitting, elderly care, and nursing services at your doorstep.",
  },
  {
    url: "https://images.unsplash.com/photo-1604599730009-fe273616197c?q=80&w=1170&auto=format&fit=crop",
    title: "Safe Hands for Your Children",
    description:
      "Verified and professional babysitters you can trust with your little ones.",
  },
  {
    url: "https://images.unsplash.com/photo-1765896387377-e293914d1e69?q=80&w=1121&auto=format&fit=crop",
    title: "Expert Support for Your Parents",
    description:
      "Compassionate elderly care tailored to provide comfort and dignity at home.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero bg-base-200 rounded-xl aspect-square md:aspect-video transition-all duration-1000 ease-in-out relative overflow-hidden"
      style={{
        backgroundImage: `url(${slides[currentIndex].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay rounded-xl" />

      {/* Content */}
      <div className="hero-content text-center text-neutral-content z-10">
        <div className="max-w-md space-y-6">
          <div className="flex justify-center">
            <HeartPulse className="w-24 h-24 md:w-36 md:h-36 text-primary animate-pulse" />
          </div>

          {/* Dynamic Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight flex items-center justify-center transition-all duration-500">
            {slides[currentIndex].title}
          </h1>

          {/* Dynamic Description */}
          <p className="text-sm md:text-base">
            {slides[currentIndex].description}
          </p>

          <Link href="#services" className="btn btn-lg btn-primary text-white">
            Get Started <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-8 bg-primary"
                : "w-2 bg-white/50 hover:bg-white"
            } cursor-pointer`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
