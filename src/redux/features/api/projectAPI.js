import { apiSlice } from "./apiSlice";

const projectAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
  }),
});

export const { useGetAllProjectsQuery } = projectAPI;
