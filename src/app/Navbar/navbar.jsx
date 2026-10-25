"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "rice", name: "চাল", icon: "🍚" },
  { id: "lentil", name: "ডাল", icon: "🫘" },
  { id: "oil", name: "তেল", icon: "🥫" },
  { id: "vegetables", name: "সবজি", icon: "🥬" },
  { id: "fish", name: "মাছ", icon: "🐟" },
  { id: "meat", name: "মাংস", icon: "🍗" },
  { id: "dairy", name: "ডিম-দুধ", icon: "🥛" },
  { id: "spices", name: "মসলা", icon: "🌶️" },
];

const toBanglaNumber = (num) => {
  const banglaDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  return num
    .toString()
    .split("")
    .map((char) => banglaDigits[char] || char)
    .join("");
};

const NavbarPage = () => {
  const [activeCategory, setActiveCategory] = useState("rice");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentDate = (() => {
    const today = new Date();
    const days = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];

    const dayName = days[today.getDay()];
    const dateNum = toBanglaNumber(today.getDate());
    const monthName = months[today.getMonth()];
    const yearNum = toBanglaNumber(today.getFullYear());

    return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
  })();

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-sm">
              🛒
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 font-medium min-h-4">
                {currentDate}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Rezwan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    Rezwan
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>সাইন আউট</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  সাইন ইন
                </button>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  সাইন আপ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 shadow-xs"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavbarPage;