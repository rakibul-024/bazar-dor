"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { notify } from "../../lib/toast";

export default function ProfileActions() {
  const router = useRouter();

  async function signOut() {
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message);

      notify("সফলভাবে সাইন আউট হয়েছে।", "success");
      router.push("/");
    } catch (error) {
      notify(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।", "error");
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="shrink-0 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
    >
      ↪ সাইন আউট
    </button>
  );
}
