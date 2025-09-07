"use client";

import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Image src="/loader-trans.gif" alt="" width={200} height={200} unoptimized />
    </div>
  );
};

export default Loader;
