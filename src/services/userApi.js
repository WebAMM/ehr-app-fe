import { baseApi } from "@/redux";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
   searchDoctors: builder.query({
  query: ({
    fullName,
    specialty,
    location,
    page = 1,
    limit = 10,
  
  }) => {
    const params = {
      page,
      limit,
    };

    if (fullName?.trim()) params.fullName = fullName;
    if (specialty?.trim()) params.specialty = specialty;
    if (location?.trim()) params.location = location;
  
    return {
      url: "/doctor/searchDoctors",
      params,
    };
  },
  providesTags: ["Doctor"],
}),
  
    allDoctors: builder.query({
      query: ({ page = 1, limit = 12, search }) => {
        const params = { page, limit };
        if (search?.trim()) params.search = search;
        return {
          url: `/doctor/allDoctors`,
          method: 'GET',
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
    addFavorite: builder.mutation({
      query: ({ body }) => ({
        url: `/favorite/addFavorite`,
        method: 'POST',
        body: body,
      }),
   invalidatesTags: ["Favorite"],
    }),
    removeFavorite: builder.mutation({
      query: ({ body }) => ({
        url: `/favorite/removeFavorite`,
        method: 'POST',
        body: body,
      }),
   invalidatesTags: ["Favorite"],
    }),
    addSlot: builder.mutation({
      query: ({ body }) => ({
        url: `/slot/addSlot`,
        method: 'POST',
        body: body,
      }),
   invalidatesTags: ["Addslot"],
    }),
    bookAppointment: builder.mutation({
      query: ({ body }) => ({
        url: `/appointment/bookAppointment`,
        method: 'POST',
        body: body,
      }),
   invalidatesTags: ["Appointment"],
    }),
    claimFeeWithOrangeMoney: builder.mutation({
      query: ({ body }) => ({
        url: `/claimRequest/claimFeeWithOrangeMoney`,
        method: 'POST',
        body: body,
      }),
   invalidatesTags: ["Subscription"],
    }),
    getAllClinics: builder.query({
      query: ({search, page = 1 , limit = 12}) => {
        const params = { page, limit };
        if (search?.trim()) params.search = search;
        return {
          url: `/clinic/allClinics`,
          method: 'GET',
          params,
        };
      },
   providesTags: ["Clinic"],
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
  useAllDoctorsQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useAddSlotMutation,
  useBookAppointmentMutation,
  useClaimFeeWithOrangeMoneyMutation,
  useGetAllClinicsQuery,
} = userApi;