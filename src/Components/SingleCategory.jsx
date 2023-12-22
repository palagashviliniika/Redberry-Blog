import React from 'react'

export default function SingleCategory({title, textColor, bgColor, div}) {
    const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
      };
    
    if (div) {
      return <div className={`py-2 px-4 text-xs font-medium rounded-[30px] whitespace-nowrap`} style={dynamicStyles}>{title}</div>
    } else {
      return <button className={`py-2 px-4 text-xs font-medium rounded-[30px] whitespace-nowrap`} style={dynamicStyles}> {title} </button>
    }
}
