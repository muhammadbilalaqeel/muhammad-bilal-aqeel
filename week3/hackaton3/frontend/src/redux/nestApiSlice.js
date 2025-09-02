import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nestApiSlice = createApi({
  reducerPath: "nestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",  
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Reviews", "Replies"], 
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/review",
      providesTags: ["Reviews"],
    }),
    // getReviewById: builder.query({
    //   query: (id) => `/review/${id}`,
    //   providesTags: ["Reviews"],
    // }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/review",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews"],
    }),
    addReply: builder.mutation({
      query: (reply) => ({
        url: "/reply",
        method: "POST",
        body: reply,
      }),
      invalidatesTags: ["Replies"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useAddReplyMutation,
} = nestApiSlice;
