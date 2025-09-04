import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";

const SpotLightClients = () => {
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

  // Split into rows
  const row1 = clients.slice(0, 8);
  const row2 = clients.slice(8, 16);
  const row3 = clients.slice(16, 23);

  const ClientRow = ({ clients, reverse = false, duration = 800 }) => {
    const duplicated = [...clients, ...clients]; // For seamless loop
    const animation = {
      x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
    };

    return (
      <div className="overflow-hidden w-full mb-6">
        <motion.div
          className="flex gap-8 w-max"
          animate={animation}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          }}
        >
          {duplicated.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0  w-[154px] h-[84px] lg:w-[280px] lg:h-[156px] flex items-center justify-center p-4"
            >
              <Image
                src={client.logo}
                alt={client.name}
                
                className="max-w-full max-h-full w-[170px] h-[170px] lg:w-[280px] lg:h-[155px] object-contain"
                width={100}
                height={100}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className=" px-6">
        <div className="text-center mb-12">
          <h2 className="text-[40px] md:text-[64px] font-bold text-black mb-4">
            Spotlighted Clients
          </h2>
        </div>

        <ClientRow clients={row1} reverse={false} duration={12} />
        {/* <div className='bg-gray-200 w-full h-[1px]'></div> */}
        {/* <ClientRow clients={row2} reverse={true} duration={10} /> */}
        {/* <div className='bg-gray-200 w-full h-[1px]'></div> */}
        {/* <ClientRow clients={row3} reverse={false} duration={8} /> */}

        <div className="text-center mt-10">
          <Link href="/clients" className='bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]'>
            See All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpotLightClients;
