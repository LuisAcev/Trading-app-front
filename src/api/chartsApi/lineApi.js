import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const headers = {
  authorization: process.env.REACT_APP_TOKEN,
};

export const lineApi = createApi({
  reducerPath: "lineApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    //Production
    // getlineData: builder.query({
    //   query: ({ asset, time }) => ({
    //     url: `/assetsdata/line/${asset}/${time}`,
    //     method: "GET",
    //     headers,
    //   }),
    //   providesTags: ["task"],
    // }),
    getlineData: builder.query({
      query: (asset) => ({
        url: `${process.env.PUBLIC_URL}/assetsData/${asset}.json`,
      }),
      providesTags: ["task"],
    }),
  }),
});

export const { useGetlineDataQuery } = lineApi;
