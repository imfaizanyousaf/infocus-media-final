"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TransformGlobe = () => {
  const sectionRef = useRef(null);
  const transformContentRef = useRef(null);
  const insightContentRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure other GSAP animations have initialized
    const initTimeout = setTimeout(() => {
      const section = sectionRef.current;
      const transformContent = transformContentRef.current;
      const insightContent = insightContentRef.current;
      const background = backgroundRef.current;

      if (!section || !transformContent || !insightContent || !background)
        return;

      // Set initial states
      gsap.set(insightContent, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(transformContent, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(background, {
        opacity: 0,
        backgroundSize: "50% auto"
      });

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: "transform-globe",
          refreshPriority: -1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      tl
        .to(
          background,
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0
        )
        .to(
          background,
          {
            backgroundSize: "150% auto",
            duration: 2,
            ease: "none",
          },
          0
        )
        // Transform content enter animation
        .to(
          transformContent,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          0.1
        )
        // Hold time for transform content
        .to({}, { duration: 0.3 })
        // Transform content exit animation
        .to(
          transformContent,
          {
            opacity: 0,
            y: -40,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.8
        )
        // Insight content enter animation
        .to(
          insightContent,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.1)",
          },
          1
        )
        // Hold time for insight content
        .to({}, { duration: 0.4 })
        // Insight content exit animation
        .to(
          insightContent,
          {
            opacity: 0,
            y: -30,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.in",
          },
          1.8
        )
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getById("transform-globe")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white opacity-100 w-screen"
      style={{
        zIndex: 1,
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {/* Image Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-[url(/blob-poster.png)] bg-no-repeat bg-center"
        style={{
          willChange: "background-size, opacity",
          top: 0,
          left: 0,
        }}
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Transform content */}
        <div
          ref={transformContentRef}
          className="flex flex-col items-center justify-center absolute inset-0"
        >
          <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mb-4 sub-heading">
            WE don't see brands, we see possibilities
          </p>
          <div className="flex flex-col leading-[.95]">
            <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center mb-2">
              We transform ideas
            </h1>
            <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center">
              into visual stories
            </h1>
          </div>
          <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mt-4 sub-heading">
            and we know what your brand needs
          </p>
        </div>

        {/* Insight content */}
        <div
          ref={insightContentRef}
          className="flex flex-col items-center justify-center absolute inset-0"
        >
          <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mb-4 sub-heading">
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
          <Link
            href="/contacts"
            className="mt-5 bg-black rounded-md text-white px-8 py-4 font-bold cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 text-center"
          >
            Let's Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TransformGlobe;