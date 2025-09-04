"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEye, FiEyeOff, FiUser, FiMail } from "react-icons/fi";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await axios.patch(`/api/auth/update-user/${user._id}`, payload);

      if (res.status === 200) {
        setUser(res.data.user);
        setMessage("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <div className="bg-white max-w-[600px] flex flex-col items-center p-8 rounded shadow-md w-full">
        <p className="text-2xl font-bold mb-4">Profile</p>

        <form onSubmit={handleUpdate} className="space-y-5 max-w-md w-full">
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-medium">Password (optional)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pr-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Leave blank to keep unchanged"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {message && <p className="text-sm text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
