"use client"

import Footer from '@/components/home/Footer'
import HeroSection from '@/components/team/HeroSection'
import MembersSection from '@/components/team/MembersSection'
import TeamLocationSection from '@/components/team/TeamLocationSection'
import React from 'react'
import { useEffect } from 'react'
import Lenis from "@studio-freight/lenis";

const page = () => {

  
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
    <div>
     <HeroSection/>
     <MembersSection/>
     <TeamLocationSection/>
     <Footer/>
    </div>
  )
}

export default page
