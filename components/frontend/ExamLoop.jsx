import Link from "next/link";

async function fetchExams() {
    const res = await fetch("http://localhost:3000/api/exam");
    if (!res.ok) {
        throw new Error("failed to fetch the exam loop");
    }

    return res.json();
}

export default async function ExamLoop() {

    const exams = await fetchExams();

    return (
        <div className="container mx-auto mt-10">
            <div className="flex gap-4">
                {exams.map((exam) => (
                    <div className="sm:w-1/2 md:w-1/4 rounded shadow p-4 relative min-h-44 grid" key={exam._id}>
                        <span className="text-xs uppercase font-gray-500">Free Test </span>
                        <h2 className="font-medium text-lg">{exam.title}</h2>
                        <button className="text-sm px-4 py-2 rounded h-fit text-white w-fit text-left bg-emerald-500">Start Test</button>
                        <Link className="absolute top-0 left-0 right-0 bottom-0" href={exam.slug}><span className="sr-only">Learn More About {exam.title}</span></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}