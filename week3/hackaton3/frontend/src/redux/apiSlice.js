import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://hackaton3backend.vercel.app/api",
    baseUrl:"http://localhost:5000/api",
     prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.token; 

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },

  }),
  tagTypes: ["Product", "Cart", "Users","Admins","Products"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signupUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
       changeUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/auth/role/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Users","Admins"], 
    }),
    getAllAdmins : builder.query({
      query:()=>"/auth/admins",
      providesTags : ['Admins']
    }),
    getUsers: builder.query({
      query: () => "/auth/users",
      providesTags: ["Users"],
    }),
    toggleUserBlock: builder.mutation({
      query: (id) => ({
        url: `/auth/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users","Admins"], 
    }),
    getAllCollections: builder.query({
      query: () => "/products/collections",
    }),
    getProducts: builder.query({
      query: (page = 1) => `/products?page=${page}`,
      providesTags : ["Product"]
    }),
    getProductsSummary: builder.query({
      query: () => "/products/summary",
      providesTags: ["Products"], 
    }),
    getUserProfile: builder.query({
      query: () => "/users/profile",
    }),
    getFilterOptions: builder.query({
      query: () => "/products/filters/options",
    }),
    getFilteredProducts: builder.query({
      query: (filters) => ({
        url: "/products/filter/search",
        method: "GET",
        params: filters,
      }),
    }),
    updateProduct : builder.mutation({
      query:(data)=>{
         const { id, ...newProduct } = data;
       return {
         url: `/products/${id}`,
        method: "PUT",
        body: newProduct,
      }},
      invalidatesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product","Products"],
    }),
     deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product","Products"], 
    }),
    getProductBySlug: builder.query({
      query: (slug) => `/products/slug/${slug}`,
    }),

    getCartProducts: builder.query({
      query: () => `/cart`,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    increaseQuantity: builder.mutation({
      query: (id) => ({
        url: `/cart/increase/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    decreaseQuantity: builder.mutation({
      query: (id) => ({
        url: `/cart/decrease/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeItemFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetProductsQuery,
  useGetUserProfileQuery,
  useGetAllCollectionsQuery,
  useGetFilterOptionsQuery,
  useGetFilteredProductsQuery,
  useGetProductBySlugQuery,
  useGetCartProductsQuery,
  useAddToCartMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveItemFromCartMutation,
  useGetUsersQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useChangeUserRoleMutation,
  useToggleUserBlockMutation,
  useGetAllAdminsQuery,
  useGetProductsSummaryQuery
} = apiSlice;
