"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const queryMessages = {
  "login-success": { message: "সফলভাবে সাইন ইন হয়েছে।", type: "success" },
  "signup-success": { message: "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।", type: "success" },
};

export default function ToastViewport() {
  const pathname = usePathname();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const showToast = (event) => setToast(event.detail);
    window.addEventListener("app-toast", showToast);
    return () => window.removeEventListener("app-toast", showToast);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = queryMessages[params.get("toast")];
    if (!message) return;

    window.dispatchEvent(new CustomEvent("app-toast", { detail: message }));
    params.delete("toast");
    const query = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${pathname}${query ? `?${query}` : ""}`,
    );
  }, [pathname]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      className={`fixed right-4 top-4 z-[100] max-w-sm rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${
        toast.type === "error" ? "bg-rose-600" : "bg-[#05893E]"
      }`}
    >
      {toast.message}
    </div>
  );
}
