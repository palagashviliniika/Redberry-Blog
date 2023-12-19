import React from 'react'
import redberryLogo from '../assets/redberryLogo.png'
import Button from './Button'
import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <div className='bg-white w-screen h-20 z-10 sticky flex items-center justify-between px-[76px]'>
        <Link to="/">
            <img src={redberryLogo} alt="" />
        </Link>
        <div className='flex'>
            <Button>
                შესვლა
            </Button>
        </div>
    </div>
  )
}
