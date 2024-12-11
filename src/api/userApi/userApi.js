import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  authorization: process.env.REACT_APP_TOKEN,
};
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({email, password}) => ({
        url: `/users/getuser?email=${email}&password=${password}`,
        method: "GET",
        headers,
      }),
      providesTags: ["task"],
    }),
    postUsers: builder.mutation({
      query: (body) => ({
        url: `/users/post`,
        method: "POST",
        body,
        headers,
      }),
    }),
    putUsers: builder.mutation({
      query: ({id, body}) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
        headers,
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePostUsersMutation,
  usePutUsersMutation,
  useDeleteUsersMutation,
} = usersApi;
