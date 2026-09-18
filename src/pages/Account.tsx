import { useEffect, useState } from "react";

import { getCurrentUser } from "../api/auth";
import type { CurrentUser } from "../api/auth";

function Account() {
  const [user, setUser] = useState<CurrentUser | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null,
  );


  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load account information.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);


  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  }


  if (loading) {
    return (
      <section className="px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Account
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your account information and profile.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="animate-pulse space-y-5">
              <div className="h-5 w-32 rounded bg-slate-200" />

              <div className="h-12 w-full rounded-lg bg-slate-100" />

              <div className="h-12 w-full rounded-lg bg-slate-100" />

              <div className="h-12 w-full rounded-lg bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }


  if (error || !user) {
    return (
      <section className="px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Account
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account information and profile.
          </p>

          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-sm font-semibold text-red-800">
              Unable to load account
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error ?? "Account information is unavailable."}
            </p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Account
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account information and profile.
          </p>
        </div>


        {/* Profile */}
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current profile information.
            </p>
          </div>


          <div className="divide-y divide-slate-100">

            {/* Name */}
            <div className="px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-1.5 text-sm font-medium text-slate-900">
                {user.name}
              </p>
            </div>


            {/* Email */}
            <div className="px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1.5 break-all text-sm font-medium text-slate-900">
                {user.email}
              </p>
            </div>


            {/* Role */}
            <div className="px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
                {user.role}
              </span>
            </div>

          </div>
        </div>


        {/* Account Information */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Information associated with your account.
            </p>
          </div>


          <div className="divide-y divide-slate-100">

            {/* Account ID */}
            <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Account ID
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Unique identifier for your account.
                </p>
              </div>

              <p className="text-sm font-medium text-slate-900">
                #{user.id}
              </p>
            </div>


            {/* Status */}
            <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Account Status
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Current account availability.
                </p>
              </div>

              <span
                className={
                  user.is_active
                    ? "inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                    : "inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
                }
              >
                <span
                  className={
                    user.is_active
                      ? "h-1.5 w-1.5 rounded-full bg-emerald-500"
                      : "h-1.5 w-1.5 rounded-full bg-red-500"
                  }
                />

                {user.is_active
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>


            {/* Created At */}
            <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Joined
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Account creation date.
                </p>
              </div>

              <p className="text-sm text-slate-600">
                {formatDate(user.created_at)}
              </p>
            </div>


            {/* Updated At */}
            <div className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Last Updated
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Last account information update.
                </p>
              </div>

              <p className="text-sm text-slate-600">
                {formatDate(user.updated_at)}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


export default Account;