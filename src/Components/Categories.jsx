import React, { useEffect, useState } from 'react'
import SingleCategory from './SingleCategory'
import api from '../api/posts'
import { useHorizontalScroll } from '../hooks/useSideScroll'

export default function Categories({filteredCategories, setFilteredCategories}) {
    const [categories, setCategories] = useState([])
    const scrollRef = useHorizontalScroll();

    const handleCategoryClick = (categoryId) => {
        setFilteredCategories((prevCategories) => {
            if (prevCategories.includes(categoryId)) {
                return prevCategories.filter((id) => id !== categoryId);
            } else {
                return [...prevCategories, categoryId]
            }
        })
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                setCategories(response.data.data);
            } catch (err) {
                console.log(err.response.status);
                console.log(err.message);
            }
        }

        fetchCategories()
    }, [])

    const categoryItems = categories.map((category) => {
        const selected = filteredCategories.includes(category.id)

        return (
            <SingleCategory 
                key={category.id}
                title={category.title}
                textColor={category.text_color}
                bgColor={category.background_color}
                hover
                onClick={() => handleCategoryClick(category.id)}
                selected={selected}
            />
        )
    })

    return (
        <div ref={scrollRef} className='mx-[76px] flex gap-6 overflow-x-auto w-[684px] pb-2'>
            {categoryItems}
        </div>
  )
}
