import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "../../types/task";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        fetchTasks: builder.query<Task[], void>({
            query: () => "/tasks",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Tasks" as const, id })),
                        { type: "Tasks", id: "LIST" },
                    ]
                    : [{ type: "Tasks", id: "LIST" }],
        }),

        addTask: builder.mutation<Task, string>({
            query: (title) => ({
                url: "/tasks",
                method: "POST",
                body: { title, completed: false },
            }),
            invalidatesTags: [{ type: "Tasks", id: "LIST" }],
        }),

        toggleTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: `/tasks/${task.id}`,
                method: "PATCH",
                body: { completed: !task.completed },
            }),
            invalidatesTags: (res, err, arg) => [{ type: "Tasks", id: arg.id }],
        }),

        removeTask: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (res, err, id) => [{ type: "Tasks", id }],
        }),
    }),
});

export const {
    useFetchTasksQuery,
    useAddTaskMutation,
    useToggleTaskMutation,
    useRemoveTaskMutation,
} = tasksApi;
