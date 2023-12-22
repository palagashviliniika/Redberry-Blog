import React from 'react'
import { BlogOverview } from './BlogOverview'

export const Blogs = () => {
  return (
    <div className='px-[76px] my-16 flex flex-wrap gap-x-8 gap-y-14'>
        <BlogOverview />
        <BlogOverview />
        <BlogOverview />
        <BlogOverview />
        <BlogOverview />
    </div>
  )
}
