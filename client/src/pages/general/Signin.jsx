import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { login } from "../../api";

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(formData)
    res && navigate('/dashboard')
  }

  return (
    <div className="py-16">
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-theme-primary text-center">
          Sign In
        </h3>
        <p className="text-center my-4">
          Don't have an account? Sign up{" "}
          <Link to={"/signup"} className="underline">
            Now
          </Link>
        </p>

        <form onSubmit={handleSubmit} onChange={handleFormDataChange} className="md:w-4/5 mx-auto">
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholder={"Enter strong password"}
          />
          <ButtonPrimary text={"login"} width={"full"} />

          {/* <p className="text-2xl text-center text-slate-400">OR</p>
          <ButtonPrimary
            text={"contibue with google"}
            isDark={true}
            width={"full"}
            icon={<BsGoogle />}
          /> */}
        </form>
      </div>
    </div>
  );
};

export default Signin;
