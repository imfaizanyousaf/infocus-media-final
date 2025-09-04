"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useNavbar } from "@/context/NavBarContext";
import { logoPath } from "@/utils/logoPath";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { setIsNavbarVisible } = useNavbar();

  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const videoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const contentOverlayRef = useRef(null);
  const mobileTextRef = useRef(null);
  const tabletTextRef = useRef(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
 const [logoMaskYOffset, setLogoMaskYOffset] = useState(200);
 const [logoMaskScale, setLogoMaskScale] = useState(12);

  // GSAP animations for large screens
  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const video = videoRef.current;
    const secondVideo = secondVideoRef.current;

    setLogoMaskYOffset(window?.innerHeight * 0.17 ?? 200);
    setLogoMaskScale(window?.innerWidth * 0.0064 ?? 12);

    if (!section || !path || !video || !secondVideo) return;

    // Only run GSAP on large screens
    if (window.innerWidth < 1024) return;

    requestAnimationFrame(() => {
      const pathBounds = path.getBBox();
      const pathWidth = pathBounds.width;
      const viewportWidth = window.innerWidth;

      const startX = 40;
      const endX = ((pathWidth) + (viewportWidth * 2.63)) * -1;

      // Get content elements
      const logo = document.querySelector(".logo-fade");
      const textElements = document.querySelectorAll(".text-fade");
      const contentOverlay = contentOverlayRef.current;

      gsap.set(path, { attr: { transform: `translate(${startX}, ${logoMaskYOffset}) scale(${logoMaskScale})` } });
      gsap.set(video, {
        y: 0,
        height: "100vh",
        width: "100vw",
        objectFit: "cover",
      });

      // Position second video initially below viewport
      gsap.set(secondVideo, {
        y: "100vh",
        height: "100vh",
        width: "100vw",
        objectFit: "cover",
      });

      // Hide content initially and position it
      if (logo) gsap.set(logo, { opacity: 0, y: 50 });
      if (textElements.length) {
        gsap.set(textElements, { opacity: 0, y: 30 });
      }
      if (contentOverlay) {
        gsap.set(contentOverlay, {
          y: 0,
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100vh",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Hide navbar from when second video starts (70%) until content finishes appearing (after 95%)
            setIsNavbarVisible(self.progress < 0.7 || self.progress > 0.98);
          },
        },
      });

      // Path animation (first 70% of timeline) - horizontal scroll
      tl.to(path, {
        attr: { transform: `translate(${endX}, ${logoMaskYOffset}) scale(${logoMaskScale})` },
        ease: "power1.out",
        duration: 0.7,
      })
        // At 70% completion, start moving second video up from bottom
        .to(
          secondVideo,
          {
            y: 0,
            ease: "power2.out",
            duration: 0.3,
          },
          0.7
        )
        // Fade out the white mask simultaneously with color change
        .to(
          ".path-mask-rect",
          {
            opacity: 0,
            ease: "power2.out",
            duration: 0.15,
          },
          0.85
        )
        // Content fade-in animation
        .to(
          logo,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.05,
          },
          0.9
        )
        .to(
          textElements,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.05,
            stagger: 0.01,
          },
          0.95
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // GSAP animations for tablet
  useEffect(() => {
    const container = tabletTextRef.current;
    if (!container || window.innerWidth >= 1024 || window.innerWidth < 768)
      return;

    const textElement = container.querySelector(".tablet-text");

    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(textElement, {
            y: progress * window.innerHeight,
            duration: 0,
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // GSAP animations for mobile
  useEffect(() => {
    const container = mobileTextRef.current;
    if (!container || window.innerWidth >= 768) return;

    const textElement = container.querySelector(".mobile-text");

    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.9,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setTimeout(() => {
      setIsHeroLoaded(true);
    }, 1500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadeddata", handleVideoLoad);
      return () => {
        video.removeEventListener("loadeddata", handleVideoLoad);
      };
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* First Video Element - Main background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 w-screen h-screen object-cover"
        src="/media-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      />

      {/* Second Video Element - Animates from bottom to top */}
      <video
        ref={secondVideoRef}
        className="absolute inset-0 z-50 w-screen h-screen object-cover"
        src="/media-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      />

      {/* Content overlay */}
      <div
        ref={contentOverlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-50 px-4 pointer-events-none h-screen"
      >
        <div className="w-full absolute inset-0 h-full"></div>

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
            lineHeight: 1.2,
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
            lineHeight: 1.2,
          }}
        >
          and our vision soars high
        </p>
      </div>

      {/* Large Screens (Desktop) */}
      <div className="hidden lg:block">
        <div className="h-screen relative">
          <div className="absolute inset-0 z-10">
            <div className="sticky top-10 h-screen">
              <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <mask
                    id="path-mask"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    maskUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <path
                      ref={pathRef}
                      d={logoPath}
                      fill="black"
                      transform={`translate(40, ${logoMaskYOffset}) scale(${logoMaskScale})`}
                    />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="white"
                  mask="url(#path-mask)"
                  className="path-mask-rect"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}