import React from 'react';
import Navbar from '../Components/Navbar';
import Landing from '../Components/Landing';
import Categories from '../Components/Categories';
import { Blogs } from '../Components/Blogs';

const Home = () => {
    return (
        <div>
            <Navbar btn/>
            <Landing>
                ბლოგი
            </Landing>
            <div className='flex justify-center'>
                <Categories />
            </div>
            <Blogs />
        </div>
    );
};

export default Home;