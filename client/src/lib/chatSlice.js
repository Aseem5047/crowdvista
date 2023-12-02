import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatUsers: [], loading: false, error: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.chatUsers = ({ ...state, chatUsers: [...state.chatUsers, action.data] })
        }
    }
})

export const { saveUser } = chatSlice.actions;

export const getUser = (state) => state.auth.user;


export default chatSlice.reducer;