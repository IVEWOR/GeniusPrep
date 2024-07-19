"use client";

import { useEffect, useState } from "react";
import AddSubCategoryAction from "@/components/server/AddSubCategoryAction";
import FieldWrap from "@/components/server/form/FieldWrap";
import Label from "@/components/server/form/Label";
import Input from "@/components/server/form/Input";

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
    <form
      className="max-w-6xl mx-auto my-10 px-4"
      action={AddSubCategoryAction}
    >
      <FieldWrap>
        <Label htmlfor="title" text="Title" />
        <Input
          name={"title"}
          placeholder={"Sub category title"}
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
      <FieldWrap>
        <Label htmlfor="category" text="Category" />
        <select
          name="category"
          id="category"
          className="outline-none border p-2 rounded text-sm"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </FieldWrap>
      <div>
        <button
          className="bg-emerald-500 text-white block text-sm p-2 px-5 rounded"
          type="submit"
        >
          Add Sub-Category
        </button>
      </div>
    </form>
  );
}
