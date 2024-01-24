import { configureStore } from '@reduxjs/toolkit'
// import basketReducer from '../lib/basketSlice'
import authReducer from '../lib/authSlice'
import chatReducer from '../lib/chatSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'


// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false
// })

// src/store/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;

const reducers = combineReducers({
    // basket: basketReducer,
    auth: authReducer,
    chat: chatReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

