"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const WorkSection = () => {
  const [mouseX, setMouseX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const services = [
    {
      title: "SOCIAL MEDIA MANAGEMENT",
      icon: "/assets/Icons/social media management.svg"
    },
    {
      title: "EVENT MEDIA COVERAGE",
      icon: "/assets/Icons/event media coverage.svg"
    },
    {
      title: "DIGITAL MARKETING & WEB DEVELOPMENT",
      icon: "/assets/Icons/digital marketing & web development.svg"
    },
    {
      title: "COMERCIAL VIDEO MARKETING",
      icon: "/assets/Icons/commercial video production.svg"
    },
    {
      title: "MARKETING STRATEGY",
      icon: "/assets/Icons/marketing strategy.svg"
    },
    {
      title: "ANIMATION & MOTION GRAPHICS",
      icon: "/assets/Icons/animation & motion graphics.svg"
    },
    {
      title: "BRANDING",
      icon: "/assets/Icons/branding.svg"
    },
  ];

  const calculateScale = (index) => {
    if (!isHovering || !itemRefs.current[index]) return 1;

    const item = itemRefs.current[index];
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);

    const maxDistance = 150;
    const maxScale = 1.4;
    const minScale = 1;

    if (distance > maxDistance) return minScale;

    const norm = distance / maxDistance;
    return minScale + (maxScale - minScale) * Math.cos(norm * Math.PI / 2);
  };

  const calculateOpacity = (index) => {
    if (!isHovering || !itemRefs.current[index]) return 1;

    const item = itemRefs.current[index];
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);

    const maxDistance = 200;
    if (distance > maxDistance) return 0.3;

    const norm = distance / maxDistance;
    return 0.3 + (1 - norm) * 0.7;
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      setMouseX(e.clientX);
    }
  };

  return (
    <section className="relative bg-white py-40 px-4">
      <div className="md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[64px] font-bold mb-6">
            What We Do
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-7 w-full md:pl-11 pl-5 items-center justify-items-center-safe gap-2"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {services.map((service, index) => {
            const scale = calculateScale(index);
            const opacity = calculateOpacity(index);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="flex flex-col w-[161px] h-[140px] mb-5 md:w-[245px] lg:w-[173px] gap-2 transition-all duration-300 ease-out transform-gpu"
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1.1 ? '-6px' : '0'})`,
                  opacity: opacity,
                  zIndex: scale > 1.2 ? 10 : 1,
                }}
              >
                <Image
                  width={500}
                  height={500}
                  src={service.icon}
                  alt={service.title}
                  className="w-[70px] h-[70px] md:w-[76px] md:h-[76px] lg:w-[80px] lg:h-[80px] object-contain mb-4 transition-transform duration-300"
                  style={{
                    filter: scale > 1.2 ? "brightness(1.1) saturate(1.2)" : "none"
                  }}
                />
                <h3 className="font-bold text-left text-black mb-3 mt-2 text-[16px] md:text-[18px] lg:text-[20px] pr-8 leading-[.95] sub-heading tracking-wide">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
