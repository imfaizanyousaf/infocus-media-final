import { connectDB } from "@/lib/mongoose";
import { CaseStudy } from "@/lib/models/CaseStudy";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedCaseStudy = await CaseStudy.findByIdAndDelete(id);

    if (!deletedCaseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Case study deleted successfully", deletedCaseStudy },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
