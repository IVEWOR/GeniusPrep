const { NextResponse } = require("next/server");
import connectDB from "@/db";
import SubCategories from "@/models/SubCategories";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { slug } = params;
    const subCategory = await SubCategories.findOne({ slug });

    if (!subCategory) {
      return new NextResponse(`sub category not found`, { status: 404 });
    }

    return new NextResponse(JSON.stringify(subCategory), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error in fetching sub category ${error}`, {
      status: 500,
    });
  }
};
