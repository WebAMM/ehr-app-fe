import { baseApi } from '../redux/api/baseApi';

export const clinicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get clinic profile
    getClinicProfile: builder.query({
      query: (clinicId) => `/clinics/${clinicId}`,
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: clinicId }],
    }),
    
    // Update clinic profile
    updateClinicProfile: builder.mutation({
      query: ({ clinicId, clinicData }) => ({
        url: `/clinics/${clinicId}`,
        method: 'PUT',
        body: clinicData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: clinicId }],
    }),
    
    // Get clinic dashboard
    getClinicDashboard: builder.query({
      query: (clinicId) => `/clinics/${clinicId}/dashboard`,
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-dashboard` }],
    }),
    
    // Get clinic staff
    getClinicStaff: builder.query({
      query: ({ clinicId, role, page = 1, limit = 10 }) => ({
        url: `/clinics/${clinicId}/staff`,
        params: { role, page, limit },
      }),
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-staff` }],
    }),
    
    // Add staff member
    addStaffMember: builder.mutation({
      query: ({ clinicId, staffData }) => ({
        url: `/clinics/${clinicId}/staff`,
        method: 'POST',
        body: staffData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-staff` }],
    }),
    
    // Update staff member
    updateStaffMember: builder.mutation({
      query: ({ clinicId, staffId, staffData }) => ({
        url: `/clinics/${clinicId}/staff/${staffId}`,
        method: 'PUT',
        body: staffData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-staff` }],
    }),
    
    // Remove staff member
    removeStaffMember: builder.mutation({
      query: ({ clinicId, staffId }) => ({
        url: `/clinics/${clinicId}/staff/${staffId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-staff` }],
    }),
    
    // Get clinic appointments
    getClinicAppointments: builder.query({
      query: ({ clinicId, date, doctorId, status, page = 1, limit = 10 }) => ({
        url: `/clinics/${clinicId}/appointments`,
        params: { date, doctorId, status, page, limit },
      }),
      providesTags: ['Appointment'],
    }),
    
    // Get clinic patients
    getClinicPatients: builder.query({
      query: ({ clinicId, search, page = 1, limit = 10 }) => ({
        url: `/clinics/${clinicId}/patients`,
        params: { search, page, limit },
      }),
      providesTags: ['User'],
    }),
    
    // Get clinic services
    getClinicServices: builder.query({
      query: (clinicId) => `/clinics/${clinicId}/services`,
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-services` }],
    }),
    
    // Add clinic service
    addClinicService: builder.mutation({
      query: ({ clinicId, serviceData }) => ({
        url: `/clinics/${clinicId}/services`,
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-services` }],
    }),
    
    // Update clinic service
    updateClinicService: builder.mutation({
      query: ({ clinicId, serviceId, serviceData }) => ({
        url: `/clinics/${clinicId}/services/${serviceId}`,
        method: 'PUT',
        body: serviceData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-services` }],
    }),
    
    // Delete clinic service
    deleteClinicService: builder.mutation({
      query: ({ clinicId, serviceId }) => ({
        url: `/clinics/${clinicId}/services/${serviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-services` }],
    }),
    
    // Get clinic messages
    getClinicMessages: builder.query({
      query: ({ clinicId, page = 1, limit = 20 }) => ({
        url: `/clinics/${clinicId}/messages`,
        params: { page, limit },
      }),
      providesTags: ['Message'],
    }),
    
    // Send clinic message
    sendClinicMessage: builder.mutation({
      query: ({ clinicId, messageData }) => ({
        url: `/clinics/${clinicId}/messages`,
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),
    
    // Get clinic inventory
    getClinicInventory: builder.query({
      query: ({ clinicId, category, search, page = 1, limit = 10 }) => ({
        url: `/clinics/${clinicId}/inventory`,
        params: { category, search, page, limit },
      }),
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-inventory` }],
    }),
    
    // Add inventory item
    addInventoryItem: builder.mutation({
      query: ({ clinicId, itemData }) => ({
        url: `/clinics/${clinicId}/inventory`,
        method: 'POST',
        body: itemData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-inventory` }],
    }),
    
    // Update inventory item
    updateInventoryItem: builder.mutation({
      query: ({ clinicId, itemId, itemData }) => ({
        url: `/clinics/${clinicId}/inventory/${itemId}`,
        method: 'PUT',
        body: itemData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-inventory` }],
    }),
    
    // Get clinic billing
    getClinicBilling: builder.query({
      query: ({ clinicId, period = 'month', page = 1, limit = 10 }) => ({
        url: `/clinics/${clinicId}/billing`,
        params: { period, page, limit },
      }),
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-billing` }],
    }),
    
    // Get clinic settings
    getClinicSettings: builder.query({
      query: (clinicId) => `/clinics/${clinicId}/settings`,
      providesTags: (result, error, clinicId) => [{ type: 'Clinic', id: `${clinicId}-settings` }],
    }),
    
    // Update clinic settings
    updateClinicSettings: builder.mutation({
      query: ({ clinicId, settings }) => ({
        url: `/clinics/${clinicId}/settings`,
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: `${clinicId}-settings` }],
    }),
    
    // Upload clinic images
    uploadClinicImages: builder.mutation({
      query: ({ clinicId, formData }) => ({
        url: `/clinics/${clinicId}/images`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { clinicId }) => [{ type: 'Clinic', id: clinicId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClinicProfileQuery,
  useUpdateClinicProfileMutation,
  useGetClinicDashboardQuery,
  useGetClinicStaffQuery,
  useAddStaffMemberMutation,
  useUpdateStaffMemberMutation,
  useRemoveStaffMemberMutation,
  useGetClinicAppointmentsQuery,
  useGetClinicPatientsQuery,
  useGetClinicServicesQuery,
  useAddClinicServiceMutation,
  useUpdateClinicServiceMutation,
  useDeleteClinicServiceMutation,
  useGetClinicMessagesQuery,
  useSendClinicMessageMutation,
  useGetClinicInventoryQuery,
  useAddInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useGetClinicBillingQuery,
  useGetClinicSettingsQuery,
  useUpdateClinicSettingsMutation,
  useUploadClinicImagesMutation,
} = clinicApi;