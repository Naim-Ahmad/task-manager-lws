import { apiSlice } from "./apiSlice";

export const taskAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: () => ({
        url: `/tasks`,
      }),
    }),

    getTask: builder.query({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
      }),
    }),

    addTask: builder.mutation({
      query: (taskData) => ({
        url: `/tasks`,
        method: "POST",
        body: taskData,
      }),
    }),

    editTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: taskData,
      }),
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useAddTaskMutation,
} = taskAPI;
