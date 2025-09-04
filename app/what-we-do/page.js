import Footer from '@/components/home/Footer'
import FooterGlobe from '@/components/home/FooterGlobe'
import WhatWeDo from '@/components/what we do/WhatWeDo'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col w-full'>
<WhatWeDo/>
      <FooterGlobe/>
      <Footer/>
      
    </div>
  )
}

export default page
