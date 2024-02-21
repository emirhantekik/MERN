import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

const initialState = {
  posts: [],
}

export const getPost = createAsyncThunk(
  "getPost",
  async () => {
    try {
      const posts = await axios.get("http://localhost:5000/getPosts");
      return posts.data
    } catch (error) {
      toast(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
)

export const createPost = createAsyncThunk(
  "createPost",
  async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/createPost", data);
      return response.data;
    } catch (error) {
      toast(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
)

export const updatePost = createAsyncThunk(
  "updatePost",
  async (arg, thunkAPI) => { // arg adı altında id ve data bir obje içinde gelir
    const { id, data } = arg; // arg objesinden id ve data alınır
    try {
      const response = await axios.patch(`http://localhost:5000/updatePost/${id}`, data);
      return response.data;
    } catch (error) {
      toast(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
      // Hata durumunda reject etmek gerekiyor
      throw error;
    }
  }
)


export const deletePost = createAsyncThunk(
  "deletePost",
  async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletePost/${id}`);
    } catch (error) {
      toast(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers : (builder) => {
    builder.addCase(getPost.fulfilled,(state,action)=> {
      state.posts = action.payload;
    })
    builder.addCase(getPost.rejected,(state,action)=>{
      state.error = action.payload;
    })
    builder.addCase(createPost.fulfilled,(state,action)=>{
      state.posts = action.payload;
    })
    builder.addCase(createPost.rejected,(state,action)=>{
      state.error = action.payload;
    })
    builder.addCase(updatePost.fulfilled,(state,action)=>{
      state.posts = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const {} = postSlice.actions

export default postSlice.reducer