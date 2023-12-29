import React, { useEffect, useState } from 'react'
import SliderItems from './SliderItems'
import { ArrowBackIcon } from '../icons/ArrowBackIcon'

export const Slider = ({categories}) => {
  const [currentSlide, setCurrentSlide] = useState({
    isBeginning: true,
    isEnd: false,
    index: 0
  })

  return (
    <div className='mx-[76px] mt-24'>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-customBlack font-bold text-[32px]'>
            მსგავსი სტატიები
        </h1>
        <div className='flex gap-6'>
          <div id='prevElement' className={`${currentSlide.isBeginning ? 'bg-customGray hover:bg-customGray-hover cursor-default' : 'bg-customPurple hover:bg-customPurple-hover cursor-pointer'} active:scale-95 transition ease-in-out w-11 h-11 flex justify-center items-center rounded-full`}>
            <ArrowBackIcon color={'white'}/>
          </div>
          <div id='nextElement' className={`${currentSlide.isEnd ? 'bg-customGray hover:bg-customGray-hover cursor-default' : 'bg-customPurple hover:bg-customPurple-hover cursor-pointer'} active:scale-95 transition ease-in-out rotate-180 w-11 h-11 flex justify-center items-center rounded-full`}>
            <ArrowBackIcon color={'white'}/>
          </div>
        </div>
      </div>
        <SliderItems currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} categories={categories}/>
    </div>
  )
}
