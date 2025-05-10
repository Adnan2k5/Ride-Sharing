"use client"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage"
import { LoginPage } from "./Pages/LoginPage"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUser } from "./Api/Auth_Api"
import { AuthProvider } from "./Auth/AuthProvider"
import { Welcome } from "./Pages/Welcome"
import { Error401 } from "./Pages/Error401"
import { RideBrowser } from "./Pages/RideBrowser"
import { CaptainDashboard } from "./Pages/CaptainDashboard"
import { UserDashboard } from "./Pages/UserDashboard"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    getUser(dispatch)
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/401" element={<Error401 />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/"
            element={
                <RideBrowser />
            }
          />
          <Route path="/captain" element={<CaptainDashboard />} />
          <Route
            path="/dashboard"
            element={
                <UserDashboard />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
