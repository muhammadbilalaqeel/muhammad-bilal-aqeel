import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000"}),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    otpVerify : builder.mutation({
      query:(body)=>({
        url:'/auth/verify-otp',
        method:"POST",
        body
      })
    }),
    resendOtp : builder.mutation({
      query:(body)=>({
        url:'/auth/resend-otp',
        method:"POST",
        body
      })
    }),
    getProfile: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useRegisterMutation, useResendOtpMutation,useOtpVerifyMutation,useLoginMutation, useGetProfileQuery } = authApi;
