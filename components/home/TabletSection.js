"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavbar } from "@/context/NavBarContext";

gsap.registerPlugin(ScrollTrigger);

export default function TabletSection() {
  const { setIsNavbarVisible } = useNavbar();
  const mobileVideoRef = useRef(null);
  const mobileVideoSectionRef = useRef(null);
  const mobileContentOverlayRef = useRef(null);
  const mobileTextSectionRef = useRef(null);
  const mobileSectionRef = useRef(null);

  // Mobile video animation
  useEffect(() => {
    const mobileSection = mobileSectionRef.current;
    const video = mobileVideoRef.current;
    const contentOverlay = mobileContentOverlayRef.current;
    const mobileTextSection = mobileTextSectionRef.current;

    if (!mobileSection || !video || !contentOverlay || !mobileTextSection || window.innerWidth >= 768) return;

    // Get content elements
    const logo = contentOverlay.querySelector(".logo-fade");
    const textElements = contentOverlay.querySelectorAll(".text-fade");
    const mobileTextElement = mobileTextSection.querySelector(".mobile-text");

    // Initial setup - like desktop
    gsap.set(video, {
      y: "100vh", // Start below viewport like desktop secondVideo
      height: "100vh",
      width: "100vw",
      objectFit: "cover",
    });

    // Hide content initially
    if (logo) gsap.set(logo, { opacity: 0, y: 50 });
    if (textElements.length) {
      gsap.set(textElements, { opacity: 0, y: 30 });
    }

    // Position content overlay with video
    gsap.set(contentOverlay, {
      y: "100vh",
    });

    // Set initial text position - position to show "I" first
    if (mobileTextElement) {
      // Calculate offset to show "I" at the start, with extra whitespace above if needed
      const textOffset = window.innerHeight * 1.1; // Start further down to show "I" first
      gsap.set(mobileTextElement, { 
        y: textOffset // Since text is rotated 90deg, y controls horizontal position
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mobileSection,
        start: "top top",
        end: "+=4000", // Like desktop's +=5000 but shorter for mobile
        scrub: 1,
        pin: true, // Pin the section like desktop
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Hide navbar when video starts moving but show it after animation completes
          if (progress < 0.7) {
            setIsNavbarVisible(true); // Show navbar during text scroll phase
          } else if (progress >= 0.7 && progress < 1.0) {
            setIsNavbarVisible(false); // Hide navbar during video transition
          } else {
            setIsNavbarVisible(true); // Show navbar after animation completes
          }
          
          // Text scrolling animation (0% to 70%) - moves up vertically (bottom to top)
          if (mobileTextElement && progress <= 0.7) {
            const textProgress = progress / 0.7;
            // Since text is rotated 90deg, y controls horizontal movement
            const initialOffset = window.innerHeight * 1.1; // Start further down to show "I" first
            const textY = initialOffset - (textProgress * window.innerHeight * 1.8); // Faster scroll with more distance
            gsap.set(mobileTextElement, { y: textY });
          }
          
          // Video moves up from bottom (70% to 100%) - like desktop secondVideo
          if (progress >= 0.7) {
            const videoProgress = (progress - 0.7) / 0.3; // 0.7 to 1.0 becomes 0 to 1
            const videoY = (1 - videoProgress) * window.innerHeight;
            
            gsap.set(video, { y: videoY });
            gsap.set(contentOverlay, { y: videoY });
          }

          // Content fade in animation (90% to 95%) - like desktop with stagger
          if (progress >= 0.9 && progress <= 0.95) {
            const contentProgress = (progress - 0.9) / 0.05;
            
            // Logo fades in first
            if (logo) {
              gsap.set(logo, {
                opacity: contentProgress,
                y: 50 * (1 - contentProgress),
              });
            }
            
            // Text elements fade in with stagger (like desktop)
            if (textElements.length) {
              textElements.forEach((el, index) => {
                const staggerDelay = index * 0.3; // Stagger delay
                const adjustedProgress = Math.max(0, Math.min(1, (contentProgress - staggerDelay) / (1 - staggerDelay)));
                
                gsap.set(el, {
                  opacity: adjustedProgress,
                  y: 30 * (1 - adjustedProgress),
                });
              });
            }
          }
        },
      },
    });

    // Cleanup function to ensure navbar is visible after component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setIsNavbarVisible(true);
    };
  }, [setIsNavbarVisible]);

  return (
    <div
      className="relative w-screen overflow-hidden"
    >
      
      <div 
        className="hidden md:flex lg:hidden min-h-[170vh] h-screen bg-white flex-col justify-center items-center"
      >
        <div className="mt-[-8vh] flex justify-center tablet-text">
          <h1 className="text-[55vw] font-bold text-black rotate-90 leading-none">
            Infocus Media <span className="text-[12vw] align-super">®</span>
          </h1>
        </div>
      </div>

      {/* Mobile Section - Pinned container like desktop */}
      <div 
        ref={mobileSectionRef}
        className="md:hidden relative w-screen"
        style={{ height: "100vh" }}
      >
        {/* Mobile Text Section - Inside pinned container */}
        <div 
          ref={mobileTextSectionRef}
          className="absolute inset-0 bg-white flex flex-col justify-center items-center z-10"
        >
          <div className="flex justify-center items-center mobile-text w-full h-full">
            <div className="transform rotate-90 origin-center">
              <h1 className="text-[60vw]   xs:text-[75vw] sm:text-[80vw] font-bold text-black whitespace-nowrap leading-none pr-50   py-[20vh]">
                Infocus Media<sup>®</sup>    
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Video - Inside pinned container */}
        <video
          ref={mobileVideoRef}
          className="absolute inset-0 z-20 w-full h-full object-cover"
          src="/media-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            width: "150vw",
            height: "100vh",
            minWidth: "150vw",
            minHeight: "100vh",
            maxWidth: "none",
            maxHeight: "none",
            objectFit: "fill",
          }}
        />

        {/* Mobile Content overlay - Inside pinned container */}
        <div
          ref={mobileContentOverlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-30"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="logo-fade w-[70%] xs:w-[75%] sm:w-[80%] max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] h-auto mb-4 xs:mb-5 sm:mb-6 object-contain"
          />
          <p
            className="text-fade uppercase text-white text-[14px] xs:text-[15px] sm:text-[16px] mb-1 xs:mb-2"
            style={{
              fontFamily: "'Almarai', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Born from Emirati soil, our roots run deep
          </p>
          <p
            className="text-fade uppercase text-white text-[14px] xs:text-[15px] sm:text-[16px]"
            style={{
              fontFamily: "'Almarai', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            and our vision soars high
          </p>
        </div>
      </div>
    </div>
  );
}