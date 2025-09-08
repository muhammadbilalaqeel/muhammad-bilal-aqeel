import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../slices/authSlice';
import { useRouter } from 'next/router';



const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
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
});

export const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired → logout and clear cache
    api.dispatch(logout());

    // Clear RTK Query cache
    api.dispatch(api.util.resetApiState());

    // Redirect to login
    window.location.href = '/login';
  }

  return result;
};
