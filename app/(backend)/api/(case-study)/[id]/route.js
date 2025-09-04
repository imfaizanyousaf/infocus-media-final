import { connectDB } from "@/lib/mongoose";
import { CaseStudy } from "@/lib/models/CaseStudy";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const caseStudy = await CaseStudy.findById(id);

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Case study fetched successfully", caseStudy },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching case study by ID:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
