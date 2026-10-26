import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "../../../lib/auth";
import UpdateProfileForm from "./update-profile-form";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin?callbackURL=%2Fprofile%2Fupdate");

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-[#05893E]">আমার প্রোফাইল</p>
      <h1 className="mt-1 text-2xl font-extrabold text-[#1D271F]">তথ্য আপডেট</h1>
      <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p>

      <section className="mt-6 rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-[#1D271F]">তথ্য</h2>
        <UpdateProfileForm name={session.user.name ?? ""} />
      </section>
    </main>
  );
}
