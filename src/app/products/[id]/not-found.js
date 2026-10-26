import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-[#1D271F]">পণ্যটি খুঁজে পাওয়া যায়নি</h1>
      
      <Link href="/" className="mt-6 inline-flex font-semibold text-[#05893E] hover:underline">
        বাজারের সব পণ্য দেখুন
      </Link>
    </div>
  );
}
