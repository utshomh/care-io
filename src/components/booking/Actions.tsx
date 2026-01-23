"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Trash2, CreditCard, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import alert from "@/lib/alert";
import { deleteBooking } from "@/lib/actions";
import { Booking, Service } from "@prisma/client";

export default function Actions({
  booking,
}: {
  booking: Booking & { service: Service };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    await alert.confirm(
      "Are you sure?",
      "Once deleted, this action cannot be undone.",
      async () => {
        startTransition(async () => {
          try {
            await deleteBooking(booking.id);
            alert.success(
              "Deleted!",
              `Booking for ${booking.service.title} removed.`,
            );
            router.refresh();
          } catch (err) {
            alert.error("Error!", "Failed to delete booking.");
            console.error(err);
          }
        });
      },
    );
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="tooltip" data-tip="View Details">
        <Link
          href={`/services/${booking.service.id}`}
          className="btn btn-ghost btn-circle btn-sm hover:bg-base-300"
        >
          <Eye className="w-4 h-4 text-base-content/70" />
        </Link>
      </div>

      {booking.status === "PENDING" && (
        <div className="tooltip" data-tip="Pay Now">
          <Link
            href={booking.paymentUrl || "#"}
            className="btn btn-ghost btn-circle btn-sm text-info hover:bg-info/10"
          >
            <CreditCard className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="tooltip tooltip-error" data-tip="Delete Booking">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10 disabled:bg-transparent"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
