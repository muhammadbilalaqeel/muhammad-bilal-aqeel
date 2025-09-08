
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
import { useRegisterMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20,"Username should not greater than 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const [signup,{isLoading,error,isSuccess}] = useRegisterMutation()
  const router = useRouter()
const onSubmit = async (data: SignupFormValues) => {
  console.log("Signup Data:", data);
  const { confirmPassword, ...restData } = data;

  try {
    const res = await signup(restData).unwrap(); 
    toast.success("Successfully registered! Now Verify Account");
    const email = data.email
    router.push(`/otp?email=${email}`);
   
  } catch (err: any) {
    if ("data" in err) {
      toast.error(err.data?.message || "Registration failed!");
    } else {
      toast.error(err.message || "Something went wrong!");
    }
    console.log("Signup error:", err);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen  p-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[450px] bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Sign Up
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">Create your account</p>
          </CardHeader>
          <CardContent className="px-8 pb-5">
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.username.message}
                  </p>
                )}
              </div>

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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-[#000000] hover:bg-gray-800 text-white font-semibold py-3 h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] mt-2"
                disabled={isLoading}
              >
                {
                  isLoading ? "Registering...":'Sign Up'
                }
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New here? Welcome! Register and join our community.
              </p>
              <p className="text-gray-600 mt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gray-800 font-semibold hover:underline transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}