import React from 'react'
import { CloseIcon } from '../icons/CloseIcon'

export const Modal = ({isVisible, onClose}) => {
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }

    const handleSubmit = (e) => {
        console.log("submitted");
    }

    return (
        <>
            {isVisible && (
                <div id='wrapper' className='fixed inset-0 bg-customBlack bg-opacity-25 z-20 flex justify-center items-center' onClick={handleClose}>
                    <div className='w-[480px]'>
                        <div className='bg-white rounded-xl px-6 pb-10 py-5 flex flex-col'>
                            <button className='place-self-end' onClick={onClose}>
                                <CloseIcon />
                            </button>
                            <h1 className='place-self-center font-bold text-2xl'>
                                შესვლა
                            </h1>
                            <form>
                                <div className='flex flex-col gap-2'>
                                    <label 
                                        htmlFor="email"
                                        className='font-medium text-sm text-customBlack pt-6'
                                    >
                                        ელ-ფოსტა
                                    </label>
                                    <input 
                                        type="email" 
                                        name='email'
                                        id='email'
                                        placeholder='Example@redberry.ge'
                                        className='text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
                                    />
                                    <button
                                        type='submit'
                                        className='mt-4 font-medium text-white bg-customPurple rounded-lg px-5 py-2.5 text-sm'
                                        onClick={handleSubmit}
                                    >
                                        შესვლა
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
  )
}
