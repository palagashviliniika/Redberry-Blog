import React from 'react';
import Navbar from '../Components/Navbar';
import Landing from '../Components/Landing';
import Categories from '../Components/Categories';

const Blogs = () => {
    return (
        <div>
            <Navbar />
            <Landing>
                ბლოგი
            </Landing>
            <div className='flex justify-center'>
                <Categories />
            </div>
        </div>
    );
};

export default Blogs;