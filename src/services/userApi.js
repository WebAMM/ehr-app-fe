import { baseApi } from "@/redux"; 

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
   searchDoctors: builder.query({
  query: ({
    search,
    specialty,
    location,
    page = 1,
    limit = 10,
    fullName,
  }) => {
    const params = {
      page,
      limit,
    };

    if (search?.trim()) params.search = search;
    if (specialty?.trim()) params.specialty = specialty;
    if (location?.trim()) params.location = location;
    if (fullName?.trim()) params.fullName = fullName;

    return {
      url: "/doctor/searchDoctors",
      params,
    };
  },
  providesTags: ["Doctor"],
}),
    getDoctorDetails: builder.query({
      query: ({ userId }) => ({
        url: `/doctor/getDoctorDetails/${userId}`,
        method: 'GET',
        
      }),
   providesTags: ["Doctor"],
    }),
    getDoctorReviews: builder.query({
      query: ({ userId }) => ({
        url: `/doctor/doctorReviews/${userId}`,
        method: 'GET',
        
      }),
   providesTags: ["Doctor"],
    }),

    getUserAppointments: builder.query({
      query: ({ userId, status, page = 1, limit = 10 }) => ({
        url: `/users/${userId}/appointments`,
        params: { status, page, limit },
      }),
      providesTags: ['Appointment'],
    }),
    

    bookAppointment: builder.mutation({
      query: ({ userId, appointmentData }) => ({
        url: `/users/${userId}/appointments`,
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    // Cancel appointment
    cancelAppointment: builder.mutation({
      query: ({ userId, appointmentId }) => ({
        url: `/users/${userId}/appointments/${appointmentId}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    // Get user medical records
    getUserMedicalRecords: builder.query({
      query: ({ userId, page = 1, limit = 10 }) => ({
        url: `/users/${userId}/medical-records`,
        params: { page, limit },
      }),
      providesTags: ['User'],
    }),
    
    // Upload medical record
    uploadMedicalRecord: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/users/${userId}/medical-records`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Get user messages
    getUserMessages: builder.query({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: `/users/${userId}/messages`,
        params: { page, limit },
      }),
      providesTags: ['Message'],
    }),
    
    // Send message
    sendMessage: builder.mutation({
      query: ({ userId, messageData }) => ({
        url: `/users/${userId}/messages`,
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),
    
    // Get nearby clinics
    getNearbyClinics: builder.query({
      query: ({ lat, lng, radius = 10, specialty }) => ({
        url: '/users/nearby-clinics',
        params: { lat, lng, radius, specialty },
      }),
      providesTags: ['Clinic'],
    }),
    
    // Search doctors
    
    
    // Get user settings
    getUserSettings: builder.query({
      query: (userId) => `/users/${userId}/settings`,
      providesTags: (result, error, userId) => [{ type: 'User', id: `${userId}-settings` }],
    }),
    
    // Update user settings
    updateUserSettings: builder.mutation({
      query: ({ userId, settings }) => ({
        url: `/users/${userId}/settings`,
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: `${userId}-settings` }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSearchDoctorsQuery,
  useGetDoctorDetailsQuery,
  useGetDoctorReviewsQuery
  
 
} = userApi;