import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const res = await fetch(`http://localhost:3000/api/exam/${params.slug}`, {
        next: { revalidate: 500000 }
    });

    if (res.status === 404) {
        return notFound();
    }

    const test = await res.json();

    return (
        <div className="container mx-auto">
            <h1>{test.title}</h1>
            <div className="bg-gray-100">
                {test.questions.map((item) => (
                    <div key={item._id} className="border rounded border-gray-700 mb-10">
                        <h3 className="text-lg font-medium">{item.question}</h3>
                        <div>
                            {item.options.map((option) => (
                                <div key={option._id}>
                                    <input type="radio" name={item._id} id={option._id} value={option} />
                                    <label htmlFor={option._id}>{option}
                                        {option._id}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}