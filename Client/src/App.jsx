import React from 'react';
import { LoginPage } from './Pages/LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import { Dashboard } from './Pages/Dashboard';
export const App = () => {
  const user = useSelector((state) => state.auth);
  
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* <Route
            path="/login"
            element={user.isAuth ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={user.isAuth ? <Dashboard /> : <Navigate to="/login" />}
          /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};