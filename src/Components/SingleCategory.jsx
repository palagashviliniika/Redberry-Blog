import React from 'react'

export default function SingleCategory({title, textColor, bgColor, hover}) {
    const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
      };
    
      return <div className={`py-2 px-4 text-xs font-medium rounded-[30px] whitespace-nowrap ${hover ? 'cursor-pointer' : ''}`} style={dynamicStyles}>{title}</div>
    
}
