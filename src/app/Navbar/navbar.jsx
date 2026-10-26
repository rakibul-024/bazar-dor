"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const categories = [
  { id: "chal", name: "চাল", icon: "🍚" },
  { id: "dal", name: "ডাল", icon: "🫘" },
  { id: "tel", name: "তেল", icon: "🥫" },
  { id: "sobji", name: "সবজি", icon: "🥬" },
  { id: "mach", name: "মাছ", icon: "🐟" },
  { id: "mangsho", name: "মাংস", icon: "🍗" },
  { id: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", name: "মসলা", icon: "🌶️" },
];

const tickerData = [
  { name: "স্বর্ণা চাল", price: "৪৮ টাকা/কেজি", change: "২.৫%", isUp: true, emoji: "⚪" },
  { name: "মিনিকেট চাল", price: "৯৯ টাকা/কেজি", change: "২.৯%", isUp: false, emoji: "🍚" },
  { name: "বাটাম সাইজ চাল", price: "৬৬ টাকা/কেজি", change: "৩.৭%", isUp: true, emoji: "🌾" },
  { name: "মসুর ডাল", price: "১৪২ টাকা/কেজি", change: "২.৯%", isUp: true, emoji: "🫘" },
  { name: "ছোলা", price: "১২০ টাকা/কেজি", change: "২.৪%", isUp: false, emoji: "🌰" },
  { name: "আমন ডাল (খোসা সহ)", price: "১৩০ টাকা/কেজি", change: "১.৮%", isUp: true, emoji: "🫘" },
  { name: "সয়াবিন তেল", price: "১৭৫ টাকা/লিটার", change: "১.২%", isUp: true, emoji: "🥫" },
  { name: "পেঁয়াজ (দেশি)", price: "৫৪ টাকা/কেজি", change: "১২.৫%", isUp: true, emoji: "🧅" },
];

const toBanglaNumber = (num) => {
  const banglaDigits = {
    0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪",
    5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯",
  };
  return num
    .toString()
    .split("")
    .map((char) => banglaDigits[char] || char)
    .join("");
};

const getCurrentDate = () => {
  const today = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

  return `${days[today.getDay()]}, ${toBanglaNumber(today.getDate())} ${months[today.getMonth()]}, ${toBanglaNumber(today.getFullYear())}`;
};

const NavbarPage = () => {
  const pathname = usePathname();
  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currentDate = getCurrentDate();

  return (
    <header className="w-full bg-[#FAFCFA] border-b border-[#E5EBE5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#05893E] rounded-xl flex items-center justify-center text-white text-2xl shadow-sm">
              🛒
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1D271F] tracking-tight">
                বাজার দর
              </h1>
              <p suppressHydrationWarning className="text-xs text-gray-500 font-medium min-h-4">
                {currentDate}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Rezwan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {session.user.name ?? "প্রোফাইল"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#FAFCFA] rounded-xl shadow-lg border border-[#E5EBE5] py-1.5 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await authClient.signOut();
                        } catch (error) {
                          console.error("Failed to sign out", error);
                        }
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : sessionError ? (
              <span role="alert" className="px-3 py-2 text-xs text-rose-600">
                সাইন ইন সুবিধা এই মুহূর্তে অনুপলব্ধ
              </span>
            ) : isSessionPending ? (
              <span className="px-4 py-2 text-sm text-gray-500">লোড হচ্ছে...</span>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#05893E] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#05893E] hover:bg-[#047735] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5EBE5] bg-[#FAFCFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = pathname === `/categories/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#E1F1E7] text-[#05893E] font-semibold border border-[#05893E]/20 shadow-xs"
                      : "text-gray-600 hover:text-[#05893E] hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="w-full bg-[#FAFCFA] border-t border-[#E5EBE5] overflow-hidden py-2.5 relative select-none">
        <div className="running-ticker">
          {[...tickerData, ...tickerData].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 cursor-default"
            >
              <span className="text-sm">{item.emoji}</span>
              <span className="font-semibold text-[#1D271F]">{item.name}</span>
              <span className="text-gray-600">{item.price}</span>
              <span
                className={`flex items-center text-xs font-bold gap-0.5 ${
                  item.isUp ? "text-rose-600" : "text-[#05893E]"
                }`}
              >
                <span className="text-[10px]">{item.isUp ? "►" : "◄"}</span>
                <span>{item.change}</span>
              </span>
              <span className="text-gray-300 ml-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default NavbarPage;