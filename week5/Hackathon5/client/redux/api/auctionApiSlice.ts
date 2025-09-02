"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { User } from "@/types/auth/authTypes";

export interface EndAuctionResponse {
  statusCode: number;
  message: string;
  data?: Auction;
}


interface GetAuctionsResponse {
  data: Auction[]; 
  message: string;
  status: number;
}

interface GetAuctionByIDResponse{
      data: Auction; 
  message: string;
  status: number;
}

export const auctionsApi = createApi({
  reducerPath: "auctionsApi",
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
  tagTypes: ["Auctions"],
  endpoints: (builder) => ({
   getAuctions: builder.query<GetAuctionsResponse, { status?: CarStatus } | void>({
  query: (params) => {
    const queryString = params?.status ? `?status=${params.status}` : '';
    return `/auction${queryString}`;
  },
  providesTags: ['Auctions'],
}),
    getAuctionById: builder.query<GetAuctionByIDResponse, string>({
      query: (id) => `/auction/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Auctions", id }],
    }),

  
    createAuction: builder.mutation({
      query: (body) => ({
        url: "/auction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auctions"],
    }),

    updateAuction: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/auctions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Auctions", id }],
    }),

    deleteAuction: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/auctions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auctions"],
    }),

   endAuction: builder.mutation<EndAuctionResponse, string>({
      query: (auctionId) => ({
        url: `/auction/${auctionId}/end`,
        method: 'PATCH',
      }),
      invalidatesTags : ['Auctions']
    }),
  }),
});

// Hooks export
export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionMutation,
  useEndAuctionMutation
} = auctionsApi;






export type CarStatus = 'draft' | 'live' | 'sold' | 'ended';

export interface Auction {
  _id: string;
  owner: string; // Mongo ObjectId as string
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;

  // Auction info
  startsAt?: string; // ISO string
  endsAt: string;    // ISO string
  reservePrice?: number;
  totalBids: number;
  currentBidAmount?: number;
  currentLeader?: User; // Mongo ObjectId as string

  // Display fields
  make?: string;
  model?: string;
  year?: string;

  // Extra specs
  vin: string;
  mileage?: number;
  engine_size?: string;
  paint: string;
  has_gcc_specs?: string;
  noteworthy_features?: string;
  accident_history?: string;
  service_history?: string;
  modified_status: 'Completely stock' | 'Modified';

  // Bidding
  max_bid?: number;

  images: string[];
  trending: boolean;
  sold: boolean;

  createdAt: string; // ISO string
  updatedAt: string; // ISO string

  status?: CarStatus; // virtual field computed on backend
}
