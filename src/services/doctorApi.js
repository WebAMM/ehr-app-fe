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
    getTodaysAppointments: builder.query({
      query: ({ doctorId, status="pending", page=1, limit=10 }) => ({
        url: `appointment/getTodaysAppointments?doctorId=${doctorId}&status=${status}&page=${page}&limit=${limit}`,
        method: 'GET',
       
      }),
      providesTags: ['Appointments'],
    }),
    updateStatusAndSendNotification: builder.mutation({
      query: ({ id, body }) => ({
        url: `/appointment/updateStatusAndSendNotification/${id}`,
        method: 'PUT',
        body: body,
       
      }),
     invalidatesTags: ['Appointments'],
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
  useGetTodaysAppointmentsQuery,
  useUpdateStatusAndSendNotificationMutation,
} = doctorApi;