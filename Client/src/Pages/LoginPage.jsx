import React, { useEffect } from "react";
import loginbg from "../assets/signin.png";
import { useForm } from "react-hook-form";
import { userLogin } from "../Api/Auth_Api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { register, handleSubmit, reset } = useForm();
  const LoginUser = async (data) => {
    const res = await userLogin(data, dispatch);
    if (res) {
      navigate('/')
    }
  }
  useEffect(() => {
    if (!user.loading && user.user != null) {
      navigate('/')
    }
  }, [user])
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-blue-100">
      <div className="login-container md:w-[40%] w-full py-12  px-10 rounded-4xl">
        <h1 className="text-6xl text-center md:text-start">Sign In</h1>
        <form onSubmit={handleSubmit(LoginUser)} className="flex flex-col justify-between  mt-5 rounded-2xl items-center px-2 py-2">
          <div className="email flex flex-col items-center w-full gap-3 rounded-xl">
            <input
              placeholder="Email"
              autoComplete="off"
              className="px-4 py-2 w-full bg-transparent border rounded-xl focus:outline-none focus:bg-transparent"
              type="email"
              {...register("email")}
            />
            <input
              placeholder="Password"
              autoComplete="off"
              className="px-4 py-2 w-full bg-transparent rounded-xl focus:outline-none focus:bg-transparent border"
              type="text"
              {...register("password")}

            />
            <button
              className="hover:text-blue-500 border rounded-2xl align-middle px-2 py-3 duration-200 w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <p>
          Don't have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-400 duration-100"
            href="/register"
          >
            Sign Up
          </a>
        </p>
      </div>
      <div className="loginbg hidden md:flex">
        <img src={loginbg} />
      </div>
    </div>
  );
};
