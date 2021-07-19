import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import {reducer} from '../lib/slices/index'

export const store = configureStore({
    reducer,
});
