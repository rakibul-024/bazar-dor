"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { notify } from "../../lib/toast";

const providerNames = {
  google: "Google",
  github: "GitHub",
};

function safeCallbackURL(searchParams) {
  const callbackURL = searchParams.get("callbackURL");
  return callbackURL?.startsWith("/") && !callbackURL.startsWith("//") ? callbackURL : "/";
}

function withToast(path, message) {
  const url = new URL(path, window.location.origin);
  url.searchParams.set("toast", message);
  return `${url.pathname}${url.search}`;
}

export default function AuthForm({ mode, providers }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));

    try {
      const result = isSignup
        ? await authClient.signUp.email({
            name: String(formData.get("name")).trim(),
            email,
            password,
          })
        : await authClient.signIn.email({
            email,
            password,
            callbackURL: safeCallbackURL(searchParams),
          });

      if (result.error) {
        throw new Error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি।");
      }

      if (isSignup) {
        const callbackURL = searchParams.get("callbackURL");
        const signInPath = callbackURL
          ? `/signin?callbackURL=${encodeURIComponent(callbackURL)}`
          : "/signin";
        router.push(withToast(signInPath, "signup-success"));
        return;
      }

      router.push(withToast(safeCallbackURL(searchParams), "login-success"));
    } catch (authError) {
      const message = authError.message || "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।";
      setError(message);
      notify(message, "error");
      setPending(false);
    }
  }

  async function handleSocialSignIn(provider) {
    setError("");
    setPending(true);

    try {
      const callbackURL = isSignup ? "/" : safeCallbackURL(searchParams);
      const result = await authClient.signIn.social({
        provider,
        callbackURL: withToast(callbackURL, "login-success"),
      });
      if (result.error) throw new Error(result.error.message || `${providerNames[provider]} দিয়ে সাইন ইন করা যায়নি।`);
    } catch (authError) {
      const message = authError.message || "সামাজিক মাধ্যমে সাইন ইন করা যায়নি।";
      setError(message);
      notify(message, "error");
      setPending(false);
    }
  }

  const accountSwitchURL = searchParams.get("callbackURL");
  const accountSwitchHref = isSignup
    ? `/signin${accountSwitchURL ? `?callbackURL=${encodeURIComponent(accountSwitchURL)}` : ""}`
    : `/signup${accountSwitchURL ? `?callbackURL=${encodeURIComponent(accountSwitchURL)}` : ""}`;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onInvalid={() => notify("সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন।", "error")}
        className="space-y-4"
      >
        {isSignup && (
          <label className="block text-sm font-semibold text-[#1D271F]">
            নাম
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              className="mt-1.5 w-full rounded-lg border border-[#E5EBE5] bg-white px-3 py-2.5 font-normal outline-none focus:border-[#05893E]"
              placeholder="আপনার নাম"
            />
          </label>
        )}
        <label className="block text-sm font-semibold text-[#1D271F]">
          ইমেইল
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1.5 w-full rounded-lg border border-[#E5EBE5] bg-white px-3 py-2.5 font-normal outline-none focus:border-[#05893E]"
            placeholder="name@example.com"
          />
        </label>
        <label className="block text-sm font-semibold text-[#1D271F]">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={8}
            className="mt-1.5 w-full rounded-lg border border-[#E5EBE5] bg-white px-3 py-2.5 font-normal outline-none focus:border-[#05893E]"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[#05893E] px-4 py-2.5 font-semibold text-white transition hover:bg-[#047735] disabled:cursor-wait disabled:opacity-60"
        >
          {pending
            ? isSignup
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "সাইন ইন হচ্ছে..."
            : isSignup
              ? "রেজিস্টার করুন"
              : "সাইন ইন"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-[#E5EBE5]" />
        অথবা
        <span className="h-px flex-1 bg-[#E5EBE5]" />
      </div>

      <div className="space-y-2">
        {providers.map((provider) => (
          <button
            key={provider}
            type="button"
            disabled={pending}
            onClick={() => handleSocialSignIn(provider)}
            className="w-full rounded-lg border border-[#E5EBE5] bg-white px-3 py-2.5 text-sm font-semibold text-[#1D271F] transition hover:border-[#05893E]/40 hover:bg-[#F0F5F0] disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "সংযোগ করা হচ্ছে..." : `${providerNames[provider]} দিয়ে চালিয়ে যান`}
          </button>
        ))}
        {providers.length === 0 && (
          <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
            Social login চালু করতে `.env.local`-এ Google বা GitHub credentials যোগ করুন।
          </p>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link
          href={accountSwitchHref}
          className="font-semibold text-[#05893E] hover:underline"
        >
          {isSignup ? "সাইন ইন করুন" : "রেজিস্টার করুন"}
        </Link>
      </p>
    </div>
  );
}
