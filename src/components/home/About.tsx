import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Verified Professionals",
  "24/7 Support",
  "Flexible Scheduling",
  "Secure Payments",
];

export default function About() {
  return (
    <section className="bg-base-100">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="lg:w-1/2">
          <Image
            width={1080}
            height={720}
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80"
            alt="About Care.IO"
            className="rounded-xl"
          />
        </div>
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            Your Safety is Our Priority
          </h2>
          <p className="text-lg text-base-content/70">
            Care.IO was founded to bridge the gap between families and
            professional caregivers. We vet every provider to ensure your family
            receives the highest standard of care.
          </p>
          <ul className="space-y-3">
            {features.map((item) => (
              <li key={item} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-6 h-6 text-success" /> {item}
              </li>
            ))}
          </ul>
          <button className="btn btn-outline btn-primary">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
}
