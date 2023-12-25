import React, { useEffect, useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <div className='flex items-center'>
        <input
          type='text'
          className='py-2 px-4 text-xs font-medium rounded-[30px] placeholder-gray-400 border border-border focus:outline-none focus:ring focus:border-primary'
          placeholder={
            selectedOptions.length === 0
              ? 'Select categories'
              : selectedOptions.join(', ')
          }
          readOnly
        />
        <button
          className='ml-2 p-2 bg-primary text-white rounded cursor-pointer'
          onClick={handleToggle}
        >
          T
        </button>
      </div>
      {isOpen && (
        <div className='absolute top-full left-0 mt-2 bg-white border border-border rounded shadow-md'>
          {options.map((option) => (
            <div
              key={option}
              className='py-2 px-4 text-xs font-medium cursor-pointer'
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
