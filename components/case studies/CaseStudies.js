"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useRouter } from "next/navigation";

const CaseStudies = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/get-cases");
      setData(res.data.caseStudies.reverse() || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeMore = () => {
    if (!showAll) {
      setVisibleItems(data.length);
      setShowAll(true);
    } else {
      setVisibleItems(6);
      setShowAll(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-4 md:px-6 lg:container lg:px-20 lg:max-w-none">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[64px] lg:text-[64px]  font-bold mb-6">
            Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.slice(0, visibleItems).map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Wrapper with Hover Group */}
              <div className="relative group overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-[242px] md:h-[487px] lg:h-[620px] object-cover transition-all duration-300 group-hover:blur-sm ${
                    index === 5 &&
                    "md:h-[538px]  lg:h-[671px]  relative top-[-50px] "
                  }`}
                />
                {/* Hover Button */}
                <Link
                  href={`/case-studies/${item._id}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                >
                  <span className="bg-white text-black px-4 py-2 text-[16px] md:text-[18px] lg:text-[22px] font-medium rounded shadow-md">
                    Read
                  </span>
                </Link>
              </div>

              {/* Title and Description */}
              <div
                className={`mt-2 px-1  ${
                  index === 5 &&
                  "relative top-[-50px] md:top-[-54px] lg:top-[-50px]"
                }`}
              >
                <h3 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-black">
                  {item.title}
                </h3>
                <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] sub-heading">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data.length > visibleItems && (
          <div className="text-center mt-10">
            <button
              onClick={handleSeeMore}
              className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md font-medium"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
