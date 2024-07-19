"use client";
import { useEffect, useState } from "react";
import AddExamAction from "@/components/server/AddExamAction";
import Label from "@/components/server/form/Label";
import FieldWrap from "@/components/server/form/FieldWrap";
import Input from "@/components/server/form/Input";

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
  const options = [];
  for (let i = 1; i < 5; i++) {
    options.push(
      <FieldWrap addCls={"md:grid-flow-col"}>
        <Label
          htmlfor={`questions[${index}][option_${i}]`}
          text={`Option ${i}`}
        />
        <Input
          name={`questions[${index}][option_${i}]`}
          placeholder={"Enter option"}
          id={`questions[${index}][option_${i}]`}
          required={false}
        />
      </FieldWrap>
    );
  }

  return (
    <div className="border rounded p-3 bg-gray-100">
      <FieldWrap>
        <Label
          htmlfor={`questions[${index}][question]`}
          text={`Question ${index}`}
        />
        <Input
          name={`questions[${index}][question]`}
          placeholder={"Question"}
          id={`questions[${index}][question]`}
          required={false}
        />
      </FieldWrap>

      {options.map((option, index) => (
        <div key={`option_${index}`}>{option}</div>
      ))}

      <FieldWrap>
        <Label htmlfor={`questions[${index}][answer]`} text="Answer" />
        <Input
          name={`questions[${index}][answer]`}
          placeholder={"Question name"}
          id={`questions[${index}][answer]`}
          required={false}
        />
      </FieldWrap>
    </div>
  );
};

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [qna, setQna] = useState([]);
  const [alert, setAlert] = useState("hidden");

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
    <div className="container mx-auto my-10">
      <div className="max-w-6xl mx-auto ">
        <div
          className={`p-4 mx-4 mb-4 bg-emerald-100 rounded flex items-center justify-between ${alert}`}
          onClick={() => {
            setAlert("hidden");
          }}
        >
          <span className="text-emerald-900 text-sm">
            Test Added Published Successfully!
          </span>
          <span className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>
      <form
        action={AddExamAction}
        className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto"
      >
        <div className="md:col-span-2 px-4">
          <FieldWrap>
            <Label htmlfor="title" text="Title" />
            <Input
              name={"title"}
              placeholder={"Test Name"}
              id={"title"}
              required={true}
            />
          </FieldWrap>
          <FieldWrap>
            <Label htmlfor="slug" text="Slug" />
            <Input
              name={"slug"}
              placeholder={"Test Slug"}
              id={"slug"}
              required={true}
            />
          </FieldWrap>
          <FieldWrap>
            <Label htmlfor="description" text="Description" />
            <textarea
              className="outline-none border rounded p-2 text-sm"
              name="description"
              id="description"
            ></textarea>
          </FieldWrap>

          <div className="grid gap-4 mb-4" id="qna">
            {qna.map((index) => (
              <QNA key={index} index={index} />
            ))}
          </div>

          <div className="w-100">
            <button
              className="bg-gray-700 text-white text-sm w-100 block p-2 px-5 rounded"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          </div>
        </div>

        <div className="px-4">
          <div className="bg-gray-100 p-4 rounded">
            <FieldWrap>
              <FieldWrap>
                <Label htmlfor="category" text="Category" />
                <select
                  className="outline-none border p-2 rounded text-sm"
                  name="category"
                  id="category"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </FieldWrap>

              <FieldWrap>
                <Label htmlfor="subcategory" text="Sub Category" />
                <select
                  className="outline-none border p-2 rounded text-sm"
                  name="subCategory"
                  id="subCategory"
                >
                  {subCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.title}
                    </option>
                  ))}
                </select>
              </FieldWrap>
            </FieldWrap>
            <button
              className="bg-emerald-500 text-white block text-sm p-2 px-5 rounded"
              type="submit"
              onClick={() => {
                setAlert("block");
              }}
            >
              Publish Test
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
