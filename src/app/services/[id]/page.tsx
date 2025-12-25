import {
  Clock,
  CalendarDays,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

import Page from "@/components/layout/Page";
import { getServiceById } from "@/lib/actions";
import NotFound from "@/components/service/NotFound";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);
  return {
    title: `${service?.title || "Service"} | Care.IO`,
    description: service?.description.slice(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    return <NotFound />;
  }

  return (
    <Page className="flex flex-col lg:flex-row gap-6">
      {/* Left Side: Image & Description */}
      <div className="lg:w-2/3 space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            width={1080}
            height={720}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="badge badge-primary p-4 text-white font-bold shadow-md">
              {service.unitType} BASIS
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold">{service.title}</h1>
        <p className="text-lg text-base-content/70 leading-relaxed">
          {service.description}
        </p>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Certified Professionals",
            "Strict Safety Protocols",
            "Personalized Care Plan",
            "24/7 Support Line",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 p-4 bg-base-200 rounded-xl"
            >
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Booking Card */}
      <div className="lg:w-1/3">
        <div className="card border border-base-200 sticky top-0">
          <div className="card-body gap-4">
            <h2 className="card-title text-2xl">Pricing Overview</h2>

            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
              <div>
                <p className="text-sm text-base-content/70">Service Charge</p>
                <p className="text-3xl font-bold text-primary">
                  ${service.priceRate}
                </p>
              </div>
              <div className="text-right">
                {service.unitType === "HOURLY" ? (
                  <Clock className="w-6 h-6 text-primary inline" />
                ) : (
                  <CalendarDays className="w-6 h-6 text-primary inline" />
                )}
                <p className="text-xs font-bold uppercase mt-1">
                  Per {service.unitType}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-info shrink-0" size={20} />
                <p className="text-sm">
                  Verified caregiver assignment within 24 hours.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-info shrink-0" size={20} />
                <p className="text-sm">
                  No hidden charges or registration fees.
                </p>
              </div>
            </div>

            {/* Requirement: Book Service button navigates to Booking Page */}
            <Link
              href={`/booking/${service.id}`}
              className="btn btn-primary btn-lg w-full group"
            >
              Book Service
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-center text-xs text-base-content/50">
              Secure checkout powered by Care.IO
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
