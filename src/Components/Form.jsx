import React, { useEffect, useState } from 'react'
import { DropdownIcon } from '../icons/DropdownIcon'
import gallery from '../assets/gallery.png'
import { CloseIcon } from '../icons/CloseIcon'
import { Label } from '../Components/Label'
import { ArrowDown } from '../icons/ArrowDown'
import api from '../api/posts'
import SingleCategory from './SingleCategory'

export const Form = () => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [categories, setCategories] = useState([])
    const [selectedValues, setSelectedValues] = useState([]);
    const [formData, setFormData] = useState({
        image: "",
        author: "",
        title: "",
        description: "",
        publish_date: "",
        categories: "",
        email: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                console.log(response.status);
                // console.log(response.data.data);
                setCategories(response.data.data);
            } catch (err) {
                console.log(err.response.status);
                console.log(err.message);
            }
        }

        fetchCategories()
    }, [])

    const options = categories.map((category) => {
        return (
            <SingleCategory 
                key={category.id}
                title={category.title}
                textColor={category.text_color}
                bgColor={category.background_color}
                hover
                onClick={() => handleOptionClick(category)}
            />
        )
    })

    useEffect(() => {
        console.log(selectedValues);
    }, [selectedValues])

    const handleOptionClick = (option) => {
        // Toggle the selected state of the option
        const isSelected = selectedValues.includes(option);
        const updatedValues = isSelected
          ? selectedValues.filter((value) => value !== option)
          : [...selectedValues, option];
    
        setSelectedValues(updatedValues);
      };

    const toggleDropdown = () => {
        setIsDropdownVisible(prevDropdown => !prevDropdown);
    };

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
                        <Label htmlFor={'author'} title={'ავტორი *'} type={"text"} placeholder={'შეიყვნეთ ავტორი'}/>
                        <ul className='text-xs text-customGray-plc'>
                            <li>• მინიმუმ 4 სიმბოლო</li>
                            <li>• მინიმუმ ორი სიტყვა</li>
                            <li>• მხოლოდ ქართული სიმბოლოები</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'title'} title={'სათაური *'} type={"text"} placeholder={'შეიყვნეთ სათაური'}/>
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
                    className='w-full resize-none text-sm font-normal border border-border rounded-xl py-3 px-4 bg-inputBG focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus'
                />
                <ul className='text-xs text-customGray-plc'>
                    <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'publish_date'} title={"გამოქვეყნების თარიღი *"} type={"date"} />
                    </div>
                    <div className='relative'>
                        <div className='flex flex-col'>
                        <label onClick={toggleDropdown} htmlFor={"categories"} className='font-medium text-sm text-customBlack pt-6'>კატეგორია *</label>
                        </div>
                        <div
                            className={`flex justify-between mt-2 text-sm font-normal rounded-xl ${isDropdownVisible ? 'bg-inputBG-focus border-2 border-border-focus' : 'bg-inputBG border border-border'}`}
                        >
                            <div className='text-customGray-plc overflow-x-auto'>
                                {
                                    selectedValues.length > 0 ?
                                    <div className='flex gap-2 p-1.5'>
                                        {selectedValues.map((value) => (
                                        <SingleCategory 
                                            key={value.id}
                                            title={value.title}
                                            textColor={value.text_color}
                                            bgColor={value.background_color}
                                            remove={() => handleOptionClick(value)}
                                        />
                                        ))}
                                    </div>
                                    :
                                    <p onClick={toggleDropdown} className='py-3 px-4'>
                                        აირჩიეთ კატეგორია
                                    </p>
                                }
                            </div>
                            <div onClick={toggleDropdown} className='py-3 px-4 rounded-r-xl cursor-pointer'>
                                <ArrowDown />
                            </div>
                        </div>

                        {isDropdownVisible && (
                            <div className='absolute mt-2 p-4 bg-white border border-border rounded-xl flex flex-wrap max-h-36 overflow-hidden overflow-y-auto gap-2 scrollbar-hide'>
                                {options}
                            </div>
                        )}
                    </div>

                    
                </div>

                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor={'email'} title={"ელ-ფოსტა"} type="email" placeholder='Example@redberry.ge'/>
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
