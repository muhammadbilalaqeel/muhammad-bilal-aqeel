import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  CartResponse,
  AddToCartRequest,
  VariantRequest,
} from "@/types/cart.types";

export const cartApi = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    
    getCart: builder.query<CartResponse, void>({
      query: () => `/cart`,
      providesTags: ["Cart"],
    }),

  
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    
    removeFromCart: builder.mutation<CartResponse, VariantRequest>({
      query: ({ productId, color, size }) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
        body: { color, size },
      }),
      invalidatesTags: ["Cart"],
    }),

   
    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // 5. Increase Quantity
  increaseQuantity: builder.mutation<CartResponse, VariantRequest>({
  query: ({ productId, color, size }) => ({
    url: `/cart/increase/${productId}`,
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: { color, size },
  }),
  invalidatesTags: ["Cart"],
}),

    // 6. Decrease Quantity
    decreaseQuantity: builder.mutation<CartResponse, VariantRequest>({
      query: ({ productId, color, size }) => ({
        url: `/cart/decrease/${productId}`,
        method: "PATCH",
        body: { color, size },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
} = cartApi;
