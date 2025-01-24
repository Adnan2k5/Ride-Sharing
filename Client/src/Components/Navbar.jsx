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
    <div className='w-full bg-inherit h-16 flex items-center justify-around md:justify-around lg:justify-between px-4'>
        <div className="section items-center flex justify-center">
            <h1 className="text-lg md:text-xl font-sans tracking-wide lg:text-2xl xl:text-2xl 2xl:text-4xl font-bold">{greeting}, {user ? user.name  : ``}!</h1>
        </div>
        <div className="section2">
        <User />
        </div>
    </div>
  )
}
