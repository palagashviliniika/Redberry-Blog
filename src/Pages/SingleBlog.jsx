import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams, Link } from 'react-router-dom'
import { ArrowBackIcon } from '../icons/ArrowBackIcon'
import { BlogDetails } from '../Components/BlogDetails'
import { authenticatedApi } from '../api/posts'
import { Slider } from '../Components/Slider'

export default function SingleBlog() {
  const { id } = useParams()
  const [blogDetails, setBlogDetails] = useState({})
  const [categoryIds, setCategoryIds] = useState([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await authenticatedApi.get(`/blogs/${id}`)
        console.log(response.status, "blogs detail");
        // console.log(response.data);
        setBlogDetails(response.data)
      } catch (err) {
        console.log(err.message.status);
        console.log(err.message);
      }
    }

    fetchBlog()
  }, [id])

  useEffect(() => {
    const ids = blogDetails.categories ? blogDetails.categories.map(category => category.id) : [];
    setCategoryIds(ids);
  }, [blogDetails]);

  return (
    <div>
        <Navbar btn/>
        <div className='mx-[76px] mt-10 flex justify-center relative'>
          <Link to={'/'} className='absolute left-0 bg-white w-11 h-11 flex justify-center items-center rounded-full cursor-pointer'>
            <ArrowBackIcon />
          </Link>
          <BlogDetails id={id} blogDetails={blogDetails}/>
        </div>
        <Slider categories={categoryIds}/>
    </div>
  )
}
