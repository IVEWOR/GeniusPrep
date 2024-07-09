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

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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
      <div>
        <button type="submit">Add Test</button>
      </div>
    </form>
  );
}
