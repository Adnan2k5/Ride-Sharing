import React from 'react'
import error401 from '../assets/error_401.png'
export const Error401 = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center w-full bg-blue-100 px-10'>
      <img src={error401} alt='error 401' className='w-1/2' />
      <h1 className='text-3xl text-center lg:text-6xl'>Uh Oh! Looks like you slipped out</h1>
    </div>
  )
}
