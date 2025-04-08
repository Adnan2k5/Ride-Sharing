import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Api/Auth_Api'
import { AuthProvider, ProtectedRoute } from './Auth/AuthProvider'
import { Welcome } from './Pages/Welcome'
import { Error401 } from './Pages/Error401'
import { RideBrowser } from './Pages/RideBrowser'
import { CaptainDashboard } from './Pages/CaptainDashboard'

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
          <Route path='/401' element={<Error401/>}/>
          <Route path='/browse' element={<AuthProvider><RideBrowser/></AuthProvider>}/>
          {/* <Route path='/browse' element={<RideBrowser/>}/> */}
          <Route path='/' element={<ProtectedRoute>
            <Welcome/>
          </ProtectedRoute>}/>
          {/* <Route path='/captain' element={<ProtectedRoute><CaptainDashboard/></ProtectedRoute>}/> */}
          <Route path='/captain' element={<CaptainDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
