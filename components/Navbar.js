"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { name: "HOME", href: "/" },
  { name: "OUR STORY", href: "/story" },
  { name: "CLIENTS", href: "/clients" },
  // { name: "WHAT WE DO", href: "/what-we-do" },
  { name: "CASE STUDIES", href: "/case-studies" },
  { name: "OUR WORK", href: "/work" },
  { name: "CAREERS", href: "/careers" },
  { name: "TEAM", href: "/team" },
  { name: "CONTACTS", href: "/contacts" },
];

// Enhanced color analysis with better performance
const analyzeBrightness = (r, g, b) => {
  // Optimized calculation combining multiple color models for accuracy
  const perceived = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const hsp =
    Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) / 255;

  // Weight different models for better accuracy
  return perceived * 0.4 + luminance * 0.4 + hsp * 0.2;
};

const Navbar = ({ navbarVisible = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const checkTimeoutRef = useRef(null);
  const lastValueRef = useRef(null);
  const valueHistoryRef = useRef([]);
  const intervalRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollVelocity = useRef(0);
  const scrollTimeout = useRef(null);
  const rafId = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoWhite, setLogoWhite] = useState(false);

  // Force check on route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    checkBackground(true);
  }, [pathname]);

  // Constant background check
  useEffect(() => {
    if (typeof window === "undefined") return;

    intervalRef.current = setInterval(() => {
      checkBackground(true);
    }, 1000); // Check every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Optimized debounce with trend analysis
  const debouncedSetDarkBg = useCallback((value) => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Update value history
    valueHistoryRef.current.push(value);
    if (valueHistoryRef.current.length > 3) {
      valueHistoryRef.current.shift();
    }

    // Quick response for significant changes
    const lastValue = lastValueRef.current;
    const significantChange =
      lastValue !== null && Math.abs(value - lastValue) > 0.3;

    lastValueRef.current = value;

    const timeoutDuration = significantChange ? 50 : 100; // Faster for big changes

    checkTimeoutRef.current = setTimeout(() => {
      setIsDarkBg((prev) => {
        // Get average from recent values
        const avgValue =
          valueHistoryRef.current.reduce((a, b) => a + b, 0) /
          valueHistoryRef.current.length;

        // Dynamic thresholds based on change velocity
        const changeVelocity = Math.abs(avgValue - value);
        const threshold = prev ? 0.52 : 0.48; // Tighter thresholds

        // Prevent rapid switches
        if (Math.abs(avgValue - threshold) < 0.08) {
          return prev;
        }

        return avgValue < threshold;
      });
    }, timeoutDuration);
  }, []);

  const getElementAtPoint = useCallback((x, y) => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return null;

    const elements = document.elementsFromPoint(x, y);
    return elements.find((el) => {
      const navbar = navbarRef.current;
      const style = window.getComputedStyle(el);
      return (
        navbar &&
        !navbar.contains(el) &&
        style.opacity !== "0" &&
        style.visibility !== "hidden" &&
        style.display !== "none"
      );
    });
  }, []);

  const calculateLuminance = useCallback((element) => {
    if (!element || typeof window === "undefined") return 1;

    const computedStyle = window.getComputedStyle(element);
    let backgroundColor = computedStyle.backgroundColor;

    // Fast path for solid colors
    if (backgroundColor.startsWith("rgb(")) {
      const rgb = backgroundColor.match(/\d+/g);
      if (rgb) {
        return analyzeBrightness(+rgb[0], +rgb[1], +rgb[2]);
      }
    }

    // Handle transparent and complex backgrounds
    if (
      backgroundColor === "rgba(0, 0, 0, 0)" ||
      backgroundColor === "transparent"
    ) {
      let currentEl = element;
      const seenElements = new Set();

      while (
        currentEl &&
        currentEl !== document.body &&
        !seenElements.has(currentEl)
      ) {
        seenElements.add(currentEl);
        const style = window.getComputedStyle(currentEl);

        // Check for background color
        if (
          style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
          style.backgroundColor !== "transparent"
        ) {
          const rgb = style.backgroundColor.match(/\d+/g);
          return rgb ? analyzeBrightness(+rgb[0], +rgb[1], +rgb[2]) : 1;
        }

        // Handle background images more accurately
        if (style.backgroundImage !== "none") {
          // Assume slightly darker than neutral for background images
          return 0.45;
        }

        currentEl = currentEl.parentElement;
      }
    }

    return 1; // Default to light
  }, []);

  const checkBackground = useCallback(
    (immediate = false, isScrolling = false) => {
      const now = Date.now();
      if (
        !immediate &&
        lastValueRef.current &&
        now - lastValueRef.current < (isScrolling ? 16 : 100)
      ) {
        return;
      }
      lastValueRef.current = now;

      const logo = logoRef.current;
      if (!logo) return;

      // If menu is open, force white logo
      if (menuOpen) {
        setIsDarkBg(true);
        return;
      }

      const rect = logo.getBoundingClientRect();

      // Initialize points array
      const points = [];

      // Increase sampling points during fast scroll
      const isHighVelocity = scrollVelocity.current > 30; // pixels per 16ms
      const rows = isHighVelocity ? 5 : 3;
      const cols = isHighVelocity ? 6 : 4;

      // Strategic point placement
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // More points in the center, fewer at edges
          const weight = 1 - Math.abs(j - (cols - 1) / 2) / cols;
          if (Math.random() < weight) {
            // Probabilistic sampling
            points.push({
              x: rect.left + (rect.width * (j + 0.5)) / cols,
              y: rect.bottom + 1 + i * 1.5,
            });
          }
        }
      }

      // Add extra points at key areas
      points.push(
        { x: rect.left + rect.width / 2, y: rect.bottom + 1 }, // Direct center
        { x: rect.left + rect.width / 4, y: rect.bottom + 1 }, // Quarter left
        { x: rect.left + (3 * rect.width) / 4, y: rect.bottom + 1 } // Quarter right
      );

      // Add extra check points in scroll direction
      if (isScrolling) {
        const scrollDirection = Math.sign(scrollVelocity.current);
        const extraPoints = [];

        // Add more points in scroll direction
        for (let i = 1; i <= 3; i++) {
          extraPoints.push({
            x: rect.left + rect.width / 2,
            y: rect.bottom + scrollDirection * i * 2,
          });
        }

        points.push(...extraPoints);
      }

      // Calculate weighted average with velocity consideration
      let totalWeight = 0;
      let weightedLuminance = 0;

      points.forEach((point, index) => {
        const element = getElementAtPoint(point.x, point.y);
        if (element) {
          // Adjust weight based on scroll velocity and point position
          let weight =
            1 - Math.abs(point.x - (rect.left + rect.width / 2)) / rect.width;

          if (isScrolling) {
            // Give more weight to points in scroll direction
            const distanceFromBottom = Math.abs(point.y - rect.bottom);
            weight *= Math.exp(-distanceFromBottom / 20);
          }

          const luminance = calculateLuminance(element);
          weightedLuminance += luminance * weight;
          totalWeight += weight;
        }
      });

      if (totalWeight > 0) {
        const averageLuminance = weightedLuminance / totalWeight;
        debouncedSetDarkBg(averageLuminance);
      }
    },
    [menuOpen, debouncedSetDarkBg, getElementAtPoint, calculateLuminance]
  );

  // Enhanced scroll handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastFrame = 0;

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = now - lastScrollTime.current;

      // Calculate scroll velocity (pixels per 16ms frame)
      if (timeDiff > 0) {
        scrollVelocity.current =
          Math.abs(currentScrollY - lastScrollY.current) * (16 / timeDiff);
      }

      lastScrollTime.current = now;
      lastScrollY.current = currentScrollY;

      // Clear existing timeouts
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Schedule next check based on velocity
      const frameTime = now - lastFrame;
      if (frameTime >= 16 || scrollVelocity.current > 30) {
        lastFrame = now;
        rafId.current = requestAnimationFrame(() => {
          checkBackground(false, true);
          rafId.current = null;
        });
      }

      // Set scroll end detection
      scrollTimeout.current = setTimeout(() => {
        // Final check after scrolling stops
        checkBackground(true, false);
        scrollVelocity.current = 0;
        scrollTimeout.current = null;
      }, 150); // Adjust this value if needed
    };

    // Add passive scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [checkBackground]);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/team" || pathname === "/what-we-do") {
        setLogoWhite(true);
        if (window.scrollY < 10) {
          setLogoWhite(true);
        } else {
          setLogoWhite(false);
        }
      }
      setIsScrolled(window.scrollY > 10); // Change `10` to adjust trigger point
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const hiddenPaths = [
      "/portal",
      "/users",
      "/profile",
      "/cms",
      "/work-",
      "/work-/add-work",
      "/case-study/*",
      "/case-study",
    ];

    const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));
    setIsVisible(!shouldHide);
  }, [pathname]);

  if (!isVisible) return null;

  // Icon colors now based on menuOpen state
  const iconColor = menuOpen ? "white" : isDarkBg ? "white" : "black";
  const bgColor = menuOpen ? "bg-black" : "bg-gray-200";
  const bgColor1 = menuOpen ? "bg-white" : "bg-black";

  const activeLink = menuItems.find((item) => item.href === pathname);

  return (
    <>
      {/* Fullscreen Overlay - Preserved as is */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-black z-40 flex items-center justify-center w-full "
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center justify-center gap-2 text-2xl sm:text-3xl md:text-5xl font-bold "
                >
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`transition-colors duration-200 md:text-[52px] text-[40px] lg:text-[74px] ${
                        activeLink === item.href ? "text-white" : ""
                      } ${
                        activeLink !== item.href &&
                        hoveredIndex !== null &&
                        hoveredIndex !== index
                          ? "text-white/30"
                          : "text-white hover:text-gray-300"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav
        ref={navbarRef}
        className={`fixed left-0 w-full sm:h-[48px] z-50 px-4 sm:px-6 py-7 sm:pt-10 sm:pb-24 flex items-center justify-between transition-all
          ${
            !menuOpen
              ? "bg-gradient-to-b from-white/80 via-white/20 to-white/0 backdrop-blur-lg [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"
              : "bg-transparent"
          }
          ${navbarVisible ? "translate-y-0" : "-translate-y-full"}`}
      >

        {/* Logo with ref */}
        <div
          ref={logoRef}
          className="w-36 mb-4 bg-red-300 sm:w-32 md:w-48 lg:w-60 relative transition-colors duration-100"
        >
          <Link href={"/"}>
            {/* Black logo as fallback */}
            <Image
              src={menuOpen ? "/logo.png" : "/logo-black.png"}
              alt="Infocus Media Logo"
              width={250}
              height={68}
              className="w-full h-auto object-contain absolute top-0 left-0"
              priority
            />

            {/* White logo overlay */}
            {logoWhite && (
              <Image
                src="/logo.png"
                onClick={() => setMenuOpen(false)}
                alt="Infocus Media Logo"
                width={250}
                height={68}
                className={`w-full h-auto object-contain absolute top-0 left-0 transition-opacity duration-200 ${
                  menuOpen || isDarkBg ? "opacity-100" : "opacity-0"
                }`}
                priority
              />
            )}
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {/* Contact Icon Button */}
          <Link
            href="/contacts"
            className={`p-1.5 h-12 w-12 sm:w-[64px] sm:h-[64px] flex flex-col items-center justify-center rounded-sm transition cursor-pointer ${bgColor1}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="sm:w-[24px] sm:h-[24px]"
            >
              <path
                d="M21 3H3V16H6.6V21L12.45 16.7368H21V3Z"
                stroke={menuOpen ? "black" : "white"}
                strokeWidth="2"
              />
            </svg>
          </Link>

          {/* Hamburger / Close Icon */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`p-1.5 h-12 w-12 sm:w-[64px] sm:h-[64px] flex flex-col items-center justify-center rounded-sm transition cursor-pointer ${bgColor}`}
          >
            {menuOpen ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:w-[24px] sm:h-[24px]"
              >
                <line
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  stroke={iconColor}
                  strokeWidth="3"
                />
                <line
                  x1="3"
                  y1="21"
                  x2="21"
                  y2="3"
                  stroke={iconColor}
                  strokeWidth="3"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="sm:w-[24px] sm:h-[24px]"
              >
                <line y1="4" x2="24" y2="4" stroke="black" strokeWidth="3" />
                <line y1="12" x2="24" y2="12" stroke="black" strokeWidth="3" />
                <line y1="20" x2="24" y2="20" stroke="black" strokeWidth="3" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
