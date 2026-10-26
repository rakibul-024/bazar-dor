"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";

const providerNames = {
  google: "Google",
  github: "GitHub",
  discord: "Discord",
};

export default function LoginForm({ providers }) {
  const [error, setError] = useState("");
  const [pendingProvider, setPendingProvider] = useState("");

  async function signIn(provider) {
    setError("");
    setPendingProvider(provider);

    try {
      const requestedReturnPath = new URLSearchParams(window.location.search).get("callbackURL");
      const callbackURL =
        requestedReturnPath?.startsWith("/") && !requestedReturnPath.startsWith("//")
          ? requestedReturnPath
          : "/";
      const result = await authClient.signIn.social({ provider, callbackURL });
      if (result.error) {
        throw new Error(result.error.message ?? "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (signInError) {
      setError(signInError.message);
      setPendingProvider("");
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {providers.length > 0 ? (
        providers.map((provider) => (
          <button
            key={provider}
            type="button"
            disabled={Boolean(pendingProvider)}
            onClick={() => signIn(provider)}
            className="w-full rounded-xl border border-[#E5EBE5] bg-white px-4 py-3 text-sm font-semibold text-[#1D271F] transition hover:border-[#05893E]/40 hover:bg-[#F0F5F0] disabled:cursor-wait disabled:opacity-60"
          >
            {pendingProvider === provider
              ? "সংযোগ করা হচ্ছে..."
              : `${providerNames[provider]} দিয়ে সাইন ইন করুন`}
          </button>
        ))
      ) : (
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          কোনো OAuth provider কনফিগার করা নেই। `.env.local`-এ provider credentials যোগ করুন।
        </p>
      )}
      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
