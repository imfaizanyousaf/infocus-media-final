
// "use client";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const FooterGlobe = () => {
//   const sectionRef = useRef(null);
//   const backgroundRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const mainContentRef = useRef(null);
//   const buttonRef = useRef(null);
//   const particlesRef = useRef([]);

//   useEffect(() => {
//     // Small delay to ensure other GSAP animations have initialized
//     const initTimeout = setTimeout(() => {
//       const section = sectionRef.current;
//       const background = backgroundRef.current;
//       const subtitle = subtitleRef.current;
//       const mainContent = mainContentRef.current;
//       const button = buttonRef.current;
//       const particles = particlesRef.current;

//       if (!section || !background || !subtitle || !mainContent || !button)
//         return;

//       // Set initial states
//       gsap.set(background, { scale: 0.8, opacity: 0 });
//       gsap.set(subtitle, { opacity: 0, y: 50, scale: 0.9 });
//       gsap.set(mainContent, { opacity: 0, y: 30, scale: 0.95 });
//       gsap.set(button, { opacity: 0, scale: 0 });
//       gsap.set(particles, { opacity: 0, y: 20 });

//       // Create GSAP timeline with ScrollTrigger
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=2000",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           id: "footer-globe",
//           refreshPriority: -1,
//           invalidateOnRefresh: true,
//           pinSpacing: true,
//         },
//       });

//       // Animation sequence matching TransformGlobe style
//       tl
//         // Background enter animation
//         .to(
//           background,
//           {
//             scale: 1,
//             opacity: 1,
//             duration: 0.3,
//             ease: "power2.out",
//           },
//           0
//         )
//         // Subtitle enter animation
//         .to(
//           subtitle,
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.4,
//             ease: "back.out(1.2)",
//           },
//           0.1
//         )
//         // Main content enter animation
//         .to(
//           mainContent,
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.4,
//             ease: "back.out(1.1)",
//           },
//           0.2
//         )
//         // Button enter animation
//         .to(
//           button,
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.3,
//             ease: "back.out(1.3)",
//           },
//           0.4
//         )
//         // Particles enter animation
//         .to(
//           particles,
//           {
//             opacity: 0.2,
//             y: 0,
//             duration: 0.3,
//             ease: "power2.out",
//             stagger: 0.1,
//           },
//           0.3
//         )
//         // Background scale effect during middle section
//         .to(
//           background,
//           {
//             scale: 1.03,
//             duration: 0.3,
//             ease: "power1.inOut",
//           },
//           0.8
//         )
//         // Hold time for content
//         .to({}, { duration: 0.6 })
//         // Exit animations
//         .to(
//           [subtitle, mainContent, button],
//           {
//             opacity: 0,
//             y: -30,
//             scale: 1.1,
//             duration: 0.3,
//             ease: "power2.in",
//             stagger: 0.05,
//           },
//           1.4
//         )
//         .to(
//           particles,
//           {
//             opacity: 0,
//             y: -20,
//             duration: 0.2,
//             ease: "power2.in",
//             stagger: 0.02,
//           },
//           1.5
//         )
//         // Background leave animation
//         .to(
//           background,
//           {
//             scale: 1.2,
//             opacity: 0,
//             duration: 0.3,
//             ease: "power2.in",
//           },
//           1.6
//         );

//       // Floating particles animation (independent of scroll)
//       particles.forEach((particle, i) => {
//         if (particle) {
//           gsap.to(particle, {
//             y: "+=20",
//             duration: 3 + i * 0.5,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             delay: i * 0.3,
//           });
//         }
//       });
//     }, 100);

//     return () => {
//       clearTimeout(initTimeout);
//       ScrollTrigger.getById("footer-globe")?.kill();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen overflow-hidden"
//       style={{
//         zIndex: 1,
//         marginTop: 0,
//         paddingTop: 0,
//       }}
//     >
//       {/* Background with gradient */}
//       <div
//         ref={backgroundRef}
//         className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d0eed0] to-[#c4e4bb]"
//         style={{
//           willChange: "transform",
//           top: 0,
//           left: 0,
//         }}
//       />

//       {/* Main Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
//         {/* Subtitle */}
//         <p
//           ref={subtitleRef}
//           className="text-[16px] md:text-[18px] lg:text-[22px] font-bold uppercase tracking-widest mb-1 sub-heading"
//         >
//           HAVE PROJECT IN MIND?
//         </p>

//         {/* Main Headlines */}
//         <div
//           ref={mainContentRef}
//           className="flex flex-col items-center justify-center leading-[.95]"
//         >
//           {["Let's create", "something great", "together!"].map((text, i) => (
//             <h1
//               key={i}
//               className="text-[50px] md:text-[70px] lg:text-[90px] font-bold"
//               style={{
//                 background: "linear-gradient(135deg, #000 0%, #333 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {text}
//             </h1>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-4">
//           <button
//             ref={buttonRef}
//             className="bg-black text-[16px] md:text-[18px] lg:text-[22px] text-white px-6 py-3 cursor-pointer rounded-md font-medium inline-block shadow-lg hover:bg-gray-200 hover:text-black transition-colors duration-300"
//             onClick={() => {
//               console.log("Navigate to contacts");
//             }}
//           >
//             Let's Go
//           </button>
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               ref={(el) => (particlesRef.current[i] = el)}
//               className="absolute w-2 h-2 bg-gray-300 rounded-full opacity-20"
//               style={{
//                 left: `${20 + i * 15}%`,
//                 top: `${30 + (i % 3) * 20}%`,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FooterGlobe;
"use client";
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

      // Set initial states
      gsap.set(background, { scale: 0.8, opacity: 0 });
      gsap.set(subtitle, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(mainContent, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(button, { opacity: 0, scale: 0 });
      gsap.set(particles, { opacity: 0, y: 20 });

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: "footer-globe",
          refreshPriority: -1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      // Animation sequence with enter animations only
      tl
        // Background enter animation
        .to(
          background,
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
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
        // Background scale effect during middle section
        .to(
          background,
          {
            scale: 1.03,
            duration: 0.3,
            ease: "power1.inOut",
          },
          0.8
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
      className="relative h-screen overflow-hidden bg-white"
      style={{
        zIndex: 1,
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      {/* Background with gradient */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d0eed0] to-[#c4e4bb]"
        style={{
          willChange: "transform",
          top: 0,
          left: 0,
        }}
      />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[16px] md:text-[18px] lg:text-[22px] font-bold uppercase tracking-widest mb-1 sub-heading"
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
              className="text-[50px] md:text-[70px] lg:text-[90px] font-bold"
              style={{
                background: "linear-gradient(135deg, #000 0%, #333 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
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