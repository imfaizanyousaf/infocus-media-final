"use client";
import Footer from '@/components/home/Footer'
import FooterGlobe from '@/components/home/FooterGlobe'
import BuilderSection from '@/components/our-story/BuilderSection'
import HeroSection from '@/components/our-story/HeroSection'
import OpportunitySection from '@/components/our-story/OpportunitySection'
import TimeLine from '@/components/our-story/TimeLine'
import VerticalTimeLine from '@/components/our-story/VerticalTimeLine'
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
    <div className="relative">
      <HeroSection/>
      <BuilderSection/>
      <div className="relative bg-[#FAFAFA]">

       <TimeLine/>
      </div>
      <VerticalTimeLine/>
      <OpportunitySection/>
      {/* <FooterGlobe/> */}
      <Footer/>
    </div>
  )
}

export default page
