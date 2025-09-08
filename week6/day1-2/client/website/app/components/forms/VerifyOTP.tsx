"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useOtpVerifyMutation, useResendOtpMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Zod schema for OTP validation
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [verifyOtp, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();

  // Submit OTP
  const onSubmit = async (data: OtpFormValues) => {
    try {
      const res = await verifyOtp({ ...data, email }).unwrap();
      toast.success("OTP verified successfully!");
      router.push("/login");
    } catch (err: any) {
      if ("data" in err) {
        toast.error(err.data?.message || "OTP verification failed!");
      } else {
        toast.error(err.message || "Something went wrong!");
      }
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      toast.success("OTP resent successfully!");
    } catch (err: any) {
      
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              OTP Verification
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Enter the 6-digit OTP sent to your email
            </p>
            {email && (
              <p className="text-center text-gray-700 text-sm mt-1">
                Check this email: <span className="font-semibold">{email}</span>
              </p>
            )}
          </CardHeader>

          <CardContent className="px-8 pb-5">
            <div className="space-y-4">
              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700 font-medium">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  {...register("otp")}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              {/* Verify OTP Button */}
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="w-full bg-[#000000] hover:bg-gray-800 text-white font-semibold py-3 h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] mt-2"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>

            {/* Resend OTP Button */}
            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="link"
                className="p-0 text-black font-medium hover:underline"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
              <Link
                href="/register"
                className="text-sm text-gray-600 hover:underline"
              >
                Back to Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
