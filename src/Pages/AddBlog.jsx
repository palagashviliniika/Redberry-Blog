import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { ArrowBackIcon } from '../icons/ArrowBackIcon'
import { Link } from 'react-router-dom'
import { DropdownIcon } from '../icons/DropdownIcon'
import gallery from '../assets/gallery.png'
import { CloseIcon } from '../icons/CloseIcon'
import { Label } from '../Components/Label'

export const AddBlog = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file)
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  // useEffect(() => {
  //   console.log(selectedFile);
  // }, [selectedFile])
  
  return (
    <div className='bg-customGray-page h-screen'>
      <Navbar />
      <div className='mt-10 flex '>
        <Link to={'/'} className='ml-[76px] bg-customGray w-11 h-11 flex justify-center items-center rounded-full cursor-pointer'>
          <ArrowBackIcon />
        </Link>
        <div className='ml-[25%] flex flex-col w-[600px]'>
          <h1 className='font-bold text-[32px]'>
            ბლოგის დამატება
          </h1>
          <form className='pt-10'>
            <Label htmlFor={"img"} title={'ატვირთეთ ფოტო'}/>
            {
              selectedFile ? (
                <div className='bg-customGray-uploaded p-4 rounded-xl flex items-center justify-between mt-2'>
                  <div className='flex items-center gap-3'>
                    <img src={gallery} alt="" />
                    <p className='text-sm'>
                      {selectedFile.name}
                    </p>
                  </div>
                  <div className='cursor-pointer' onClick={handleDeleteFile}>
                    <CloseIcon />
                  </div>
                </div>
              ) : (
                <div 
                  className={`flex items-center justify-center w-full bg-imgInput hover:bg-imgInput-hover ${isDragOver && 'bg-imgInput-hover' } mt-2`}
                  onDragOver={handleDragOver}  
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label 
                    htmlFor="img" 
                    className='flex flex-col items-center justify-center w-full h-[180px] border border-textGray border-dashed rounded-lg cursor-pointer'
                    >
                    <div className='flex flex-col items-center justify-center gap-6 py-12'>
                      <DropdownIcon />
                      <p className='text-sm font-normal'>
                      {isDragOver
                        ? 'ჩააგდეთ ფაილი'
                        : <span>
                            ჩააგდეთ ფაილი აქ ან{' '}
                            <span className='font-medium underline decoration-solid'>აირჩიეთ ფაილი</span>
                          </span>
                      }
                        
                      </p>
                    </div>
                    <input id='img' type="file" className='hidden' onChange={handleFileChange}/>
                  </label>
                </div>
              )
            }

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor={'author'} title={'ავტორი *'}/>
                <input 
                  type="text" 
                  name='author'
                  id='author'
                  placeholder='შეიყვნეთ ავტორი'
                  className='text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
                />
                <ul className='text-xs text-customGray-plc'>
                  <li>• მინიმუმ 4 სიმბოლო</li>
                  <li>• მინიმუმ ორი სიტყვა</li>
                  <li>• მხოლოდ ქართული სიმბოლოები</li>
                </ul>
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor={'author'} title={'სათაური *'}/>
                <input 
                  type="text" 
                  name='title'
                  id='title'
                  placeholder='შეიყვნეთ სათაური'
                  className='text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
                />
                <ul className='text-xs text-customGray-plc'>
                  <li>მინიმუმ 4 სიმბოლო</li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor={'description'} title={'აღწერა *'}/>
              <textarea
                  placeholder='Describe Project'
                  name='description'
                  id='description'
                  rows={5}
                  className='w-full resize-none text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
