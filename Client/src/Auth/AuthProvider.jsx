import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(()=>{
        if(user.loading == false && user.isAuthenticated == true && user.user == null){
            navigate('/login')
        }
    }, [user])

    return children
}


export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [auth, setauth] = useState(false);
    useEffect(()=>{
        if(user.loading == false && user.isAuthenticated && user.user != null){
            if(user.user){
                setauth(true)
            }
            else{
                navigate('/login')
            }
        }
        else if(user.loading == false && user.isAuthenticated == true && user.user == null){
            navigate('/login')
        }
    })

    return auth ? children : null
}