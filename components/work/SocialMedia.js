"use client";

import React, { useEffect, useState } from "react";
import SocialMediaModal from "./SocialMediaModal";
// import { socialMediaData } from "@/utils/data";
import axios from "axios";
import Loader from "../Loader";
import Lenis from "@studio-freight/lenis";

const SocialMedia = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("social-media");
  const [visibleCount, setVisibleCount] = useState(4); // Show first 4 items initially

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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  const openModal = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleToggle = () => {
    if (visibleCount >= data.length) {
      setVisibleCount(2); // Collapse
    } else {
      setVisibleCount(data.length); // Expand
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-8 ">
        {data.slice(0, visibleCount).map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="flex flex-col-reverse md:flex-row gap-6 w-full">
              <div className="md:w-1/4 w-full flex md:justify-end">
                <div className="flex gap-2 md:gap-10 md:gap-0 sm:flex-row flex-col md:flex-col md:text-right text-left">
                  <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] sub-heading font-bold tracking-wide">
                    CLIENT
                  </p>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-[32px] md:text-[40px] lg:text-[64px]">
                      {item.title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.images.map((image, idx) => (
                  <img
                    key={idx}
                    onClick={() => openModal(item.images, idx)}
                    src={image}
                    alt={item.title}
                    className="w-full h-[161px] md:h-[216px] md:w-[216px] lg:h-[414px] lg:w-[414px] object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center items-center mt-10">
        {data.length > 4 && (
          <button
            onClick={handleToggle}
            className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]"
          >
            {visibleCount >= data.length ? "See Less" : "See More"}
          </button>
        )}
      </div>

      <SocialMediaModal
        images={selectedImages}
        currentIndex={currentIndex}
        onClose={closeModal}
        isOpen={modalOpen}
      />
    </div>
  );
};

export default SocialMedia;
