import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[#FAFAFA] px-6 pt-40 md:pt-30 lg:pt-2 h-[50vh] py-10 flex flex-col lg:flex-row lg:gap-0 gap-15 justify-end">
      <div className="md:w-1/2 flex flex-col justify-end">
        <h1 className="text-3xl md:text-5xl font-bold text-[54px] lg:text-[100px]">
          Join
        </h1>
        <h1 className="text-3xl md:text-6xl font-bold text-[54px] lg:text-[100px]">
          Our Team
        </h1>
      </div>

      <div className="md:w-1/2 flex flex-col justify-end">
        <h1
          className="text-xl font-semibold text-[18px] md:text-[20px] sm:text-[18px] lg:text-[22px] uppercase sub-heading"
          style={{
            fontFamily: "Almarai, sans-serif",
            fontWeight: 700,
            lineHeight: "100%",
            letterSpacing: "3%",
          }}
        >
          we're always on the lookout for brilliant minds and bold ideas. check
          out our vacancies and apply for the one that suits you best!
        </h1>
        <div className="text-left mt-10">
          <a
            href="https://www.linkedin.com/company/infocusmediaae/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-black text-white px-6 py-3 cursor-pointer  hover:bg-gray-200 hover:text-black transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]">
              Join the Team
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
