import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  authorization: process.env.REACT_APP_TOKEN,
};
export const calculatorApi = createApi({
  reducerPath: "calculatorApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    getCalculatorData: builder.query({
      query: () => ({
        url: `/calculator/calculatorinfo`,
        method: "GET",
        headers,
      }),
      providesTags: ["task"],
    }),
  }),
});

export const { useGetCalculatorDataQuery } = calculatorApi;
