import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export const { addNumber, minusNumber } = todosSlice.actions;
export default todosSlice.reducer;
