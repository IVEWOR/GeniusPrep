const { NextResponse } = require("next/server");
import connectDB from "@/db";
import Exam from "@/models/Exam";

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { slug } = params;
        const exam = await Exam.findOne({ slug });
        if (!exam) {
            return new NextResponse(`not found`, { status: 404 })
        }

        return new NextResponse(JSON.stringify(exam), { status: 200 });
    } catch (error) {
        return new NextResponse(`fetching error ${error}`, {
            status: 500,
        });
    }
};