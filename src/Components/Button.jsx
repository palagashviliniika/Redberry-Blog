import React from 'react'

export default function Button({children, onClick}) {
  return (
    <button className='font-medium text-white bg-customPurple rounded-lg px-5 py-2.5 text-sm' onClick={onClick}>
        {children}
    </button>
  )
}
