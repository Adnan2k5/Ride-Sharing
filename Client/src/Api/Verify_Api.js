import axiosClient from "../AxiosClient/Client";


export const verifyEmail = async (email) => {
    try {
        console.log(email)
        const res = await axiosClient.post('/api/otp-verification', email);
        if(res.status === 200){
            return true;
        }
        else if(res.status === 409){
            return false;
        } 
    }
    catch(error){
        console.log(error);
    }
}

export const verifyUser = async (data) => {
    try {
        const res = await axiosClient.post('/api/verify', data);
        if(res.status === 200){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}