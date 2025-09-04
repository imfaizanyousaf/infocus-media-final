// components/LogoSwitcher.js
import { useEffect, useState } from "react";

export default function LogoSwitcher() {
  const [isDarkBg, setIsDarkBg] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isDark = entry.target.dataset.bg === "dark";
        console.log("isDark use effect", entry.target.dataset.bg);
        if (entry.isIntersecting) {
          setIsDarkBg(isDark);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const markers = document.querySelectorAll("[data-bg]");

    markers.forEach((marker) => observer.observe(marker));

    return () => markers.forEach((marker) => observer.unobserve(marker));
  }, []);
  
  return (
    <img
      src={isDarkBg ? "/logo.png" : "/logo-black.png"}
      alt="Brand Logo"
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        width: "120px",
        height: "auto",
        zIndex: 1000,
        transition: "0.3s ease-in-out",
      }}
    />
  );
}