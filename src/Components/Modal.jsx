import React from 'react'
import { CloseIcon } from '../icons/CloseIcon'
import { Login } from './Login'
import { Success } from './Success'

export const Modal = ({isVisible, onClose, blogAdded}) => {

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
    
    return (
        <>
            {isVisible && (
                <div id='wrapper' className='fixed inset-0 bg-customBlack bg-opacity-25 z-20 flex justify-center items-center' onClick={handleClose}>
                    <div className='w-[480px]'>
                        <div className='bg-white rounded-xl px-6 pb-10 py-5 flex flex-col'>
                            <button className='place-self-end bg-white hover:bg-customGray-altHover active:scale-95 transition ease-in-out rounded-full' onClick={onClose}>
                                <CloseIcon />
                            </button>
                            {
                                blogAdded ? 
                                    <Success onClose={onClose} blogAdded/>
                                    : <Login onClose={onClose}/>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
  )
}
