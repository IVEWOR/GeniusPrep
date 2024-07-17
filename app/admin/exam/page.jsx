"use client";
import { useEffect, useState } from "react";
import AddExamAction from "@/components/server/AddExamAction";

// Fetching the existing categories for the sub-categories form

async function fetchData(route) {
  const res = await fetch(`/api/${route}`);
  if (!res.ok) {
    throw new Error(`failed to fetch the ${route}`);
  }
  const data = await res.json();
  return data;
}

// question and answer
const QNA = ({ index }) => {
  return (
    <div>
      <div>
        <label htmlFor={`questions[${index}][question]`}>
          Question {index}
        </label>
        <input
          type="text"
          name={`questions[${index}][question]`}
          placeholder="Enter question"
          id={`questions[${index}][question]`}
        />
      </div>
      <div>
        <label htmlFor={`questions[${index}][option_1]`}>Option 1</label>
        <input
          type="text"
          name={`questions[${index}][option_1]`}
          placeholder="Enter option"
          id={`questions[${index}][option_1]`}
        />
      </div>
      <div>
        <label htmlFor={`questions[${index}][option_2]`}>Option 2</label>
        <input
          type="text"
          name={`questions[${index}][option_2]`}
          placeholder="Enter option"
          id={`questions[${index}][option_2]`}
        />
      </div>
      <div>
        <label htmlFor={`questions[${index}][option_3]`}>Option 3</label>
        <input
          type="text"
          name={`questions[${index}][option_3]`}
          placeholder="Enter option"
          id={`questions[${index}][option_3]`}
        />
      </div>
      <div>
        <label htmlFor={`questions[${index}][option_4]`}>Option 4</label>
        <input
          type="text"
          name={`questions[${index}][option_4]`}
          placeholder="Enter option"
          id={`questions[${index}][option_4]`}
        />
      </div>
      <div>
        <label htmlFor={`questions[${index}][answer]`}>Answer</label>
        <input
          type="text"
          name={`questions[${index}][answer]`}
          placeholder="Enter answer"
          id={`questions[${index}][answer]`}
        />
      </div>
    </div>
  );
};

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [qna, setQna] = useState([]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQna([...qna, qna.length + 1]);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedCategories = await fetchData("categories");
        const fetchedSubCategories = await fetchData("sub-categories");
        setCategories(fetchedCategories);
        setSubCategories(fetchedSubCategories);
      } catch (err) {
        throw new Error("erro fetching cats");
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <form action={AddExamAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter exam test title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="slug">slug</label>
          <input type="text" name="slug" placeholder="exam slug" id="slug" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description"></textarea>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          <label htmlFor="subCategory">Sub Category</label>
          <select name="subCategory" id="subCategory">
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.title}
              </option>
            ))}
          </select>
        </div>

        <div id="qna">
          {qna.map((index) => (
            <QNA key={index} index={index} />
          ))}
        </div>

        <div>
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>

        <div>
          <button type="submit">Add Test</button>
        </div>
      </form>
    </div>
  );
}
