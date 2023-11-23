import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userListingApi = createApi({
  reducerPath: "userListing",
  tagTypes: ["User, Listing"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints(builder) {
    return {
      postSearch: builder.mutation({
        query: (urlParams) => {
          return {
            url: `listings/get?${urlParams}`,
            method: "POST",
            body: {},
          };
        },
        invalidatesTags: () => [{ type: "Listing" }],
      }),
      getSingleListing: builder.query({
        query: (listingId) => {
          return {
            url: `listings/get/${listingId}`,
            method: "GET",
          };
        },
        providesTags: (result, error, arg) => {
          return [{ type: "Listing", id: arg }];
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
      getLandLord: builder.query({
        providesTags: (result, error, arg) => {
          return [{ type: "User", id: arg }];
        },
        query: (lordId) => {
          return {
            url: `users/${lordId}`,
            method: "GET",
          };
        },
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

      updateListing: builder.mutation({
        query: (listing) => {
          return {
            url: `listings/update/${listing._id}`,
            method: "PUT",
            body: listing,
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Listing", id: arg._id },
        ],
      }),
    };
  },
});

export const {
  useGetSingleListingQuery,
  useGetUserListingsQuery,
  useAddListingMutation,
  useRemoveListingMutation,
  useUpdateListingMutation,
  useGetLandLordQuery,
  usePostSearchMutation,
} = userListingApi;

export { userListingApi };
