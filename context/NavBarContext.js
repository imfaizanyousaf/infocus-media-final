// Create: context/NavbarContext.js
"use client";
import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  return (
    <NavbarContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
      {children}
    </NavbarContext.Provider>
  );
};
