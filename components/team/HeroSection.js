import React from 'react'
import {useNavbarThemeById} from "@/hooks/useNavbarTheme";

const HeroSection = () => {
    const options = {
        threshold: 0,
        rootMargin: '15% 0px -60% 0px',
        triggerOnMount:  false
    };
    useNavbarThemeById('team', 'dark', options);
  return (
    <div id={"team"} className='bg-black text-white max-sm:py-32 md:h-screen flex flex-col px-2 justify-center items-center leading-[.95]'>

        <p className='text-[16px] sm:text-[18px] md:text-[22px] font-bold mb-4 leading-relaxed sub-heading'>WHO WE ARE</p>
        <h1 className=' m-auto w-3/4 leading-[1.2] text-[24px] md:text-[50px] lg:text-[84px] font-bold text-center'>We are <span className='text-green-400'>catalyst creators</span> Fast-moving, future-focused, and fired up by initiative. No corner offices, just open doors and <span className='text-green-400'>open minds</span>.</h1>

    </div>
  )
}

export default HeroSection
