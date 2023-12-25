import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { ArrowBackIcon } from '../icons/ArrowBackIcon'
import { Link } from 'react-router-dom'
import { Form } from '../Components/Form'

export const AddBlog = () => {
  
  return (
    <div className='bg-customGray-page h-full'>
      <Navbar />
      <div className='mt-10 flex '>
        <Link to={'/'} className='ml-[76px] bg-customGray w-11 h-11 flex justify-center items-center rounded-full cursor-pointer'>
          <ArrowBackIcon />
        </Link>
        <div className='ml-[25%] flex flex-col w-[600px]'>
          <h1 className='font-bold text-[32px]'>
            ბლოგის დამატება
          </h1>
          <Form />
        </div>
      </div>
    </div>
  )
}
