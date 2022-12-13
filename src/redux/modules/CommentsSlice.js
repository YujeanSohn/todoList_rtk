import {createSlice, createAsyncThunk, isPending, isRejected} from "@reduxjs/toolkit";
import axios from "axios";

export const __fetchComments = createAsyncThunk(
    "fetchComments",
    async (payload, thunkAPI)=>{
        try {
            const {data} = await axios.get(`http://localhost:3001/comments?date=${payload}`);
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
            await axios.post(`http://localhost:3001/comments`, payload);
            return thunkAPI.fulfillWithValue(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const __editComment = createAsyncThunk(
    "editComment",
    async ({id, newContent}, thunkAPI)=>{
        try {
            await axios.patch(`http://localhost:3001/comments/${id}`, {content: newContent});
            return thunkAPI.fulfillWithValue({id, newContent});
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }

    },
);

export const __deleteComment = createAsyncThunk(
    "deleteComment",
    async (payload, thunkAPI)=>{
        try {
            await axios.delete(`http://localhost:3001/comments/${payload}`);
            return thunkAPI.fulfillWithValue(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
);


const initialState = {
    comments: [
        {
            id: 0,
            date: 0,
            content: "",
        },
    ],
    isLoading: false,
    error: null,
};

const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    // extraReducers: (initialState, builder) =>
    //     builder
    //         .addCase(__fetchComments.fulfilled, (state, action) => {
    //             state.isloading = false;
    //             state.comments = action.payload;
    //         })
    //         .addCase(__addComment.fulfilled, (state, action) => {
    //             state.isloading = false;
    //             state.comments = [...state.comments, action.payload];
    //         })
    //         .addCase(__editComment.fulfilled, (state, action) => {
    //             state.isloading = false;
    //             state.comments = state.comments.map((comment) => ({
    //                 ...comment,
    //                 content: comment.id === action.payload.id ? action.payload.newContent : comment.content,
    //             }))
    //         })
    //         .addCase(__deleteComment.fulfilled, (state, action) => {
    //             state.isloading = false;
    //             state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    //         })
    //         .addMatcher(isPending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addMatcher(isRejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         })
    extraReducers: {
        [__fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [__fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__addComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = [...state.comments, action.payload];
        },
        [__addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__editComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__editComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = state.comments.map((comment) => ({
                ...comment,
                content: comment.id === action.payload.id ? action.payload.newContent : comment.content,
            }))
        },
        [__editComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__deleteComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = state.comments.filter((comment) => comment.id !== action.payload)
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});







export default CommentsSlice.reducer;