"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "@/components/Loader";

const SignInPage = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/portal");
    }
  }, [isAuthenticated, authLoading, router]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(data);
      if (result.success) {
        router.push("/portal");
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Don't render signin form if already authenticated
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black">
      {/* Left side illustration */}
      <div className="hidden lg:flex flex-1 justify-center items-center bg-black">
        <div className="relative w-80 h-80">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rotate-45"></div>
          <div className="absolute top-20 right-0 w-24 h-24 border-2 border-white"></div>
          <div className="absolute bottom-0 left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rotate-12"></div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Sign In</h2>

        <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-600 text-lg"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border border-black transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
