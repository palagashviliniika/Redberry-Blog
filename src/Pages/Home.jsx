import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Landing from '../Components/Landing';
import Categories from '../Components/Categories';
import { Blogs } from '../Components/Blogs';

const Home = () => {
    const [filteredCategories, setFilteredCategories] = useState([])

    // useEffect(() => {
    //     console.log(filteredCategories);
    // }, [filteredCategories])

    return (
        <div>
            <Navbar btn/>
            <Landing>
                ბლოგი
            </Landing>
            <div className='flex justify-center'>
                <Categories filteredCategories={filteredCategories} setFilteredCategories={setFilteredCategories}/>
            </div>
            <Blogs filteredCategories={filteredCategories}/>
        </div>
    );
};

export default Home;