import Link from "next/link";
import {
  getChangePercentage,
  getProductName,
  getProductUnit,
  toBanglaNumber,
} from "../../lib/productFormatting";

export default function ProductCard({ product }) {
  const slug = product.slug ?? product.id ?? product._id;
  const change = getChangePercentage(product);
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const image = product.image ?? product.emoji ?? product.categoryIcon ?? "🛒";

  return (
    <Link
      href={`/product/${slug}`}
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
