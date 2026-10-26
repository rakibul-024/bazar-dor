import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-6xl" aria-hidden="true">🔎</span>
      <p className="mt-5 text-sm font-bold tracking-widest text-[#05893E]">৪০৪</p>
      <h1 className="mt-2 text-2xl font-extrabold text-[#1D271F] sm:text-3xl">
        দুঃখিত, পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
