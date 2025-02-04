import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";

import { Mail, KeyRound } from "lucide-react";
import { sendOtp, verifyOtp } from "../Api/Otp_api";
import { registerUser, loginUser } from "../Api/UserAuth";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
export const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [openModal, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [enterOtp, setEnterOtp] = useState(false);
  const [openpass, setopenpass] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const send = async (email) => {
    const res = await sendOtp(email);
    if (res.status === 200) {
      setEnterOtp(true);
    }
  };
  const handleActivate = async (data) => {
    console.log(data);
    const res = await verifyOtp(data);
    if(res.status === 200){
        toast("Account Activated");
        setopenpass(true)
    }
  };

  const UserReg = async (data) => {
    const res = await registerUser(data, dispatch)
    console.log(res);
    if(res.status === 200){
        console.log("User Registered")
        setOpen(false);
    }
    else if(res.data == null){
      toast("Email already exists")
    }
    reset(); 
  };

  const login = async (data) => {
    try{
      const res = await loginUser(data, dispatch);
      if(res == 401){
        toast("Invalid Credentials");
      }
      else if(res == 200){
        toast("Login Successful");
      }
      else{
        toast('Internal Server Error');
      }
    }
    catch(e){
      toast("Invalid Credentials");
    }
  }

  return (
    <div className="w-[100vw]  mih-h-screen flex">
      <div className="w-full md:py-16 absolute px-8 bg-gradient-to-tr from-[#8989eb] to-[#0db1db] h-full flex items-center justify-center flex-col">
        <div className="login-form flex flex-col bg-white rounded-3xl px-12 p-10 md:w-1/2 w-full  py-16  items-start justify-between">
          <h1 className="w-full text-center font-mono font-bold text-2xl -mt-10 mb-10">
            Sign In
          </h1>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(login)}>
            <div className="email flex w-full items-center justify-around gap-2">
              <Mail />
              <input
                autoComplete="off"
                className="px-4 py-3 w-[90%] border border-gray-500 rounded-lg"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <div className="pass flex w-full items-center justify-around">
              <KeyRound />
              <input
                autoComplete="off"
                className="px-4 py-3 w-[90%] border border-gray-500 rounded-lg"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <button className="bg-blue-500 text-white py-3 rounded-lg">
              Login
            </button>
          </form>
          <p className="w-full text-center mt-2">
            New User?{" "}
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="text-blue-500"
            >
              Register Here
            </button>
          </p>
          <Modal
            title="New User Registeration"
            open={openModal}
            onOk={() => {
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          >
            <form
              onSubmit={handleSubmit(send)}
              className="flex flex-col gap-4 w-full"
            >
              <div className="email flex w-full items-center justify-around gap-2">
                <Mail />
                <input
                  autoComplete="off"
                  className="px-4 py-3 w-[90%] border border-gray-500 rounded-lg"
                  type="email"
                  placeholder="Email"
                  onInput={(e) => {
                    setEmail(e.target.value);
                  }}
                  {...register("email")}
                />
              </div>
              {email != "" ? (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 rounded-lg"
                >
                  Send Otp
                </button>
              ) : null}
            </form>
            {enterOtp ? (
              <div className="w-full flex items-center justify-center flex-col">
                <form onSubmit={handleSubmit(handleActivate)}>
                <input
                  type="text"
                  {...register("otp")}
                  className="px-2 py-3 w-[90%] border mb-2 border-gray-500 rounded-lg"
                  placeholder="otp"
                />
                <button
                  type="submit"
                  onSubmit={() => {
                    handleActivate;
                  }}
                  className="bg-blue-500 w-full text-white py-3 rounded-lg"
                >
                  Activate
                </button>
                </form>
              </div>
            ) : null}
            {
              openpass ? <form onSubmit={handleSubmit(UserReg)} className="flex flex-col gap-4 w-full">
                <KeyRound />
                <input 
                  autoComplete="off"
                  className="px-4 py-3 w-[90%] border border-gray-500 rounded-lg"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
                <input
                  autoComplete="off"
                  className="px-4 py-3 w-[90%] border border-gray-500 rounded-lg"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <button type="submit" className="bg-blue-500 text-white py-3 rounded-lg">
                  Register
                </button>
              </form>
            : null
            }
          </Modal>
        </div>
      </div>
    </div>
  );
};
