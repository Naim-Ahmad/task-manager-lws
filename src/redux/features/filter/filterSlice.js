import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedProjects: [],
  searchTask: "",
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    toggleProject: (state, actions) => {
      if (state.checkedProjects.includes(actions.payload)) {
        state.checkedProjects = state.checkedProjects.filter(
          (project) => project !== actions.payload
        );
      } else {
        state.checkedProjects.push(actions.payload);
      }
      localStorage.setItem(
        "checkedProjects",
        JSON.stringify(state.checkedProjects)
      );
    },
    syncCheckedProjects: (state, actions) => {
      state.checkedProjects = actions.payload;
    },
    setSearchText: (state, action) => {
      state.searchTask = action.payload;
    },
  },
});

export const { toggleProject, syncCheckedProjects, setSearchText } =
  filterSlice.actions;
