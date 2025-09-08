import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000"}),
    tagTypes: ['Product'],
  endpoints: (builder) => ({
    createProduct : builder.mutation({
      query:(body)=>({
        url:'/products',
        method:'POST',
        body
      })
    }),

      getAllProducts: builder.query<Product[], {
      category?: string;
      colors?: string[];
      sizes?: string[];
      minPrice?: number;
      maxPrice?: number;}>({
      query: ({ category, colors, sizes, minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (colors?.length) params.append('colors', colors.join(',')); // comma-separated
        if (sizes?.length) params.append('sizes', sizes.join(',')); // comma-separated
        if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
        if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());

        const queryString = params.toString();
        return queryString ? `/products?${queryString}` : '/products';
      },
      providesTags:['Product']
    }),

    getProductById : builder.query<Product,string>({
      query: (id) => `/products/${id}`
    }),

   
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'], 
    }),

    
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

 getNewArrivals: builder.query<NewArrivalsResponse, NewArrivalsRequest>({
      query: ({ page = 1, limit = 10 }) =>
        `/products/new-arrivals?page=${page}&limit=${limit}`,
    }),
  getOnSaleProducts: builder.query<GetOnSaleProductsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/products/on-sale?page=${page}&limit=${limit}`,
    }),



     getFilters: builder.query<FilterResponse, void>({
      query: () => '/products/filters', 
    }),

  }),
});

export const {useGetProductByIdQuery,useCreateProductMutation,useGetAllProductsQuery,useUpdateProductMutation,useDeleteProductMutation,useGetNewArrivalsQuery,useGetOnSaleProductsQuery,useGetFiltersQuery} = productApi



export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  variants: {
    color: string;
    images: string[];
    sizes: string[];
  }[];
  reviews: {
    user: string; 
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  onSale: boolean;
  discountPercentage: number;
  price: number;
  stock: number;
  type: "money" | "loyalty_points" | "hybrid";
  category: Category; 
  loyaltyPoints: number;
}




export interface GetOnSaleProductsResponse {
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface FilterResponse {
  colors: string[];
  sizes: string[];
  categories: { id: string; name: string }[];
}


export interface NewArrivalsResponse {
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface NewArrivalsRequest {
  page?: number;
  limit?: number;
}