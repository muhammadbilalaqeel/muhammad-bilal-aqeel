import React, { useContext } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../services/api";
import { userContextValue } from "../context/USERContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUserData } = useContext(userContextValue);

  const onSubmit = async (data) => {
    try {
      const req = await api.post("/users/login", data);

      const token = req.data.data.token;
      const user = req.data.data.user;
      const localData = { ...user, token };
      localStorage.setItem("user", JSON.stringify(localData));
      toast.success(req.data.message);
      setUserData(localData);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };
  const onError = (errors) => {
    toast.error(Object.values(errors)[0].message);
  };
  return (
    <div className="py-10 sm:px-8 px-4 min-h-[calc(100vh-80px)] justify-center flex flex-col items-center">
      <h1 className="text-center text-4xl mt-2 grad font-bold">Login</h1>
      <form
        className="mt-8 flex flex-col gap-2 sm:max-w-[350px] w-full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-lg text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
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
              className="w-full px-2 py-3 bg-[#1B1E24]  border border-gray-700 rounded-lg"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (!trimmed) return "Password cannot be empty or spaces";
                  if (trimmed.length < 6)
                    return "Password must be at least 6 characters";
                  if (trimmed.length > 15)
                    return "Password must be at most 15 characters";

                  return true;
                },
              })}
            />
          </div>
        </div>
        <div className="w-full mt-4 h-[40px]">
          <Button text={"Login"} className={"btn-grad w-full h-full"} />
        </div>
        <div>
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="underline">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
