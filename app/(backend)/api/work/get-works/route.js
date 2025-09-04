import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let works;

    if (category) {
      // Fetch works by category
      works = await Work.find({ category }).sort({ createdAt: -1 });
    } else {
      // Fetch all works
      works = await Work.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json(
      { message: "Works retrieved successfully", works },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error getting works:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
