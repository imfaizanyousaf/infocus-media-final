import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const work = await Work.findById(id);

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Work fetched successfully", work },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching work by ID:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 