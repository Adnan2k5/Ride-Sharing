import { useForm } from "react-hook-form";
import { useState } from "react";
import { verifyEmail } from "../Api/Verify_Api";
import { verifyUser } from "../Api/Verify_Api";
import { Flex, Input } from 'antd';
import { Modal } from "antd";
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [ModalOpen, setModalOpen] = useState(false);
  const [optsent, setOptsent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pass, setpass] = useState('');
  const [cnfpass, setCnfpass] = useState('');
  const verfiy = async (data) => {
    const email = data.email;
    // const res = await verifyEmail({ email });
    setOptsent(true);
    setModalOpen(true);
  };
  const verfifyOtp = async (data) => {
    const res = await verifyUser({ email: data.email, otp: data.otp });
    if(res){
      setEmailVerified(true);
    }
  };
  const onChange = (text) => {
    console.log('onChange:', text);
  };
  const onInput = (value) => {
    console.log('onInput:', value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-blue-100">
      <div className="login-container w-1/2 bg-blue-200 px-12 py-12 rounded-4xl">
        <form className="flex justify-between border items-center px-2" onSubmit={handleSubmit(verfiy)}>
          <Input
            placeholder="Email"
            className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent"
            type="email"
            {...register("email")}
            variant="Filled"
            size="large"
            
          />
          <button className="rounded-2xl p-3 bg-black  text-white" type="submit">
            Verify
          </button>
          {emailVerified && <div>
              <Input placeholder="Password" className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent" type="password" {...register("password")} onChange={(e)=>{setpass(e.target.value)}} variant="Filled" size="large" />
              <Input placeholder="Confirm Password" className="px-4 py-6 w-full bg-transparent focus:outline-none focus:bg-transparent" type="password" onChange={(e)=>{setCnfpass(e.target.value)}} variant="Filled" size="large" />
              <button className="rounded-2xl p-3 bg-black  text-white" type="submit">Sign Up</button>
            </div>}
        </form>
        <Modal title="OTP Verification" footer={null} className="text-center" open={ModalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)}>
          <form className="flex flex-col h-fit py-5 gap-5 items-center justify-center" onSubmit={handleSubmit(verfifyOtp)}>
          <Input.OTP length={8} size="large" className="w-full" {...sharedProps} {...register('otp')} />
            <button className="px-3 py-4 bg-black rounded-3xl  text-white" type="submit">
              Verify OTP
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
