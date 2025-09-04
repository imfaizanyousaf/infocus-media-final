import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    await connectDB();

    const { 
      _id, 
      title, 
      category, 
      client, 
      location, 
      videoLink, 
      videoLinks, 
      images, 
      status
    } = await request.json();

    if (!_id) {
      return NextResponse.json({ error: "Work ID is required" }, { status: 400 });
    }

    // Category-specific validation
    if (category === 'video-production' || category === 'motion-graphics' || category === 'event-coverage') {
      if (!videoLink) {
        return NextResponse.json({ error: `${category} requires a video link` }, { status: 400 });
      }
    }

    if (category === 'animation') {
      if (!videoLinks || videoLinks.length === 0) {
        return NextResponse.json({ error: "Animation category requires at least one video link" }, { status: 400 });
      }
    }

    if (category === 'social-media') {
      if (!images || images.length === 0) {
        return NextResponse.json({ error: "Social media category requires at least one image" }, { status: 400 });
      }
    }

    const updatedWork = await Work.findByIdAndUpdate(
      _id,
      { 
        title, 
        category, 
        client, 
        location, 
        videoLink: videoLink || '',
        videoLinks: videoLinks || [],
        images: images || [],
        status: status || 'published'
      },
      { new: true }
    );

    if (!updatedWork) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Work updated successfully", work: updatedWork },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating work:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 