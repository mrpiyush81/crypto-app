import React from 'react'
import Carousel from './Carousel'
import image from './banner2.jpg'
function Banner() {
  return (
    <div className='h-[305px]'>
      <div className='relative '>

      <div className='absolute w-full '>
        <img src={image} className='h-[305px] w-full object-cover'  alt="banner image" />
      </div>
        <div className='relative z-10 flex items-center flex-col justify-center gap-2 pt-2'>
            <h1 className='text-white font-sans text-4xl sm:text-7xl font-bold'>Crypto Hunt</h1>
            <h5 className='text-gray-400 text-center sm:text-12 mt-3'>Get All The Info Regarding  Your Favorite Crypto Currency</h5>
        </div>
        <div className='lg:px-[50px]  mt-8 2xl:px-[200px] '>
          <Carousel></Carousel>
        </div>
        
      </div>
    </div>
  )
}

export default Banner