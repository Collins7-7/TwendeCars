import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userListingApi = createApi({
  reducerPath: "userListing",
  tagTypes: ["User, Listing"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints(builder) {
    return {
      getSingleListing: builder.query({
        query: (listing) => {
          return {
            url: `users/listing/${listing._id}`,
            method: "GET",
          };
        },
      }),
      getUserListings: builder.query({
        query: (user) => {
          return {
            url: `users/listings/${user._id}`,
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map((listing) => ({
                  type: "Listing",
                  id: listing._id,
                })),
                "Listing",
              ]
            : ["Listing"],
      }),
      addListing: builder.mutation({
        invalidatesTags: (result, error, arg) => [
          { type: "Listing", id: arg._id },
        ],
        query: (listing) => {
          return {
            url: "listings/create",
            method: "POST",
            body: listing,
          };
        },
      }),
      removeListing: builder.mutation({
        query: (listingId) => {
          return {
            url: `listings/delete/${listingId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, arg) => [{ type: "Listing", id: arg }],
      }),
    };
  },
});

export const {
  useGetSingleListingQuery,
  useGetUserListingsQuery,
  useAddListingMutation,
  useRemoveListingMutation,
} = userListingApi;

export { userListingApi };
