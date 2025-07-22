
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,fetchSongsSuccess,fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure,
} from './songsSlice';

//  will actually fetch the data fetch yemilew silale
function fetchSongsFromAPI() {
  return fetch('/api/songs') // change to your actual backend
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    });
}

// Create a new song on the backend
function createSongAPI(songData) {
  return fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  }).then(res => {
    if (!res.ok) throw new Error('Failed to create song');
    return res.json(); // MirageJS returns { song: {...} }
  });
}

// Update an existing song by id
function updateSongAPI(id, songData) {
  return fetch(`/api/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  }).then(res => {
    if (!res.ok) throw new Error('Failed to update song');
    return res.json(); // { song: {...} }
  });
}

// Delete a song by id
function deleteSongAPI(id) {
  return fetch(`/api/songs/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete song');
    return res; // no JSON body expected, just confirm success
  });
}


//  worker function (what to do when requested) notice ezi gar the yield put and call!
function* handleFetchSongs() {
  try {
    const songs = yield call(fetchSongsFromAPI); // call the API
    yield put(fetchSongsSuccess(songs));         // dispatch success action
  } catch (error) {
    yield put(fetchSongsFailure(error.message)); // dispatch error action
  }
}

function* handleCreateSong(action) {
  try {
    const response = yield call(createSongAPI, action.payload); // payload contains new song data
    // response likely shape { song: {...} }
    yield put(createSongSuccess(response.song));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

// Update an existing song
function* handleUpdateSong(action) {
  try {
    const { id, ...songData } = action.payload; // payload contains id + updated song fields
    const response = yield call(updateSongAPI, id, songData);
    yield put(updateSongSuccess(response.song));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

// Delete a song
function* handleDeleteSong(action) {
  try {
    yield call(deleteSongAPI, action.payload); // payload is song id
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

//  watcher (listens for the action)
export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, handleFetchSongs);
  yield takeLatest(createSongRequest.type, handleCreateSong);
  yield takeLatest(updateSongRequest.type, handleUpdateSong);
  yield takeLatest(deleteSongRequest.type, handleDeleteSong);
}
