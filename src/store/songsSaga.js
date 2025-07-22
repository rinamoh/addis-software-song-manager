
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from './songsSlice';

//  will actually fetch the data fetch yemilew silale
function fetchSongsFromAPI() {
  return fetch('http://your-api.com/songs') // change to your actual backend
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
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

//  watcher (listens for the action)
export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, handleFetchSongs);
}
