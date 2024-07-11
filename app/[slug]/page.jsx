export default async function Page({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/categories?slug=${params.slug}`,
    { next: { revalidate: 5000 } }
  );
  if (!res.ok) {
    throw new Error(`Error fetching categories ${params.slug}`);
  }
  const data = await res.json();

  if (data[0].slug !== params.slug) {
    return "Not category ";
  }
  return (
    <div>
      <h1>Category: {(data[0].title, data[0].slug)}</h1>
    </div>
  );
}
