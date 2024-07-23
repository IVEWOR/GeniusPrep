import Category from "./Category";

// fetch cats from db
async function fetchCategories() {
  const res = await fetch("http://localhost:3000/api/sub-categories", { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error("failed to fetch the categories [categories block]");
  }
  const data = await res.json();
  return data;
}

export default async function CategoriesBlock() {
  const categories = await fetchCategories();
  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex gap-5">
        {categories.map((category) => (
          <Category key={category._id} title={category.title} link={category.slug} />
        ))}
      </div>
    </div>
  );
}
