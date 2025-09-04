// File: app/(backend)/api/auth/update-user/[id]/route.js

import { User } from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { name, email, password } = await request.json();


    console.log(name, email, password);
    console.log(id);

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
