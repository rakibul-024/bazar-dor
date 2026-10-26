import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "../../../lib/bazarDorApi";
import CategoryProductList from "./product-list";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug || item.id === slug);

  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  if (products.length === 0) notFound();

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
