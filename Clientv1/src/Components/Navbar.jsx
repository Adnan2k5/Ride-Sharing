import React, { useEffect } from 'react'
import { useState } from 'react';
import { User } from 'lucide-react';
export const Navbar = ({user}) => {
    const Time = new Date().toLocaleTimeString();
    const [greeting, setGreeting] = useState('Good Morning');
    useEffect(()=>{
        if(Time >= '12:00:00' && Time < '16:00:00'){
            setGreeting('Good Afternoon');
        }
        else if(Time >= '16:00:00' && Time < '20:00:00'){
            setGreeting('Good Evening');
        }
        else(
            setGreeting("Good Morning")
        )
    }, [Time])
  return (
    <div className='w-full bg-inherit lg:py-10 py-2 md:px-24 px-8 h-16 flex items-center justify-between md:justify-between lg:justify-between'>
        <div className="section items-center flex justify-center">
            <h1 className="text-sm md:text-2xl font-playwrite tracking-wide lg:text-3xl xl:text-2xl 2xl:text-3xl font-bold">{greeting}, {user ? user.name  : ``}!</h1>
        </div>
        <div className="section2 bg-[#D0E0E9] p-2 hover:bg-black hover:text-white duration-300 rounded-full ">
            <User className='md:w-10  md:h-8 w-5 lg:w-10 lg:h-8' />
        </div>
    </div>
  )
}
