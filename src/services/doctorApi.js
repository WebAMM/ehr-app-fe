import { baseApi } from '../redux/api/baseApi';

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getDoctorProfile: builder.query({
      query: (doctorId) => `/doctors/${doctorId}`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: doctorId }],
    }),

    updateDoctorProfile: builder.mutation({
      query: ({  doctorData }) => ({
        url: `/doctor/updateDoctorProfile`,
        method: 'PUT',
        body: doctorData,
      }),
      invalidatesTags:  ['Doctor'],
    }),
    getDoctorNotifications: builder.query({
      query: ({ doctorId }) => ({
        url: `/notification/doctorNotifications?doctorId=${doctorId}`,
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    getDoctorById: builder.query({
      query: ({ doctorId }) => ({
        url: `/doctor/getDoctorById?doctorId=${doctorId}`,
        method: 'GET',
      }),
      providesTags: ['Doctor'],
    }),
    updateDoctorPassword: builder.mutation({
      query: ({ doctorId, passwordData }) => ({
        url: `/doctor/updateDoctorPassword/${doctorId}`,
        method: 'POST',
        body: passwordData,
      }),
      providesTags: ['Doctor'],
    }),
  
   
  }),
  overrideExisting: false,
});

export const {
  useGetDoctorProfileQuery,
  useUpdateDoctorProfileMutation,
  useGetDoctorNotificationsQuery,
  useUpdateDoctorPasswordMutation,  
  useGetDoctorByIdQuery,
} = doctorApi;