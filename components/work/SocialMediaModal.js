import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const transitionSettings = {
  duration: 0.6,
  ease: "easeInOut",
};

const SocialMediaModal = ({ images, currentIndex, onClose, isOpen }) => {
  const [index, setIndex] = useState(currentIndex);

  // Update internal index when currentIndex prop changes
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent modal from closing when clicking inside it
  };


  console.log(images);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
        className="fixed inset-0 backdrop-blur-md bg-white/10 flex flex-col items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transitionSettings}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="flex md:flex-row flex-col-reverse gap-2 px-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitionSettings}
            onClick={handleModalClick}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center md:flex-row flex-col-reverse justify-center gap-6 mt-4 ">
                <img
                  src={images[index]}
                  alt="Case Study"
                  className="max-w-[340px] max-h-[340px] md:max-w-[500px] md:max-h-[500px] lg:max-w-[700px] lg:max-h-[650px] object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-20 text-sm px-4">
                <button
                  onClick={prevImage}
                  className="text-white cursor-pointer rounded-md px-2 py-2 bg-black hover:scale-110 transition-transform"
                >
                  <FaChevronLeft className="text-white text-xl" />
                </button>

                <span className="text-black text-lg font-medium">
                  {index + 1} / {images.length}
                </span>

                <button
                  onClick={nextImage}
                  className="text-white cursor-pointer rounded-md px-2 py-2 bg-black hover:scale-110 transition-transform"
                >
                  <FaChevronRight className="text-white text-xl" />
                </button>
              </div>
            </div>

            <div className="mt-[-40px] flex flex-col items-end md:mt-4">
              <button
                onClick={onClose}
                className="text-black cursor-pointer bg-gray-200 px-4 rounded-sm text-3xl hover:scale-110 transition-transform"
              >
                &times;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialMediaModal;
