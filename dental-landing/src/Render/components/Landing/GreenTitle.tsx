import React from 'react'

interface Title {
  text: String
}

const GreenTitle = ({ text }: Title ) => {
  return (
    <span className='bg-acento px-10 py-1 rounded-t-xl rounded-bl-xl text-black  text-lg poppins'> {text} </span>
  )
}

export default GreenTitle