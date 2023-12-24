import React from 'react'

export const Label = ({htmlFor, title}) => {
  return (
    <label 
        htmlFor={htmlFor}
        className='font-medium text-sm text-customBlack pt-6'
    >
        {title}
    </label>
  )
}
