import Image from "next/image";
import { CheckCircle2, Heart, ShieldCheck, Users } from "lucide-react";
import Page from "@/components/layout/Page";

export const metadata = {
  title: "About Us | Care.IO",
  description:
    "Learn about our mission to provide safe, professional, and compassionate care for families.",
};

const features = [
  "Verified Professionals",
  "24/7 Support",
  "Flexible Scheduling",
  "Secure Payments",
];

const stats = [
  { label: "Caregivers", value: "500+", icon: Users },
  { label: "Families Served", value: "2,000+", icon: Heart },
  { label: "Safety Rating", value: "99.9%", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <Page className="space-y-6">
      {/* Hero Section */}
      <section className="bg-primary text-primary-content py-16 px-6 rounded-xl">
        <div className="container mx-auto text-center space-y-4">
          <h1 className="text-5xl font-extrabold">Our Mission is Care</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Dedicated to improving lives through compassionate service and
            innovative caregiving solutions since 2020.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Image Container */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <Image
              width={1080}
              height={720}
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80"
              alt="About Care.IO"
              className="rounded-xl object-cover bg-base-200"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-3">
            <h2 className="text-4xl font-bold text-base-content leading-tight">
              Your Safety is <span className="text-primary">Our Priority</span>
            </h2>
            <p className="text-lg text-base-content/70 leading-relaxed">
              Care.IO was founded to bridge the gap between families and
              professional caregivers. We understand that inviting someone into
              your home requires immense trust. That&apos;s why we vet every
              provider to ensure your family receives the highest standard of
              care.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-6 h-6 text-success group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-base-content/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-lg px-8">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-200 py-16 px-6 rounded-xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-sm p-8 text-center space-y-3"
              >
                <div className="flex justify-center">
                  <stat.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-4xl font-black">{stat.value}</div>
                <div className="text-base-content/60 uppercase tracking-widest text-sm font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Why Families Trust Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="text-4xl">🤝</div>
            <h3 className="text-xl font-bold">Integrity</h3>
            <p className="text-base-content/70">
              We operate with transparency and honesty in every interaction.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🌟</div>
            <h3 className="text-xl font-bold">Excellence</h3>
            <p className="text-base-content/70">
              We strive for the highest quality of professional healthcare.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🏠</div>
            <h3 className="text-xl font-bold">Community</h3>
            <p className="text-base-content/70">
              Building strong bonds between caregivers and local families.
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
