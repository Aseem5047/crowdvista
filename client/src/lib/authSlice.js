import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
    user: null,
    error: null,
    loading: false,
    ready: false,
    currentFunding: 0,
    currentFundedProject: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload;
            state.ready = true;
            state.loading = false;
        },
        setCurrentFunding: (state, action) => {
            state.currentFunding = action.payload;
            state.ready = true;
            state.loading = false;
        },
        setCurrentFundedProject: (state, action) => {
            state.currentFundedProject = action.payload;
            state.ready = true;
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.ready = true;
            state.loading = false;
        },


    }

})

export const { setUser, clearUser, setCurrentFunding, setCurrentFundedProject } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export const getCurrentFunding = (state) => state.auth.currentFunding;

export const getCurrentFundedProject = (state) => state.auth.currentFundedProject;

export const getLoading = (state) => state.auth.loading;

export default authSlice.reducer;