import React from 'react'

export const Label = ({htmlFor, title, onClick, type, placeholder, value, onChange, isValidated}) => {
  return (
    <>
      <label 
          htmlFor={htmlFor}
          onClick={onClick}
          className='font-medium text-sm text-customBlack pt-6'
      >
          {title}
      </label>

      <input 
        type={type}
        name={htmlFor}
        id={htmlFor}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`text-sm font-normal border ${isValidated === false ? 'border-border-error' : 'border-border'} rounded-xl py-3 px-4 ${isValidated === false ? 'bg-inputBG-error' : 'bg-inputBG'}  focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
        />
    </>
  )
}
