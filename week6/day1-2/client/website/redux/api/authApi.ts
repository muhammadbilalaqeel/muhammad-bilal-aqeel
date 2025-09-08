import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
      prepareHeaders: (headers) => {
  const stored = localStorage.getItem("auth"); 
  let token: string | null = null;

  if (stored) {
    try {
      const auth = JSON.parse(stored);
      token = auth.access_token;       
    } catch (error) {
      console.error("Failed to parse auth from localStorage:", error);
    }
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}
  }),
  tagTypes: ["LoyaltyPoints"],
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


    getLoyaltyPoints : builder.query<getLoyaltyPpintsResponse,void>({
      query : () => `/users/loyaltypoints`,
      providesTags: ["LoyaltyPoints"],
    }),

   getUpdateLoyaltyPoints: builder.mutation({
      query: (points) => ({
        url: "/users/update-points",
        method: "PUT",
        body: points,
      }),
      invalidatesTags: ["LoyaltyPoints"], // optional if you want to refetch points after update
    }),
  }),
});

export const { useGetUpdateLoyaltyPointsMutation ,useGetLoyaltyPointsQuery, useRegisterMutation, useResendOtpMutation,useOtpVerifyMutation,useLoginMutation, useGetProfileQuery } = authApi;


export type getLoyaltyPpintsResponse = {
  loyaltyPoints : number
}