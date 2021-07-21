import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import {reducer} from '../lib/slices/index'
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}
const defaultMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

const enhancedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: enhancedReducer,
    middleware: defaultMiddleware
});

