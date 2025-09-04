"use client";
import React from "react";
import CountUp from "react-countup";

const HeroSection = () => {
  return (
    <div
      data-bg="dark"
      className="relative w-full h-[1400px] min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Center Content */}
      <div
        data-bg="dark"
        className="flex flex-col h-[500px] md:h-[700px] items-center justify-center text-center z-10 px-2"
      >
        <div
          data-bg="dark"
          className="flex flex-col items-center justify-center leading-[1] mt-4"
        >
          <h1
            data-bg="dark"
            className="text-[25px] md:text-[50px] lg:text-[60px] font-bold"
          >
            At Infocus Media, we believe
          </h1>
          <h1
            data-bg="dark"
            className="text-[25px] md:text-[50px] lg:text-[60px] font-bold"
          >
            that organizations flourish when
          </h1>
          <h1
            data-bg="dark"
            className="text-[25px] md:text-[50px] lg:text-[60px] font-bold"
          >
            their teams are proactive and
          </h1>
          <h1
            data-bg="dark"
            className="text-[25px] md:text-[50px] lg:text-[60px] font-bold"
          >
            fueled by initiative.
          </h1>
        </div>

        <div className="flex flex-col items-center leading-[14px] sub-heading mt-2">
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            This commitment inspires us to unite with a vibrant,
          </p>
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            forward-thinking spirit, ensuring our meaningful
          </p>
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            contributions to sustainable development.
          </p>
        </div>
      </div>

      {/* Bottom Section with Stats + Image */}
      <div className="relative w-full flex-grow px-4">
        {/* Background Image */}
        <img
          src="/story-img1.png"
          alt="Green Blob"
          className="absolute bottom-0 left-0 w-full h-1/2 md:h-full md:pt-10 object-cover z-0 md:top-auto"
        />

        <div className="relative w-full  flex items-center justify-between">
          {/* Left Stats */}
          <div className="absolute top-[90%] h-full -translate-y-1/2 left-0 z-10 w-full md:w-2/5 pl-6 lg:pl-20 sm:pl-[20px] flex flex-col  items-start justify-between gap-6">
            <div className="flex flex-col">
              <h1
                data-bg="dark"
                className="text-[54px] md:text-[74px] lg:text-[90px] font-bold"
              >
                <CountUp end={10} duration={3} />+
              </h1>
              <h2
                data-bg="dark"
                className="text-[16px] md:text-[18px] lg:text-[22px] text-left uppercase sub-heading"
              >
                Years of Experience
              </h2>
            </div>
            <div data-bg="dark" className="flex flex-col">
              <h1
                data-bg="dark"
                className="text-[54px] md:text-[74px] lg:text-[90px] font-bold"
              >
                <CountUp end={75} duration={3} />+
              </h1>
              <h2
                data-bg="dark"
                className="text-[16px] md:text-[18px] lg:text-[22px] text-left uppercase sub-heading"
              >
                Clients
              </h2>
            </div>
          </div>

          {/* Right Stats */}
          <div className="absolute top-[90%] h-full  -translate-y-1/2 right-0 z-10 w-full md:w-2/5 lg:pr-20 pr-[20px] sm:pr-20 flex flex-col items-end justify-between gap-6">
            <div data-bg="dark" className="flex flex-col items-end">
              <h1
                data-bg="dark"
                className="text-[54px] md:text-[74px] lg:text-[90px] font-bold"
              >
                <CountUp end={80} duration={3} />+
              </h1>
              <h2
                data-bg="dark"
                className="text-[16px] md:text-[18px] lg:text-[22px] text-right uppercase sub-heading"
              >
                Employees
              </h2>
            </div>
            <div data-bg="dark" className="flex flex-col items-end">
              <h1
                data-bg="dark"
                className="text-[54px] md:text-[74px] lg:text-[90px] font-bold"
              >
                <CountUp end={3000} duration={3} separator="" />+
              </h1>
              <h2
                data-bg="dark"
                className="text-[16px] md:text-[18px] lg:text-[22px] uppercase text-right sub-heading"
              >
                Projects
              </h2>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default HeroSection;
