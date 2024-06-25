import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-content items-center text-xl'>
      <p>This is page does not exist.</p>
      <Link to="/" className='bg-acento hover:bg-green-500 text-white p-2 rounded'>Go Back</Link>
    </div>
  )
}

export default NotFound