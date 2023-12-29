import React from 'react'
import { RemoveIcon } from '../icons/RemoveIcon';

export default function SingleCategory({title, textColor, bgColor, hover, onClick, remove, selected}) {
      const dynamicStyles = {
        backgroundColor: bgColor,
        color: textColor,
        border: selected ? '1px solid #000000' : `1px solid ${bgColor}`
      };
    
      return (
          <div 
            onClick={onClick} 
            className={`flex gap-2 py-2 ${remove ? 'px-3' : 'px-4'} text-xs font-medium rounded-[30px] whitespace-nowrap ${hover ? 'cursor-pointer active:scale-95 transition ease-in-out' : ''}`} 
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
