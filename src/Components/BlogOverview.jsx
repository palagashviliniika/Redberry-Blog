import React, { useEffect } from 'react'
import bigPhoto from '../assets/bigPhoto.jpg'
import SingleCategory from './SingleCategory'
import { ArrowIcon } from '../icons/ArrowIcon'
import { Link } from 'react-router-dom'

export const BlogOverview = ({id, title, description, image, publish_date, author, categories}) => {
    
    const categoryItems = categories.map((category) => {
        return (
            <SingleCategory 
                key={category.id}
                title={category.title}
                textColor={category.text_color}
                bgColor={category.background_color}
            />
        )
    })

    // useEffect(() => {
    //     const currentDate = new Date()
    //     const parsedPublishDate = new Date(publish_date)
    //     console.log(currentDate >=parsedPublishDate);
    // }, [])

  return (
    <div className='flex flex-col h-[620px]'>
        <img src={image} alt="" className='h-[328px] object-cover rounded-xl'/>
        <h3 className='pt-6 font-medium text-base text-customBlack'>
            {author}
        </h3>
        <p className='pt-2 text-xs text-textGray'>
            {publish_date}
        </p>
        <h3 className='pt-4 font-medium text-xl text-customBlack'>
            {title}
        </h3>
        <div className='flex gap-4 pt-4 flex-wrap'>
            {categoryItems}
        </div>
        <p className='pt-4 text-textGray-dark font-normal text-base line-clamp-2'>
            {description}
        </p>
        <Link to={`/blogs/${id}`} className='pt-4 flex items-center text-customPurple font-medium text-sm gap-1'>
            <p>სრულად ნახვა</p>
            <ArrowIcon />
        </Link>
    </div>
  )
}
