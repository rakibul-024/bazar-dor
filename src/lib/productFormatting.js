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
