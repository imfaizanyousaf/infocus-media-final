"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudies from "../CaseStudies";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SheikhCaseStudiesContainer = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const portraitRef = useRef(null);
  const contentRef = useRef(null);

  const words = ["design", "imagine"];

  // Typing effect
  useEffect(() => {
    const currentWordText = words[currentWord];

    if (!isDeleting) {
      if (displayText.length < currentWordText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWordText.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }
  }, [displayText, isDeleting, currentWord, words]);

  // Parallax effect with GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (portraitRef.current && contentRef.current) {
        gsap.to(portraitRef.current, {
          y: () => {
            // Calculate dynamic movement based on content height
            const contentHeight = contentRef.current.offsetHeight;
            return -contentHeight * 0.2; // Move 30% of content height
          },
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top center", // Start when content top hits viewport bottom
            end: "bottom top", // End when content bottom hits viewport top
            scrub: 0.5, // Smoothly follows scroll with slight lag
            invalidateOnRefresh: true,
            anticipatePin: 1, // Ensures fixed positioning works smoothly
          },
        });
      }
    });

    // Refresh ScrollTrigger after rendering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* Fixed Portrait Section with Parallax */}
      <div ref={portraitRef} className="fixed inset-0 w-full h-screen -z-10">
        <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-10 bg-white">
          {/* Image Container */}
          <div className="w-full md:w-2/3 h-full">
            <Image
              width={500}
              height={500}
              src="/assets/portrait.png"
              alt="Portrait"
              className="w-full h-full object-contain mt-40 object-bottom-left"
            />
          </div>

          {/* Text Container */}
          <div className="w-full lg:w-[90%]  text-black font-bandeins-strange px-2 sm:px-4 flex flex-col text-left text-[28px] xs:text-[32px] sm:text-[36px] md:text-[54px] lg:text-[67px] leading-[.99] items-start lg:items-center">
            <div className="flex flex-col gap-0">
              <h1 className="text-green-500 font-bold md:ml-[-230px] lg:ml-0">
                "
              </h1>
              <h1 className="font-bold">The future</h1>
              <h1 className="font-bold">belongs to those</h1>
              <h1 className="font-bold">
                who can <span className="text-green-500">{displayText}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-500"
                >
                  |
                </motion.span>
              </h1>
              <p className="font-bold text-xs xs:text-sm sm:text-base md:text-[22px] uppercase mt-4 sm:mt-6 leading-tight">
                H.H. Sheikh Mohammed bin Rashid Al Maktoum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section (Spacer + Foreground) */}
      <div ref={contentRef}>
        {/* Spacer to allow portrait to be seen first */}
        <div className="h-[60vh]"></div>

        {/* Foreground Section appears after portrait */}
        <div className="relative z-10">
          <div className="min-h-[100vh] bg-white">
            <CaseStudies />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SheikhCaseStudiesContainer;