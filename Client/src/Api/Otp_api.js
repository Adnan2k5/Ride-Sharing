import client from "../AxiosClient/AxiosClient";


export const sendOtp = async (email) =>{
    const res = await client.post("/api/otp-verification" , email)
    return res
}

export const verifyOtp = async (data) =>{
    const res = await client.post("/api/verify",data)
    return res;
} 
