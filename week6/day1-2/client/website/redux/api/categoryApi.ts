import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CategoryResponse {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Category"], 
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query<CategoryResponse[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
