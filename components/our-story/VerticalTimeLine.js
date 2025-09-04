"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { VerticalTimeLineData } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

const VerticalTimeLine = () => {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  
  useEffect(() => {
  const updateProgress = (index) => {
    setScrollProgress(index  / VerticalTimeLineData.length);
  };

  const sections = gsap.utils.toArray(".timeline-item");

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom bottom",
      onEnter: () => updateProgress(i + 1),
      onEnterBack: () => updateProgress(i + 1),
    });
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);


  const getItemColorProgress = (index) => {
    const totalItems = VerticalTimeLineData.length;
    const itemThreshold = (index + 1) / totalItems;
    console.log("itemThreshold", itemThreshold);
    console.log("scrollProgress", scrollProgress);
    return scrollProgress >= itemThreshold ;
  };

  return (
    <div className="block lg:hidden w-full bg-[#FAFAFA] px-4 md:px-8 py-20">
      

      <div ref={timelineRef} className="flex flex-col ">
        {VerticalTimeLineData.map((item, index) => {
          const isColored = getItemColorProgress(index);
          const isLast = index === VerticalTimeLineData.length - 1;

          return (
            <div
              key={index}
              className="timeline-item flex gap-6 relative"
            >
              {/* Left: Dot and Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-[24px] h-[24px] rounded-full mt-1 ${
                    isColored ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                {!isLast && (
                  <div
                    className={`h-[220px] w-[1px] ${
                      isColored ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>

              {/* Right: Content */}
              <div className="flex flex-col gap-2">
                <div
                  className={`text-[48px] font-bold leading-[1] ${
                    isColored ? "text-green-500" : "text-black"
                  }`}
                >
                  {item.title}
                </div>
                <div
                  className={`text-[22px] font-medium ${
                    isColored ? "text-green-500" : "text-black"
                  }`}
                >
                  {item.subTitle}
                </div>
                {item.description.map((desc, i) => (
                  <p
                    key={i}
                    className="text-[22px] text-gray-500 max-w-[400px] leading-[1.4]"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalTimeLine;
