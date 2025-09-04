import React from 'react'

const HeroSection = () => {
  return (
    <div className='bg-[#FAFAFA] px-6 md:py-24 max-sm:pt-24 max-sm:pb-8 h-[50vh] md:h-[72vh] md:pt-32 flex flex-col justify-end'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-5 mt-20'>
        <div className='w-full lg:w-1/2'>
          <h1 className='text-[40px] md:text-[56px] lg:text-[96px] font-bold leading-tight'>
            Get In Touch
          </h1>
        </div>

        <div className='w-full lg:w-1/2  space-y-2 md:space-y-3 sub-heading'>
          <h2 className='text-[16px] font-bold md:text-[18px] lg:text-[22px] uppercase tracking-wide'>
            contact@infocusmedia.ae
          </h2>
          <div className='flex flex-col gap-0'>
          <h2 className='text-[16px] font-bold md:text-[18px] lg:text-[22px] uppercase tracking-wide'>
            +971 (04) 3300 409
          </h2>
          <h2 className='text-[16px] font-bold md:text-[18px] lg:text-[22px] uppercase tracking-wide'>
            Mon-Fri 8AM-6PM
          </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
