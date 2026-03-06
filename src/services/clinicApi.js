import { baseApi } from '../redux/api/baseApi';

export const clinicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
     getClinicPayments: builder.query({
      query: ({ id, }) => ({
        url: `/analytic/payments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
     getClinicAppointments: builder.query({
      query: ({ id, }) => ({
        url: `/analytic/appointments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    getClinicPatientCount: builder.query({
      query: ({ id }) => ({
        url: `/analytic/patientCount/${id}`,
        method: 'GET',
      }),
      providesTags: ['Patients'],
    }),
    getClinicClaimRequests: builder.query({
      query: ({ id }) => ({
        url: `/analytic/getClaimRequestsClinicMembers/${id}`,
        method: 'GET',
      }),
      providesTags: ['Clinic'],
    }),
    getClinicTodayAppointments: builder.query({
      query: ({ id, date, status="pending" }) => {
        let url = `/appointment/todaysClinicAppointments?clinicId=${id}`;
        if (date) {
          url += `&date=${date}`;
        }
        if (status) {
          url += `&status=${status}`;
        }
        return { url, method: 'GET' };
      },
      providesTags: ['Appointments'],
    }),
    getClinicDoctorsDetails: builder.query({
      query: ({ id, limit=100, page=1, search="" }) => {
        let url = `/clinic/getClinicDoctorsDetails/${id}?limit=${limit}&page=${page}`;
      if (search) {
          url += `&search=${search}`;
        }
        return { url, method: 'GET' };
      },
      providesTags: ['Doctors'],
    }),
     getClinicDemographics: builder.query({
      query: ({ id, }) => ({
        url: `/analytic/demographics/${id}`,
        method: 'GET',
      }),
      
    }),
    addClinicDoctor: builder.mutation({
      query: ({ doctorData }) => ({
        url: '/clinicDoctor/addClinicDoctor',
        method: 'POST',
        body: doctorData,
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateClinicDoctorProfile: builder.mutation({
      query: ({ doctorData, id }) => ({
        url: `/clinicDoctor/updateClinicDoctorProfile/${id}`,
        method: 'PUT',
        body: doctorData,
      }),
      invalidatesTags: ['Doctors'],
    }),
    removeClinicDoctor: builder.mutation({
      query: ({ clinicDoctorId, clinicId }) => ({
        url: `/clinic/removeClinicDoctor/${clinicId}`,
        method: 'DELETE',
        body: { clinicDoctorId },
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateClinicProfile: builder.mutation({
      query: (body) => ({
        url: `/clinic/updateClinicProfile`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Clinic'],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetClinicPaymentsQuery,
  useGetClinicDemographicsQuery,
  useGetClinicAppointmentsQuery,
  useGetClinicPatientCountQuery,
  useGetClinicClaimRequestsQuery,
  useGetClinicTodayAppointmentsQuery,
  useGetClinicDoctorsDetailsQuery,
  useAddClinicDoctorMutation,
  useUpdateClinicDoctorProfileMutation,
  useRemoveClinicDoctorMutation,
  useUpdateClinicProfileMutation,
} = clinicApi;