import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from '@reduxjs/toolkit';

import {usersSlice} from './usersSlice';
import {mailSlice} from "./mailSlice";
import {threadSlice} from "./threadSlice";
import {loginUserSlice} from "./loginUserSlice";

export const reducer = (state = {}, action) => {
    if (action.type === HYDRATE) {
        console.log("HYDRATE", action);
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        [usersSlice.name]: usersSlice.reducer,
        [mailSlice.name]: mailSlice.reducer,
        [threadSlice.name]: threadSlice.reducer,
        [loginUserSlice.name]: loginUserSlice.reducer
    })(state, action);
}