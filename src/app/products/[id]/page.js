import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getChangePercentage,
  getProductById,
  getProductName,
  getProductUnit,
  toBanglaNumber,
} from "../../../lib/bazarDorApi";

function PriceHistory({ product }) {
  const prices = [
    { label: "আজকের দাম", value: product.today },
    { label: "গতকালের দাম", value: product.yesterday },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ].filter((item) => item.value != null);

  return (
    <section className="rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-[#1D271F]">দামের ইতিহাস</h2>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {prices.map((item) => (
          <div key={item.label} className="rounded-xl bg-[#F0F5F0] p-4">
            <dt className="text-xs text-gray-500">{item.label}</dt>
            <dd className="mt-1 font-bold text-[#1D271F]">{toBanglaNumber(item.value)} টাকা</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const change = getChangePercentage(product);
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const markets = Array.isArray(product.markets) ? product.markets : [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-[#05893E] hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>

      <article className="mb-6 flex flex-col gap-6 rounded-3xl border border-[#E5EBE5] bg-[#FAFCFA] p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-5xl">
          {product.image ?? product.emoji ?? product.categoryIcon ?? "🛒"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#05893E]">{product.categoryNameBn ?? "বাজারের পণ্য"}</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[#1D271F] sm:text-3xl">
            {getProductName(product)}
          </h1>
          <p className="mt-1 text-sm text-gray-500">প্রতি {getProductUnit(product.unit)}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-extrabold text-[#1D271F]">
              {toBanglaNumber(product.today ?? product.price)} টাকা
            </span>
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-bold ${
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
        </div>
      </article>

      <div className="space-y-6">
        <PriceHistory product={product} />

        {markets.length > 0 && (
          <section className="rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-[#1D271F]">বাজারভিত্তিক দাম</h2>
            <div className="divide-y divide-[#E5EBE5]">
              {markets.map((market, index) => (
                <div
                  key={`${market.market}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-[#1D271F]">{market.market}</p>
                    <p className="text-xs text-gray-500">{market.division}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#1D271F]">
                    {toBanglaNumber(market.min)}–{toBanglaNumber(market.max)} টাকা
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
