"use client";
import { Suspense } from "react";
import CaseStudyDetail from "../../components/case studies/CaseStudyDetail";
 
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaseStudyDetail />
    </Suspense>
  );
} 