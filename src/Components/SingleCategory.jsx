import React from 'react'
import { RemoveIcon } from '../icons/RemoveIcon';

export default function SingleCategory({title, textColor, bgColor, hover, onClick, remove}) {
    const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
      };
    
      return (
          <div 
            onClick={onClick} 
            className={`flex gap-2 py-2 ${remove ? 'px-3' : 'px-4'} text-xs font-medium rounded-[30px] whitespace-nowrap ${hover ? 'cursor-pointer' : ''}`} 
            style={dynamicStyles}
          >
            {title}
            {
              remove && 
                <div onClick={remove} className='cursor-pointer'>
                  <RemoveIcon />
                </div>
            }
          </div>
      )
    
}
