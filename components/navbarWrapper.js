// Create: components/NavbarWrapper.js
"use client";

import { useNavbar } from "@/context/NavBarContext";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const { isNavbarVisible } = useNavbar();
  return <Navbar navbarVisible={isNavbarVisible} />;
};

export default NavbarWrapper;
