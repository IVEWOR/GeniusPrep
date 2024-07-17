import { notFound } from "next/navigation";
import ExamLoop from "@/components/frontend/ExamLoop";

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
    <div className="container mx-auto">
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-2xl font-medium">{subCategory.title} Mock Tests</h1>
      </div>
      <ExamLoop />

    </div>
  );
}
