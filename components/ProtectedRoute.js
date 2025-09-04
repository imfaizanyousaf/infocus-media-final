"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isRedirecting) {
      setIsRedirecting(true);
      // Small delay to prevent flashing
      setTimeout(() => {
        router.replace("/signin");
      }, 100);
    }
  }, [loading, isAuthenticated, router, isRedirecting]);

  // Show loading while checking authentication or redirecting
  if (loading || isRedirecting || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute; 