function ProductCardSkeleton() {
  return (
    <div className="h-32 animate-pulse rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-[#E5EBE5]" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-[#E5EBE5]" />
          <div className="h-3 w-16 rounded bg-[#E5EBE5]" />
        </div>
      </div>
      <div className="mt-5 h-4 w-24 rounded bg-[#E5EBE5]" />
    </div>
  );
}

export default function ProductSectionsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-7xl animate-pulse space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      {[0, 1, 2].map((section) => (
        <section key={section}>
          <div className="mb-4 h-6 w-40 rounded bg-[#E5EBE5]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {Array.from({ length: section === 2 ? 6 : 3 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
