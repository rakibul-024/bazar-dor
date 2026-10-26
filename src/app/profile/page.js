import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileActions from "./profile-actions";
import { getAuth } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin?callbackURL=%2Fprofile&toast=auth-required");

  const { user } = session;

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#05893E]">অ্যাকাউন্ট</p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#1D271F]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E5EBE5] bg-[#E1F1E7] text-2xl font-bold text-[#05893E]">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={64}
              height={64}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            user.name?.trim().charAt(0)?.toUpperCase() ?? "👤"
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-bold text-[#1D271F]">{user.name}</h2>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
        </div>
        <ProfileActions />
      </section>

      <section className="rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-[#1D271F]">তথ্য</h2>
        <dl className="space-y-3 text-sm">
          <div className="grid grid-cols-[5rem_1fr] gap-3">
            <dt className="text-gray-500">নাম</dt>
            <dd className="font-medium text-[#1D271F]">{user.name}</dd>
          </div>
          <div className="grid grid-cols-[5rem_1fr] gap-3">
            <dt className="text-gray-500">ইমেইল</dt>
            <dd className="break-all font-medium text-[#1D271F]">{user.email}</dd>
          </div>
        </dl>
        <Link
          href="/profile/update"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047735] sm:w-auto"
        >
          তথ্য আপডেট করুন
        </Link>
      </section>
    </main>
  );
}
