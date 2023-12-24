import React, { useEffect, useState } from 'react'
import SingleCategory from './SingleCategory'
import api from '../api/posts'
import { useHorizontalScroll } from '../hooks/useSideScroll'

export default function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                console.log(response.status);
                // console.log(response.data.data);
                setCategories(response.data.data);
            } catch (err) {
                console.log(err.response.status);
                console.log(err.message);
            }
        }

        fetchCategories()
    }, [])

    const categoryItems = categories.map((category) => {
        return (
            <SingleCategory 
                key={category.id}
                title={category.title}
                textColor={category.text_color}
                bgColor={category.background_color}
                hover
            />
        )
    })

    return (
        <div className='mx-[76px] flex gap-6 overflow-x-auto w-[684px]'>
            {categoryItems}
        </div>
  )
}
