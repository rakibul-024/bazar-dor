import Link from "next/link";
import {
  getChangePercentage,
  getProductName,
  getProductUnit,
  getProducts,
  toBanglaNumber,
} from "../../lib/bazarDorApi";

function ProductCard({ product }) {
  const id = product.id ?? product._id ?? product.slug;
  const change = getChangePercentage(product);
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const image = product.image ?? product.emoji ?? product.categoryIcon ?? "🛒";

  return (
    <Link
      href={`/products/${id}`}
      className="group flex min-h-32 flex-col justify-between rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-4 transition hover:border-[#05893E]/30 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
          {image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#1D271F] transition-colors group-hover:text-[#05893E]">
            {getProductName(product)}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {getProductUnit(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] font-medium text-gray-500">আজকের দাম</span>
          <span className="text-base font-extrabold text-[#1D271F]">
            {toBanglaNumber(product.today ?? product.price ?? product.current_price)} টাকা
          </span>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${
            direction === "up"
              ? "bg-[#E1F1E7] text-[#05893E]"
              : direction === "down"
                ? "bg-rose-50 text-rose-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}
          {toBanglaNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id ?? product._id ?? product.slug ?? index} product={product} />
      ))}
    </div>
  );
}

export default async function ProductSections() {
  const products = await getProducts();
  const sortedByChange = [...products].sort(
    (first, second) => getChangePercentage(second) - getChangePercentage(first),
  );
  const topRisers = sortedByChange.filter((product) => getChangePercentage(product) > 0).slice(0, 6);
  const topFallers = sortedByChange
    .filter((product) => getChangePercentage(product) < 0)
    .slice(-6)
    .reverse();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {topRisers.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-bold text-rose-600">▲</span>
            <h2 className="text-xl font-bold tracking-tight text-[#1D271F] sm:text-2xl">
              আজ দাম বেড়েছে
            </h2>
          </div>
          <ProductGrid products={topRisers} />
        </section>
      )}

      {topFallers.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-bold text-[#05893E]">▼</span>
            <h2 className="text-xl font-bold tracking-tight text-[#1D271F] sm:text-2xl">
              আজ দাম কমেছে
            </h2>
          </div>
          <ProductGrid products={topFallers} />
        </section>
      )}

      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-[#1D271F] sm:text-2xl">সব পণ্য</h2>
          <p className="mt-1 text-sm font-medium text-gray-500">
            বাজারের সব পণ্যের আজকের দাম ও পরিবর্তন
            <span className="sr-only">: মোট {toBanglaNumber(products.length)}টি পণ্য</span>
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
