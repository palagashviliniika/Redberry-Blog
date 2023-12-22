import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children, onClick, to}) {
  const classNames = 'font-medium text-white bg-customPurple rounded-lg px-5 py-2.5 text-sm'


  if (to) {
    return <Link to={to} className={classNames}>{children}</Link>;
  } else {
    return <button className={classNames} onClick={onClick}>{children}</button>;
  }
}
