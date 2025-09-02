"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Spinner from "../Spinner/Spinner";
import { toast } from "sonner";
import Link from "next/link";
import { AxiosError } from "axios";

export interface SignupFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message: string;
  code?: number;
}


export default function SignupForm(){
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const router = useRouter();
  const [loading,setLoading] = useState(false)
const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
  const { username, email, password } = data;
  setLoading(true);
  try {
    const response = await api.post('/auth/register', { username, password, email });

    if (response) {
        setLoading(false);
        router.push('/auth/login'); // redirect to login
        toast.success("Account created successfully!");
    }
  } catch (error) {
          console.error('Error creating post:', error);
           const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data?.message || "Create Post Failed");
        console.error(axiosError);
          setLoading(false)
        }
};


   const password = watch("password");
  return (
    <div className="relative overflow-hidden ">
      {/* Light animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl space-y-6">
        {/* Modern header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">Join us and start your journey today</p>
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-emerald-600 transition-colors duration-300">
            Username
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-emerald-600 transition-colors duration-300">
            Email Address
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-emerald-600 transition-colors duration-300">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="password"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-emerald-600 transition-colors duration-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full relative group bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 
                    text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl 
                    transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    overflow-hidden"
          disabled={loading}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                         -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 shine-effect"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Spinner color={'white'}/>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </>
            )}
          </span>
        </button>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>

        <p>Already have an account?<Link href="/auth/login" className="underline">Login</Link></p>
      </form>
    </div>
  )
}