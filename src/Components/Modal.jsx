import React from 'react'
import { CloseIcon } from '../icons/CloseIcon'

export const Modal = ({isVisible}) => {

    return (
        <>
            {isVisible && (
                <div className='fixed inset-0 bg-customBlack bg-opacity-25 z-20 flex justify-center items-center'>
                    <div className='w-[480px]'>
                        <div className='bg-white rounded-xl px-6 pb-10 py-5 flex flex-col'>
                            <button className='place-self-end'>
                                <CloseIcon />
                            </button>
                            Modal
                        </div>
                    </div>
                </div>
            )}
        </>
  )
}
