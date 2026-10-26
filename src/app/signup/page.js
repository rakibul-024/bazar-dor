import AuthForm from "../components/AuthForm";
import { getConfiguredOAuthProviders } from "../../lib/authProviders";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-4 py-10">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-[#1D271F]">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">নিবন্ধন করে বাজারের বিস্তারিত দাম দেখুন।</p>
      </header>
      <section className="w-full rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 shadow-sm sm:p-6">
        <AuthForm mode="signup" providers={getConfiguredOAuthProviders()} />
      </section>
    </main>
  );
}
