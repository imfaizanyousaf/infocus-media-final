"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Loader from "@/components/Loader";





const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(6);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/get-cases");
      setData(res.data.caseStudies || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  };

  if (loading) return <div className="flex flex-col h-screen justify-center items-center"><Loader /></div>

  return (
    <div className="flex flex-col min-h-screen w-full p-6">
      <div className="flex  md:flex-row flex-col justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Case Studies</p>
          <p className=" text-black/50">Manage your portfolio case studies</p>
        </div>

        <Link href="/case-study" className="bg-black flex items-center gap-2 text-white px-4 py-2 mb-6 rounded hover:bg-gray-800">
        <FaPlus className="w-4 h-4 mr-2" /> Create Case Study
      </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data.slice(0, visibleItems).map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
            

            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover transition-all duration-300 group-hover:blur-sm"
              />
              <Link
                href={`/case-studies/${item._id}`}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
              >
                <span className="bg-white text-black px-4 py-2 text-sm font-medium rounded shadow-md">
                  Read
                </span>
              </Link>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title?.toUpperCase()}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>

            <div className="flex justify-end gap-3 p-3 ">
              <Link
                href={`/case-study/${item._id}`}
                className="text-black flex items-center gap-1 text-sm"
              >
                <FaEdit size={14} /> Edit
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-black flex items-center gap-1 text-sm"
              >
                <FaTrash size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
