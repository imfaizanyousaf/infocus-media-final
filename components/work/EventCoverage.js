import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Lenis from "@studio-freight/lenis";

// const data = [
//   {
//     title: "EHS",
//     image: "/projects/35.png",
//   },
//   {
//     title: "Dhubai Culture",
//     image: "/assets/event2.png",
//   },
//   {
//     title: "EHE",
//     image: "/assets/event3.png",
//   },
//   {
//     title: "DPC Emirati Content Creator",
//     image: "/assets/event4.png",
//   },
// ]

const EventCoverage = () => {
  const INITIAL_COUNT = 4;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [category, setCategory] = useState("event-coverage");
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
      setVisibleCount(INITIAL_COUNT); // Collapse to initial items
    } else {
      setVisibleCount(data.length); // Show all items
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-8">
        {data.slice(0, visibleCount).map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-[1px] bg-gray-100 my-6"></div>

            <div className="flex flex-col-reverse md:flex-row gap-6 w-full">
              {/* Text */}
              <div className="md:w-1/4 w-full flex md:justify-end">
                <div className="flex gap-2 sm:gap-10 md:gap-0 sm:flex-row flex-col md:flex-col  md:text-right text-left">
                  <p className="text-sm text-gray-500 text-[16px] md:text-[18px] lg:text-[22px] uppercase sub-heading font-bold tracking-wide">
                    CLIENT
                  </p>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-[40px] md:text-[40px] lg:text-[54px] leading-[1]">
                      {item.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-3/4" data-lenis-prevent>
                <iframe
                  src={`https://player.vimeo.com/video/${item.videoLink
                    ?.split("/")
                    .pop()}`}
                  title={item.title || "Case Study"}
                  className="w-full  h-[620px] md:h-[750px] md:w-[450px]   object-cover "
                  frameBorder="0"
                  width={"100%"}
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
            className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md font-medium"
          >
            {visibleCount >= data.length ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCoverage;
