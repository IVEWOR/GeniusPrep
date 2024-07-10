const { NextResponse } = require("next/server");

import connectDB from "@/db";
import Categories from "@/models/Categories";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")
    try {
        await connectDB();
        const category = await Categories.findOne({ slug });
        return new NextResponse(JSON.stringify(category), { status: 200 });
    } catch (error) {
        return new NextResponse("error in a cat" + error, { status: 500 });
    }
}