const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const requestOptions = { next: { revalidate: 60 } };

export async function getProducts() {
  const failures = [];

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}/products`, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      const products = Array.isArray(payload)
        ? payload
        : payload?.data?.products ?? payload?.data ?? payload?.products;

      if (!Array.isArray(products)) {
        throw new Error("The API returned an invalid product list");
      }

      return products;
    } catch (error) {
      failures.push(`${baseUrl}: ${error.message}`);
    }
  }

  throw new Error(`Unable to load products. ${failures.join(" | ")}`);
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

export function toBanglaNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "০";

  const banglaDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return number
    .toLocaleString("en-IN", { maximumFractionDigits: 1 })
    .replace(/[0-9]/g, (digit) => banglaDigits[digit]);
}

export function getChangePercentage(product) {
  const change = product?.change ?? product?.price_change ?? product?.percentage_change ?? 0;
  const rawValue = typeof change === "object" ? change.pct ?? change.value ?? 0 : change;
  const value = Number.parseFloat(String(rawValue).replace(/[^0-9.-]/g, "")) || 0;

  if (typeof change === "object") {
    if (change.dir === "up") return Math.abs(value);
    if (change.dir === "down") return -Math.abs(value);
    if (change.dir === "flat") return 0;
  }

  return value;
}

export function getProductName(product) {
  return product?.nameBn ?? product?.name ?? product?.product_name ?? "পণ্য";
}

export function getProductUnit(unit) {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[String(unit).toLowerCase()] ?? unit ?? "কেজি";
}
