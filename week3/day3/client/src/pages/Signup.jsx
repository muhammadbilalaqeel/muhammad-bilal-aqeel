import React from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import api from "../services/api";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = async (data) => {

    const {name,email,password} = data;
  try {
      console.log(name,email,password)
    const req = await api.post('/users/register',{
        name,password,email
    })

    toast.success('Signup Succesfully!');
    navigate('/login')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.log(error)
  }



    
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) {
      toast.error(firstError);
    }
  };
  return (
    <div className="py-10 sm:px-8 px-4 min-h-[calc(100vh-80px)] justify-center flex flex-col items-center">
      <h1 className="text-center text-4xl mt-1 grad font-bold">Signup</h1>
      <form
        className="mt-8 flex flex-col gap-1 sm:max-w-[350px] w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-lg text-gray-400">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700 rounded-lg"
            placeholder="bil"
            {...register("name", {
              required: "Username is required",

              validate: (value) => {
                const trimmed = value.trim();
                if (!trimmed) return "Username cannot be empty or spaces";
                if (trimmed.length < 3)
                  return "Username must be at least 3 characters";
                if (trimmed.length > 15)
                  return "Username cannot be more than 15 characters";
                return true;
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-lg text-gray-400">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="bilal@gmail.com"
            className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700  rounded-lg"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-lg text-gray-400">
            Password
          </label>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700 rounded-lg"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (!trimmed) return "Password cannot be empty or spaces";
                  if (trimmed.length < 6)
                    return "Password must not be less than 6 values";
                  if (trimmed.length > 15)
                    return "Password must not be greater than 15 values";
                  return true;
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="cpassword" className="text-lg text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm password"
              className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700 rounded-lg"
              {...register("cpassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords not match",
              })}
            />
          </div>
        </div>
        <div className="w-full mt-4">
          <Button text={"Sign Up"} className={"btn-grad w-full"} />
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
