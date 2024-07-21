import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["EventDetails"],
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => "/eventDetails",
      transformResponse: (res) => res.sort((a, b) => b.name - a.name),
      providesTags: ["EventDetails"],
    }),
    addDetails: builder.mutation({
      query: (details) => ({
        url: "/eventDetails",
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["EventDetails"],
    }),
    updateDetails: builder.mutation({
      query: (details) => ({
        url: `/eventDetails/${details.id} `,
        method: "PATCH",
        body: details,
      }),
      invalidatesTags: ["EventDetails"],
    }),
    deleteDetails: builder.mutation({
      query: ({ id }) => ({
        url: `/eventDetails/${id} `,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["EventDetails"],
    }),
  }),
});

export const { useGetDetailsQuery, useAddDetailsMutation } = rtkApi;
