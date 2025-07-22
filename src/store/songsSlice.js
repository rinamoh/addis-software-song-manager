// src/store/songsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],         
    loading: false,   
    error: null,      
  },
  reducers: {

    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.list = action.payload.songs;  
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload; 
    },
     createSongRequest(state, action) {
    state.loading = true;
    state.error = null;
  },
  createSongSuccess(state, action) {
    state.list.push(action.payload);  
    state.loading = false;
  },
  createSongFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  },

  updateSongRequest(state, action) {
    state.loading = true;
    state.error = null;
  },
  updateSongSuccess(state, action) {
    const index = state.list.findIndex(song => song.id === action.payload.id);
    if (index !== -1) {
      state.list[index] = action.payload;  // replace with updated song
    }
    state.loading = false;
  },
  updateSongFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  },

  deleteSongRequest(state, action) {
    state.loading = true;
    state.error = null;
  },
  deleteSongSuccess(state, action) {
    state.list = state.list.filter(song => song.id !== action.payload);  // remove deleted song
    state.loading = false;
  },
  deleteSongFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,

  createSongRequest,
  createSongSuccess,
  createSongFailure,

  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,

  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
