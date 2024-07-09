"use server";
import connectDB from "@/db";
import Exam from "@/models/Exam";

async function AddExamAction(formData) {
  const rawFormData = {
    title: formData.get("title").toString(),
    description: formData.get("description").toString(),
    category: formData.get("category").toString(),
    subCategory: formData.get("subCategory").toString(),
  };
  await connectDB();
  const createExam = new Exam({
    title: rawFormData.title,
    description: rawFormData.description,
    category: rawFormData.category,
    subCategory: rawFormData.subCategory,
  });
  await createExam.save();
}

export default AddExamAction;
