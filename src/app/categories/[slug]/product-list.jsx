"use client";

import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { toBanglaNumber, toNumericValue } from "../../../lib/productFormatting";

export default function CategoryProductList({ products }) {
  const [sort, setSort] = useState("default");
  const sortedProducts = useMemo(() => {
    if (sort === "price-asc") {
      return [...products].sort((first, second) => toNumericValue(first.today) - toNumericValue(second.today));
    }
    if (sort === "price-desc") {
      return [...products].sort((first, second) => toNumericValue(second.today) - toNumericValue(first.today));
    }
    return products;
  }, [products, sort]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{toBanglaNumber(products.length)}টি পণ্য</p>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <label htmlFor="category-sort">সাজান</label>
          <div className="relative">
            <select
              id="category-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-44 appearance-none rounded-xl border border-[#E5EBE5] bg-[#FAFCFA] py-2 pl-3 pr-9 text-[#1D271F] outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/15"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {sortedProducts.map((product, index) => (
          <ProductCard key={product.id ?? product.slug ?? index} product={product} />
        ))}
      </div>
    </>
  );
}
