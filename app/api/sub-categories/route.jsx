import { NextResponse } from "next/server";
import connectDB from "@/db";
import SubCategories from "@/models/SubCategories";

export const GET = async (request) => {
  try {
    await connectDB();
    const subCategories = await SubCategories.find({});
    return new NextResponse(JSON.stringify(subCategories), { status: 200 });
  } catch (error) {
    return new NextResponse("error in fetching sub cats " + error, {
      status: 500,
    });
  }
};
