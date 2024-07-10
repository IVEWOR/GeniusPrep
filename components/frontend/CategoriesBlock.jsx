"use client";

import { useEffect, useState } from "react";
import Category from "./Category";

// fetch cats from db
async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    throw new Error("failed to fetch the categories [categories block]");
  }
  const data = await res.json();
  return data;
}

export default function CategoriesBlock() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCats() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        throw new Error(`Error fetching cats |:| ${err}`);
      }
    }
    loadCats();
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-5">
        {categories.map((category) => (
          <Category key={category._id} title={category.title} link="#" />
        ))}
      </div>
    </div>
  );
}
