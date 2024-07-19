import { notFound } from "next/navigation";
import ExamLoop from "@/components/frontend/ExamLoop";

async function fetchExams() {
  const res = await fetch("http://localhost:3000/api/exam");

  if (!res.ok) {
    throw new Error("Failed to fetch the exam loop");
  }

  return res.json();
}

export default async function Page({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/sub-categories/${params.slug}`
  );

  if (res.status === 404) {
    return notFound();
  }

  const exams = await fetchExams();

  const subCategory = await res.json();

  return (
    <div className="container mx-auto">
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-2xl font-medium">{subCategory.title} Mock Tests</h1>
      </div>
      <ExamLoop />
      <div className="container mx-auto mt-10">
        <div className="flex gap-4">
          {exams.map((exam) => (
            <div
              className="sm:w-1/2 md:w-1/4 rounded shadow p-4 relative min-h-44 grid"
              key={exam._id}
            >
              <span className="text-xs uppercase text-gray-500">Free Test</span>
              <h2 className="font-medium text-lg">{exam.title}</h2>
              <button className="text-sm px-4 py-2 rounded h-fit text-white w-fit text-left bg-emerald-500">
                Start Test
              </button>
              <Link
                className="absolute inset-0"
                href={`/tests/${exam.slug}`}
                aria-label={`Learn more about ${exam.title}`}
              >
                <span className="sr-only">Learn More About {exam.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
