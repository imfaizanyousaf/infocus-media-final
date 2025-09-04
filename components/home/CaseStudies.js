"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const CaseStudies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/get-cases");
      setData(res.data.caseStudies.slice(0, 3) || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shimmerArray = [1, 2, 3];

  return (
    <section className="min-h-screen pb-0 w-full">
      <div className="px-4 lg:px-6 py-20">
        <div className="text-center mb-16">
          <motion.h1
            className="text-[40px] md:text-[64px] font-bold font-bandeins-strange text-black text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Case Studies
          </motion.h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
          {(loading ? shimmerArray : data).map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col w-full lg:w-[668px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {loading ? (
                <>
                  <div className="w-full p-[100px] h-[242px] md:h-[487px] lg:h-[480px] bg-gray-200 animate-pulse rounded-md" />
                  <div className="mt-2 px-1">
                    <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative group overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full transition-all duration-300 group-hover:blur-sm ${
                        index === 1
                          ? "h-[252px] md:h-[520px] lg:h-[494px] object-cover relative top-[-14px]"
                          : "h-[242px] md:h-[487px] lg:h-[480px] object-cover"
                      }`}
                    />
                    <Link
                      href={`/case-studies/${item._id}`}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                    >
                      <span className="bg-white text-[22px] text-black px-4 py-2 text-sm font-medium rounded shadow-md">
                        Read
                      </span>
                    </Link>
                  </div>
                  <div
                    className={`mt-2 px-1   ${
                      index === 1 ? "relative top-[-14px]" : ""
                    }`}
                  >
                    <h3 className="text-[44px] font-semibold text-black">
                      {item.title.toUpperCase()}
                    </h3>
                    <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] line-clamp-2 sub-heading">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {!loading && (
          <motion.div
            className="text-center mt-10 font-bandeins-strange"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href={"/case-studies"}
              className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]"
            >
              See All
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
