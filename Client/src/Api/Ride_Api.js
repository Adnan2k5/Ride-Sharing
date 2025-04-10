import axiosClient from "../AxiosClient/Client"
export const AddRide = async (data) => {
    const res = await axiosClient.post('/api/rides/add', data);
    console.log(res);
    if(res.status === 200){
        return true;
    }
}

export const GetRides = async (captain_id) => {
    const res = await axiosClient.get(`/api/rides/${captain_id}`);
    return res.data;
}

export const UpdateRide = async (data) => {
    const id = data.id;
    const res = await axiosClient.put(`/api/rides/updates/${id}`, data);
    if(res.status === 200) {
        return true;
    }
}

export const fetchRides = async() => {
    const res = await axiosClient.get('/api/rides/fetchRides');
    return res.data;
}

export const bookRide = async (data) => {
     const rideId = data.key
     const res = await axiosClient.post(`/api/rides/book`,data)
    console.log(res)
     
}   

export const RideDelelte = async (id) => {
    const res = await axiosClient.delete(`/api/rides/${id}`)
    if(res.status === 200) {
        return true;
    }
}

