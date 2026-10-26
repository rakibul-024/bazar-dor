export default function CategoryLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8" aria-label="পণ্য লোড হচ্ছে">
      <div className="mb-6 h-12 w-56 rounded-xl bg-[#E5EBE5]" />
      <div className="mb-5 h-10 w-48 rounded-lg bg-[#E5EBE5]" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-32 rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA]" />
        ))}
      </div>
    </main>
  );
}
