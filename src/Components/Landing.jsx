import React from 'react'
import landing from '../assets/landing.png'

export default function Landing({children}) {
  return (
    <div className='mx-[76px] flex justify-between items-center my-16'>
        <h1 className='font-bold text-[64px]'>
            {children}
        </h1>
        <img src={landing} alt="" />
    </div>
  )
}
