const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const requestOptions = { next: { revalidate: 60 } };

export async function getProducts() {
  return requestList("/products", "product list");
}

export async function getProductsByCategory(slug) {
  return requestList(`/products?category=${encodeURIComponent(slug)}`, `products for category ${slug}`);
}

export async function getCategories() {
  return requestList("/categories", "category list");
}

async function requestList(path, description) {
  const failures = [];

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const products = Array.isArray(payload)
        ? payload
        : payload?.data?.products ?? payload?.data ?? payload?.products;

      if (!Array.isArray(products)) {
        throw new Error(`The API returned an invalid ${description}`);
      }

      return products;
    } catch (error) {
      failures.push(`${baseUrl}: ${error.message}`);
    }
  }

  throw new Error(`Unable to load ${description}. ${failures.join(" | ")}`);
}

export async function getProductById(id) {
  const failures = [];
  let notFoundOnEveryEndpoint = true;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(
        `${baseUrl}/products/${encodeURIComponent(id)}`,
        requestOptions,
      );

      if (response.status === 404) {
        continue;
      }
      notFoundOnEveryEndpoint = false;
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const product = payload?.data?.product ?? payload?.data ?? payload?.product ?? payload;

      if (product && typeof product === "object" && !Array.isArray(product) && product.id != null) {
        return product;
      }

      throw new Error("The API returned an invalid product");
    } catch (error) {
      notFoundOnEveryEndpoint = false;
      failures.push(`${baseUrl}: ${error.message}`);
    }
  }

  if (notFoundOnEveryEndpoint) {
    return null;
  }

  throw new Error(`Unable to load product ${id}. ${failures.join(" | ")}`);
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) return null;

  return getProductById(product.id);
}

export { getChangePercentage, getProductName, getProductUnit, toBanglaNumber } from "./productFormatting";
