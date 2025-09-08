import { Order } from '@/types/order.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000',

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
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    // Create Order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),

    // Get All Orders
    getAllOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),

    // Update Payment Status
    updatePaymentStatus: builder.mutation({
      query: ({ orderId, paymentInfo }) => ({
        url: `/orders/${orderId}/payment`,
        method: 'PUT',
        body: paymentInfo,
      }),
      invalidatesTags: ['Orders'],
    }),

    // Update Order Status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),


    
    getOrdersStats: builder.query<OrderStats,void>({
      query: () => "/orders/stats",
      
    }),

    getOrderById: builder.query<Order,string>({
  query: (orderId) => `/orders/${orderId}`,
  providesTags: ['Orders'],
}),

 getDashboardStats: builder.query<any, void>({
      query: () => "/orders/dashboard-stats",
    }),

    
    getBestSellers: builder.query<BestSellerProduct[],number>({
      query: (limit = 5) => `/orders/best-sellers?limit=${limit}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdatePaymentStatusMutation,
  useUpdateOrderStatusMutation,
  useGetBestSellersQuery,
  useGetOrdersStatsQuery,
  useGetOrderByIdQuery,
  useGetDashboardStatsQuery
} = orderApi;


export interface BestSellerProduct {
  _id: string;
  totalSold: number;
  totalRevenue: number;
  product: {
    name: string;
    price: number;
    variants?: {
      color: string;
      images: string[];
    }[];
  };
}


type OrderStats = {
  totalOrders: number;
  totalCompletedOrders: number;
  totalCompletedAmount: number;
  activeOrdersCount: number;
};
