import connectDB from "@/db";
import Categories from "@/models/Categories";
import Label from "@/components/server/form/Label";
import FieldWrap from "@/components/server/form/FieldWrap";
import Input from "@/components/server/form/Input";

async function AddCategoryAction(formData) {
  "use server";
  const rawFormData = {
    title: formData.get("title").toString(),
    description: formData.get("description").toString(),
    slug: formData.get("slug").toString(),
  };
  await connectDB();
  const createCategory = new Categories({
    title: rawFormData.title,
    description: rawFormData.description,
    slug: rawFormData.slug,
  });
  await createCategory.save();
}

export default function Page() {
  return (
    <form className="max-w-6xl mx-auto my-10 px-4" action={AddCategoryAction}>
      <FieldWrap>
        <Label htmlfor="title" text="Title" />
        <Input
          name={"title"}
          placeholder={"Title"}
          id={"title"}
          required={true}
        />
      </FieldWrap>
      <FieldWrap>
        <Label htmlfor="slug" text="Slug" />
        <Input name={"slug"} placeholder={"Slug"} id={"slug"} required={true} />
      </FieldWrap>

      <FieldWrap>
        <label htmlFor="description">Description</label>
        <textarea
          className="outline-none border rounded p-2 text-sm"
          name="description"
          id="description"
        ></textarea>
      </FieldWrap>
      <div>
        <button
          className="bg-emerald-500 text-white block text-sm p-2 px-5 rounded"
          type="submit"
        >
          Add Category
        </button>
      </div>
    </form>
  );
}
