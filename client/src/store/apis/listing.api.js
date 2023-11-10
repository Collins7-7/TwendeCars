import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const listingApi = createApi({
  reducerPath: "listings",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/listings",
  }),
  endpoints(builder) {
    return {
      getListing: builder.query({
        query:(listing) => {
          return{
            ///NITAMALIZIA
          }
        }
      }),
      addListing: builder.mutation({
        query: (listing) => {
          return {
            url: "/create",
            method: "POST",
            body: listing,
          };
        },
      }),
    };
  },
});

export const { useAddListingMutation } = listingApi;

export { listingApi };
