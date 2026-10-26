import ProductCard from "./ProductCard";
import { getProducts } from "../../lib/bazarDorApi";
import { getChangePercentage, toBanglaNumber } from "../../lib/productFormatting";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
