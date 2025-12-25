import Link from "next/link";
import Image from "next/image";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";

import { getServices } from "@/lib/actions";
import Page from "@/components/layout/Page";

export const metadata = {
  title: "Our Services | Care Connect",
  description:
    "Explore our specialized care services tailored to your family's needs.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Page>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content tracking-tight">
            Our Specialized Services
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Providing professional and compassionate care tailored to your
            family&apos;s unique needs. We offer flexible scheduling and expert
            support.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </header>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="group card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <figure className="relative h-64 w-full">
                <Image
                  fill
                  src={s.image}
                  alt={s.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10">
                  <div className="badge badge-primary gap-2 p-4 shadow-md border-none">
                    {s.unitType === "DAILY" ? (
                      <CalendarDays className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    <span className="font-bold uppercase text-[10px] tracking-widest">
                      {s.unitType}
                    </span>
                  </div>
                </div>
              </figure>

              {/* Content Section */}
              <div className="card-body p-6">
                <h2 className="card-title text-2xl font-bold mb-1">
                  {s.title}
                </h2>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-black text-primary">
                    ${s.priceRate}
                  </span>
                  <span className="text-base-content/50 font-medium">
                    / {s.unitType.toLowerCase()}
                  </span>
                </div>

                <p className="text-base-content/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {s.description}
                </p>

                <div className="card-actions mt-auto">
                  <Link
                    href={`/services/${s.id}`}
                    className="btn btn-primary btn-block flex items-center justify-center gap-2 group/btn"
                  >
                    View Service Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Empty State (If no services found) */}
        {services.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold">
              No services available at the moment.
            </h3>
            <p className="text-base-content/60">
              Please check back later or contact support.
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}
