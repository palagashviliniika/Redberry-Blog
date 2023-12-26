import React, {useState, useEffect} from 'react'
import api from '../api/posts'
import SingleCategory from './SingleCategory';
import { ArrowDown } from '../icons/ArrowDown';

export const Dropdown = ({setFormData}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([])
  const [selectedValues, setSelectedValues] = useState([]);

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
    const selectedCategories = JSON.stringify(selectedValues.map(value => value.id))
    
    setFormData((prevFormData) => ({
        ...prevFormData,
        categories: selectedCategories
    }))

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

  return (
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
                    <p onClick={toggleDropdown} className='py-3 px-4 cursor-pointer'>
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
  )
}
