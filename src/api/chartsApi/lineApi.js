import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const headers = {
  authorization: process.env.REACT_APP_TOKEN,
};

export const lineApi = createApi({
  reducerPath: "lineApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    getlineData: builder.query({
      query: (asset) => ({
        url: `/assetsdata/line/${asset}`,
        method: "GET",
        headers,
      }),
      providesTags: ["task"],
    }),
  }),
});

export const { useGetlineDataQuery } = lineApi;
