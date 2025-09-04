"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiMinus, FiUpload } from "react-icons/fi";
import upload from "@/utils/uploads";

const categories = [
  { value: 'video-production', label: 'Video Production', description: '1 video link' },
  { value: 'motion-graphics', label: 'Motion Graphics', description: '1 video link' },
  { value: 'social-media', label: 'Social Media', description: 'Multiple images' },
  { value: 'animation', label: 'Animation', description: 'Multiple video links' },
  { value: 'event-coverage', label: 'Event Coverage', description: '1 video link' },
];

const WorkModal = ({ isOpen, onClose, onSubmit, initialData, setNotification }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    client: "",
    location: "",
    videoLink: "",
    videoLinks: [""],
    images: [],
    status: "published"
  });

  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        client: initialData.client || "",
        location: initialData.location || "",
        videoLink: initialData.videoLink || "",
        videoLinks: initialData.videoLinks?.length > 0 ? initialData.videoLinks : [""],
        images: initialData.images || [],
        status: initialData.status || "published"
      });
    } else {
      setFormData({
        title: "",
        category: "",
        client: "",
        location: "",
        videoLink: "",
        videoLinks: [""],
        images: [],
        status: "published"
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleVideoLinkChange = (index, value) => {
    const newVideoLinks = [...formData.videoLinks];
    newVideoLinks[index] = value;
    setFormData({ ...formData, videoLinks: newVideoLinks });
  };

  const addVideoLink = () => {
    setFormData({ 
      ...formData, 
      videoLinks: [...formData.videoLinks, ""] 
    });
  };

  const removeVideoLink = (index) => {
    if (formData.videoLinks.length > 1) {
      const newVideoLinks = formData.videoLinks.filter((_, i) => i !== index);
      setFormData({ ...formData, videoLinks: newVideoLinks });
    }
  };

  const handleFileUpload = async (file) => {
    setUploadingImages(true);

    try {
      const url = await upload(file);
      setFormData({ ...formData, images: [...formData.images, url] });
      console.log('Image uploaded:', url);
    } catch (error) {
      console.error('Upload error:', error);
      setNotification({
        message: 'Upload failed',
        type: 'error'
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.category || !formData.client) {
      setNotification({
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    // Category-specific validation
    if (['video-production', 'motion-graphics', 'event-coverage'].includes(formData.category)) {
      if (!formData.videoLink) {
        setNotification({
          message: `${formData.category} requires a video link`,
          type: 'error'
        });
        return;
      }
    }

    if (formData.category === 'animation') {
      const validVideoLinks = formData.videoLinks.filter(link => link.trim() !== '');
      if (validVideoLinks.length === 0) {
        setNotification({
          message: 'Animation category requires at least one video link',
          type: 'error'
        });
        return;
      }
      setFormData({ ...formData, videoLinks: validVideoLinks });
    }

    if (formData.category === 'social-media') {
      if (formData.images.length === 0) {
        setNotification({
          message: 'Social media category requires at least one image',
          type: 'error'
        });
        return;
      }
    }

    // Prepare final data
    const finalData = { ...formData };
    if (initialData) {
      finalData._id = initialData._id;
    }

    onSubmit(finalData);
    onClose();
  };

  if (!isOpen) return null;

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto py-4">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[95vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black focus:outline-none"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Work" : "Add Work"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter work title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Client *
              </label>
              <input
                type="text"
                name="client"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter client name"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label} ({cat.description})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>



          {/* Category-specific fields */}
          {selectedCategory && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">
                {selectedCategory.label} Content
              </h3>

              {/* Single video link categories */}
              {['video-production', 'motion-graphics', 'event-coverage'].includes(formData.category) && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Video Link *
                  </label>
                  <input
                    type="url"
                    name="videoLink"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                    value={formData.videoLink}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Multiple video links for animation */}
              {formData.category === 'animation' && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Video Links *
                  </label>
                  <div className="space-y-2">
                    {formData.videoLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="url"
                          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter video URL"
                          value={link}
                          onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                        />
                        {formData.videoLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVideoLink(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <FiMinus size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addVideoLink}
                      className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <FiPlus size={14} />
                      Add Video Link
                    </button>
                  </div>
                </div>
              )}

              {/* Multiple images for social media */}
              {formData.category === 'social-media' && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Images *
                  </label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          Array.from(e.target.files).forEach(file => {
                            handleFileUpload(file);
                          });
                        }}
                        className="hidden"
                        id="images-upload"
                      />
                      <label
                        htmlFor="images-upload"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        <FiUpload size={16} />
                        {uploadingImages ? 'Uploading...' : 'Upload Images'}
                      </label>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img src={image} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Status */}
          <div className="border-t pt-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
            >
              {initialData ? "Update" : "Add"} Work
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkModal; 