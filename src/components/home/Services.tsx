import { getServices } from "@/lib/actions";
import Link from "next/link";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="py-12 bg-base-200 rounded-xl">
      <div className="px-4 space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-base-content">
            Our Specialized Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Providing professional and compassionate care tailored to your
            family&apos;s unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="group card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Section */}
              <figure className="relative h-56 overflow-hidden">
                <Image
                  width={1080}
                  height={720}
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <div className="badge badge-primary gap-2 p-4 shadow-lg">
                    {s.unitType === "DAILY" ? (
                      <CalendarDays className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                    <span className="font-semibold uppercase text-xs tracking-widest">
                      {s.unitType}
                    </span>
                  </div>
                </div>
              </figure>

              {/* Content Section */}
              <div className="card-body">
                <h3 className="card-title text-xl font-bold min-h-16">
                  {s.title}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ${s.priceRate} / {s.unitType.toUpperCase()}
                </p>
                <p className="text-base-content/70 text-sm line-clamp-2 mb-4">
                  {s.description}
                </p>

                <div className="card-actions justify-end mt-auto pt-4 border-t border-base-200">
                  <Link
                    href={`/services/${s.id}`}
                    className="btn btn-primary btn-block group-hover:gap-4 transition-all"
                  >
                    View Details
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
