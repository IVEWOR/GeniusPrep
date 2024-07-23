"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

export default async function Page({ params }) {
  const res = await fetch(`http://localhost:3000/api/exam/${params.slug}`, {
    next: { revalidate: 500000 },
  });

  if (res.status === 404) {
    return notFound();
  }

  const test = await res.json();

  return <Questionnaire test={test} />;
}

function Questionnaire({ test }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-2xl font-semibold">{test.title}</h1>
      <div className="mt-6">
        <div
          key={currentQuestion._id}
          className="border rounded border-gray-700 mb-10 p-3"
        >
          <h3 className="text-lg font-medium mb-2">
            {currentQuestion.question}
          </h3>
          {currentQuestion.options.map((option, index) => (
            <div className="flex" key={`${currentQuestion._id}_id_${index}`}>
              <input
                type="radio"
                name={currentQuestion._id}
                id={`${currentQuestion._id}_id_${index}`}
                value={option}
              />
              <label
                htmlFor={`${currentQuestion._id}_id_${index}`}
                className="ml-2"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          {currentQuestionIndex < test.questions.length - 1 && (
            <button
              className="mt-4 rounded-lg p-2 bg-emerald-500 text-white"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
