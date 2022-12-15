import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const __fetchComments = createAsyncThunk(
  "fetchComments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.get(`/comments?todosId=${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    try {
      await client.post(`/comments`, {
        ...payload,
        editHistory: 0,
      });
      return thunkAPI.fulfillWithValue({ ...payload, editHistory: 0 });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __editComment = createAsyncThunk(
  "editComment",
  async ({ id, newContent, editHistory }, thunkAPI) => {
    try {
      await client.patch(`/comments/${id}`, {
        content: newContent,
        editHistory,
      });
      return thunkAPI.fulfillWithValue({ id, newContent, editHistory });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      await client.delete(`/comments/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  comments: [
    {
      id: 0,
      todosId: "",
      content: "",
      editHistory: 0,
    },
  ],
  isLoading: false,
  error: null,
};

const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [__fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload.reverse();
    },
    [__fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [action.payload, ...state.comments];
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map((comment) => ({
        ...comment,
        content:
          comment.id === action.payload.id
            ? action.payload.newContent
            : comment.content,
        editHistory:
          comment.id === action.payload.id
            ? action.payload.editHistory
            : comment.editHistory,
      }));
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default CommentsSlice.reducer;
