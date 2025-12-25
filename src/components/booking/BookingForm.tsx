"use client";

import { useForm, useWatch } from "react-hook-form";
import { CircleDollarSign } from "lucide-react";
import { Service } from "@prisma/client";

import alert from "@/lib/alert";
import { coverageArea } from "@/data/area";
import { createBooking } from "@/lib/actions";
import FormField from "@/components/shared/FormField";
import Select from "@/components/shared/Select";
import { useSession } from "next-auth/react";

export interface BookingInput {
  duration: number;
  region: string;
  district: string;
  address: string;
}

export default function BookingForm({ service }: { service: Service }) {
  const session = useSession();

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({ defaultValues: { duration: 0 } });

  const regions = [...new Set(coverageArea.map((a) => a.region))];
  const duration = useWatch({ name: "duration", control });
  const region = useWatch({ name: "region", control });
  const serviceUnit = service.unitType === "DAILY" ? "day" : "hour";

  const getDistrictsByRegion = () =>
    coverageArea.filter((a) => a.region === region).map((a) => a.district);

  const getTotalCost = () => service.priceRate * duration;

  const onSubmit = async (data: BookingInput) => {
    try {
      await alert.confirm(
        "Are you sure?",
        `Your total cost will be - ৳${getTotalCost()}.`,
        async () => {
          await createBooking({
            ...data,
            unitUsed: service.unitType,
            totalCost: getTotalCost(),
            serviceId: service.id,
            userId: session!.data!.user.id,
          });
          alert.success(
            "Booked!",
            `Successfully booked '${service.title}' for ${data.duration} ${serviceUnit}s.`
          );
          reset();
        }
      );
    } catch (err) {
      alert.error(
        "Booking Failed!",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card card-body bg-base-200 w-full space-y-2"
    >
      <h2 className="text-2xl text-center font-bold tracking-tight">
        Booking for
        <br />
        <span className="text-primary">{service.title}</span>
      </h2>

      <FormField
        label={`Duration (${serviceUnit}s)`}
        placeholder="How long you wanna use the service"
        registration={register("duration", {
          valueAsNumber: true,
          required: "Duration is required",
          min: { value: 1, message: "Duration cannot be less than 1" },
        })}
        error={errors.duration}
      />

      <Select
        label="Select your Region"
        registration={register("region", {
          required: "Region is required",
        })}
        options={regions}
        defaultValue="Select a Region"
        error={errors.region}
      />

      <Select
        label="Select your District"
        registration={register("district", {
          required: "District is required",
        })}
        options={getDistrictsByRegion()}
        defaultValue="Select a District"
        error={errors.district}
      />

      <FormField
        label="Address"
        placeholder="Your detailed address"
        registration={register("address", {
          required: "Address is required",
        })}
        error={errors.address}
      />

      <div className="bg-primary/10 border border-primary/25 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-content p-2 rounded-full">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-base-content/60 uppercase tracking-wider">
              Total Estimated Cost
            </p>
            <p className="text-3xl font-black text-primary">
              ৳{getTotalCost()}
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="badge badge-ghost font-mono">
            {duration} {serviceUnit}(s)
          </span>
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className={`btn btn-primary w-full ${
          isSubmitting ? "loading loading-bars" : ""
        }`}
      >
        {isSubmitting ? "Booking..." : "Book Service"}
      </button>
    </form>
  );
}
