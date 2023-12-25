import React from 'react'

export const Label = ({htmlFor, title, onClick}) => {
  return (
    <label 
        htmlFor={htmlFor}
        onClick={onClick}
        className='font-medium text-sm text-customBlack pt-6'
    >
        {title}
    </label>
  )
}
