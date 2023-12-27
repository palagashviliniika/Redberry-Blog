import React from 'react';
import { ErrorMessage } from './ErrorMessage';

export const Label = ({ htmlFor, title, onClick, type, placeholder, value, onChange, isValidated, showErrors, additional }) => {
  const isEmail = htmlFor === 'email';

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
        className={`text-sm font-normal border ${
          (isEmail && !additional) || isValidated === null
            ? 'border-border'
            : isValidated === '' || isValidated.length === 0
            ? 'border-border-correct'
            : 'border-border-error'
        } bg-inputBG rounded-xl py-3 px-4 focus:bg-inputBG-focus placeholder-customGray-plc focus:outline-border-focus`}
      />
      {isValidated && showErrors && <ErrorMessage error={isValidated} />}
    </>
  );
};
