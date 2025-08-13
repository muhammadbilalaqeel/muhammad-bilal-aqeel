import React from 'react'

const Button = ({text,bg,color}) => {
  return (
    <button className={`px-4 py-3  ${bg} ${color}`}>
      {text}
    </button>
  )
}

export default Button
