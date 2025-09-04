// File: app/(backend)/api/case-studies/route.js

import { connectDB } from "@/lib/mongoose";
import { CaseStudy } from "@/lib/models/CaseStudy";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    await connectDB();

    const { _id, title, description, content, image } = await request.json();

    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      _id,
      { title, description, content, image },
      { new: true }
    );

    if (!updatedCaseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Case study updated successfully", caseStudy: updatedCaseStudy },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
