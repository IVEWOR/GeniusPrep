import { NextResponse } from "next/server";
import connectDB from "@/db";
import Exam from "@/models/Exam";

export const GET = async (request) => {
  try {
    await connectDB();
    const exam = await Exam.find({});
    return new NextResponse(JSON.stringify(exam), { status: 200 });
  } catch (error) {
    return new NextResponse("error in fetching exams " + error, {
      status: 500,
    });
  }
};
