import Link from "next/link";

async function fetchExams() {
  const res = await fetch("http://localhost:3000/api/exam", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch the exam loop");
  }

  return res.json();
}

export default async function ExamLoop({ subCategory }) {
  const exams = await fetchExams();

  return (
    <div className="px-4 container mx-auto mt-10">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {exams
          .filter((exam) => exam.subCategory.title === subCategory)
          .map((exam) => (
            <div
              className="rounded shadow p-4 relative min-h-44 grid"
              key={exam._id}
            >
              <span className="text-xs uppercase text-gray-500">
                Free Test | {exam.subCategory.title}
              </span>
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
  );
}
