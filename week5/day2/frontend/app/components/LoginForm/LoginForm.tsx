"use client"
import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Spinner from "../Spinner/Spinner";
import { connectSocket } from "@/utility/socket";
import { toast } from "sonner";
import Link from "next/link";
import { AxiosError } from "axios";
import { useUser } from "@/app/context/userContext";


export type Login={
  email:string
  password:string
}
interface ErrorResponse {
  message: string;
  code?: number;
}


export default function LoginForm(){
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const { setIsAuthenticated,setCurrentUser } = useUser();
const onSubmit: SubmitHandler<Login> = async (data) => {
  setLoading(true)
  const { email, password } = data
  try {
    const response = await api.post('/auth/login', { password, email })
    if (response) {
      const user = response?.data?.user
      const token = response?.data?.access_token as string;
      localStorage.setItem("token", token);
      localStorage.setItem('userData',JSON.stringify(user))
      connectSocket(token);
      toast.success("Logged in successfully!");
      setIsAuthenticated(true)
      setCurrentUser(user)
      setLoading(false)
      router.push('/')
    }
  } catch (error) {
        console.error('Error creating post:', error);
         const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Create Post Failed");
      console.error(axiosError);
        setLoading(false)
      }
};
  return (
    <div className="relative overflow-hidden">
      {/* Light animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 backdrop-blur-sm bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl space-y-6">
        {/* Modern header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-cyan-600 transition-colors duration-300">
            Email Address
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-200/20 to-blue-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="block text-sm font-medium text-gray-600 group-focus-within:text-cyan-600 transition-colors duration-300">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/90 border-2 border-gray-200 rounded-2xl px-4 py-3 
                        focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 
                        transition-all duration-300 hover:border-gray-300 hover:shadow-md
                        placeholder:text-gray-400"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required",minLength:{value:6,message:"Minimum length of password is 6"} })}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-200/20 to-blue-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm flex items-center gap-1 animate-slideIn">
              <span className="text-red-500">⚠️</span>
              {errors.password.message}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 
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
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </button>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>

           <p>Dont have an account?<Link href="/auth/register" className="underline">Register</Link></p>
      </form>
    </div>
  )
}