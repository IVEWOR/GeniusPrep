import mongoose from "mongoose";

const { Schema } = mongoose;

const ExamSchema = new Schema(
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
    qna: [
      {
        questions: {
          type: String,
          options: [
            {
              option: {
                type: String,
              },
            },
          ],
          answer: {
            type: String,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
