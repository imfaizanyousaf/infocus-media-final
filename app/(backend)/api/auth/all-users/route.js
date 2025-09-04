// File: app/(backend)/api/auth/signin/route.js

import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});

    return NextResponse.json(
      { message: "Users fetched successfully", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
