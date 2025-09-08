"use client"
import VerifyOTP from "../components/forms/VerifyOTP";
import { Suspense } from "react";
import ContentSpinner from "../components/Spinners/ContentSpinner";
export default function OTP(){
    return (
        <div>
          <Suspense fallback={<ContentSpinner/>}>
            <VerifyOTP/>
          </Suspense> 
        </div>
    )
}