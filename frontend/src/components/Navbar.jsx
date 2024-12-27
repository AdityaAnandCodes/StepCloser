import React from 'react'

const Navbar = () => {
  return (
    <section className='w-full p-2 px-4 flex justify-between items-center bg-gray-100 border-b-2 text-gray-800'>
        <div className='text-2xl font-medium font-serif'>StepCloser</div>
        <div className='flex gap-6 items-center'>
            <a href='#' className='text-lg mx-2'>Goals</a>
            <a href='#' className='text-lg mx-2'>StartOne</a>
            <div className='flex gap-2'>
                <button className='bg-gray-800 rounded-full text-white p-2 px-3'>SignIn/Up</button>
            </div>
        </div>
    </section>
  )
}

export default Navbar