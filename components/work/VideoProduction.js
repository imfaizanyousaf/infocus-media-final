import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Lenis from "@studio-freight/lenis";

// const data = [
//   { title: "MOHaP", image: "/assets/production1.png" },
//   { title: "7x", image: "/assets/production2.png" },
//   { title: "Ministry of education", image: "/assets/production3.png" },
//   { title: "Ministry of education", image: "/assets/production3.png" },
// ];

const VideoProduction = () => {
  const [visibleCount, setVisibleCount] = useState(4); // Show 2 initially
  const [category, setCategory] = useState("video-production");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6, // Very short
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic - quick stop
      smooth: true,
      smoothTouch: false,
      infinite: false,
      gestureDirection: "vertical",
      wheelMultiplier: 0.8, // Reduce wheel sensitivity
      touchMultiplier: 1.0,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/work/get-works?category=${category}`);
      setData(res.data.works || []);
      console.log(res.data.works);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Loader />
      </div>
    );

  const handleToggle = () => {
    if (visibleCount >= data.length) {
      setVisibleCount(4);
    } else {
      setVisibleCount(data.length); // Show all
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-8">
        {data.slice(0, visibleCount).map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="flex  flex-col-reverse justify-end  lg:flex-row gap-6 w-full">
              {/* Text */}
              <div className="md:w-1/3 w-full flex lg:justify-end">
                <div className="flex gap-2 md:gap-20 lg:gap-2  md:flex-row flex-col lg:flex-col lg:text-right text-left">
                  <p className="text-[16px] md:text-[18px] lg:text-[22px] uppercase font-bold text-black/50 tracking-wide md:mb-2">
                    Client
                  </p>
                  <div className="flex flex-col leading-[1]">
                    <h1 className="text-[40px]  md:text-[56px] lg:text-[44px] font-semibold uppercase">
                      {item.title}
                    </h1>
                    <p className=" text-[40px] lg:text-[44px]  font-bold text-gray-400">
                      UAE
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className="w-full lg:w-2/3  overflow-hidden"
                data-lenis-prevent
              >
                <iframe
                  src={`https://player.vimeo.com/video/${item.videoLink
                    ?.split("/")
                    .pop()}`}
                  title={item.title || "Case Study"}
                  className=" object-cover w-full h-full    md:w-[740px] md:h-[400]   overflow-hidden"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {data.length > visibleCount && (
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleToggle}
            className="bg-black text-white px-6 py-3 ccursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]"
          >
            {visibleCount >= data.length ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoProduction;
