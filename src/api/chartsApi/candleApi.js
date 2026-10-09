import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  authorization: process.env.REACT_APP_TOKEN,
};
export const candleApi = createApi({
  reducerPath: "candleApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    // Produccion remote
    // getCandleData: builder.query({
    //   query: ({ asset, time }) => ({
    //     url: `/assetsdata/candle/${asset}/${time}`,
    //     method: "GET",
    //     headers,
    //   }),
    //   providesTags: ["task"],
    // }),

    //data local
    getCandleData: builder.query({
      query: (asset) => ({
        url: `${process.env.PUBLIC_URL}/assetsData/${asset}.json`,
        // method: "GET",
        // headers,
      }),
      providesTags: ["task"],
    }),
  }),
});

export const { useGetCandleDataQuery } = candleApi;
