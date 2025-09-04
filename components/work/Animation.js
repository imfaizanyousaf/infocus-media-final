"use client";

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Loader from "../Loader";
import Lenis from "@studio-freight/lenis";

const Animation = () => {
  const ITEMS_PER_PAGE = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
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
      const res = await axios.get(`/api/work/get-works?category=animation`);
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

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handlePrevImage = (itemIndex, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [itemIndex]: prev[itemIndex] > 0 ? prev[itemIndex] - 1 : totalImages - 1,
    }));
  };

  const handleNextImage = (itemIndex, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [itemIndex]:
        (prev[itemIndex] || 0) < totalImages - 1
          ? (prev[itemIndex] || 0) + 1
          : 0,
    }));
  };

  const getCurrentIndex = (itemIndex) => {
    return currentImageIndex[itemIndex] || 0;
  };

  const isAllDataVisible = visibleCount >= data.length;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-8">
        {data.slice(0, visibleCount).map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full">
              {/* Text */}
              <div className="md:w-1/3 w-full flex md:justify-end">
                <div className="flex gap-2 sm:gap-6 md:gap-0 sm:flex-row flex-col md:flex-col md:text-right text-left">
                  <p className="text-sm text-gray-500 text-[16px] md:text-[18px] lg:text-[22px] uppercase">
                    CLIENT
                  </p>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[64px]">
                      {item.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="md:w-2/3 w-full">
                {/* Carousel for screens below lg */}
                <div className="lg:hidden">
                  <div className="relative" data-lenis-prevent>
                    <iframe
                      src={`https://player.vimeo.com/video/${item.videoLinks[
                        getCurrentIndex(index)
                      ]
                        ?.split("/")
                        .pop()}`}
                      title={item.title || "Case Study"}
                      className="w-full h-[600px] md:h-[700px] object-cover"
                      frameBorder="0"
                      allow="fullscreen"
                      allowFullScreen
                    />

                    {/* Navigation arrows */}
                    {item.videoLinks.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            handlePrevImage(index, item.videoLinks.length)
                          }
                          className="absolute left-4 top-1/2 cursor-pointer z-20 bg-white/10 backdrop-blur-md p-4 rounded-md hover:bg-white/20 transition-all duration-300"
                        >
                          <FaChevronLeft className="text-white text-xl" />
                        </button>

                        <button
                          onClick={() =>
                            handleNextImage(index, item.videoLinks.length)
                          }
                          className="absolute right-4 top-1/2 cursor-pointer z-20 bg-white/10 backdrop-blur-md p-4 rounded-md hover:bg-white/20 transition-all duration-300"
                        >
                          <FaChevronRight className="text-white text-xl" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Grid for lg screens and above */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-3 gap-4" data-lenis-prevent>
                    {item.videoLinks.map((videoLink, i) => (
                      <iframe
                        key={i}
                        src={`https://player.vimeo.com/video/${videoLink
                          ?.split("/")
                          .pop()}`}
                        title={item.title || "Case Study"}
                        className="w-full h-[750px] object-cover"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {!isAllDataVisible && (
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleSeeMore}
            className="bg-black hover:bg-gray-200 hover:text-black text-white px-6 py-3 cursor-pointer  transition-transform duration-300 rounded-md font-medium"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Animation;
