import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Token is valid", user: { id: user._id, email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
} 