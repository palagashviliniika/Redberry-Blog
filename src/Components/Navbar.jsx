import React, { useState } from 'react'
import redberryLogo from '../assets/redberryLogo.png'
import Button from './Button'
import {Link} from "react-router-dom"
import { Modal } from './Modal'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)

  const enableLogin = () => {
    setShowLogin(true)
  }

  const closeLogin = () => {
    setShowLogin(false)
  }

  return (
    <>
      <div className='bg-white w-screen h-20 z-10 sticky flex items-center justify-between px-[76px]'>
          <Link to="/">
              <img src={redberryLogo} alt="" />
          </Link>
          <div className='flex'>
              <Button onClick={enableLogin}>
                  შესვლა
              </Button>
          </div>
      </div>
      <Modal isVisible={showLogin} onClose={closeLogin}/>
    </>
  )
}
