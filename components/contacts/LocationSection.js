import React from 'react'

const LocationSection = () => {
  return (
    <div className="w-full relative">
      {/* Address Overlay */}
      <div className="absolute top-2 left-1/2 -translate-x-2/3 md:top-4 md:left-4 md:translate-x-0 bg-white p-3 md:p-8 w-[78vw] max-w-[568px] md:w-[568px] z-10 m-5">
        <div 
          className="text-gray-500 text-base md:text-xl uppercase mb-3 md:mb-4 tracking-wide"
          style={{
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 700
          }}
        >
          ADDRESS
        </div>
        <div 
          className="text-black text-lg md:text-2xl uppercase leading-tight mb-2"
          style={{
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 700
          }}
        >
          OFFICE 221, AL HANAA CENTER,<br/>DUBAI, UAE
        </div>
        <div 
          className="text-black text-base md:text-xl"
          style={{
            fontFamily: 'Almarai, sans-serif',
            fontWeight: 700
          }}
        >
          (04) 3300 409
        </div>
      </div>
      <a href="https://maps.app.goo.gl/cWRBwXFomTUYaeYs9" target="_blank" rel="noopener noreferrer">
        <img src="/map-full.png" className="w-full object-cover h-[70vh]" alt="map" />
      </a>
    </div>
  )
}

export default LocationSection
