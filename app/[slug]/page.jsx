import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/sub-categories/${params.slug}`,
    { next: { revalidate: 500000 } }
  );

  if (res.status === 404) {
    return notFound();
  }
  const subCategory = await res.json();

  return (
    <div>
      <h1>Category: {subCategory.title}</h1>
    </div>
  );
}
