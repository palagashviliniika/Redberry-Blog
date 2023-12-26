import React, { useEffect, useState } from 'react'
import { DropdownIcon } from '../icons/DropdownIcon'
import gallery from '../assets/gallery.png'
import { CloseIcon } from '../icons/CloseIcon'
import { Label } from '../Components/Label'
import { Dropdown } from './Dropdown'

export const Form = () => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [formData, setFormData] = useState({
        image: "",
        author: "",
        title: "",
        description: "",
        publish_date: "",
        categories: "[]",
        email: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // useEffect(() => {
    //     console.log(formData, 'form data');
    // }, [formData])

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

    return (
        <form onSubmit={handleSubmit} className='pt-10'>
                <label 
                    htmlFor={"image"}
                    className='font-medium text-sm text-customBlack pt-6'
                >
                    ატვირთეთ ფოტო
                </label>
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
                            htmlFor="image" 
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
                            <input id='image' type="file" className='hidden' onChange={handleFileChange}/>
                        </label>
                    </div>
                )
                }

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'author'} title={'ავტორი *'} type={"text"} placeholder={'შეიყვნეთ ავტორი'} value={formData.author} onChange={handleChange}/>
                        <ul className='text-xs text-customGray-plc'>
                            <li>• მინიმუმ 4 სიმბოლო</li>
                            <li>• მინიმუმ ორი სიტყვა</li>
                            <li>• მხოლოდ ქართული სიმბოლოები</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'title'} title={'სათაური *'} type={"text"} placeholder={'შეიყვნეთ სათაური'} value={formData.title} onChange={handleChange}/>
                        <ul className='text-xs text-customGray-plc'>
                            <li>მინიმუმ 4 სიმბოლო</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                <label htmlFor={'description'} className='font-medium text-sm text-customBlack pt-6'>აღწერა *</label>
                <textarea
                    placeholder='Describe Project'
                    name='description'
                    id='description'
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className='w-full resize-none text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
                />
                <ul className='text-xs text-customGray-plc'>
                    <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'publish_date'} title={"გამოქვეყნების თარიღი *"} type={"date"} value={formData.publish_date} onChange={handleChange}/>
                    </div>
                    <Dropdown setFormData={setFormData}/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'email'} title={"ელ-ფოსტა"} type="email" placeholder='Example@redberry.ge' value={formData.email} onChange={handleChange}/>
                    </div>
                </div>

                <div className='flex justify-end mt-10 mb-20'>
                    <button type='submit' className='w-72 font-medium text-white bg-customPurple rounded-lg py-2.5 text-sm'>
                        გამოქვეყნება
                    </button>
                </div>

            </form>
    )
}
