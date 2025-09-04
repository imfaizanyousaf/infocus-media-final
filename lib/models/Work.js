import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['video-production', 'motion-graphics', 'social-media', 'animation', 'event-coverage']
  },
  client: { type: String, required: true },
  location: { type: String, default: '' },
  
  // For categories with single video link (video-production, motion-graphics, event-coverage)
  videoLink: { type: String, default: '' },
  
  // For categories with multiple video links (animation)
  videoLinks: [{ type: String }],
  
  // For categories with multiple images (social-media)
  images: [{ type: String }],
  
  // Status
  status: { 
    type: String, 
    enum: ['draft', 'published'],
    default: 'published'
  }
}, { timestamps: true });

export const Work = mongoose.models.Work || mongoose.model("Work", workSchema); 