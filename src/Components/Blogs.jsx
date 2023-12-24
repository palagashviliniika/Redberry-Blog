import React, { useEffect, useState } from 'react'
import { BlogOverview } from './BlogOverview'
import { authenticatedApi } from '../api/posts'

export const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await authenticatedApi.get('/blogs')
        console.log(response.status, "blogs")
        // console.log(response.data.data, "blogs")
        setBlogs(response.data.data)
      } catch (err) {
        console.log(err.response.status);
        console.log(err.message);
      }
    }

    fetchBlogs()
  }, [])

  const blogItems = blogs.map((blog) => {
    return (
      <BlogOverview 
        key={blog.id}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        publish_date={blog.publish_date}
        author={blog.author}
        categories={blog.categories}
      />
    )
  })

  return (
    <div className='mx-[76px] my-16 grid grid-cols-3 gap-x-8 gap-y-14'>
        {blogItems}
    </div>
  )
}
