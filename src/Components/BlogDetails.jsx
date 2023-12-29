import React from 'react'
import SingleCategory from './SingleCategory'

export const BlogDetails = ({id, blogDetails}) => {
    const blogCategories = blogDetails?.categories?.map((category) => {
        return (
            <SingleCategory
                key={category.id}
                title={category.title}
                textColor={category.text_color}
                bgColor={category.background_color}
            />
        )
    })

    return (
        <div className='w-[720px]'>
            <img src={blogDetails.image} alt="" className='w-full h-[328px] object-cover rounded-xl'/>
            <h3 className='mt-10 text-customBlack font-medium text-base'>
                {blogDetails.author}
            </h3>
            <p className='mt-2 text-xs text-textGray'>
                {blogDetails.publish_date} {blogDetails.email && `• ${blogDetails.email}`}
            </p>
            <h1 className='mt-6 font-bold text-[32px] text-customBlack'>
                {blogDetails.title}
            </h1>
            <div className='mt-6 flex gap-4'>
                {blogCategories}
            </div>
            <p className='mt-10 text-textGray-dark'>
                {blogDetails.description}
            </p>
        </div>
    )
}
