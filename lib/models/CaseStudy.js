import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  
}, { timestamps: true });



export const CaseStudy = mongoose.models.UserStudy || mongoose.model("UserStudy", caseStudySchema);
