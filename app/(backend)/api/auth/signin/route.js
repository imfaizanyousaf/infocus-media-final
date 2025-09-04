// File: app/(backend)/api/auth/signin/route.js

import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  
  const matchPassword = await bcrypt.compare(password, user.password);


  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  if (!matchPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Login successfully", user: { email: user.email, name: user.name }, token },
    { status: 200 }
  );
}
