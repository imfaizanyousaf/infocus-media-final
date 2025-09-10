"use client";
//FooterGlobe.js
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterGlobe = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const subtitleRef = useRef(null);
  const mainContentRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Small delay to ensure other GSAP animations have initialized
    const initTimeout = setTimeout(() => {
      const section = sectionRef.current;
      const background = backgroundRef.current;
      const subtitle = subtitleRef.current;
      const mainContent = mainContentRef.current;
      const button = buttonRef.current;
      const particles = particlesRef.current;

      if (!section || !background || !subtitle || !mainContent || !button)
        return;

      // Set initial states - using same image background animation as TransformGlobe
      gsap.set(background, {
        opacity: 0,
        backgroundSize: "250% auto",
        filter: "blur(100px)"
      });
      gsap.set(subtitle, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(mainContent, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(button, { opacity: 0, scale: 0 });
      gsap.set(particles, { opacity: 0, y: 20 });

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: "footer-globe",
          refreshPriority: -1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      // Animation sequence with same background animation as TransformGlobe
      tl
        // Background enter animation - same as TransformGlobe
        .to(
          background,
          {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          },
          0
        )
        .to(
          background,
          {
            backgroundSize: "70% auto",
            filter: "blur(5px)",
            duration: 2,
            ease: "none",
          },
          0
        )
        // Subtitle enter animation
        .to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          0.1
        )
        // Main content enter animation
        .to(
          mainContent,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.1)",
          },
          0.2
        )
        // Button enter animation
        .to(
          button,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.3)",
          },
          0.4
        )
        // Particles enter animation
        .to(
          particles,
          {
            opacity: 0.2,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.1,
          },
          0.3
        )
        // Hold time for content - everything stays visible after this
        .to({}, { duration: 1.2 });

      // Floating particles animation (independent of scroll)
      particles.forEach((particle, i) => {
        if (particle) {
          gsap.to(particle, {
            y: "+=20",
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getById("footer-globe")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white opacity-100 w-screen"
      style={{
        zIndex: 1,
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {/* Image Background - same as TransformGlobe */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-[url(/blob-poster-2.jpg)] bg-no-repeat bg-center"
        style={{
          willChange: "background-size, opacity",
          top: 0,
          left: 0,
        }}
      />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[16px] md:text-[18px] lg:text-[22px] font-bold uppercase tracking-widest mb-1 sub-heading text-black"
        >
          HAVE PROJECT IN MIND?
        </p>

        {/* Main Headlines */}
        <div
          ref={mainContentRef}
          className="flex flex-col items-center justify-center leading-[.95]"
        >
          {["Let's create", "something great", "together!"].map((text, i) => (
            <h1
              key={i}
              className="text-[50px] md:text-[70px] lg:text-[90px] font-bold text-black text-center"
            >
              {text}
            </h1>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-4">
          <button
            ref={buttonRef}
            className="bg-black text-[16px] md:text-[18px] lg:text-[22px] text-white px-6 py-3 cursor-pointer rounded-md font-medium inline-block shadow-lg hover:bg-gray-200 hover:text-black transition-colors duration-300"
            onClick={() => {
              console.log("Navigate to contacts");
            }}
          >
            Let's Go
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (particlesRef.current[i] = el)}
              className="absolute w-2 h-2 bg-gray-300 rounded-full opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterGlobe;