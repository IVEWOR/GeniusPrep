import { NextResponse } from "next/server";
import connectDB from "@/db";
import Categories from "@/models/Categories";

export const GET = async (request) => {
  try {
    await connectDB();
    const categories = await Categories.find({});
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching categories: " + error, {
      status: 500,
    });
  }
};
