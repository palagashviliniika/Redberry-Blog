import React from 'react';
import Navbar from '../Components/Navbar';
import Landing from '../Components/Landing';
import Components from '../Components/Components';

const Blogs = () => {
    return (
        <div>
            <Navbar />
            <Landing>
                ბლოგი
            </Landing>
            <Components />
        </div>
    );
};

export default Blogs;