import { NextResponse } from "next/server";
import connectDB from "@/db";
import SubCategories from "@/models/SubCategories";

export const GET = async (request) => {
  try {
    await connectDB();
    return new NextResponse("db connected and working", { status: 200 });
  } catch (error) {
    return new NextResponse("error in fetching sub cats " + error, {
      status: 500,
    });
  }
};
