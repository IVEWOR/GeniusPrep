"use server";
import connectDB from "@/db";
import SubCategories from "@/models/SubCategories";

async function AddSubCategoryAction(formData) {
  const rawFormData = {
    title: formData.get("title").toString(),
    description: formData.get("description").toString(),
    slug: formData.get("slug").toString(),
    category: formData.get("category").toString(), // Ensure this matches the form field name
  };
  await connectDB();
  const createSubCategory = new SubCategories({
    title: rawFormData.title,
    description: rawFormData.description,
    slug: rawFormData.slug,
    category: rawFormData.category,
  });
  await createSubCategory.save();
}

export default AddSubCategoryAction;
