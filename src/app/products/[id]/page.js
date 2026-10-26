import { notFound, redirect } from "next/navigation";
import { getProductById } from "../../../lib/bazarDorApi";

export default async function LegacyProductRoute({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();
  redirect(`/product/${product.slug}`);
}
