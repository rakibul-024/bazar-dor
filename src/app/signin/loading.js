export default function SignInLoading() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-sm animate-pulse flex-col justify-center px-4 py-10" aria-label="সাইন ইন পেজ লোড হচ্ছে">
      <div className="mb-5 space-y-2 text-center">
        <div className="mx-auto h-7 w-32 rounded bg-[#E5EBE5]" />
        <div className="mx-auto h-4 w-56 rounded bg-[#E5EBE5]" />
      </div>
      <section className="w-full space-y-5 rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
        <div className="h-10 rounded-lg bg-[#E5EBE5]" />
        <div className="h-10 rounded-lg bg-[#E5EBE5]" />
        <div className="h-10 rounded-lg bg-[#E5EBE5]" />
      </section>
    </main>
  );
}
