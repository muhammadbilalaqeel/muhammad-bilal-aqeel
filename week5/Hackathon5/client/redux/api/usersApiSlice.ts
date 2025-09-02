import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/auth/authTypes';


export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  nationality?: string;
  idType?: string;
}
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
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
    updateUser: builder.mutation<{ statusCode: number; message: string; data: User }, { id: string; dto: UpdateUserDto }>({
      query: ({ id, dto }) => ({
        url: `user/${id}`,
        method: 'PATCH',
        body: dto,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
