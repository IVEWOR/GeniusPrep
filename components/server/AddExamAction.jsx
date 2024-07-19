"use server";
import connectDB from "@/db";
import Exam from "@/models/Exam";

async function AddExamAction(formData) {
  // Extracting static fields
  const rawFormData = {
    title: formData.get("title").toString(),
    slug: formData.get("slug").toString(),
    description: formData.get("description").toString(),
    category: formData.get("category").toString(),
    subCategory: formData.get("subCategory").toString(),
  };

  // Extracting dynamic questions
  const questions = [];
  let question = {};
  for (let entry of formData.entries()) {
    const [key, value] = entry;
    if (key.startsWith("questions[")) {
      const match = key.match(/questions\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];

        if (!questions[index]) {
          questions[index] = { options: [] };
        }
        if (field.startsWith("option")) {
          questions[index].options.push(value.toString());
        } else {
          questions[index][field] = value.toString();
        }
      }
    }
  }

  await connectDB();
  const createExam = new Exam({
    title: rawFormData.title,
    slug: rawFormData.slug,
    description: rawFormData.description,
    category: rawFormData.category,
    subCategory: rawFormData.subCategory,
    questions: questions,
  });

  console.log(rawFormData);

  await createExam.save();
}

export default AddExamAction;
