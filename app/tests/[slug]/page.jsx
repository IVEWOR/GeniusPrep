import Question from "@/components/frontend/Question";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const res = await fetch(`http://localhost:3000/api/exam/${params.slug}`, {
    next: { revalidate: 5 },
  });

  if (res.status === 404) {
    return notFound();
  }

  const test = await res.json();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl my-6">{test.title}</h1>
      {test.questions.length > 0 ? <Question test={test} /> : "no question"}
    </div>
  );
}
