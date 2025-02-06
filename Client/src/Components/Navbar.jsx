import React from 'react'
import LoginPage from '../Pages/RegisterPage'

export const Navbar = () => {
  return (
    <div className='w-full h-16'>
        <nav className='bg-gray-800 text-white h-16 flex justify-between items-center'>
            <div className='ml-4'>Logo</div>
            <div className='mr-4'>
            <LoginPage/>
            </div>
        </nav>
    </div>
  )
}
