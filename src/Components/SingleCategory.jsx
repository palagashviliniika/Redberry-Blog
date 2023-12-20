import React from 'react'

export default function SingleCategory({title, textColor, bgColor}) {
    const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
      };
    
  return (
    <button className={`py-2 px-4 text-xs font-medium rounded-[30px]`} style={dynamicStyles}>
        {title}
    </button>
  )
}
