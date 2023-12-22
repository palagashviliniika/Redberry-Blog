import React from 'react'
import tickCircle from '../assets/tickCircle.png'
import Button from './Button'

export const Success = ({onClose}) => {

  return (
    <>
    <img src={tickCircle} alt="" className='w-16 h-16 place-self-center'/>
    <h3 className='place-self-center pt-4 mb-12 text-xl font-bold'>
        წარმატებული ავტორიზაცია
    </h3>
    <Button onClick={onClose}>
        კარგი
    </Button>
    </>
  )
}
