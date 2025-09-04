'use client';
import { Suspense } from 'react';
import CaseStudyDetail from '../../../components/case studies/CaseStudyDetail';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function Page() {
  

  useEffect(() => {
      const lenis = new Lenis({
        duration: 0.6, // Very short
        easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic - quick stop
        smooth: true,
        smoothTouch: false,
        infinite: false,
        gestureDirection: "vertical",
        wheelMultiplier: 0.8, // Reduce wheel sensitivity
        touchMultiplier: 1.0,
      });
  
      let frame;
      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
  
      return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaseStudyDetail />
    </Suspense>
  );
}
