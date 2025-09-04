"use client"
import React, { useState, useEffect } from "react";
import Footer from "../home/Footer";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import axios from "axios";

const CaseStudyDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCaseStudies, setAllCaseStudies] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch specific case study
      const res = await axios.get(`/api/${id}`);
      console.log(res.data);
      setSelected(res.data.caseStudy);
      
      // Fetch all case studies for "other" section
      const allRes = await axios.get('/api/get-cases');
      setAllCaseStudies(allRes.data.caseStudies || []);
    } catch (error) {
      console.error("Error fetching case study:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if(loading) return <div className="flex flex-col h-screen justify-center items-center"><Loader /></div>;
  
  if (!selected) return <div className="flex flex-col h-screen justify-center items-center">Case study not found</div>;

  const others = allCaseStudies.filter((item) => item._id !== selected._id).slice(0, 3);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* The Navbar will always remain at the top. No logic to hide or pop up. */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-8">
        <h2 className="text-center text-sm sm:text-base lg:text-lg font-bold tracking-widest mb-2 mt-4 sm:mt-8">CASE STUDY</h2>
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 px-2">{selected.title.toUpperCase()}</h1>
        <div className="w-full mb-6 sm:mb-8">
          <Image
            src={selected.image}
            alt={selected.title}
            width={1920}
            height={800}
            
            className="rounded w-full h-auto"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="lg:w-1/2">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">{selected.title}</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed ">{selected.description}</p>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
           
              {selected.content && (
            <div className="mb-8 sm:mb-12">
              <div 
                className="prose prose-lg max-w-none text-gray-700 sub-heading"
                dangerouslySetInnerHTML={{ __html: selected.content }}
              />
            </div>
          )}
            </div>
          </div>
          
          {/* Content Section */}
         
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left pt-20">OTHER CASE STUDIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {others.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Image Wrapper with Hover Group */}
                <div className="relative group overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    
                    width={568} 
                    height={402} 
                    className="w-full h-[250px] sm:h-[300px] lg:h-[402px] object-cover transition-all duration-300 group-hover:blur-sm" 
                  />
                  {/* Hover Button */}
                  <Link
                    href={`/case-studies/${item._id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                  >
                    <span className="bg-white text-black px-4 py-2 text-sm sm:text-base lg:text-lg font-medium rounded shadow-md">
                      Read
                    </span>
                  </Link>
                </div>

                {/* Title and Description */}
                <div className="mt-2 px-1">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">{item.title.toUpperCase()}</h3>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed sub-heading">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <Link href="/case-studies"
              className="bg-black text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded hover:bg-gray-100 hover:text-black hover:scale-105 transition-transform duration-300 font-medium text-base sm:text-lg lg:text-xl cursor-pointer"
              
            >
              See All
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;