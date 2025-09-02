"use client";


import { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types/auth/authTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001", 
prepareHeaders: (headers) => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      const token = parsed.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  }
  return headers;
},
  }),
  
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
 getProfile: builder.query<User, void>({ 
      query: () => '/user/profile',
      transformResponse: (response: { statusCode: number; message: string; data: User }) => response.data,
    }),
  }),
});

export const {
  useSignupUserMutation,
  useGetProfileQuery,
  useLoginUserMutation
} = authApi
