// src/store/songsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],         // actual songs
    loading: false,   // is it still loading?
    error: null,      // if something went wrong
  },
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.list = action.payload;  // save the songs
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // save the error
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
