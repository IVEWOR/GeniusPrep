import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
});

const ExamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
