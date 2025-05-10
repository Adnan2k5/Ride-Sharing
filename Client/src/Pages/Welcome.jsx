import { useSelector, useDispatch } from "react-redux";


import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (!user.loading && user.user == null) {
      navigate('/login')
    }
  }, [user])
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-blue-100">
      <h1 className="text-5xl">Welcome {user != null ? user.user?.name : ''}</h1>
    </div>

  )
}
