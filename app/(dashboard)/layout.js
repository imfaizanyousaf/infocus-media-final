"use client";
import { useState } from "react";
import Sidebar from "@/components/(dashboard)/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CMSLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapsedWidth = 80; // 20 (Tailwind spacing unit) * 4px = 80px
  const expandedWidth = 336; // 84 (Tailwind spacing unit) * 4px = 336px

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <AuthProvider>
          <ProtectedRoute>
            <div className="flex h-screen w-full">
              {/* Fixed Sidebar */}
              <div
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${
                  isCollapsed ? "w-20" : "w-84"
                }`}
              >
                <Sidebar
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              </div>
              {/* Main Content */}
              <main
                className={`transition-all duration-300 overflow-y-auto w-full px-6 py-4 ${
                  isCollapsed ? "ml-[80px]" : "ml-[336px]"
                }`}
              >
                {children}
              </main>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}