import { baseApi } from '../redux/api/baseApi';

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getDoctorProfile: builder.query({
      query: (doctorId) => `/doctors/${doctorId}`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: doctorId }],
    }),

    updateDoctorProfile: builder.mutation({
      query: ({ doctorId, doctorData }) => ({
        url: `/doctors/${doctorId}`,
        method: 'PUT',
        body: doctorData,
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: 'Doctor', id: doctorId }],
    }),

    getDoctorDashboard: builder.query({
      query: (doctorId) => `/doctors/${doctorId}/dashboard`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: `${doctorId}-dashboard` }],
    }),

    getDoctorAppointments: builder.query({
      query: ({ doctorId, date, status, page = 1, limit = 10 }) => ({
        url: `/doctors/${doctorId}/appointments`,
        params: { date, status, page, limit },
      }),
      providesTags: ['Appointment'],
    }),
    
    // Update appointment status
    updateAppointmentStatus: builder.mutation({
      query: ({ doctorId, appointmentId, status, notes }) => ({
        url: `/doctors/${doctorId}/appointments/${appointmentId}`,
        method: 'PUT',
        body: { status, notes },
      }),
      invalidatesTags: ['Appointment'],
    }),
    
    // Get today's appointments
    getTodayAppointments: builder.query({
      query: (doctorId) => `/doctors/${doctorId}/appointments/today`,
      providesTags: ['Appointment'],
    }),
    
    // Set doctor availability
    setDoctorAvailability: builder.mutation({
      query: ({ doctorId, availability }) => ({
        url: `/doctors/${doctorId}/availability`,
        method: 'POST',
        body: { availability },
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: 'Doctor', id: doctorId }],
    }),
    
    // Get doctor availability
    getDoctorAvailability: builder.query({
      query: (doctorId) => `/doctors/${doctorId}/availability`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: `${doctorId}-availability` }],
    }),
    
    // Get doctor patients
    getDoctorPatients: builder.query({
      query: ({ doctorId, search, page = 1, limit = 10 }) => ({
        url: `/doctors/${doctorId}/patients`,
        params: { search, page, limit },
      }),
      providesTags: ['User'],
    }),
    
    // Get patient details for doctor
    getPatientDetails: builder.query({
      query: ({ doctorId, patientId }) => `/doctors/${doctorId}/patients/${patientId}`,
      providesTags: (result, error, { patientId }) => [{ type: 'User', id: patientId }],
    }),
    
    // Add prescription
    addPrescription: builder.mutation({
      query: ({ doctorId, patientId, prescriptionData }) => ({
        url: `/doctors/${doctorId}/patients/${patientId}/prescriptions`,
        method: 'POST',
        body: prescriptionData,
      }),
      invalidatesTags: (result, error, { patientId }) => [{ type: 'User', id: patientId }],
    }),
    
    // Get doctor messages
    getDoctorMessages: builder.query({
      query: ({ doctorId, page = 1, limit = 20 }) => ({
        url: `/doctors/${doctorId}/messages`,
        params: { page, limit },
      }),
      providesTags: ['Message'],
    }),
    
    // Send message to patient
    sendMessageToPatient: builder.mutation({
      query: ({ doctorId, patientId, messageData }) => ({
        url: `/doctors/${doctorId}/messages/${patientId}`,
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),
    
    // Get doctor reviews
    getDoctorReviews: builder.query({
      query: ({ doctorId, page = 1, limit = 10 }) => ({
        url: `/doctors/${doctorId}/reviews`,
        params: { page, limit },
      }),
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: `${doctorId}-reviews` }],
    }),
    
    // Get doctor earnings
    getDoctorEarnings: builder.query({
      query: ({ doctorId, period = 'month' }) => ({
        url: `/doctors/${doctorId}/earnings`,
        params: { period },
      }),
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: `${doctorId}-earnings` }],
    }),
    
    // Upload doctor documents
    uploadDoctorDocuments: builder.mutation({
      query: ({ doctorId, formData }) => ({
        url: `/doctors/${doctorId}/documents`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: 'Doctor', id: doctorId }],
    }),
    
    // Get doctor settings
    getDoctorSettings: builder.query({
      query: (doctorId) => `/doctors/${doctorId}/settings`,
      providesTags: (result, error, doctorId) => [{ type: 'Doctor', id: `${doctorId}-settings` }],
    }),
    
    // Update doctor settings
    updateDoctorSettings: builder.mutation({
      query: ({ doctorId, settings }) => ({
        url: `/doctors/${doctorId}/settings`,
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: (result, error, { doctorId }) => [{ type: 'Doctor', id: `${doctorId}-settings` }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDoctorProfileQuery,
  useUpdateDoctorProfileMutation,
  useGetDoctorDashboardQuery,
  useGetDoctorAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useGetTodayAppointmentsQuery,
  useSetDoctorAvailabilityMutation,
  useGetDoctorAvailabilityQuery,
  useGetDoctorPatientsQuery,
  useGetPatientDetailsQuery,
  useAddPrescriptionMutation,
  useGetDoctorMessagesQuery,
  useSendMessageToPatientMutation,
  useGetDoctorReviewsQuery,
  useGetDoctorEarningsQuery,
  useUploadDoctorDocumentsMutation,
  useGetDoctorSettingsQuery,
  useUpdateDoctorSettingsMutation,
} = doctorApi;