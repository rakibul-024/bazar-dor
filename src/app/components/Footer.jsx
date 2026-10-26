import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E5EBE5] bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-center text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm">
        <p>
          <Link href="/" className="font-semibold text-[#1D271F] hover:text-[#05893E]">
            বাজার দর
          </Link>{" "}
          — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
