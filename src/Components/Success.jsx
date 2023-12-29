import React from 'react'
import tickCircle from '../assets/tickCircle.png'
import Button from './Button'

export const Success = ({onClose, blogAdded}) => {

  return (
    <>
      <img src={tickCircle} alt="" className='w-16 h-16 place-self-center'/>
      <h3 className='place-self-center pt-4 mb-12 text-xl font-bold'>
          {blogAdded ? 'ჩანაწი წარმატებით დაემატა' : 'წარმატებული ავტორიზაცია'}
      </h3>
      {
        blogAdded 
        ? 
          <Button onClick={onClose} to={'/'}>
            {blogAdded ? "მთავარ გვერდზე დაბრუნება" : "კარგი"}
          </Button>
        : 
        <Button onClick={onClose}>
          {blogAdded ? "მთავარ გვერდზე დაბრუნება" : "კარგი"}
        </Button>
      }
    </>
  )
}
