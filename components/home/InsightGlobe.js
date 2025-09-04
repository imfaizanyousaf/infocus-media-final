"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";


const InsightGlobe = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

 
  
    useEffect(() => {
      const video = videoRef.current;
      const section = sectionRef.current;
      if (!video || !section || typeof window === 'undefined') return;
  
      video.pause();

      let lastScrollY = window.scrollY;
      let ticking = false;
      let lastTimestamp = performance.now();
      let scrollTimeout;
  
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame((timestamp) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
  
            // Only play if section is in view
            if (
              rect.top < windowHeight &&
              rect.bottom > 0
            ) {
              // Calculate scroll speed
              const scrollDelta = Math.abs(window.scrollY - lastScrollY);
              const timeDelta = timestamp - lastTimestamp;
              lastScrollY = window.scrollY;
              lastTimestamp = timestamp;

              // Map scroll speed to playbackRate (min 0.5, max 2)
              let playbackRate = Math.min(2, Math.max(0.5, scrollDelta / (timeDelta / 16)));
              video.playbackRate = playbackRate;
              video.play();

              // Pause video if no scroll for 150ms
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                video.pause();
              }, 150);
            } else {
              video.pause();
            }
            ticking = false;
          });
          ticking = true;
        }
      };
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, []);

  return (
    
      <section
        ref={sectionRef}
        className="relative bg-white h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/Blob2.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
        
          style={{ willChange: 'transform' }}
        />

        {/* Text Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-100"
          style={{ zIndex: 2 }}
        >
          <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mb-4">
          we make your audience feel, think, and act
          </p>
          <div className="flex flex-col leading-[.95]">
            <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center mb-2">
              We turn insights
            </h1>
            <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center">
              into impact
            </h1>
          </div>
          <Link href="/contacts" className="mt-5 bg-black rounded-md text-white px-8 py-4 font-bold tracking-wide transition-transform duration-300 hover:scale-105 text-center">
            Let's Get Started
          </Link>
        </div>
      </section>
    
  );
};

export default InsightGlobe;
