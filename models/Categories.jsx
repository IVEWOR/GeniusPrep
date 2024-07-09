import mongoose from "mongoose";

const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Categories ||
  mongoose.model("Categories", categoriesSchema);
