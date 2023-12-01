// authMiddleware.js

import axios from "axios";
import { setUser, clearUser } from "../lib/authSlice"
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const fetchUser = () => async (dispatch) => {
    // console.log("Here");
    try {
        const response = await axios.get("/user/profile");
        dispatch(setUser(response.data));
        localStorage.setItem("userData", JSON.stringify(response.data));
        toast.success("Welcome Back Glad to have you back")
    } catch (error) {
        console.error("Error during fetchUser:", error);
        // Handle unauthorized or session expired here
        dispatch(clearUser());
        localStorage.removeItem("userData");
        Cookies.remove("token");
        toast.error("Authentication Required")
        toast.error("Session Expired ")
    }
};
