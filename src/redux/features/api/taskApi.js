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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getAllTask", undefined, (draft) => {
              draft.push(data);
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    editTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: taskData,
      }),

      async onQueryStarted({ taskId, taskData }, { queryFulfilled, dispatch }) {
        const editTask = dispatch(
          apiSlice.util.updateQueryData("getAllTask", undefined, (draft) => {
            return draft.map((task) => {
              if (task.id === taskId) {
                return taskData;
              }
              return task;
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          editTask.undo();
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const deleteData = dispatch(
          apiSlice.util.updateQueryData("getAllTask", undefined, (draft) => {
            return draft.filter((task) => task.id !== args);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          deleteData.undo();
        }
      },
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
