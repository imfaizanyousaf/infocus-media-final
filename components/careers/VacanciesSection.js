"use client";
import React, { useState } from "react";
import ApplyingModal from "./ApplyingModal";

const vacancies = [
  {
    id: 1,
    title: "3D Motion Designer",
    location: "Remote",
    type: "Full-time",
    rote: "You’ll be responsible for bringing ideas to life through stunning 3D animations, visual storytelling, and motion graphics for digital campaigns, product visuals, and brand content.",
  },
  {
    id: 2,
    title: "Motion Designer",
    location: "Remote",
    type: "Contract",
    rote: "Create high-impact visuals, transitions, and animations for social media and branding campaigns. Collaborate closely with creative directors.",
  },
  {
    id: 3,
    title: "Visual Editor",
    location: "Remote",
    type: "Part-time",
    rote: "Edit compelling videos and help bring the vision of the creative team to life using After Effects and Premiere Pro.",
  },
];

const VacanciesSection = () => {
  const [openId, setOpenId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // store the clicked job
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isModalOpening, setIsModalOpening] = useState(false);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleApplySuccess = () => {
    // Toast notifications are now handled in the ApplyingModal component
  };

  const handleModalClose = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedJob(null);
      setIsModalClosing(false);
    }, 300); // 300ms fade out duration
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpening(true);
    setTimeout(() => {
      setIsModalOpening(false);
    }, 50); // Small delay to trigger fade in
  };

  return (
    <section className="relative bg-white py-20">
      {/* Modal */}
      {selectedJob && (
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isModalClosing
              ? "opacity-0"
              : isModalOpening
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <ApplyingModal
            id={selectedJob.id}
            title={selectedJob.title}
            onClose={handleModalClose}
            onApplySuccess={handleApplySuccess}
          />
        </div>
      )}

      <div className="container mx-auto px-6">
        {vacancies.length === 0 ? (
          <div className="text-center flex flex-col justify-center items-center mb-16 h-screen">
            <h1 className="text-[54px] lg:text-[100px] font-bold mb-2">
              No Open Vacancies
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[22px] font-medium mb-4">
              We’re not hiring right now, but we’re always happy to hear from
              talented people.
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[22px] font-medium mb-4">
              Feel free to send your resume to{" "}
              <strong>contact@infocusmedia.ae</strong>
            </p>
            <p className="text-[16px] md:text-[18px] lg:text-[22px] font-medium">
              We’ll be in touch if something opens up!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-24">
              <h2 className="font-bold mb-6 text-[40px] md:text-[64px]">
                Our Vacancies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacancies.map((job) => (
                <div
                  key={job.id}
                  className="border-b border-gray-200 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50"
                    onClick={() => toggleOpen(job.id)}
                  >
                    <h3 className="text-[22px] md:text-[40px] font-bold uppercase">
                      {job.title}
                    </h3>
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      {/* horizontal bar */}
                      <div className="absolute w-full h-[2px] bg-black transition-transform duration-300 ease-in-out" />
                      {/* vertical bar for plus */}
                      <div
                        className={`absolute h-full w-[2px] bg-black transition-all duration-300 ease-in-out ${
                          openId === job.id
                            ? "opacity-0 rotate-90"
                            : "opacity-100 rotate-0"
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openId === job.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 border-t border-gray-50 bg-white text-sm space-y-2 transform transition-transform duration-300 ease-in-out">
                      <div className="w-full flex flex-col mt-4 mb-6 md:flex-row text-[16px] md:text-[18px] lg:[text-22px] justify-between gap-4">
                        <div className="w-full">
                          <p className="font-bold mb-2 text-[16px] md:text-[18px] lg:[text-22px] sub-heading tracking-wide text-black/50">
                            LOCATION
                          </p>
                          <p>{job.location}</p>
                        </div>

                        <div className="w-full">
                          <p className="font-bold mb-2 text-[16px] md:text-[18px] lg:[text-22px] sub-heading tracking-wide text-black/50">
                            EMPLOYMENT TYPE
                          </p>
                          <p className="sub-heading">{job.type}</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold sub-heading tracking-wide mt-8 mb-3 text-[16px] md:text-[18px] lg:[text-22px] text-black/50">
                          ABOUT THE ROLE
                        </p>
                        <p className="text-[16px] md:text-[18px] lg:[text-22px] sub-heading">
                          {job.rote}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="font-semibold cursor-pointer hover:bg-gray-200 hover:text-black bg-black text-white px-4 py-2 rounded-md hover:opacity-90 text-[16px] md:text-[18px] lg:[text-22px]"
                        >
                          Apply 
                        </button>
                        <a
                          href="https://www.linkedin.com/company/infocusmediaae/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-black bg-gray-200 cursor-pointer hover:bg-black hover:text-white px-4 py-2 rounded-md hover:opacity-90 text-[16px] md:text-[18px] lg:[text-22px]"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default VacanciesSection;
