"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [login,{isLoading,isSuccess,error}] = useLoginMutation()
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit =async (data: LoginFormValues) => {
    console.log("Login Data:", data);
    try {
        const res = await login(data).unwrap(); 
        console.log(res)
        toast.success("Successfully logged in!");
        dispatch(setCredentials(res));
        if(res.user.role === 'user'){
          router.push("/");
        }
        else{
          router.push('/dashboard')
        }
      } catch (err: any) {
        if ("data" in err) {
          toast.error(err.data?.message || "Login failed!");
        } else {
          toast.error(err.message || "Something went wrong!");
        }
        console.log("Login error:", err);
      }
  };

  return (

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[450px] bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Login
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">Welcome back!</p>
          </CardHeader>
          <CardContent className="px-8 pb-5">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-[#000000] hover:bg-gray-800 text-white font-semibold py-3 h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] mt-1"
                disabled={isLoading}
              >
                {
                  isLoading ? "Logging....":"Login"
                }
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-gray-800 font-semibold hover:underline transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F0F0F0] text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 h-11"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 h-11"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
   
  );
}