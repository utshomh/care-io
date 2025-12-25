import { Metadata } from "next";

import { getServiceById } from "@/lib/actions";
import Page from "@/components/layout/Page";
import NotFound from "@/components/service/NotFound";
import BookingForm from "@/components/booking/BookingForm";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);
  return {
    title: `${service?.title || "Booking"} | Care.IO`,
    description: service?.description.slice(0, 160),
  };
}

export default async function BookingPage({
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
    <Page centered className="mx-auto w-full max-w-md">
      <BookingForm service={service} />
    </Page>
  );
}
