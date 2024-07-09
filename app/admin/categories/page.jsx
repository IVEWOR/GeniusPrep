import connectDB from "@/db";
import Categories from "@/models/Categories";

async function AddCategoryAction(formData) {
  "use server";
  const rawFormData = {
    title: formData.get("title").toString(),
    description: formData.get("description").toString(),
  };
  await connectDB();
  const createCategory = new Categories({
    title: rawFormData.title,
    description: rawFormData.description,
  });
  await createCategory.save();
}

export default function Page() {
  return (
    <form action={AddCategoryAction}>
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
        <button type="submit">Add Category</button>
      </div>
    </form>
  );
}
