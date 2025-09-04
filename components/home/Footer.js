import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-white py-10 flex flex-col items-center gap-2">
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-6 gap-6">
        {/* Logo */}
        <img
          src="/logo-black.png"
          alt="Infocus Media Logo"
          className="md:w-[300px] lg:w-[560px] w-full h-auto object-contain"
        />

        {/* Contact Info */}
        <div className="text-left md:text-right">
          <p className="font-bold  text-[16px] md:text-[10px] lg:text-[18px]">+971 4 330 0409</p>
          <p className="font-bold uppercase text-[16px] md:text-[10px] lg:text-[18px] sub-heading">contact@infocusmedia.ae</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col flex-col-reverse mt-4  lg:flex-row items-center justify-between px-6 gap-4">
        {/* Legal Links */}
        <div className="flex md:flex-row flex-col w-full  md:justify-center  items-center lg:items-center gap-6 text-sm text-black">
          
          <div className="flex lg:flex-row flex-col gap-2 w-full sub-heading">
            <p className="uppercase text-[14px] md:text-[14px] lg:text-[16px] ">©2025 InfocusMedia.</p>
            <p className="uppercase text-[14px] md:text-[14px] lg:text-[16px] ">All rights reserved</p>

          </div>
          

          

        </div>

        {/* Social Icons */}
        <div className="flex w-full  justify-between md:justify-between lg:justify-end text-right items-center gap-8 text-gray-800">
          <a href="https://www.facebook.com/profile.php?id=100086315396682" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-black">
            <img src="/socialIcons/facebook.png" alt="Facebook" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
          <a href="https://x.com/InfocusSocial" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-black">
            <img src="/socialIcons/X.png" alt="X" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
          <a href="https://www.linkedin.com/company/infocusmediaae/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-black">
            <img src="/socialIcons/linkedin.png" alt="LinkedIn" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
          <a href="https://www.instagram.com/infocusmedia.ae/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-black">
            <img src="/socialIcons/instagram.png" alt="Instagram" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
          <a href="https://vimeo.com/user182454438" target="_blank" rel="noopener noreferrer" aria-label="Vimeo" className="hover:text-black">
            <img src="/socialIcons/vimo.png" alt="Vimeo" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
          <a href="https://www.youtube.com/channel/UCdzHgFXTO11YiaU4LuUCplQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-black">
            <img src="/socialIcons/utube.png" alt="YouTube" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
