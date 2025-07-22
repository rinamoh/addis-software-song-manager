// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'; // creates the memory (store)
import createSagaMiddleware from 'redux-saga';     // lets Redux do async stuff
import songsReducer from './songsSlice';           // handles songs part of memory
import rootSaga from './rootSaga';                 // handles async logic

const sagaMiddleware = createSagaMiddleware();     // create the saga tool

const store = configureStore({
  reducer: {
    songs: songsReducer,   // memory space for songs
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); // start listening for background tasks

export default store;
