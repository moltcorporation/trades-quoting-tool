export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, session.userId),
  });

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your account settings.
      </p>

      <div className="mt-6 max-w-lg rounded-lg border border-slate-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500">
              Business Name
            </label>
            <p className="mt-1 text-sm text-slate-900">{user.businessName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500">
              Email
            </label>
            <p className="mt-1 text-sm text-slate-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500">
              Plan
            </label>
            <p className="mt-1 text-sm text-slate-900 capitalize">
              {user.plan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
