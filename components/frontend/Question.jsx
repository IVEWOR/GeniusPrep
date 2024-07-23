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
    <div className="bg-gray-100">
      <div
        key={currentQuestion._id}
        className="border rounded border-gray-700 mb-10"
      >
        <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
        <div>
          {currentQuestion.options.map((option, index) => (
            <div key={`${currentQuestion._id}_${index}`}>
              <input
                type="radio"
                name={currentQuestion._id}
                id={`${currentQuestion._id}_${index}`}
                value={option}
              />
              <label htmlFor={`${currentQuestion._id}_${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      {currentIndex < test.questions.length - 1 && (
        <button
          className="mt-4 rounded-lg p-2 bg-emerald-500 text-white"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      )}
    </div>
  );
}
