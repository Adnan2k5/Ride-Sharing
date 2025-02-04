import { UserWallet } from '../Components/Wallet';
import { Navbar } from '../Components/Navbar';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {MockUser} from "../Data/mockUser"

export const Dashboard = () => {

  

  
    
  return (
    <div className='bg-[#DEECF1] min-h-screen'>
      <Navbar user={MockUser[0]}/>
      <UserWallet user={MockUser[0]}/>
    </div>
  )
}
