import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { authenticatedApi } from '../api/posts'
import { BlogOverview } from './BlogOverview';
import { useParams } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function SliderItems({currentSlide, setCurrentSlide, categories}) {
  const [relatedBlogs, setRelatedBlogs] = useState ([])
  const { id } = useParams()
  const currentDate = new Date()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await authenticatedApi.get('/blogs')
        console.log(response.status, "blogs")
        // console.log(response.data.data, "blogs")
        setRelatedBlogs(response.data.data)
      } catch (err) {
        console.log(err.response.status);
        console.log(err.message);
      }
    }
  
    fetchBlogs()
  }, [])

  const relatedBlogsItems = relatedBlogs
  .filter(blog => {
    const parsedPublishDate = new Date(blog.publish_date)
    return currentDate >= parsedPublishDate && 
    blog.categories.some(category => categories.includes(category.id)) && blog.id != id
  })
  .map(blog => (
    <SwiperSlide key={blog.id}>
      <BlogOverview
        id={blog.id}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        publish_date={blog.publish_date}
        author={blog.author}
        categories={blog.categories}
      />
    </SwiperSlide>
  ));

  const handleOnSwipeChange = (swiper) => {
    setCurrentSlide({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
      index: swiper.activeIndex
    })
  }
  return (
    <>
      <Swiper 
        navigation={{
          prevEl: '#prevElement',
          nextEl: '#nextElement',
        }}
        modules={[Navigation]} 
        slidesPerView={3} 
        spaceBetween={32} 
        className="mySwiper"
        onSlideChange={(swiper) => {handleOnSwipeChange(swiper)}}
      >
        {relatedBlogsItems}
      </Swiper>
    </>
  );
}
