"use client";

import { useState } from "react";

export default function Question({ test }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentQuestion = test.questions[currentIndex];

  return (
    <div className="">
      <div
        key={currentQuestion._id}
        className="rounded border-gray-700 mb-6 shadow p-6"
      >
        <div className="text-xs uppercase mb-2 text-gray-600 font-semibold">Question {currentIndex + 1}</div>
        <h3 className="text-xl font-medium mb-2">{currentQuestion.question}</h3>
        <div>
          {currentQuestion.options.map((option, index) => (
            <div key={`${currentQuestion._id}_${index}`}>
              <input
                className="cursor-pointer"
                type="radio"
                name={currentQuestion._id}
                id={`${currentQuestion._id}_${index}`}
                value={option}
              />
              <label className="cursor-pointer ml-2" htmlFor={`${currentQuestion._id}_${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        {currentIndex > 0 && (
          <button
            className="mt-4 rounded-lg p-2 px-4 bg-emerald-500 text-white"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous Question
          </button>
        )}
        {currentIndex < test.questions.length - 1 && (
          <button
            className="mt-4 rounded-lg p-2 px-4 bg-emerald-500 text-white"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}
