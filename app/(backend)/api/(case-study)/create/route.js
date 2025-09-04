// File: app/(backend)/api/case-studies/route.js

import { connectDB } from "@/lib/mongoose";
import { CaseStudy } from "@/lib/models/CaseStudy";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { title, description, content, image } = await request.json();

    console.log(title, description, content, image);

    // Basic validation (optional but recommended)
    if (!title || !description || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the case study
    const caseStudy = await CaseStudy.create({ title, description, content, image });

    return NextResponse.json(
      { message: "Case study stored successfully", caseStudy },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
