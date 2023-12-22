import React from 'react'
import bigPhoto from '../assets/bigPhoto.jpg'
import SingleCategory from './SingleCategory'
import { ArrowIcon } from '../icons/ArrowIcon'
import { Link } from 'react-router-dom'

export const BlogOverview = () => {
  return (
    <div className='flex flex-col w-[408px]'>
        <img src={bigPhoto} alt="" className='h-[328px] object-cover rounded-xl'/>
        <h3 className='pt-6 font-medium text-base text-customBlack'>
            ნია გოგსაძე
        </h3>
        <p className='pt-2 text-xs text-textGray'>
            02.11.2023
        </p>
        <h3 className='pt-4 font-medium text-xl text-customBlack'>
            EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა
        </h3>
        <div className='flex gap-4 pt-4 flex-wrap'>
            <SingleCategory 
                title="მარკეტი"
                textColor="#FFFFFF"
                bgColor="#1CD67D"
                div={true}
            />
            <SingleCategory 
                title="მარკეტი"
                textColor="#FFFFFF"
                bgColor="#1CD67D"
                div={true}
            />
            <SingleCategory 
                title="მარკეტი"
                textColor="#FFFFFF"
                bgColor="#1CD67D"
                div={true}
            />
            <p className='text-textGray-dark font-normal text-base line-clamp-2'>
                6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი მაქსიმალური სიზუსტისთვის, ეს პროცესი...
            </p>
            <Link to={'/'} className='flex items-center text-customPurple font-medium text-sm gap-1'>
                <p>სრულად ნახვა</p>
                <ArrowIcon />
            </Link>
        </div>
    </div>
  )
}
