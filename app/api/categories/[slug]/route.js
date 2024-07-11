import { NextResponse } from "next/server";
import connectDB from "@/db";
import Categories from "@/models/Categories";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { slug } = params;
    const category = await Categories.findOne({ slug });
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching category: " + error, {
      status: 500,
    });
  }
};
