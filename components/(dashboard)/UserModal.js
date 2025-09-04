"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const UserModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
   
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
       
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };
    if (!dataToSubmit.password) delete dataToSubmit.password;

    onSubmit(dataToSubmit);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-fade-in">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-black focus:outline-none"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={initialData ? "Leave blank to keep unchanged" : "Enter a secure password"}
              value={formData.password}
              onChange={handleChange}
              required={!initialData}
            />
          </div>

         

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
