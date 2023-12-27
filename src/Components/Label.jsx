import React from 'react'

export const Label = ({htmlFor, title, onClick, type, placeholder, value, onChange, isValidated}) => {
  // const debug = isValidated => {
  //   console.log("entered function in ", htmlFor);
  //   if (isValidated === null) {
  //     console.log('border-border');
  //   } else if (isValidated === "" || isValidated.length === 0) {
  //     console.log('border-border-correct');
  //   } else {
  //     console.log('border-border-error');
  //   }
  // }

  // debug(isValidated)
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
        className={`text-sm font-normal border ${isValidated === null ? 'border-border bg-inputBG' : isValidated === "" || isValidated.length === 0 ? 'border-border-correct bg-inputBG-correct' : 'border-border-error bg-inputBG-error'} rounded-xl py-3 px-4 focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
        />
    </>
  )
}
