import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";
import Lenis from "@studio-freight/lenis";

// const data = [
//   { title: "dc children day", image: "/assets/motion3.png" },
//   { title: "salik eid greeting ", image: "/assets/motion1.png" },
//   { title: "salik animation post", image: "/assets/motion2.png" },
//   { title: "dc zayed humanitarian day", image: "/assets/motion7.png" },
//   { title: "mohisruae", image: "/assets/motion5.png" },
//   { title: "infocus media eid greetings", image: "/assets/motion6.png" },
//   { title: "salik earth day", image: "/assets/motion4.png" },
//   { title: "mohisruae", image: "/assets/motion4.png" },
// ];

const MotionGraphics = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [category, setCategory] = useState("motion-graphics");
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
      setVisibleCount(2); // Collapse
    } else {
      setVisibleCount(data.length); // Expand
    }
  };

  return (
    <div className="flex flex-col w-full px-1 my-8">
      {/* Grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 border-t border-b border-gray-200">
        {data.slice(0, visibleCount).map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex md:flex-row flex-col-reverse gap-4 p-4 border-gray-100 border-t border-b 
                ${isEven ? "" : "md:border-l"} 
                ${index < 2 ? "border-t" : ""}`}
              data-lenis-prevent
            >
              {/* Text */}
              <div className="md:w-1/2 w-full flex md:justify-end">
                <div className="flex gap-2 sm:gap-10 md:gap-2  flex-col sm:flex-row md:flex-col md:text-right text-left">
                  <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] uppercase sub-heading font-bold">
                    PROJECT
                  </p>
                  <h1 className="text-[40px] lg:text-[44px] font-semibold leading-[.99] capitalize">
                    {item.title}
                  </h1>
                </div>
              </div>

              {/* vimeo video */}
              <iframe
                src={`https://player.vimeo.com/video/${item.videoLink
                  ?.split("/")
                  .pop()}`}
                title={item.title || "Case Study"}
                className="w-full md:w-[370px] h-[620px] md:h-[750px] object-cover"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handleToggle}
          className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]"
        >
          {visibleCount >= data.length ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default MotionGraphics;
