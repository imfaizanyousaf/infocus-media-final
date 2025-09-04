import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Work deleted successfully", deletedWork },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting work:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 