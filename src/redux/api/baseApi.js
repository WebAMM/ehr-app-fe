import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers,) => {
    const token = Cookies.get('auth_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
        headers.set("x-auth-token", token);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    window.location.href = '/sign-in';
  }
  
  return result;
};
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', "DoctorAuth", "ClinicAuth", 'User', 'Doctor', 'Clinic', 'Appointment', 'Message', 'Notifications', 'Appointments', 'Subscription'],
  endpoints: () => ({}),
});

export default baseApi;