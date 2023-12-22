import React, { useState } from 'react';
import redberryLogo from '../assets/redberryLogo.png';
import Button from './Button';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { useAuth } from '../Contexts/AuthContext';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  const enableLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <div className='bg-white w-screen h-20 z-10 sticky flex items-center justify-between px-[76px]'>
        <Link to="/">
          <img src={redberryLogo} alt="Redberry Logo" />
        </Link>
        <div className='flex'>
          {isAuthenticated() ? (
            <Button to='/add_blog'>დაამატე ბლოგი</Button>
          ) : (
            <Button onClick={enableLogin}>შესვლა</Button>
          )}
        </div>
      </div>
      <Modal isVisible={showLogin} onClose={closeLogin} />
    </>
  );
}
