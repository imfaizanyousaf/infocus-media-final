// File: app/(backend)/api/auth/signup/route.js

import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  await connectDB();

  const { email, name, password } = await request.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({ email, name, password: hashedPassword });

  return NextResponse.json(
    { message: "User registered successfully", user: { email: user.email, name: user.name } },
    { status: 201 }
  );
}
