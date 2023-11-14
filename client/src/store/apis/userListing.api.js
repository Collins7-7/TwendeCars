import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userListingApi = createApi({
  reducerPath: "userListing",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  endpoints(builder) {
    return {
      getSingleListing: builder.query({
        query: (listing) => {
          return {
            url: `/listing/${listing._id}`,
            method: "GET",
          };
        },
      }),

      getUserListings: builder.query({
        query: (user) => {
          return {
            url: `/listings/${user._id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetSingleListingQuery, useGetUserListingsQuery } =
  userListingApi;

export { userListingApi };
