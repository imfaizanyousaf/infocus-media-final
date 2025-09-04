"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Clients = () => {
  const clients = [
    { name: "Client 1", logo: "/assets/Clients/Frame-254.png" },
    { name: "Client 2", logo: "/assets/Clients/Frame-255.png" },
    { name: "Client 3", logo: "/assets/Clients/Frame-256.png" },
    { name: "Client 4", logo: "/assets/Clients/Frame-257.png" },
    { name: "Client 5", logo: "/assets/Clients/Frame-258.png" },
    { name: "Client 6", logo: "/assets/Clients/Frame-254-1.png" },

    { name: "Client 8", logo: "/assets/Clients/Frame-278.png" },
    { name: "Client 9", logo: "/assets/Clients/Frame-256-1.png" },
    { name: "Client 10", logo: "/assets/Clients/Frame-257-1.png" },
    { name: "Client 11", logo: "/assets/Clients/Frame-258-1.png" },
    { name: "Client 12", logo: "/assets/Clients/Frame-259.png" },

    { name: "Client 14", logo: "/assets/Clients/Frame-265.png" },
    { name: "Client 15", logo: "/assets/Clients/Frame-261.png" },
    { name: "Client 16", logo: "/assets/Clients/Frame-262.png" },
    { name: "Client 17", logo: "/assets/Clients/Frame-263.png" },
    { name: "Client 18", logo: "/assets/Clients/Frame-264.png" },

    { name: "Client 20", logo: "/assets/Clients/Frame-265.png" },
    { name: "Client 21", logo: "/assets/Clients/Frame-266.png" },
    { name: "Client 22", logo: "/assets/Clients/Frame-267.png" },
    { name: "Client 23", logo: "/assets/Clients/Frame-268.png" },
    { name: "Client 24", logo: "/assets/Clients/Frame-269.png" },

    { name: "Client 26", logo: "/assets/Clients/Frame-270.png" },
    { name: "Client 27", logo: "/assets/Clients/Frame-254.png" },
    { name: "Client 28", logo: "/assets/Clients/Frame-277.png" },
    { name: "Client 29", logo: "/assets/Clients/Frame-273.png" },
    { name: "Client 30", logo: "/assets/Clients/Frame-274.png" },

    { name: "Client 32", logo: "/assets/Clients/Frame-275.png" },
    { name: "Client 33", logo: "/assets/Clients/Frame-276.png" },
    { name: "Client 34", logo: "/assets/Clients/Frame-277.png" },
  ];

  const gridRef = useRef(null);
  const [columns, setColumns] = useState(3);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const updateColumnCount = () => {
      const grid = gridRef.current;
      if (grid) {
        const firstRowChildren = Array.from(grid.children).filter((el) =>
          el.matches("div")
        );
        const rowTop = firstRowChildren[0]?.getBoundingClientRect().top;
        const count = firstRowChildren.filter(
          (el) => el.getBoundingClientRect().top === rowTop
        ).length;
        setColumns(count);
      }

      // Check if screen is below sm (640px) and hide button accordingly
      setShowButton(window.innerWidth >= 640);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const renderGridItems = () => {
    const items = [];
    const clientsToShow = showButton ? clients.length + 1 : clients.length;
    const totalSlots = Math.ceil(clientsToShow / columns) * columns;

    // For 3-column layout (below md), place button in middle of last row
    const shouldPlaceButtonInMiddle = columns === 3 && showButton;
    const buttonPosition = shouldPlaceButtonInMiddle
      ? Math.floor(totalSlots - columns + columns / 2) // Middle of last row
      : showButton
      ? clients.length
      : -1; // After all clients for other layouts, -1 if no button

    for (let i = 0; i < totalSlots; i++) {
      const clientIndex =
        showButton && i >= buttonPosition && buttonPosition !== -1 ? i - 1 : i;
      const isButtonSlot =
        showButton && i === buttonPosition && buttonPosition !== -1;
      const isClient = clientIndex < clients.length && !isButtonSlot;

      if (isButtonSlot) {
        // Render button
        const isFirstColumn = i % columns === 0;
        const isLastColumn = (i + 1) % columns === 0;
        const isFirstRow = i < columns;
        const isLastRow = i >= totalSlots - columns;

        items.push(
          <div
            key="join-button"
            className={`
              flex items-center justify-center p-4 h-[150px] w-full bg-white
              ${!isFirstRow ? "border-t" : ""}
              ${!isFirstColumn ? "border-l" : ""}
              ${!isLastColumn ? "border-r" : ""}
              ${!isLastRow ? "border-b" : ""}
              border-gray-100
            `}
          >
            {/* <Link
              href={"/contacts"}
              className="bg-black text-white px-6 py-3 text-xs md:px-6 md:py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md md:font-medium text-[12px] md:text-[16px] lg:text-[18px]"
            >
              Join Them
            </Link> */}
          </div>
        );
      } else if (isClient) {
        // Render client
        const client = clients[clientIndex];
        const isFirstColumn = i % columns === 0;
        const isLastColumn = (i + 1) % columns === 0;
        const isFirstRow = i < columns;
        const isLastRow = i >= totalSlots - columns;

        items.push(
          <div
            key={clientIndex}
            className={`
              flex items-center justify-center p-4 h-[150px] w-full bg-white
              ${!isFirstRow ? "border-t" : ""}
              ${!isFirstColumn ? "border-l" : ""}
              ${!isLastColumn ? "border-r" : ""}
              ${!isLastRow ? "border-b" : ""}
              border-gray-100
            `}
          >
            <Image
              src={client.logo}
              alt={client.name}
              className="max-w-full max-h-full object-contain w-full h-full"
              width={100}
              height={100}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        );
      } else {
        // Empty slot
        const isFirstColumn = i % columns === 0;
        const isLastColumn = (i + 1) % columns === 0;
        const isFirstRow = i < columns;
        const isLastRow = i >= totalSlots - columns;

        items.push(
          <div
            key={`empty-${i}`}
            className={`
              flex items-center justify-center p-4 h-[150px] w-full bg-white
              ${!isFirstRow ? "border-t" : ""}
              ${!isFirstColumn ? "border-l" : ""}
              ${!isLastColumn ? "border-r" : ""}
              ${!isLastRow ? "border-b" : ""}
              border-gray-100
            `}
          />
        );
      }
    }

    return items;
  };

  return (
    <section className="w-full px-[5%] py-20 flex flex-col items-center justify-center">
      <h2 className="text-[40px] md:text-[64px] lg:text-[64px] font-bold mb-10">
        Our Clients
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 w-full"
      >
        {renderGridItems()}
      </div>
      <Link
        href={"/contacts"}
        className="bg-black text-white px-6 py-3 text-center my-6 text-xs md:px-6 md:py-3 cursor-pointer hover:bg-gray-200 hover:text-black  transition-transform duration-300 rounded-md md:font-medium text-[12px] md:text-[16px] lg:text-[18px]"
      >
        Join Them
      </Link>
    </section>
  );
};

export default Clients;
