import axiosClient from "../AxiosClient/Client";
import { setUser } from "../Store/userSlice";
import { Cookies } from "react-cookie";

const cookies = new Cookies(); // Create an instance of Cookies

export const userRegister = async (data, dispatch) => {
  try {
    const res = await axiosClient.post("/api/register", data);
    console.log(res);

    if (res.status === 200) {
      dispatch(setUser(res.data));
      cookies.set("token", res.data.token, {
        path: "/",
        maxAge: 60 * 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "strict",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const userLogin = async (data, dispatch) => {
  try {
    const res = await axiosClient.post("/api/login", data);
    if (res.status === 200) {
      dispatch(setUser(res.data.user));
      cookies.set("token", res.data.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: true,
        sameSite: "strict",
      });
      return true;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      alert("Invalid Credentials");
    }
  }
};

export const getUser = async (dispatch) => {
  try {
    const token = cookies.get("token"); // Get token correctly
    if (token) {
      const res = await axiosClient.post("/api/fetchUser", { token });
      if (res.status === 200) {
        dispatch(setUser(res.data));
      } else if (res.status === 401) {
        dispatch(setUser(null));
      }
    } else {
      dispatch(setUser(null));
    }
  } catch (error) {
    console.log(error);
  }
};
