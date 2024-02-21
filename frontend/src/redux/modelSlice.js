import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    modal: false,
    getPost: false,
    logOut: true,
    update: false,
    updateChange: false,
    id: "",
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeModal: (state) => {
            state.modal = !state.modal
        },
        changeGetPost: (state) => {
            state.getPost = !state.getPost
        },
        changeLogout: (state) => {
            state.logOut = !state.logOut
        },
        updateOpen: (state) => {
            state.update = true
        },
        updateClose: (state) => {
            state.update = false
        },
        updateChangeOpen: (state) => {
            state.updateChange = true
        },
        updateChangeClose: (state) => {
            state.updateChange = false
        },
        getPostId: (state, action) => {
            state.id = action.payload
        }
    }
})

export const { changeModal, changeGetPost, changeLogout,
    updateOpen, updateClose, updateChangeOpen, updateChangeClose, getPostId } = modalSlice.actions;

export default modalSlice.reducer;