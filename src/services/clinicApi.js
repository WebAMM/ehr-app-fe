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
      query: ({ id }) => {
        let url = `/clinic/getClinicDoctorsDetails/${id}`;
      
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
} = clinicApi;