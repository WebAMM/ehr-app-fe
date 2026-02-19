import { baseApi } from "@/redux"; 

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: '/userAuth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    doctorLogin: builder.mutation({
      query: (credentials) => ({
        url: '/doctorAuth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['DoctorAuth'],
    }),
    clinicLogin: builder.mutation({
      query: (credentials) => ({
        url: '/clinicAuth/loginClinic',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['ClinicAuth'],
    }),

    userRegister: builder.mutation({
      query: (userData) => ({
        url: '/userAuth/addUser',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    doctorRegister: builder.mutation({
      query: (userData) => ({
        url: '/doctorAuth/addDoctor',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['DoctorAuth'],
    }),
    clinicRegister: builder.mutation({
      query: (userData) => ({
        url: '/clinicAuth/addClinic',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['ClinicAuth'],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    
 
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, password },
      }),
    }),
    
    // Verify OTP
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: { email, otp },
      }),
    }),
    
    // Resend OTP
    resendOtp: builder.mutation({
      query: (email) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: { email },
      }),
    }),
    
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Verify token
    verifyToken: builder.query({
      query: () => '/auth/verify-token',
      providesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useDoctorLoginMutation,
  useClinicLoginMutation,
  useUserRegisterMutation,
  useDoctorRegisterMutation,
  useClinicRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useVerifyTokenQuery,
  

} = authApi;