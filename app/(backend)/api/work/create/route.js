import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.json();
    const { 
      title, 
      category, 
      client, 
      location, 
      videoLink, 
      videoLinks, 
      images, 
      status
    } = formData;

    // Basic validation
    if (!title || !category || !client) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    // Create the work entry
    const work = await Work.create({
      title,
      category,
      client,
      location,
      videoLink: videoLink || '',
      videoLinks: videoLinks || [],
      images: images || [],
      status: status || 'published'
    });

    return NextResponse.json(
      { message: "Work created successfully", work },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
