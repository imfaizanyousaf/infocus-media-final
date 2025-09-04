// File: app/(backend)/api/case-studies/route.js

import { connectDB } from "@/lib/mongoose";
import { CaseStudy } from "@/lib/models/CaseStudy";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch all case studies
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Case studies retrieved successfully", caseStudies },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error getting case studies:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
