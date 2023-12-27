import React from 'react'
import infoCircle from '../assets/infoCircle.png'

export const ErrorMessage = ({error}) => {
  return (
    <div className='flex items-start'>
    <img src={infoCircle} alt="" />
    <p className='pl-2 text-customRed font-normal text-xs'>
        {error}
    </p>
</div>
  )
}
