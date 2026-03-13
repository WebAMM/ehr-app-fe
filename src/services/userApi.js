import { baseApi } from "@/redux"; 
import { use } from "react";
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
    getUserById: builder.query({
      query: () => ({
        url: `/user/getUserById`,
        method: 'GET',
      }),
   providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `/user/updateUserProfile`,
        method: 'PUT',
        body: userData,
      }),
   invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation({
      query: ({ userId, passwordData }) => ({
        url: `/user/updateUserPassword/${userId}`,
        method: 'POST',
        body: passwordData,
      }),
   invalidatesTags: ["User"],
    }),

   
  
  }),
  overrideExisting: false,
});

export const {
  useSearchDoctorsQuery,
  useGetDoctorDetailsQuery,
  useGetDoctorReviewsQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation,
} = userApi;