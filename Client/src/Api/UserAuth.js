import client from "../AxiosClient/AxiosClient";

import {login} from "../Store/authSlice"


export const registerUser = async (data, dispatch) =>{
    const res = await client.post("/api/register",data)
    dispatch(login({user: res.data}));
    return res;
}

export const loginUser = async (data, dispatch) =>{
    try{    
        const res = await client.post("/api/login", data);
        if(res.status === 200){
            dispatch(login({user: res.data}));
            return 200;
        }
        else{
            "Login failed";
        }
    }
    catch(e){
        return e.status;
    }
    
}