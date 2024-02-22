import { apiSlice } from "./apiSlice";

const teamAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: () => ({
        url: `/team`,
      }),
    }),
  }),
});

export const { useGetAllMembersQuery } = teamAPI;
