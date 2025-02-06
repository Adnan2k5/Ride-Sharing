import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { Welcome } from './Pages/Welcome'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Api/Auth_Api'
import { AuthProvider } from './Auth/AuthProvider'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch])
  
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
