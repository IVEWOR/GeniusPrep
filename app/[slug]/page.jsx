import { NextResponse } from "next/server";

export default async function Page({ params }) {

  const { slug } = params;

  const res = await fetch(`http://localhost:3000/api/categories?slug=${slug}`);

  if (!res.ok) {
    throw new Error("failed to fetch the category");
  }

  const category = await res.json();

  if (category.length === 0) {
    return (
      <div>
        <div>Category Not Found</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Category : {category.title}</h1>
    </div>
  )
}
