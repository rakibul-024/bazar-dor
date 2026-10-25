import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#FAFCFA] border border-[#E5EBE5] rounded-3xl p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
          
          <div className="w-full lg:max-w-xl flex flex-col items-start text-left">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E1F1E7] text-[#05893E] mb-5">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D271F] tracking-tight leading-tight mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#05893E] hover:bg-[#047735] rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="w-full lg:w-auto flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের ঝুড়ি"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;