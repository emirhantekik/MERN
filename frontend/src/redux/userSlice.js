import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify";

const initialState = {
    auth: {},
    isAuth: false, // kişi login olunca false true dönsün
    loading: false,
}

export const register = createAsyncThunk(
    "register",
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/register", data);
            return response.data;
        } catch (error) {
            toast(error.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }
)

export const login = createAsyncThunk(
    "login",
    async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/login",data);
            return response.data;
        } catch (error) {
            toast(error.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }
)

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
            state.isAuth = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.auth = action.payload
            localStorage.setItem("auth",JSON.stringify(action.payload))
        })
        builder.addCase(login.pending,(state,action)=>{
            state.loading = true;
            state.isAuth = false;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.auth = action.payload
            localStorage.setItem("auth",JSON.stringify(action.payload))
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer



