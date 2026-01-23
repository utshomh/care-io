import Image from "next/image";
import {
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  Settings,
} from "lucide-react";

import { getCurrentUser } from "@/lib/actions";
import Page from "@/components/layout/Page";

export const metadata = {
  title: "My Profile | ServicePort",
  description:
    "View and manage your personal information and account settings.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <Page>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="avatar">
            <div className="w-32 h-32 mask mask-circle ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                width={500}
                height={500}
                src={user.image}
                alt={user.name}
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
              <div className="badge badge-primary font-semibold">
                {user.role}
              </div>
            </div>
            <p className="text-base-content/70 flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4" />
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="space-y-2">
              <div className="stat-desc font-medium text-success">
                Active member
              </div>
              <button className="btn btn-sm btn-outline gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stats shadow bg-base-100 border border-base-300">
            <div className="stat">
              <div className="stat-title text-sm uppercase font-bold">
                Total Bookings
              </div>
              <div className="stat-value text-primary">
                {user._count.bookings}
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Details */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body gap-6">
              <h2 className="card-title text-xl flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-primary" />
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-base-200 rounded-lg text-base-content/60">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Email Address
                    </p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-base-200 rounded-lg text-base-content/60">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      Contact Number
                    </p>
                    <p className="font-medium">{user.contact}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-base-200 rounded-lg text-base-content/60">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-base-content/50 uppercase">
                      National ID (NID)
                    </p>
                    <p className="font-medium tracking-widest">{user.nid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity/Security Placeholder */}
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body gap-6">
              <h2 className="card-title text-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Default Service Area
              </h2>
              <div className="flex flex-col items-center justify-center text-center space-y-3 opacity-60 italic">
                <div className="p-4 bg-base-200 rounded-full">
                  <MapPin className="w-8 h-8" />
                </div>
                <p>
                  Location preferences are calculated based on your recent
                  bookings.
                </p>
                <button className="btn btn-ghost btn-sm underline">
                  Update Address Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
