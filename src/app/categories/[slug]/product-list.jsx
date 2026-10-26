"use client";

import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { toBanglaNumber } from "../../../lib/productFormatting";

export default function CategoryProductList({ products }) {
  const [sort, setSort] = useState("default");
  const sortedProducts = useMemo(() => {
    if (sort === "price-asc") {
      return [...products].sort((first, second) => first.today - second.today);
    }
    if (sort === "price-desc") {
      return [...products].sort((first, second) => second.today - first.today);
    }
    return products;
  }, [products, sort]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{toBanglaNumber(products.length)}টি পণ্য</p>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          সাজান:
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-[#E5EBE5] bg-[#FAFCFA] px-3 py-2 text-[#1D271F] outline-none focus:border-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {sortedProducts.map((product, index) => (
          <ProductCard key={product.id ?? product.slug ?? index} product={product} />
        ))}
      </div>
    </>
  );
}
