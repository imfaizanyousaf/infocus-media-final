"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiFolder,
  FiUsers,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      logout(); // Clear auth state and localStorage
      // Use replace to avoid back navigation issues and add small delay
      setTimeout(() => {
        router.replace("/");
      }, 200);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { label: "Case Studies", href: "/portal", icon: <FiFolder size={20} /> },
    { label: "Work", href: "/work-management", icon: <FiBriefcase size={20} /> },
    { label: "Users", href: "/users", icon: <FiUsers size={20} /> },
    { label: "Profile", href: "/profile", icon: <FiUser size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md md:hidden"
      >
        {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-md z-40 transition-all duration-300
        flex flex-col justify-between
        ${isCollapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            {!isCollapsed && <Link href="/">
              <Image src="/logo-black.png" alt="logo" width={100} height={100} />
              
            </Link>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded hover:bg-gray-100 transition hidden md:block"
            >
              {isCollapsed ? <FiMenu size={22} /> : <FiX size={22} />}
            </button>
          </div>

          

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 text-black text-base hover:font-semibold hover:translate-x-1 transition-transform"
                onClick={() => setIsMobileOpen(false)} // Close sidebar on mobile
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition w-full justify-center"
          >
            <FiLogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
