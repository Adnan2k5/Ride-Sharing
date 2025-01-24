import { Navbar } from '../Components/Navbar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const Dashboard = () => {

    const data = {
      name: "Adnan",
      email: "test@gmail.com",
    }
    const [user,setuser] = useState(null);

    useEffect(()=>{
        if(data){
            setuser(data);
        }
    }, [])  

    
    
  return (
    <div className='bg-[#DEECF1] min-h-screen'>
      <Navbar user={user}/>
    </div>
  )
}
