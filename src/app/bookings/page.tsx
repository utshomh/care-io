import Image from "next/image";
import { BookingStatus } from "@prisma/client";

import { getBookingsByCurrentUser } from "@/lib/actions";
import Page from "@/components/layout/Page";
import Actions from "@/components/booking/Actions";

export const metadata = {
  title: "My Bookings | ServicePort",
  description:
    "View and manage your service appointments, track status, and view booking history.",
};

const getStatusBadge = (status: BookingStatus) => {
  const classes = {
    PENDING: "badge-warning",
    CONFIRMED: "badge-info",
    COMPLETED: "badge-success",
    CANCELLED: "badge-error",
  };
  return `badge ${classes[status] || "badge-ghost"} font-semibold text-xs`;
};

export default async function MyBookingsPage() {
  const bookings = await getBookingsByCurrentUser();

  return (
    <Page>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-base-content/70">
              Manage your scheduled services and history.
            </p>
          </div>

          {/* Status Tabs/Filter */}
          <div className="tabs tabs-boxed bg-base-100 p-1">
            <button className="tab tab-active">All</button>
            <button className="tab">Active</button>
            <button className="tab">Completed</button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-base-300">
          <table className="table table-lg w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="font-bold text-sm">Service Details</th>
                <th className="font-bold text-sm">Location</th>
                <th className="font-bold text-sm">Duration</th>
                <th className="font-bold text-sm">Amount</th>
                <th className="font-bold text-sm">Status</th>
                <th className="font-bold text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask w-14 h-14 rounded-xl">
                          <Image
                            width={1080}
                            height={720}
                            src={booking.service.image}
                            alt={booking.service.title}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {booking.service.title}
                        </div>
                        <div className="text-xs font-mono opacity-50 uppercase">
                          {booking.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium">
                      {booking.district}, {booking.region}
                    </div>
                    <div className="text-xs opacity-60 truncate max-w-37.5">
                      {booking.address}
                    </div>
                  </td>
                  <td>
                    <span className="font-medium">{booking.duration}</span>
                    <span className="text-xs opacity-60 ml-1 italic">
                      {booking.unitUsed.toLowerCase()}s
                    </span>
                  </td>
                  <td className="font-bold text-primary">
                    ${booking.totalCost.toFixed(2)}
                  </td>
                  <td>
                    <div className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </div>
                  </td>
                  <td className="text-center">
                    <Actions booking={booking} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="card bg-base-100 shadow-sm border border-base-300"
            >
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          width={1080}
                          height={720}
                          src={booking.service.image}
                          alt={booking.service.title}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{booking.service.title}</h3>
                      <p className="text-xs opacity-50">
                        {new Date(booking.createdAt).toISOString()}
                      </p>
                    </div>
                  </div>
                  <div className={getStatusBadge(booking.status)}>
                    {booking.status}
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-base-content/60">Location:</span>
                  <span className="text-right font-medium">
                    {booking.district}
                  </span>
                  <span className="text-base-content/60">Duration:</span>
                  <span className="text-right font-medium">
                    {booking.duration} {booking.unitUsed.toLowerCase()}s
                  </span>
                  <span className="text-base-content/60 italic font-bold">
                    Total:
                  </span>
                  <span className="text-right font-black text-primary">
                    ${booking.totalCost.toFixed(2)}
                  </span>
                </div>

                <button className="btn btn-block btn-outline btn-sm mt-4">
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
