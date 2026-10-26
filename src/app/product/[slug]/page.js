import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  getChangePercentage,
  getProductBySlug,
  getProductName,
  getProductUnit,
  toBanglaNumber,
} from "../../../lib/bazarDorApi";
import { getAuth } from "../../../lib/auth";

function getPriceSummary(markets, fallbackPrice) {
  const ranges = markets
    .filter((market) => Number.isFinite(Number(market.min)) && Number.isFinite(Number(market.max)))
    .map((market) => ({ min: Number(market.min), max: Number(market.max) }));

  if (ranges.length === 0) {
    return { min: fallbackPrice, max: fallbackPrice, average: fallbackPrice };
  }

  const min = Math.min(...ranges.map((range) => range.min));
  const max = Math.max(...ranges.map((range) => range.max));
  const average =
    ranges.reduce((total, range) => total + (range.min + range.max) / 2, 0) / ranges.length;

  return { min, max, average };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const markets = Array.isArray(product.markets) ? product.markets : [];
  const price = getPriceSummary(markets, Number(product.today ?? product.price ?? 0));
  const change = getChangePercentage(product);
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-[#05893E] hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>

      <article className="mb-6 rounded-3xl border border-[#E5EBE5] bg-[#FAFCFA] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-5xl">
            {product.image ?? product.emoji ?? product.categoryIcon ?? "🛒"}
          </div>
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-2">
              <Link
                href={`/categories/${product.category}`}
                className="rounded-full bg-[#E1F1E7] px-3 py-1 text-xs font-semibold text-[#05893E]"
              >
                {product.categoryNameBn ?? "বাজার"}
              </Link>
              <span className="rounded-full bg-[#F0F5F0] px-3 py-1 text-xs font-medium text-gray-600">
                প্রতি {getProductUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1D271F] sm:text-3xl">
              {getProductName(product)}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {markets.length > 0
                ? `${toBanglaNumber(markets.length)}টি বাজারের আজকের দামের তথ্য`
                : `${product.categoryNameBn ?? "বাজার"} ক্যাটাগরির আজকের দাম`}
            </p>
          </div>
        </div>

        <section className="mt-7">
          <h2 className="mb-3 text-lg font-bold text-[#1D271F]">দামের সারাংশ</h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "সর্বনিম্ন দাম", value: price.min },
              { label: "সর্বোচ্চ দাম", value: price.max },
              { label: "গড় দাম", value: price.average },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#F0F5F0] p-4">
                <dt className="text-xs font-medium text-gray-500">{item.label}</dt>
                <dd className="mt-1 text-lg font-extrabold text-[#1D271F]">
                  {toBanglaNumber(item.value)} টাকা
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-gray-600">
            আজকের দাম: <strong className="text-[#1D271F]">{toBanglaNumber(product.today)} টাকা</strong>
            <span
              className={`ml-2 font-semibold ${
                direction === "up"
                  ? "text-[#05893E]"
                  : direction === "down"
                    ? "text-rose-600"
                    : "text-gray-500"
              }`}
            >
              {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}
              {toBanglaNumber(Math.abs(change))}%
            </span>
          </p>
        </section>
      </article>

      <section className="rounded-2xl border border-[#E5EBE5] bg-[#FAFCFA] p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-[#1D271F]">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length > 0 ? (
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
                  <span className="ml-1 font-normal text-gray-500">/ {getProductUnit(product.unit)}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </main>
  );
}
