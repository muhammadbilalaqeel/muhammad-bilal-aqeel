// src/redux/cloudinaryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // we'll use full URL in mutation
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      async queryFn(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_upload"); // your unsigned preset

        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dxmlebwrn/image/upload",
            { method: "POST", body: formData }
          );
          const data = await res.json();
          if (res.ok) {
            return { data: data.secure_url }; // return URL as mutation result
          } else {
            return { error: { status: res.status, data } };
          }
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", data: err.message } };
        }
      },
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApi;
