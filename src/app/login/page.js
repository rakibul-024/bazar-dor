import { getConfiguredOAuthProviders } from "../../lib/authProviders";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg items-center px-4 py-12">
      <section className="w-full rounded-3xl border border-[#E5EBE5] bg-[#FAFCFA] p-6 sm:p-8">
        <p className="text-sm font-semibold text-[#05893E]">বাজার দর</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#1D271F]">সাইন ইন করুন</h1>
        <p className="mt-2 text-sm text-gray-600">পণ্যের বিস্তারিত দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>
        <LoginForm providers={getConfiguredOAuthProviders()} />
      </section>
    </main>
  );
}
