"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../../../lib/auth-client";
import { notify } from "../../../lib/toast";

export default function UpdateProfileForm({ name }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function updateName(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const nextName = String(formData.get("name") ?? "").trim();

    if (nextName.length < 2 || nextName.length > 100) {
      const message = "নাম ২ থেকে ১০০ অক্ষরের মধ্যে লিখুন।";
      setError(message);
      notify(message, "error");
      return;
    }

    if (nextName === name) {
      const message = "নামে কোনো পরিবর্তন করা হয়নি।";
      setError(message);
      notify(message, "error");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.updateUser({ name: nextName });
      if (result.error) throw new Error(result.error.message || "নাম আপডেট করা যায়নি।");

      notify("প্রোফাইলের নাম আপডেট হয়েছে।", "success");
      router.push("/profile");
      router.refresh();
    } catch (updateError) {
      const message = updateError.message || "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।";
      setError(message);
      notify(message, "error");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={updateName}
      onInvalid={() => notify("নামটি সঠিকভাবে লিখুন।", "error")}
      className="space-y-5"
    >
      <label className="block text-sm font-medium text-[#1D271F]">
        নাম
        <input
          name="name"
          type="text"
          defaultValue={name}
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className="mt-2 w-full rounded-xl border border-[#E5EBE5] bg-transparent px-4 py-3 outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/15"
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Link
          href="/profile"
          className="inline-flex items-center justify-center rounded-xl border border-[#E5EBE5] px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          বাতিল
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#05893E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#047735] disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </div>
    </form>
  );
}
