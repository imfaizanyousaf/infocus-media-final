"use client";
import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    
    console.log("useLayoutEffect triggered");
    
    if (!video || !section) {
      console.warn("Video or section not found");
      return;
    }

    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setIsVideoLoaded(true);
      video.pause();
      video.currentTime = 0;
      
      const videoDuration = video.duration || 6;
      console.log("Video duration:", videoDuration);

      // Set initial states for content
      gsap.set(".logo-fade", { opacity: 0, y: 30 });
      gsap.set(".text-fade", { opacity: 0, y: 20 });

      // Create the animation with proper pinning - only starts when section is in view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", // Changed from "top top" to "top center" - only starts when section reaches center
          end: () => `+=${videoDuration * 400}`, // Reduced multiplier for smoother experience
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          refreshPriority: -1, // Changed to -1 to avoid conflicts
          invalidateOnRefresh: true,
          id: "top-section-pin",
          markers: false,
          onStart: () => {
            console.log("Animation started");
          },
          onComplete: () => {
            console.log("Animation completed");
          },
          onUpdate: (self) => {
            // Ensure video stays synced with scroll
            const progress = self.progress;
            const targetTime = videoDuration * progress;
            if (Math.abs(video.currentTime - targetTime) > 0.1) {
              video.currentTime = targetTime;
            }
          },
          onEnter: () => {
            // Reset video when entering the section
            if (video.readyState >= 2) {
              video.currentTime = 0;
            }
          }
        },
      });

      console.log("GSAP timeline initialized");
      
      // Hold initial state briefly before starting
      tl.to({}, { duration: 0.1 })
        // Animate video playback
        .to(video, {
          currentTime: videoDuration,
          ease: "none",
          duration: 0.8 // Most of the timeline for video
        }, 0.1)
        // Fade in content early in the animation
        .to(".logo-fade", {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        }, 0.15)
        .to(".text-fade", {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out"
        }, 0.25);
    };

    // Add event listener
    video.addEventListener("loadeddata", handleLoadedData);
    console.log("Event listener added for 'loadeddata'");

    // Fallback: If video is already loaded
    if (video.readyState >= 2) {
      setTimeout(handleLoadedData, 100);
    }

    return () => {
      console.log("Cleanup useLayoutEffect");
      video.removeEventListener("loadeddata", handleLoadedData);
      ScrollTrigger.getById("top-section-pin")?.kill();
    };
  }, []);

  return (
    <div className="relative w-full">
      <section
        ref={sectionRef}
        className="relative h-screen bg-black overflow-hidden"
        style={{ 
          zIndex: 2, // Higher z-index for proper layering
            marginTop: 0,
            paddingTop: 0 
          }}
          >
          <video
            ref={videoRef}
            src="/final2.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{ 
            willChange: "transform",
            top: 0,
            left: 0
            }}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
            <img
            src="/logo.png"
            alt="Logo"
            className="logo-fade w-3/4 max-w-[580px] max-h-[68px] mb-6 object-contain"
            />
            <p
            className="text-fade uppercase text-white text-[15px] md:text-[18px] lg:text-[22px] mb-1"
            style={{
              fontFamily: "'Almarai', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.2
            }}
            >
            Born from Emirati soil, our roots run deep
            </p>
            <p
            className="text-fade uppercase text-white text-[16px] md:text-[18px] lg:text-[22px]"
            style={{
              fontFamily: "'Almarai', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.2
            }}
            >
            and our vision soars high
            </p>
          </div>
          
          {/* Loading indicator */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white text-black z-20">
            <div className=" text-lg">Loading...</div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TopSection;