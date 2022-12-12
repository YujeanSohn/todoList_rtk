import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  todosID: 0,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/todos/${payload}`
      );
      thunkAPI.dispatch(getTodos(data));
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
      thunkAPI.dispatch(addTodo(payload.todo));
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
      thunkAPI.dispatch(updateTodo(updatedTodos));
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
      thunkAPI.dispatch(updateTodo(updatedTodos));
    } catch (e) {
      alert(`deleteTodoError: ${e}`);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todosID = action.payload.id;
      state.todos = action.payload.items;
    },
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    updateTodo: (state, action) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { getTodos, addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
