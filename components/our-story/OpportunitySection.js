import React from "react";

const OpportunitySection = () => {
  return (
    <div className="bg-[#FAFAFA] w-full min-h-[850px] px-6 py-20 flex flex-col gap-16">
      {/* Title */}
      <div className="text-center leading-[.99]">
        <h1 className="text-[40px] md:text-[64px] font-bold">
          Unlocking opportunities
        </h1>
        <h1 className="text-[40px] md:text-[64px] font-bold ">
          through strategic partnerships
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row justify-center sub-heading">
        {/* Left Column */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
          <p className="text-[18px] md:text-[20px] lg:text-[22px] font-bold">
            MAIN ASSOCIATIONS
          </p>

          <div className="flex flex-col gap-4 justify-center w-full max-w-[640px]">
            {/* Row with Card 2 and 3 */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Card 2 */}
              <div className="flex flex-col gap-10  min-h-[300px] h-full justify-between text-[18px] md:text-[20px] lg:text-[22px] p-6 bg-white w-full sm:w-1/2">
                <img
                  src="/our-story/image1.png"
                  alt="logo"
                  className="w-[200px] h-[36px] object-contain"
                />
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <p className="font-bold text-[18px] md:text-[20px] lg:text-[22px]">
                    DUBAI SME
                  </p>
                  <p className="leading-[1.2] text-[16px] md:text-[18px] lg:text-[20px]">
                    Empowering Emirati entrepreneurs to transform ideas into
                    successful businesses since 2002.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col min-h-[300px] gap-10 h-fit justify-between text-[18px] md:text-[20px] lg:text-[22px] p-6 bg-white w-full sm:w-1/2">
                <img
                  src="/our-story/image2.png"
                  alt="logo"
                  className="w-[48px] h-[48px] object-contain"
                />
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px]">
                    DONE BY YOUTH
                  </p>
                  <p className="leading-[1.2] text-[14px] md:text-[16px] lg:text-[18px]">
                    Connecting passionate young talents with nationwide
                    opportunities to shape the UAE's future.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 1 */}
            <div className="flex flex-col gap-10 h-fit justify-between p-6 bg-white text-[18px] md:text-[20px] lg:text-[22px] w-full">
              <img
                src="/our-story/image3.png"
                alt="logo"
                className="w-[55px] h-[48px] object-contain"
              />
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px]">
                  ICV
                </p>
                <p className="leading-[1.2] text-[14px] md:text-[16px] lg:text-[18px]">
                  Strengthening the UAE's economy by prioritizing local talent,
                  products, and services across industrial sectors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center mt-14 lg:mt-0 gap-6 w-full lg:w-1/2">
          <p className="text-[18px] md:text-[20px] lg:text-[22px] font-bold">
            SPECIALIZED PARTNERS
          </p>

          <div className="flex flex-col gap-4 justify-center w-full max-w-[640px]">
            {/* Row with Card 1 and 2 */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Card 1 */}
              <div className="flex flex-col  min-h-[300px] gap-10 h-fit justify-between p-6 bg-white w-full sm:w-1/2">
                <img
                  src="/our-story/image4.png"
                  alt="logo"
                  className="w-[116px] h-[46px] object-contain"
                />
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px]">
                    EMPLIFI
                  </p>
                  <p className="leading-[1.2] text-[14px] md:text-[16px] lg:text-[18px]">
                    An AI-powered platform that optimizes digital presence and
                    social engagement.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col  min-h-[300px] gap-10 h-fit justify-between text-[18px] md:text-[20px] lg:text-[22px] p-6 bg-white w-full sm:w-1/2">
                <img
                  src="/our-story/image5.png"
                  alt="logo"
                  className="w-[139px] h-[46px] object-contain"
                />
                <div className="flex flex-col gap-2 flex-1 justify-center">
                  <p className="font-bold text-[16px] md:text-[18px] lg:text-[20px]">
                    PIXEL HOUSE
                  </p>
                  <p className="leading-[1.2] text-[14px] md:text-[16px] lg:text-[18px]">
                    Transforming ideas into powerful visuals through film,
                    photography, and design since 2013.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col gap-10 h-fit justify-between text-[18px] md:text-[20px] lg:text-[22px] p-6 bg-white w-full">
              <img
                src="/our-story/image6.png"
                alt="logo"
                className="w-[111px] h-[48px] object-contain"
              />
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <p className="font-bold text-[18px] md:text-[20px] lg:text-[22px]">
                  GARAGE STUDIO
                </p>
                <p className="leading-[1.2] text-[16px] md:text-[18px] lg:text-[20px]">
                  Creating an inspiring space where visionaries turn creative
                  dreams into reality, led by award-winning photographer Shadi
                  Alrefai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitySection;
