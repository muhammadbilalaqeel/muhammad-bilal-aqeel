
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Auction } from './auctionApiSlice';
import { User } from '@/types/auth/authTypes';


interface PlaceBidRequest {
  car: string; 
  amount: number;
}


interface PlaceWishlistRequest {
  car: string; 
}

interface PlaceBidResponse {
  message: string;
  currentBid: number;
  currentLeader: string;
}

interface GetBidUserResponse{
    statusCode: number,
      message: string,
      data: Bid[],
}


interface GetWishlistUserResponse{
    statusCode: number,
      message: string,
      data: WishlistItem[],
}

export const biddingApi = createApi({
  reducerPath: 'auctionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001',prepareHeaders: (headers) => {
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
}, }), 
  endpoints: (builder) => ({
    placeBid: builder.mutation<PlaceBidResponse, PlaceBidRequest>({
      query: (body) => ({
        url: '/biddings',
        method: 'POST',
        body,
      }),
    }),

    getBidsByUser : builder.query<GetBidUserResponse,void>({
      query :()=> '/biddings/user'
    }),


    getWishlistByUser : builder.query<GetWishlistUserResponse,void>({
      query :()=> '/wishlist/user'
    }),


    createWishlist : builder.mutation<GetWishlistUserResponse,PlaceWishlistRequest>({
      query :(body)=> ( {
        url:'/wishlist',
        method:'POST',
        body
      } )
    })
  }),
});

export const { usePlaceBidMutation,useGetBidsByUserQuery,useCreateWishlistMutation,useGetWishlistByUserQuery } = biddingApi;



export interface Bid {
  _id?: string;      // MongoDB document ID
  car: string | Auction; // Can be just the ID or populated Car object
  user: string | User; // Can be ID or populated User object
  amount: number;
  createdAt?: Date;           // Automatically added by timestamps
  updatedAt?: Date;           // Automatically added by timestamps
}


export interface WishlistItem {
  _id: string;   // ObjectId as string
  user: string;  // ObjectId reference to User
  car: string;   // ObjectId reference to Car
  createdAt: string; // from timestamps
  updatedAt: string; // from timestamps
}
