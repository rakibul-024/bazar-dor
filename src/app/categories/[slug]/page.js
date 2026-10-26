import Link from "next/link";
import { getCategories, getProductsByCategory } from "../../../lib/bazarDorApi";
import CategoryProductList from "./product-list";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug || item.id === slug);

  if (!category) return <CategoryEmptyState />;

  const products = await getProductsByCategory(slug);

  if (products.length === 0) return <CategoryEmptyState />;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAFCFA] text-2xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D271F]">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">এই ক্যাটাগরির পণ্যের আজকের দাম</p>
        </div>
      </div>
      <CategoryProductList products={products} />
    </main>
  );
}

function CategoryEmptyState() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-[#1D271F]">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">ক্যাটাগরিটি সঠিক কি না দেখে আবার চেষ্টা করুন।</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-[#05893E] px-5 py-3 font-semibold text-white hover:bg-[#047735]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
