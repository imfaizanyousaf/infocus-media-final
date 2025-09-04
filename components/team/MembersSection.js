
"use client";
import React, { useEffect, useRef, useState } from "react";

const teamData = {
  strategy: ["Founder & CEO"],
  creative: ["Art Director", "Animation Lead", "Animator", "JR.ART DIRECTOR", "GRAPHIC DESIGNER"],
  social: [
    "ACCOUNT DIRECTOR",
    "ASSOCIATE DIRECTOR",
    "ORM LEAD",
    "SR.ACCOUNT MANAGER",
    "ACCOUNT MANAGER",
    "SR.ORM EXECUTIVE",
    "SR.ACCOUNT EXECUTIVE",
    "ACCOUNT EXECUTIVE",
    "ARABIC COPYWRITER",
    "CONTENT LEAD",
    "ENGLISH COPYWRITER"
  ],
  production: [
    "PRODUCTION MANAGER",
    "CREATIVE CONCEPTUALIST",
    "VIDEO CONTENT CREATORS",
  ],
};

const MembersSection = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const lineRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Animate the line on mount
    if (lineRef.current) {
      lineRef.current.style.height = "0px"; 
      lineRef.current.style.transition = "height 1s ease-in-out";
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.style.height = "60px";
        }
      }, 500);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDepartmentHover = (department) => {
    if (department !== "strategy" && !isMobile) {
      setActiveSection(department);
    }
  };

  const handleDepartmentLeave = () => {
    if (!isMobile) {
      setActiveSection(null);
      setHoveredTitle(null);
    }
  };

  const handleTitleHover = (titleIndex) => {
    setHoveredTitle(titleIndex);
  };

  const handleTitleLeave = () => {
    setHoveredTitle(null);
  };

  // Desktop position functions
  const getCreativeDesktopPositions = (titleCount) => {
  const standardSize = "w-20 h-20 lg:w-30 lg:h-30 xl:w-40 xl:h-40";
  const positions = [
    { top: "17%", left: "10%", size: standardSize, transform: "rotate(-8deg)" },
    { top: "18%", left: "60%", size: standardSize, transform: "rotate(15deg)" },
    { top: "40%", left: "35%", size: standardSize, transform: "rotate(-12deg)" },
    { top: "61%", left: "7%", size: standardSize, transform: "rotate(18deg)" },
    { top: "61%", left: "64%", size: standardSize, transform: "rotate(-6deg)" },
  ];
  return positions.slice(0, titleCount);
};

const getSocialDesktopPositions = (titleCount) => {
  const standardSize = "w-20 h-20 lg:w-30 lg:h-30 xl:w-40 xl:h-40";
  const positions = [
    { top: "12%", left: "9%", size: standardSize, transform: "rotate(22deg)" },
    { top: "27%", left: "34%", size: standardSize, transform: "rotate(-15deg)" },
    { top: "16%", left: "48%", size: standardSize, transform: "rotate(8deg)" },
    { top: "14%", left: "70%", size: standardSize, transform: "rotate(-18deg)" },
    { top: "35%", left: "20%", size: standardSize, transform: "rotate(25deg)" },
    { top: "37%", left: "60%", size: standardSize, transform: "rotate(-10deg)" },
    { top: "58%", left: "5%", size: standardSize, transform: "rotate(14deg)" },
    { top: "58%", left: "39%", size: standardSize, transform: "rotate(-20deg)" },
    { top: "58%", left: "75%", size: standardSize, transform: "rotate(16deg)" },
    { top: "66%", left: "25%", size: standardSize, transform: "rotate(-7deg)" },
    { top: "67%", left: "53%", size: standardSize, transform: "rotate(19deg)" },
  ];
  return positions.slice(0, titleCount);
};

const getProductionDesktopPositions = (titleCount) => {
  const standardSize = "w-20 h-20 lg:w-30 lg:h-30 xl:w-40 xl:h-40";
  const positions = [
    { top: "20%", left: "20%", size: standardSize, transform: "rotate(-14deg)" },
    { top: "30%", left: "38%", size: standardSize, transform: "rotate(21deg)" },
    { top: "29%", left: "54%", size: standardSize, transform: "rotate(-9deg)" },
  ];
  return positions.slice(0, titleCount);
};
  // Mobile position functions based on design images
  const getCreativeMobilePositions = (titleCount) => {
    const positions = [
      { top: "25%", left: "60%", size: "w-24 h-24", transform: "rotate(-8deg)" }, // ART DIRECTOR - large, top right
      { top: "15%", left: "15%", size: "w-24 h-24", transform: "rotate(12deg)" }, // ANIMATION LEAD - large, top left
      { top: "40%", left: "5%", size: "w-20 h-20", transform: "rotate(-15deg)" }, // ANIMATOR - medium, left
      { top: "50%", left: "50%", size: "w-20 h-20", transform: "rotate(18deg)" }, // JR.ART DIRECTOR - medium, center
      { top: "71%", left: "65%", size: "w-16 h-16", transform: "rotate(-10deg)" }, // GRAPHIC DESIGNER - small, bottom right
    ];
    return positions.slice(0, titleCount);
  };

  const getSocialMobilePositions = (titleCount) => {
    const positions = [
      { top: "12%", left: "7%", size: "w-24 h-24", transform: "rotate(15deg)" }, // ACCOUNT DIRECTOR - large, top left
      { top: "29%", left: "27%", size: "w-20 h-20", transform: "rotate(-12deg)" }, // ASSOCIATE DIRECTOR - medium, center left
      { top: "44%", left: "42%", size: "w-16 h-16", transform: "rotate(20deg)" }, // ACCOUNT MANAGER - small, center
      { top: "18%", left: "65%", size: "w-24 h-24", transform: "rotate(-18deg)" }, // ORM LEAD - large, top right
      { top: "38%", left: "79%", size: "w-18 h-18", transform: "rotate(25deg)" }, // SR.ORM EXECUTIVE - medium, right
      { top: "43%", left: "10%", size: "w-20 h-20", transform: "rotate(-8deg)" }, // SR.ACCOUNT MANAGER - medium, left
      { top: "59%", left: "23%", size: "w-16 h-16", transform: "rotate(14deg)" }, // SR.ACCOUNT EXECUTIVE - medium, bottom left
      { top: "74%", left: "15%", size: "w-16 h-16", transform: "rotate(-22deg)" }, // ACCOUNT EXECUTIVE - small, bottom left
      { top: "61%", left: "75%", size: "w-24 h-24", transform: "rotate(10deg)" }, // CONTENT LEAD - large, bottom right
      { top: "71%", left: "55%", size: "w-18 h-18", transform: "rotate(-16deg)" }, // ARABIC COPYWRITER - medium, bottom center
      { top: "84%", left: "68%", size: "w-18 h-18", transform: "rotate(18deg)" }, // ENGLISH COPYWRITER - medium, very bottom
    ];
    return positions.slice(0, titleCount);
  };

  const getProductionMobilePositions = (titleCount) => {
    const positions = [
      { top: "15%", left: "70%", size: "w-24 h-24", transform: "rotate(-14deg)" }, // PRODUCTION MANAGER - large, top right
      { top: "35%", left: "53%", size: "w-20 h-20", transform: "rotate(16deg)" }, // CREATIVE CONCEPTUALIST - medium, center
      { top: "65%", left: "7%", size: "w-16 h-16", transform: "rotate(-20deg)" }, // VIDEO CONTENT CREATORS - medium, bottom left
    ];
    return positions.slice(0, titleCount);
  };

  // Main function to get positions based on department and device type
  const getCirclePositions = (department, titleCount, isDesktop = false) => {
    if (isDesktop) {
      switch (department) {
        case "creative":
          return getCreativeDesktopPositions(titleCount);
        case "social":
          return getSocialDesktopPositions(titleCount);
        case "production":
          return getProductionDesktopPositions(titleCount);
        default:
          return [];
      }
    } else {
      switch (department) {
        case "creative":
          return getCreativeMobilePositions(titleCount);
        case "social":
          return getSocialMobilePositions(titleCount);
        case "production":
          return getProductionMobilePositions(titleCount);
        default:
          return [];
      }
    }
  };

  // Function to get responsive font size based on circle size and text length
  const getResponsiveFontSize = (text, circleSize = "medium", isMobile = false) => {
    const textLength = text.length;
    
    if (isMobile) {
      // Mobile font sizes based on circle size
      if (circleSize.includes("w-16")) { // Small circles
        return textLength > 15 ? "text-[7px]" : "text-[8px]";
      } else if (circleSize.includes("w-18")) { // Medium-small circles
        return textLength > 15 ? "text-[8px]" : "text-[9px]";
      } else if (circleSize.includes("w-20")) { // Medium circles
        return textLength > 15 ? "text-[9px]" : "text-[10px]";
      } else { // Large circles (w-24)
        return textLength > 15 ? "text-[10px]" : "text-[11px]";
      }
    }
    
    // Desktop font sizes
    if (textLength > 20) return "text-[8px] lg:text-[9px] xl:text-[10px]";
    if (textLength > 15) return "text-[9px] lg:text-[10px] xl:text-xs";
    if (textLength > 10) return "text-[10px] lg:text-xs xl:text-sm";
    return "text-xs lg:text-sm xl:text-base";
  };

  // Render circles function
  const renderCircles = (department, titles, isDesktop = false) => {
    const positions = getCirclePositions(department, titles.length, isDesktop);

    return (
      <div className="absolute inset-0 p-4 lg:p-6 xl:p-8">
        {titles.map((title, index) => {
          const position = positions[index];
          if (!position) return null;

          const fontSize = getResponsiveFontSize(title, position.size, !isDesktop);

          return (
            <div
              key={index}
              className={`absolute ${
                position.size
              } rounded-full flex items-center justify-center text-center cursor-pointer transition-all duration-1000 ease-in-out outline-none focus:outline-none border-0 focus:border-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 ${
                hoveredTitle === index
                  ? `${isDesktop ? 'bg-white' : 'bg-[#00E776] hover:bg-[#00E776]'} text-black scale-105 shadow-lg border-2 ${isDesktop ? 'border-white' : 'border-white'}`
                  : `${isDesktop ? 'bg-white' : 'bg-[#00E776] hover:bg-[#00E776]'} text-black ${isDesktop ? 'hover:bg-gray-100' : ''} shadow-md hover:shadow-lg hover:scale-105`
              }`}
              style={{
                top: position.top,
                left: position.left,
                right: position.right,
                transform: position.transform || "",
                outline: "none !important",
                border: hoveredTitle === index ? `2px solid ${isDesktop ? 'white' : '#16a34a'}` : "none !important",
                boxShadow: hoveredTitle === index ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              onMouseEnter={() => handleTitleHover(index)}
              onMouseLeave={handleTitleLeave}
              tabIndex={-1}
              onFocus={() => handleTitleHover(index)}
              onBlur={handleTitleLeave}
            >
              <span className={`font-bold ${fontSize} leading-tight text-center px-2 lg:px-3 xl:px-4`}>
                {title}
              </span>
            </div>  
          );
        })}
      </div>
    );
  };

  // Render desktop section with green background and overlay
  const renderDesktopSection = (department, titles, sectionTitle) => {
    const isHovered = activeSection === department;
    
    return (
      <div
        className="relative overflow-hidden cursor-pointer w-full h-full outline-none focus:outline-none"
        onMouseEnter={() => handleDepartmentHover(department)}
        onMouseLeave={handleDepartmentLeave}
      >
        {/* Green background with circles - always present */}
        <div className="absolute inset-0 bg-[#00E776]">
          {renderCircles(department, titles, true)}
        </div>

        {/* Gray overlay with title */}
        <div 
          className={`absolute inset-0 bg-gray-50 transition-all duration-500 ease-in-out ${
            isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-bold text-4xl xl:text-[64px] text-black">
              {sectionTitle}
            </span>
          </div>
        </div>

        {/* Animated title that moves to top on hover */}
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-20 ${
            isHovered 
              ? 'top-6 opacity-100' 
              : 'top-1/2 -translate-y-1/2 opacity-0 pointer-events-none'
          }`}
        >
          <span className="font-bold text-4xl xl:text-[48px] text-black">
            {sectionTitle}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      {/* Header Section with CEO */}
      <div className="flex flex-col items-center justify-center w-full py-20 bg-white relative">
        <div className="text-center">
          <p className="text-[16px] md:text-[20px] text-black/50 font-semibold mb-2">
            FOUNDER & CEO
          </p>
          <h1 className="font-bold text-[32px] md:text-[48px] lg:text-[56px] mb-6">
            Hassan Al Najjar
          </h1>

          {/* Green line extending downward */}
          <div
            ref={lineRef}
            className="w-0.5 bg-[#00E776] mx-auto"
            style={{ height: "60px", width: "1px" }}
          ></div>
          <div className="w-5 h-5 bg-[#00E776] rounded-full mx-auto mb-6"></div>

          <h2 className="relative font-bold text-[24px] md:text-[36px] lg:text-[42px] mt-6">
            Agency Team
            <div className="hidden md:block w-[1px] absolute top-[100%] left-0 right-0 h-8 bg-[#00E776] mx-auto mt-6"></div>
            <div className="max-w-[2500px] absolute md:top-[150%] top-[190%] left-[-20%] right-[-20%] md:left-[-110%] md:right-[-110%] h-[1px] bg-[#00E776] mx-auto mt-6"></div>
          </h2>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="bg-white w-full flex-1">
        {/* Desktop Layout - Custom Grid */}
        <div className="hidden lg:block h-screen">
          <div className="h-full w-full flex flex-row gap-4 px-8">
            {/* Left Column */}
            <div className="flex h-full flex-col w-[30%] gap-4">
              {/* Strategy Box - No hover effect */}
              <div className="bg-black h-[243px] text-white flex items-center justify-center relative">
                <span className="font-bold text-4xl xl:text-[64px]">Strategy</span>
              </div>

              {/* Creative Box */}
              <div className="h-[513px]">
                {renderDesktopSection("creative", teamData.creative, "Creative")}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex h-full flex-col w-[70%] gap-4">
              {/* Top Right Row */}
              <div className="flex h-[494px] gap-4">
                {/* Social Box */}
                <div className="w-full">
                  {renderDesktopSection("social", teamData.social, "Social")}
                </div>
              </div>

              {/* Bottom Right Row */}
              <div className="flex h-[262px] gap-4">
                {/* Production Box */}
                <div className="w-full">
                  {renderDesktopSection("production", teamData.production, "Production")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout - All circles visible */}
        <div className="hidden md:block lg:hidden">
          <div className="w-full">
            {/* Strategy Box */}
            <div className="bg-black text-white text-center py-12">
              <span className="font-bold text-3xl">Strategy</span>
            </div>

            {/* All sections visible with circles */}
            <div className="space-y-0">
              {Object.entries(teamData)
                .filter(([dept]) => dept !== "strategy")
                .map(([department, titles]) => (
                  <div
                    key={department}
                    className="bg-white border-b border-gray-200 min-h-[350px] relative"
                  >
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="font-bold text-2xl capitalize px-4 py-2 rounded-lg shadow-sm">
                        {department}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-[#00E776]">
                      {renderCircles(department, titles, false)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - All circles visible with design-based positioning */}
        <div className="md:hidden">
          <div className="w-full bg-white px-3">
            {/* Strategy Box */}
            <div className="bg-black text-white text-center py-8 mb-3">
              <span className="font-bold text-2xl">Strategy</span>
            </div>

            {/* All sections visible with circles */}
            <div className="space-y-2">
              {Object.entries(teamData)
                .filter(([dept]) => dept !== "strategy")
                .map(([department, titles]) => (
                  <div
                    key={department}
                    className="bg-[#FAFAFA] border-gray-200 relative mx-1"
                    style={{ 
                      minHeight: department === "social" ? "450px" : "350px" // Extra height for social section
                    }}
                  >
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"> 
                      <span className="font-bold text-3xl capitalize px-3 py-1 rounded-lg">
                        {department}
                      </span>
                    </div>
                    <div className="absolute inset-0">
                      {renderCircles(department, titles, false)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersSection;