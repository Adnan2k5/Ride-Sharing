import { jwtDecode } from "jwt-decode"
import axiosClient from "../AxiosClient/Client"
import { setUser } from "../Store/userSlice"
import Cookies from "js-cookie"
import { useEffect } from "react"
export const userRegister = async (data, dispatch) => {
    console.log(res);
    const res = await axiosClient.post('/api/register', data)
    console.log(res);
    if(res.status === 200){
        dispatch(setUser(res.data));
        Cookies.set("token", res.data.token, {expires: 0, secure: true})
        return true;
    }
    else{
        return false;
    }   
}

export const userLogin = async (data, dispatch) => {
    try{
        const res = await axiosClient.post('/api/login', data)
        if(res.status === 200){
            dispatch(setUser(res.data.user))
            Cookies.set("token", res.data.token)
            return true;
        }
    }
    catch(error){
        if(error.status === 401){
            alert("Invalid Credentials")
        }
    }
}

export const getUser = async (dispatch) => {
    try{
        const token = Cookies.get("token");
        if(token){
            const res = await axiosClient.post('/api/fetchUser', {token})
            if(res.status === 200){
                dispatch(setUser(res.data));
            }
            else if(res.status === 401){
                dispatch(setUser(null));
            }
                
        }
    }
    catch(error){
        console.log(error)
    }
}