import { notFound, redirect } from "next/navigation";
import { getCategories } from "../../../lib/bazarDorApi";

export default async function CategoryAliasPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug || item.id === slug);

  if (!category) notFound();

  redirect(`/categories/${category.slug ?? category.id}`);
}
