import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  todosID: 0,
  isLoading: false,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      alert(`getTodoError: ${e}`);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "addTodo",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.todosID}`, {
        items: [...payload.todos, payload.todo],
      });
      return thunkAPI.fulfillWithValue(payload.todo);
    } catch (e) {
      alert(`addTodoError: ${e}`);
    }
  }
);

export const __updateTodo = createAsyncThunk(
  "updateTodo",
  async (payload, thunkAPI) => {
    try {
      const updatedTodos = payload.todos.map((v) => {
        if (v.id === payload.todo.id) return payload.todo;
        return v;
      });
      await axios.patch(`http://localhost:3001/todos/${payload.todosID}`, {
        items: updatedTodos,
      });
      return thunkAPI.fulfillWithValue(updatedTodos);
    } catch (e) {
      alert(`updateTodoError: ${e}`);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (payload, thunkAPI) => {
    try {
      const updatedTodos = payload.todos.filter((v) => v.id !== payload.todoID);
      await axios.patch(`http://localhost:3001/todos/${payload.todosID}`, {
        items: updatedTodos,
      });
      return thunkAPI.fulfillWithValue(updatedTodos);
    } catch (e) {
      alert(`deleteTodoError: ${e}`);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todosID = action.payload.id;
      state.todos = action.payload.items;
    });
    builder.addCase(__addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = [...state.todos, action.payload];
    });
    builder.addCase(__updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
  },
});

export default todosSlice.reducer;
