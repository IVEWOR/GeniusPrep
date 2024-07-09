"use client";

import { useEffect, useState } from "react";
import AddSubCategoryAction from "@/components/server/AddSubCategoryAction";

// Fetching the existing categories for the sub-categories form
async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    throw new Error("failed to fetch the categories");
  }
  const categories = await res.json();
  return categories;
}

export default function Page() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        throw new Error("erro fetching cats");
      }
    }
    loadCategories();
  }, []);

  return (
    <form action={AddSubCategoryAction}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter exam category title"
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
      </div>
      <div>
        <button type="submit">Add Sub-Category</button>
      </div>
    </form>
  );
}
