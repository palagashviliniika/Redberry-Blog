import React from 'react'

export default function Button({children}) {
  return (
    <button className='font-medium text-white bg-customPurple rounded-lg px-5 py-2.5 text-sm'>
        {children}
    </button>
  )
}
