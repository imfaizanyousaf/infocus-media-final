
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Create FormData for Cloudinary
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", file);
    cloudinaryData.append("upload_preset", "fiverr");

    const cloudinaryRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dc3ytk5jo/image/upload",
      cloudinaryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return NextResponse.json({
      secure_url: cloudinaryRes.data.secure_url,
      public_id: cloudinaryRes.data.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
