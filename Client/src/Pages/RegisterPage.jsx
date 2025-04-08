import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { verifyEmail } from "../Api/Verify_Api";
import { verifyUser } from "../Api/Verify_Api";
import loginbg from "../assets/loginbg.png";
import { Modal } from "antd";
import { userRegister } from "../Api/Auth_Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [ModalOpen, setModalOpen] = useState(false);
  const [optsent, setOptsent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pass, setpass] = useState("");
  const [cnfpass, setCnfpass] = useState("");
  const [error, seterror] = useState("");
  const verfiy = async (data) => {
    
    const email = data.email;
    const res = await verifyEmail({ email });
    if (res) {
      setOptsent(true);
      setModalOpen(true);
    }
    else{
      console.log("Email Already Exists");
    }
  };
  const verfifyOtp = async (data) => {
    console.log(data);
    const res = await verifyUser({ email: data.email, otp: data.otp });
    if (res) {
      setEmailVerified(true);
      setModalOpen(false);
    }
  };
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  useEffect(() => {
    const passValidator = () => {
      if (pass && cnfpass) {
        if (pass !== cnfpass) {
          seterror("Password Does not Match!");
        }
        if (pass === cnfpass) {
          seterror("");
        }
      }
    };
    passValidator();
  }, [pass, cnfpass]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const registerUser =  (data) => {
    const res =  userRegister(data, dispatch);
    if(res){
      console.log("User Registered Successfully");
      Navigate("/");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-blue-100">
      <div className="image-container hidden md:flex">
        <img src={loginbg} />
      </div>
      <div className="login-container md:w-1/2 w-full py-12  px-10 rounded-4xl">
        <h1 className="text-6xl text-center md:text-start">Sign Up</h1>
        <form
          className="flex flex-col justify-between border mt-5 rounded-2xl items-center px-2 py-2"
          onSubmit={handleSubmit(verfiy)}
        >
          <div className="email flex w-full rounded-xl">
            <input
              placeholder="Email"
              autoComplete="off"
              className="px-4 py-2 w-full bg-transparent focus:outline-none focus:bg-transparent"
              type="email"
              {...register("email")}
            />
            {emailVerified ? null : (
              <button
                className="rounded-2xl duration-500 p-2 bg-black  text-white"
                type="submit"
              >
                Verify
              </button>
            )}
          </div>
        </form>
          {emailVerified && (
            <form className="w-full" onSubmit={handleSubmit(registerUser)}>
              <div className="mt-4 flex duration-500 flex-col w-full gap-2">
                <input
                  placeholder="Name"
                  autoComplete="off"
                  className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent"
                  type="text"
                  {...register("name")}
                />{" "}
                <input
                  placeholder="Password"
                  autoComplete="off"
                  className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent"
                  type="password"
                  {...register("password")}
                  onChange={(e) => {
                    setpass(e.target.value);
                  }}
                />
                <input
                  placeholder="Confirm Password"
                  autoComplete="off"
                  className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent"
                  type="password"
                  onChange={(e) => {
                    setCnfpass(e.target.value);
                  }}
                
                />

                {error !== "" && <p className="text-red-500">{error}</p>}
                <input {...register("role")} placeholder="Register as Captain" type="checkbox"/>
                <button
                  className="rounded-2xl p-3 bg-black  text-white"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          )}
        
        <Modal
          title="OTP Verification"
          footer={null}
          className="text-center duration-500"
          open={ModalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        >
          <form
            className="flex flex-col h-fit py-5 gap-5 items-center justify-center"
            onSubmit={handleSubmit(verfifyOtp)}
          >
            <input className="w-full" {...register("otp")} />
            <button
              className="px-3 py-4 bg-black rounded-3xl text-white"
              type="submit"
            >
              Verify OTP
            </button>
          </form>
        </Modal>
        <p>
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-400 duration-100"
            href="/login"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
